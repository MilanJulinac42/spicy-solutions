import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

/**
 * Same knowledge base the website chatbot and the voice agent use, queried
 * directly rather than through the site's API — a DM shouldn't stop working
 * because the website is redeploying.
 */

/**
 * Built on first use, not at import. A bad or missing SUPABASE_URL would
 * otherwise crash the process on boot, which on a host means the webhook can't
 * even complete Meta's verification handshake — a config typo would look like
 * a total outage instead of a failed lookup.
 */
let _supabase;
let _openai;

function supabase() {
  _supabase ??= createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  return _supabase;
}

function openaiClient() {
  _openai ??= new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return _openai;
}

async function embed(text) {
  const res = await openaiClient().embeddings.create({
    model: "text-embedding-3-small",
    input: text.replace(/\n/g, " ").trim(),
  });
  return res.data[0].embedding;
}

async function search(question) {
  try {
    const { data, error } = await supabase().rpc("match_knowledge", {
      query_embedding: await embed(question),
      query_locale: "sr",
      match_limit: 4,
      match_threshold: 0.28,
    });
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
function buildPrompt(chunks) {
  const base = `Ti si asistent firme Solvera (solveradev.rs) i odgovaraš na Instagram poruke.

KAKO PIŠEŠ:
- Ovo je Instagram, ne mejl. Kratko — dve do tri rečenice, najviše.
- Piši prirodno i toplo, kao čovek koji brzo odgovara sa telefona. Bez „Poštovani".
- Persiraj („Vi", „Vam"), sagovornici su vlasnici firmi.
- Ne nabrajaj sve usluge. Odgovori na pitanje i postavi jedno kratko pitanje nazad.
- Bez žargona: „asistent", ne „AI bot"; „sajt", ne „website".
- Emodži najviše jedan, i to ne u svakoj poruci.

ŠTA SOLVERA RADI:
- Asistent na sajtu koji odgovara posetiocima i hvata kontakte — izrada od 450 EUR, održavanje od 20 EUR mesečno
- Asistent koji se javlja na telefon i zakazuje termine — izrada od 600 EUR, održavanje od 40 EUR mesečno
- Automatizacija posla po meri — od 800 EUR
- Sajtovi od 300 EUR, poslovni sistemi od 800 EUR
- Vodi je jedan inženjer: Milan Julinac. Kontakt: info@solveradev.rs, WhatsApp 063 838 4196.

STROGO:
- Ako nemaš podatak, reci to i ponudi da se Milan javi. NE IZMIŠLJAJ cene, rokove ni brojke.
- Nikad ne izmišljaj imena klijenata.`;

  if (chunks.length === 0) {
    return `${base}

BAZA ZNANJA: (prazno — nema podatka za ovo pitanje)
KRITIČNO: Pošto nema podatka, ne navodi nijednu cifru osim onih gore. Reci da ćeš proslediti Milanu i pitaj za kontakt.`;
  }

  return `${base}

BAZA ZNANJA:
${chunks.map((c, i) => `[${i + 1}] ${c}`).join("\n\n")}`;
}

/** Produces the reply text for one incoming DM. */
export async function answer(history) {
  const lastUser = [...history].reverse().find((m) => m.role === "user");
  const chunks = lastUser ? await search(lastUser.content) : [];

  const completion = await openaiClient().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: buildPrompt(chunks) }, ...history.slice(-10)],
    max_tokens: 400,
    temperature: 0.6,
  });

  return completion.choices[0]?.message?.content?.trim() || "";
}
