import crypto from "crypto";
import { saveAccount, subscribeToMessages, whoAmI } from "./accounts.js";

/**
 * Connecting a client's Instagram account.
 *
 * The whole point of this file is that the client's part is one button. Asking
 * a shop owner to accept a developer tester invite loses the sale in that
 * sentence — not because it is hard, but because it reads as unfinished.
 *
 * It lives in this service rather than on the website so the app secret stays
 * in one place. The site never needs to know it.
 */

const SCOPES = "instagram_business_basic,instagram_business_manage_messages";
const AUTHORIZE = "https://www.instagram.com/oauth/authorize";
const TOKEN = "https://api.instagram.com/oauth/access_token";
const GRAPH = "https://graph.instagram.com";

const APP_ID = process.env.IG_APP_ID;
const APP_SECRET = process.env.IG_APP_SECRET;
const PUBLIC_URL = process.env.PUBLIC_URL;
const CONNECT_SECRET = process.env.CONNECT_SECRET;

const redirectUri = () => `${PUBLIC_URL}/oauth/callback`;

/**
 * Which client is connecting has to survive the round trip through Instagram,
 * and it comes back as a query parameter anyone could edit. Signing it means a
 * tampered value is rejected instead of quietly filing an account under the
 * wrong client.
 */
function signState(tenantId) {
  const payload = Buffer.from(tenantId).toString("base64url");
  const mac = crypto
    .createHmac("sha256", APP_SECRET)
    .update(payload)
    .digest("base64url");
  return `${payload}.${mac}`;
}

function readState(state) {
  const [payload, mac] = String(state ?? "").split(".");
  if (!payload || !mac) return null;

  const expected = crypto
    .createHmac("sha256", APP_SECRET)
    .update(payload)
    .digest("base64url");

  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  return Buffer.from(payload, "base64url").toString("utf8");
}

/** Guards the connect page. Without it anyone who finds the URL can attach
 *  their own account to this service and start burning our OpenAI budget. */
export function linkAllowed(key) {
  if (!CONNECT_SECRET) return false;
  const a = Buffer.from(String(key ?? ""));
  const b = Buffer.from(CONNECT_SECRET);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

const page = (title, body) => `<!doctype html>
<html lang="sr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<style>
  body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
         background:#0a0a0a; color:#e5e5e5; display:grid; place-items:center;
         min-height:100vh; margin:0; padding:24px; line-height:1.6; }
  .card { max-width:460px; width:100%; background:#141414; border:1px solid #262626;
          border-radius:16px; padding:40px 32px; text-align:center; }
  h1 { font-size:22px; margin:0 0 12px; color:#fff; }
  p { color:#a3a3a3; margin:0 0 24px; font-size:15px; }
  a.btn { display:inline-block; background:#ff5a1f; color:#fff; text-decoration:none;
          padding:14px 28px; border-radius:10px; font-weight:600; font-size:16px; }
  .ok { font-size:44px; margin-bottom:8px; }
  code { background:#1f1f1f; padding:2px 6px; border-radius:4px; font-size:13px; }
</style>
</head><body><div class="card">${body}</div></body></html>`;

export function connectPage(tenantId) {
  const url = new URL(AUTHORIZE);
  url.searchParams.set("client_id", APP_ID);
  url.searchParams.set("redirect_uri", redirectUri());
  url.searchParams.set("scope", SCOPES);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("state", signState(tenantId));

  return page(
    "Povežite Instagram",
    `<h1>Povežite svoj Instagram</h1>
     <p>Kliknite na dugme, prijavite se na Instagram i potvrdite pristup.
        To je sve što je potrebno — dalje podešavamo mi.</p>
     <a class="btn" href="${url}">Poveži Instagram nalog</a>`
  );
}

/**
 * Instagram hands back a code; three things have to happen before the assistant
 * can actually work, and the third is the one people forget.
 */
export async function handleCallback(code, state) {
  const tenantId = readState(state);
  if (!tenantId) throw new Error("neispravan state — pokušajte ponovo");

  // 1. Code for a short-lived token.
  const form = new URLSearchParams({
    client_id: APP_ID,
    client_secret: APP_SECRET,
    grant_type: "authorization_code",
    redirect_uri: redirectUri(),
    code,
  });

  const shortRes = await fetch(TOKEN, { method: "POST", body: form });
  if (!shortRes.ok) {
    throw new Error(`razmena koda: ${shortRes.status} ${(await shortRes.text()).slice(0, 200)}`);
  }
  const short = await shortRes.json();

  // 2. Short-lived for long-lived. The short one lasts an hour.
  const exchange = new URL(`${GRAPH}/access_token`);
  exchange.searchParams.set("grant_type", "ig_exchange_token");
  exchange.searchParams.set("client_secret", APP_SECRET);
  exchange.searchParams.set("access_token", short.access_token);

  const longRes = await fetch(exchange);
  if (!longRes.ok) {
    throw new Error(`dugotrajni token: ${longRes.status} ${(await longRes.text()).slice(0, 200)}`);
  }
  const long = await longRes.json();

  const me = await whoAmI(long.access_token);
  await saveAccount({
    igUserId: me.id,
    tenantId,
    token: long.access_token,
    username: me.username,
  });

  // 3. Subscribe. Without this everything above succeeds and no message ever
  //    arrives — the failure mode with no error attached to it.
  await subscribeToMessages(long.access_token);

  console.log(`povezan nalog ${me.username} (${me.id}) za klijenta ${tenantId}`);
  return me;
}

export function successPage(username) {
  return page(
    "Povezano",
    `<div class="ok">✓</div>
     <h1>Nalog je povezan</h1>
     <p>Instagram nalog <code>@${username}</code> je uspešno povezan.
        Asistent od sada odgovara na poruke. Možete zatvoriti ovu stranicu.</p>`
  );
}

export function errorPage(message) {
  return page(
    "Nije uspelo",
    `<h1>Povezivanje nije uspelo</h1>
     <p>${message}</p>
     <p>Javite nam na <code>info@solveradev.rs</code> pa rešavamo odmah.</p>`
  );
}
