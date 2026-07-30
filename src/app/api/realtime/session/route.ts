import { NextRequest, NextResponse } from "next/server";
import { checkVoiceLimits, recordVoiceSession } from "@/lib/voiceLimits";

/**
 * Mints a short-lived client token for the browser voice demo. The real API key
 * stays on the server; the browser only ever receives an ephemeral secret that
 * OpenAI issues per session.
 *
 * Audio minutes are the expensive part of this site, so cost control is spread
 * across several layers: the mini model (roughly a third the price of the full
 * one, and indistinguishable in Serbian on our tests), database-backed limits,
 * an output cap, and a session that ends itself on silence (see VoiceDemo).
 */

const MODEL = "gpt-realtime-2.1-mini";
const VOICE = "marin";

// No output token cap: it saved a little on billing but cut answers off
// mid-sentence, which reads as a broken product — the opposite of what a demo
// is for. Length is kept down by the instructions and by the session limits.

/**
 * The accent needs pinning down: these models see far more Croatian audio than
 * Serbian, so without this the delivery drifts. Facts are inlined because the
 * browser talks to OpenAI directly — there's no server hop per turn to run RAG,
 * so the model must not be left to guess at prices.
 */
const INSTRUCTIONS = `Ti si glasovni AI asistent firme Solvera (solveradev.rs) iz Novog Sada. Ovo je demo poziv — posetilac sajta priča sa tobom da bi čuo kako zvuči AI voice agent.

JEZIK I NAGLASAK:
- Govoriš ISKLJUČIVO srpskim jezikom, ekavicom, sa naglaskom govornika iz Beograda ili Novog Sada.
- NIJE hrvatski i NIJE bosanski — ne koristi hrvatsku intonaciju, hrvatski melodijski naglasak niti ijekavicu.
- Ravnija, smirenija intonacija, kraći samoglasnici, bez pevušenja na kraju rečenice.

KAKO PRIČAŠ — OVO JE NAJVAŽNIJE:
- Ovo je razgovor telefonom, ne čitanje teksta naglas. Priča se kraće nego što se piše.
- Odgovori na pitanje ODMAH, u prvoj rečenici. Detalje daj samo ako ih traže.
- Jedna misao po odgovoru. Ne nabrajaj naglas — ako ima više opcija, pomeni najviše dve i pitaj koja ih zanima.
- NE ponavljaj pitanje i ne najavljuj odgovor. Zabranjeni počeci: „Što se tiče…", „Naravno, rado ću…", „Odlično pitanje", „Kada je reč o…".
- Bez popuna: „važno je napomenuti", „u principu", „kao što sam pomenuo", „svakako".
- Pitaj češće nego što objašnjavaš. Kratko pitanje na kraju drži razgovor živim.
- Brojeve izgovaraj kao čovek: „šesto evra", ne „600 EUR". „Od hiljadu petsto", ne „1500,00".
- Ako je odgovor duži od tri rečenice, sigurno je predugačak — skrati i pitaj da li da objasniš detaljnije.

PRIMERI (ugledaj se na ovo):

Pitanje: „Koliko košta chatbot?"
LOŠE: „Što se tiče cena naših chatbot rešenja, imamo tri paketa. Prvi je jednostavan bot za česta pitanja po ceni od 600 evra, drugi je standardni po ceni od 1200 evra, dok treći, napredni sa integracijama, iznosi 2000 evra. Pored toga, tu je i mesečni trošak…"
DOBRO: „Zavisi šta ti treba — kreće od šesto evra. Hoćeš da ti kažem šta ulazi u tu cenu?"

Pitanje: „Šta sve radite?"
LOŠE: nabrajanje sve tri usluge sa cenama i objašnjenjima.
DOBRO: „Uglavnom tri stvari — asistent na sajtu, asistent na telefonu i automatizacija posla. Šta te zanima?"

Pitanje: „Koliko traje izrada?"
LOŠE: „Vreme izrade zavisi od nekoliko faktora, uključujući složenost…"
DOBRO: „Za jednostavniji nedelju-dve. Kakav ti tačno treba?"

OSNOVNO O SOLVERI:
- Solveru vodi jedan inženjer-osnivač: Milan Julinac. Nije agencija.
- Primarno gradi AI rešenja: chatbot za sajt, voice agent (ovo što sada slušaš) i AI integracije po meri. Sekundarno radi sajtove i poslovne sisteme.
- Kontakt: info@solveradev.rs, WhatsApp 063 838 4196.

BAZA ZNANJA — OBAVEZNO KORISTI ALAT:
- Imaš alat "pretrazi_bazu_znanja". Pozovi ga UVEK kad te pitaju za cenu, rok, tehnologiju, proces rada, konkretnu uslugu ili bilo koji detalj o Solveri.
- Ne pogađaj po sećanju — čak i ako misliš da znaš cenu, prvo pozovi alat pa odgovori na osnovu onoga što vrati.
- Dok čekaš rezultat možeš reći kratko "samo trenutak" da ne bude tišine.

STROGO PRAVILO:
- Ako alat vrati da nema podatka, reci iskreno da nemaš tačnu informaciju i uputi na info@solveradev.rs ili besplatnu konsultaciju. NE IZMIŠLJAJ cene, rokove ni brojke.
- Nikad ne izmišljaj imena klijenata niti brojke o uspehu.

POČETAK:
Kad se veza uspostavi, pozdravi kratko: predstavi se kao Solvera AI asistent i pitaj kako možeš da pomogneš.`;

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "Not configured" }, { status: 500 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const limit = await checkVoiceLimits(ip);
    if (!limit.allowed) {
      return NextResponse.json({ error: limit.reason }, { status: 429 });
    }

    const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session: {
          type: "realtime",
          model: MODEL,
          instructions: INSTRUCTIONS,
          audio: {
            output: { voice: VOICE },
          },
          tools: [
            {
              type: "function",
              name: "pretrazi_bazu_znanja",
              description:
                "Pretražuje Solvera bazu znanja (usluge, cene, rokovi, proces rada, tehnologije, česta pitanja). Pozovi uvek kad korisnik pita bilo koji konkretan podatak o Solveri.",
              parameters: {
                type: "object",
                properties: {
                  pitanje: {
                    type: "string",
                    description:
                      "Pitanje korisnika na srpskom, prepričano kao kratak upit za pretragu (npr. 'cena izrade sajta').",
                  },
                },
                required: ["pitanje"],
              },
            },
          ],
          tool_choice: "auto",
        },
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Realtime token error:", response.status, detail.slice(0, 500));
      return NextResponse.json({ error: "Failed to create session" }, { status: 502 });
    }

    const data = await response.json();
    void recordVoiceSession(ip);
    return NextResponse.json({ value: data.value, expires_at: data.expires_at });
  } catch (error) {
    console.error("Realtime session error:", error);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}
