/**
 * Serbian voice test for the OpenAI Realtime API.
 *
 * Generates one WAV per voice so the quality can be judged by ear before any
 * telephony work is built on top of it. Usage:
 *
 *   npx tsx scripts/test-voice-sr.ts              # all default voices
 *   npx tsx scripts/test-voice-sr.ts marin cedar  # specific voices
 *
 * Output lands in scripts/voice-samples/.
 */
import WebSocket from "ws";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const MODEL = process.env.VOICE_MODEL || "gpt-realtime-2.1";
const URL = `wss://api.openai.com/v1/realtime?model=${MODEL}`;
const SAMPLE_RATE = 24_000;
const OUT_DIR = path.join(process.cwd(), "scripts/voice-samples");

// Voices to try. An unknown name simply fails for that one voice, so this list
// can stay optimistic — the run reports which ones worked.
const DEFAULT_VOICES = ["marin", "cedar", "alloy", "shimmer", "ash", "coral"];

// Deliberately chosen to expose the usual weak spots: diacritics (č, š, ž, ć),
// a spoken time, and a natural question at the end.
const SCRIPT_SR =
  "Dobar dan, hvala što ste pozvali ordinaciju Smile. " +
  "Trenutno smo zauzeti, ali mogu da vam pomognem oko termina. " +
  "Imamo slobodno u sredu u deset i trideset, ili u četvrtak popodne u pola pet. " +
  "Šta vam više odgovara?";

/**
 * Two instruction variants. The default sounded Croatian in testing — these
 * models see far more Croatian audio, so the accent drifts unless the prompt
 * pins it down. Variant "sr2" pushes hard on Serbian prosody; run both and
 * compare by ear.
 */
const VARIANTS: Record<string, string> = {
  sr1:
    "Ti si recepcionar stomatološke ordinacije i pričaš isključivo srpski jezik, " +
    "prirodno i ljubazno, kao živ čovek na telefonu. Pročitaj tekst korisnika " +
    "naglas, od reči do reči, bez dodavanja i bez komentara.",

  sr2:
    "Govoriš ISKLJUČIVO srpskim jezikom, ekavicom, sa naglaskom kao govornik " +
    "iz Beograda ili Novog Sada. NIJE hrvatski i NIJE bosanski — ne koristi " +
    "hrvatsku intonaciju, hrvatski melodijski naglasak niti ijekavicu. " +
    "Zamisli spikera na RTS-u ili recepcionarku u ordinaciji u Beogradu: " +
    "ravnija, smirenija intonacija, kraći samoglasnici, bez pevušenja na kraju " +
    "rečenice. Reč 'ordinaciju' i 'termina' izgovori sa srpskim naglaskom. " +
    "Pročitaj tekst korisnika naglas, od reči do reči, bez dodavanja i komentara.",
};

const VARIANT = process.env.VOICE_VARIANT || "sr1";
const INSTRUCTIONS = VARIANTS[VARIANT] ?? VARIANTS.sr1;

/** PCM16 mono → WAV (adds the 44-byte RIFF header the raw stream lacks). */
function toWav(pcm: Buffer, sampleRate: number): Buffer {
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16); // PCM chunk size
  header.writeUInt16LE(1, 20); // format: PCM
  header.writeUInt16LE(1, 22); // channels: mono
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28); // byte rate
  header.writeUInt16LE(2, 32); // block align
  header.writeUInt16LE(16, 34); // bits per sample
  header.write("data", 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

function generate(voice: string): Promise<{ voice: string; ms: number; bytes: number }> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(URL, {
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    });

    const chunks: Buffer[] = [];
    let firstAudioAt = 0;
    const startedAt = Date.now();
    const timer = setTimeout(() => {
      ws.close();
      reject(new Error("timeout after 60s"));
    }, 60_000);

    ws.on("open", () => {
      ws.send(
        JSON.stringify({
          type: "session.update",
          session: {
            type: "realtime",
            instructions: INSTRUCTIONS,
            output_modalities: ["audio"],
            audio: {
              output: { format: { type: "audio/pcm", rate: SAMPLE_RATE }, voice },
            },
          },
        })
      );

      ws.send(
        JSON.stringify({
          type: "conversation.item.create",
          item: {
            type: "message",
            role: "user",
            content: [{ type: "input_text", text: SCRIPT_SR }],
          },
        })
      );

      ws.send(JSON.stringify({ type: "response.create" }));
    });

    ws.on("message", (raw) => {
      const event = JSON.parse(raw.toString());

      // GA uses response.output_audio.delta; older builds emit response.audio.delta.
      if (event.type?.endsWith("audio.delta") && event.delta) {
        if (!firstAudioAt) firstAudioAt = Date.now();
        chunks.push(Buffer.from(event.delta, "base64"));
        return;
      }

      if (event.type === "error" || event.error) {
        clearTimeout(timer);
        ws.close();
        reject(new Error(event.error?.message || JSON.stringify(event).slice(0, 300)));
        return;
      }

      if (event.type === "response.done") {
        clearTimeout(timer);
        ws.close();

        if (chunks.length === 0) {
          reject(new Error("no audio returned"));
          return;
        }

        const pcm = Buffer.concat(chunks);
        fs.mkdirSync(OUT_DIR, { recursive: true });
        const tag = MODEL.includes("mini") ? "mini" : "full";
        fs.writeFileSync(
          path.join(OUT_DIR, `${voice}-${VARIANT}-${tag}.wav`),
          toWav(pcm, SAMPLE_RATE)
        );

        resolve({
          voice,
          ms: firstAudioAt - startedAt, // time to first audio ≈ perceived latency
          bytes: pcm.length,
        });
      }
    });

    ws.on("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

async function main() {
  const voices = process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT_VOICES;
  console.log(`Model: ${MODEL}`);
  console.log(`Tekst: "${SCRIPT_SR.slice(0, 60)}…"\n`);

  for (const voice of voices) {
    process.stdout.write(`  ${voice.padEnd(10)} … `);
    try {
      const r = await generate(voice);
      const seconds = (r.bytes / 2 / SAMPLE_RATE).toFixed(1);
      console.log(`✓ ${seconds}s audio, prvi zvuk za ${r.ms}ms`);
    } catch (err) {
      console.log(`✗ ${(err as Error).message}`);
    }
  }

  console.log(`\nSnimci: ${OUT_DIR}`);
}

main().catch(console.error);
