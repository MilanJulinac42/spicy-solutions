# Solvera — SEO keyword mapa (blog)

Referenca za pisanje blog postova. Zasnovano na realnom srpskom SERP-u (jul 2026),
ne na pretpostavkama. Ažurirati kad se doda nov post ili kad Keyword Planner da tačne brojeve.

## Ključni princip

Ciljamo **search-jezik**, ne brend-formulacije. Ljudi kucaju `cena`, `koliko košta`,
`za sajt`, `za korisničku podršku`, `za mali biznis` — a ne "za srpske firme".
Voice se traži kao `glasovni agent` / `telefonski asistent` / `AI sekretarica`, ne "voice agent srpski".

## Gde je konkurencija slaba (tu udaramo)

- **Komercijalni long-tail (cena po usluzi)** — pišu ga mali igrači (petarkordic.rs, agentstep.ai,
  ai-integracije.rs iz Novog Sada). Probojno. Naša prednost: **tačne cene + živ demo** kojih oni nemaju.
- **Široki informativni termini** ("veštačka inteligencija za firme", "AI alati za male biznise") drži
  **ITNetwork.rs** (jak domen). Teško, top-funnel, slabo konvertuje — **ne juriti sad**.

## Keyword mapa (po POC redosledu)

### 1. Chatbot
- **Primarni:** `cena AI chatbota za sajt`, `koliko košta AI chatbot za sajt`
- **Long-tail:** `AI chatbot za korisničku podršku`, `AI chatbot vs AI agent`, `RAG chatbot`, `AI chatbot za sajt Srbija`
- **Namera:** komercijalna (visoka konverzija)
- **FAQ koje pokriti (PAA):** Koliko košta osnovni? · Šta utiče na cenu? · Ima li besplatnih? · Koliko uštedim? · AI chatbot vs AI agent?
- **Postovi u clusteru** (svaki druga namera, bez kanibalizacije):
  - `cena` → `/blog/koliko-kosta-ai-chatbot-za-sajt` — komercijalna
  - `halucinacije / tačnost` → `/blog/zasto-ai-chatbot-izmislja-odgovore` — poverenje;
    **rupa na tržištu**: u srpskom SERP-u samo opšte novinarstvo (bug.hr, tportal,
    web-mind.rs), nijedan vendor ne pokriva „kako da bot ne izmišlja"
  - `e-commerce` → `/blog/ai-chatbot-za-online-prodavnicu` — vertikala, dobra konverzija
- **Još neiskorišćeno:** `AI chatbot za korisničku podršku` (visoka namera, gusto:
  agentstep/aichatbot.rs/ITNetwork/bolutions), `kako napraviti chatbot za sajt` (how-to,
  delom se preklapa sa cena postom)

### 2. Interni AI asistent
- **Primarni:** `interni AI asistent za firme`
- **Long-tail:** `AI nad internom dokumentacijom`, `privatni AI GDPR`, `AI pretraga dokumenata`, `AI asistent za zaposlene`
- **Namera:** investigativna
- **Ugao:** privatnost / GDPR (Azure OpenAI, Bedrock, self-hosted) — diferencijator

### 3. AI integracije / automatizacija
- **Primarni:** `automatizacija poslovanja AI` (broad — teže)
- **Long-tail (tu je pobeda):** `automatska obrada faktura AI`, `AI triage mejlova`, `AI automatizacija za mali biznis`, `AI sumarizacija sastanaka`
- **Namera:** mešovita
- **Napomena:** ne juriti broad termin (ITNetwork); pisati po konkretnom flow-u

### 4. AI Voice
- **Primarni:** `AI glasovni agent`, `AI telefonski asistent`
- **Long-tail:** `AI sekretarica`, `AI recepcionar`, `propušteni pozivi`, `AI koji se javlja na telefon`
- **Konkurencija:** **wisefox.rs je direktan konkurent** — gotov proizvod „AI sekretarica"
  sa blogom koji drži „šta je AI sekretarica" i disambiguaciju. **Ne ići im u čelo** na te
  termine. Naša prednost: gradimo po meri (vlasništvo, bez večne pretplate) + iskustvo iz
  stvarnog testiranja srpskog glasa. Takođe: Chatislav (domaća voice platforma).
- **Postovi u clusteru:**
  - `propušteni pozivi` → `/blog/propusteni-pozivi-kostaju` — problem-first, najširi doseg
  - `cena` → `/blog/koliko-kosta-ai-telefonski-asistent` — komercijalna namera
  - `opseg / poverenje` → `/blog/sta-ai-moze-a-sta-ne-na-telefonu` — šta NE sme, gradi poverenje
- **Još neiskorišćeno:** `da li AI zvuči kao robot na srpskom` — rupa (svi vendori tvrde
  „prirodan glas", niko ne piše pošteno o naglasku); imamo stvarno iskustvo iz testiranja

## On-page taktike (za svaki post)

- Naslov i H1 sadrže primarni keyword prirodno
- FAQ sekcija sa pitanjima gore → mogućnost za FAQ rich results (kasnije dodati FAQPage schema po postu)
- Interni link ka odgovarajućoj `/usluge/*` stranici + ka živom demou gde postoji
- Tačne brojke (cene, rokovi) — to nas razlikuje od maglovitih konkurenata
- `Article`/`BlogPosting` schema (već automatski na `/blog/[slug]`)

## Tačni volumeni (kad zatreba)

- **Google Keyword Planner** (besplatno preko Google Ads naloga) — jedini realan izvor za `.rs`
- **Google Trends** — poređenje termina
- **Google autocomplete + "Pretrage povezane sa…"** — besplatne prave fraze

## Konkurenti za praćenje

- petarkordic.rs, agentstep.ai, ai-integracije.rs (eemagine, Novi Sad), aichatbot.rs, webai.rs,
  ivapix.rs, netbitlab.rs, chat-bot.rs, bizzai.rs, wisefox.rs
- ITNetwork.rs — visok autoritet, informativni termini (ne takmičiti se direktno sad)
- Chatislav — domaća voice platforma (SaaS konkurent za voice)
