import http from "http";
import crypto from "crypto";
import { answer, describeImage } from "./knowledge.js";
import { getAccessToken, startRefreshLoop, tokenStatus } from "./token.js";

/**
 * Instagram DM assistant.
 *
 * Meta posts an incoming message here, we look it up against the knowledge base
 * and post a reply back through the Graph API. Kept dependency-free on purpose:
 * this has to stay up on its own, since a DM going unanswered is the exact
 * problem we're selling a fix for.
 */

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.IG_VERIFY_TOKEN;
const APP_SECRET = process.env.IG_APP_SECRET;
const GRAPH = "https://graph.instagram.com/v23.0";

/** Conversation memory. In-process and short-lived by design: a DM thread is a
 *  conversation, not a record, and nothing here is worth persisting. */
const threads = new Map();
const MAX_TURNS = 10;
const THREAD_TTL = 60 * 60 * 1000;

function remember(userId, role, content) {
  const now = Date.now();
  const thread = threads.get(userId);
  const fresh = thread && now - thread.touched < THREAD_TTL ? thread.messages : [];
  const messages = [...fresh, { role, content }].slice(-MAX_TURNS);
  threads.set(userId, { messages, touched: now });
  return messages;
}

setInterval(() => {
  const now = Date.now();
  for (const [id, t] of threads) if (now - t.touched > THREAD_TTL) threads.delete(id);
}, 15 * 60 * 1000);

/** Meta signs every delivery; an unsigned or wrongly signed body is not ours. */
function signatureValid(raw, header) {
  if (!APP_SECRET || !header) return false;
  const expected =
    "sha256=" + crypto.createHmac("sha256", APP_SECRET).update(raw).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(header);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

async function sendReply(recipientId, text) {
  const res = await fetch(`${GRAPH}/me/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipient: { id: recipientId }, message: { text } }),
  });
  if (!res.ok) {
    console.error("send failed:", res.status, (await res.text()).slice(0, 300));
  }
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

/**
 * We download the picture ourselves instead of passing Meta's link on. Those
 * links are signed and expire, so handing one to the model works in testing and
 * then quietly fails later — and the size cap keeps someone's 20 MB photo from
 * becoming our memory problem.
 */
async function fetchImage(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`preuzimanje slike: ${res.status}`);

  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.byteLength > MAX_IMAGE_BYTES) throw new Error("slika prevelika");

  const type = res.headers.get("content-type") ?? "image/jpeg";
  return `data:${type};base64,${buf.toString("base64")}`;
}

/** Things we can't read. Silence would look like the assistant is broken, so
 *  each one gets an honest answer that keeps the conversation going. */
const CANT_READ = {
  video: "Video nažalost ne mogu da pogledam — možete li ukratko da napišete o čemu se radi?",
  audio: "Glasovnu poruku ne mogu da preslušam — možete li da mi napišete pitanje?",
  share: "Ne mogu da otvorim ono što ste podelili — recite mi ukratko šta vas zanima?",
  story_mention: "Hvala što ste podelili! Recite mi kako mogu da pomognem.",
  default: "Ovo nažalost ne mogu da otvorim — možete li da napišete šta vas zanima?",
};

/** Runs after the 200 has already gone back to Meta — see the handler below. */
async function handleMessage(senderId, { text, image, other }) {
  try {
    if (!text && !image && other) {
      await sendReply(senderId, CANT_READ[other] ?? CANT_READ.default);
      return;
    }

    let description = null;
    if (image) {
      try {
        description = await describeImage(await fetchImage(image));
      } catch (err) {
        // A failed picture shouldn't swallow the question typed alongside it.
        console.error("slika nije obrađena:", err.message);
      }
    }

    if (!text && !description) {
      await sendReply(
        senderId,
        "Sliku nisam uspeo da otvorim — možete li da napišete šta vas zanima?"
      );
      return;
    }

    const content = [text, description && `[slika: ${description}]`]
      .filter(Boolean)
      .join("\n");

    const history = remember(senderId, "user", content);
    const reply = await answer(history);
    if (!reply) return;
    remember(senderId, "assistant", reply);
    await sendReply(senderId, reply);
  } catch (err) {
    console.error("handling failed:", err.message);
    await sendReply(
      senderId,
      "Izvinite, trenutno imam tehnički problem. Pišite na info@solveradev.rs pa se javljam odmah."
    ).catch(() => {});
  }
}

function extractMessages(body) {
  const out = [];
  for (const entry of body.entry ?? []) {
    for (const event of entry.messaging ?? []) {
      // Echoes are our own replies coming back; answering them loops forever.
      if (event.message?.is_echo) continue;

      const senderId = event.sender?.id;
      if (!senderId) continue;

      const text = event.message?.text ?? "";
      const attachments = event.message?.attachments ?? [];
      const image = attachments.find((a) => a.type === "image")?.payload?.url;
      const other = attachments.find((a) => a.type !== "image")?.type;

      if (text || image || other) out.push({ senderId, text, image, other });
    }
  }
  return out;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET" && url.pathname === "/token-status") {
    void tokenStatus().then((status) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(status, null, 2));
    });
    return;
  }

  if (req.method === "GET" && url.pathname === "/health") {
    res.writeHead(200).end("ok");
    return;
  }

  // Meta's one-time verification handshake.
  if (req.method === "GET" && url.pathname === "/webhook") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");
    if (mode === "subscribe" && token === VERIFY_TOKEN && challenge) {
      res.writeHead(200, { "Content-Type": "text/plain" }).end(challenge);
    } else {
      res.writeHead(403).end("forbidden");
    }
    return;
  }

  if (req.method === "POST" && url.pathname === "/webhook") {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      if (!signatureValid(raw, req.headers["x-hub-signature-256"])) {
        res.writeHead(403).end("bad signature");
        return;
      }

      // Meta retries anything slower than a few seconds, which would answer the
      // visitor twice. Acknowledge first, then take as long as we need.
      res.writeHead(200).end("EVENT_RECEIVED");

      let body;
      try {
        body = JSON.parse(raw);
      } catch {
        return;
      }
      for (const { senderId, ...message } of extractMessages(body)) {
        void handleMessage(senderId, message);
      }
    });
    return;
  }

  res.writeHead(404).end("not found");
});

const required = ["IG_VERIFY_TOKEN", "IG_APP_SECRET", "IG_ACCESS_TOKEN", "SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "OPENAI_API_KEY"];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) console.warn("nedostaju promenljive:", missing.join(", "));

server.listen(PORT, () => {
  console.log(`Instagram asistent sluša na portu ${PORT}`);
  startRefreshLoop();
});
