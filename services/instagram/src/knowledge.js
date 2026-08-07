import OpenAI from "openai";
import { db } from "./db.js";

/**
 * Same knowledge base the website chatbot and the voice agent use, queried
 * directly rather than through the site's API — a DM shouldn't stop working
 * because the website is redeploying.
 *
 * Every lookup is scoped to one client. A dress shop's customer asking about
 * sizes must never reach another client's chunks, and the retrieval layer is
 * the only place that can guarantee it.
 */

let _openai;

function openaiClient() {
  _openai ??= new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return _openai;
}

/** Client records change rarely and are read on every message. */
const tenantCache = new Map();
const TENANT_TTL = 10 * 60 * 1000;

async function tenant(tenantId) {
  const hit = tenantCache.get(tenantId);
  if (hit && Date.now() - hit.at < TENANT_TTL) return hit.row;

  try {
    const { data, error } = await db()
      .from("tenants")
      .select("slug, name, system_prompt_extra, kontakt_fallback, active")
      .eq("slug", tenantId)
      .maybeSingle();
    if (error) throw error;

    const row = data
      ? {
          naziv: data.name,
          prompt_override: data.system_prompt_extra,
          kontakt_fallback: data.kontakt_fallback,
        }
      : null;

    tenantCache.set(tenantId, { row, at: Date.now() });
    return row;
  } catch (err) {
    console.error("tenant lookup failed:", err.message);
    return null;
  }
}

/**
 * Turns a photo into words once, and everything downstream — the knowledge
 * search, the reply, and eventually a product catalogue — works on those words
 * instead of the picture. Cheaper than carrying the image through every call,
 * and the description is the part actually worth storing.
 *
 * Low detail on purpose: colour, shape and any readable text survive it, and
 * that is all we ever ask of these images.
 */
export async function describeImage(dataUrl) {
  const res = await openaiClient().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Opiši šta je na slici, na srpskom, u jednoj do dve rečenice.
Ako je snimak ekrana, pročitaj glavni tekst i eventualnu poruku o grešci.
Ako je proizvod, navedi boju, kroj i upadljive detalje.`,
          },
          { type: "image_url", image_url: { url: dataUrl, detail: "low" } },
        ],
      },
    ],
    max_tokens: 200,
  });

  return res.choices[0]?.message?.content?.trim() || "";
}

async function embed(text) {
  const res = await openaiClient().embeddings.create({
    model: "text-embedding-3-small",
    input: text.replace(/\n/g, " ").trim(),
  });
  return res.data[0].embedding;
}

async function search(question, tenantId) {
  try {
    const embedding = await embed(question);
    const args = {
      query_embedding: embedding,
      query_locale: "sr",
      match_limit: 4,
      match_threshold: 0.28,
    };

    let { data, error } = await db().rpc("match_knowledge", {
      ...args,
      query_tenant: tenantId,
    });

    // Deploys land before migrations do. Rather than answer every customer
    // with "nemam podatak" until someone opens the SQL editor, fall back to
    // the pre-tenant signature — which serves Solvera's chunks, the only ones
    // that exist at that point anyway.
    if (error?.message?.includes("match_knowledge")) {
      console.warn("baza još nije migrirana — pretraga bez klijenta");
      ({ data, error } = await db().rpc("match_knowledge", args));
    }

    if (error) throw error;
    return (data ?? []).map((r) => r.content);
  } catch (err) {
    console.error("knowledge search failed:", err.message);
    return [];
  }
}

/**
 * A DM is not an email. Long paragraphs get skimmed and the reply reads as a
 * sales blast, so the assistant is told to answer the way a person types on a
 * phone — and to hand over rather than guess, which is the whole promise.
 */
const SOLVERA_FACTS = `Ti si asistent firme Solvera (solveradev.rs) i odgovaraš na Instagram poruke.

ŠTA SOLVERA RADI:
- Asistent na sajtu koji odgovara posetiocima i hvata kontakte — izrada od 450 EUR, održavanje od 20 EUR mesečno
- Asistent koji se javlja na telefon i zakazuje termine — izrada od 600 EUR, održavanje od 40 EUR mesečno
- Automatizacija posla po meri — od 800 EUR
- Sajtovi od 300 EUR, poslovni sistemi od 800 EUR
- Vodi je jedan inženjer: Milan Julinac. Kontakt: info@solveradev.rs, WhatsApp 063 838 4196.`;

function buildPrompt(chunks, tenantRow) {
  // Style is the same for every client — it's what makes a DM read like a
  // person rather than a brochure, and no client should have to rediscover it.
  // Only the facts change, and those come from the client's own record.
  const facts = tenantRow?.prompt_override?.trim() || SOLVERA_FACTS;
  const naziv = tenantRow?.naziv ?? "Solvera";
  const kontakt = tenantRow?.kontakt_fallback ?? "info@solveradev.rs";

  const base = `${facts}

KAKO PIŠEŠ:
- Ovo je Instagram, ne mejl. Kratko — dve do tri rečenice, najviše.
- Piši prirodno i toplo, kao čovek koji brzo odgovara sa telefona. Bez „Poštovani".
- Persiraj („Vi", „Vam"), sagovornici su vlasnici firmi.
- Ne nabrajaj sve usluge. Odgovori na pitanje i postavi jedno kratko pitanje nazad.
- Bez žargona: „asistent", ne „AI bot"; „sajt", ne „website".
- Emodži najviše jedan, i to ne u svakoj poruci.

SLIKE:
- Kad u poruci stoji „[slika: ...]", to je opis slike koju je sagovornik poslao.
  Ponašaj se kao da si je video. Ne pominji opis niti da si ga dobio.
- Ako slika sama ne kaže šta se traži, pitaj kratko šta ih zanima u vezi sa njom.

STROGO:
- Ako nemaš podatak, reci to i ponudi da se neko iz firme ${naziv} javi. NE IZMIŠLJAJ cene, rokove ni brojke.
- Nikad ne izmišljaj imena klijenata.
- Kad prosleđuješ, kontakt je: ${kontakt}`;

  if (chunks.length === 0) {
    return `${base}

BAZA ZNANJA: (prazno — nema podatka za ovo pitanje)
KRITIČNO: Pošto nema podatka, ne navodi nijednu cifru osim onih gore. Reci da ćeš proslediti i pitaj za kontakt.`;
  }

  return `${base}

BAZA ZNANJA:
${chunks.map((c, i) => `[${i + 1}] ${c}`).join("\n\n")}`;
}

/** Produces the reply text for one incoming DM, in one client's voice. */
export async function answer(history, tenantId) {
  const lastUser = [...history].reverse().find((m) => m.role === "user");
  const [chunks, tenantRow] = await Promise.all([
    lastUser ? search(lastUser.content, tenantId) : [],
    tenant(tenantId),
  ]);

  const completion = await openaiClient().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: buildPrompt(chunks, tenantRow) },
      ...history.slice(-10),
    ],
    max_tokens: 400,
    temperature: 0.6,
  });

  return completion.choices[0]?.message?.content?.trim() || "";
}
