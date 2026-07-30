import { NextRequest, NextResponse } from "next/server";
import { searchKnowledge } from "@/lib/rag";

/**
 * Knowledge lookup for the voice agent. The browser talks to OpenAI directly
 * over WebRTC, so there's no server hop per turn to attach RAG context the way
 * the chatbot does — instead the model calls this as a tool when it needs a
 * fact, which keeps voice and chat answering from the same knowledge base.
 */

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const WINDOW = 60_000;
const MAX_LOOKUPS = 20; // generous: one conversation can ask several questions

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > MAX_LOOKUPS;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimit) {
    if (now > entry.resetAt) rateLimit.delete(ip);
  }
}, 300_000);

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ result: "Previše upita. Uputi korisnika na info@solveradev.rs." });
    }

    const { query } = await req.json();
    if (!query || typeof query !== "string") {
      return NextResponse.json({ result: "" }, { status: 400 });
    }

    // Fewer, shorter chunks than the chatbot uses: whatever comes back here is
    // appended to the conversation and re-billed on every later turn, so length
    // costs more in a voice session than it does in chat.
    const chunks = (await searchKnowledge(query, "sr", 3)).map((c) =>
      c.length > 500 ? `${c.slice(0, 500)}…` : c
    );

    // An explicit empty answer matters: it tells the model to say it doesn't
    // know rather than fall back on guesswork.
    if (chunks.length === 0) {
      return NextResponse.json({
        result:
          "NEMA PODATKA u bazi znanja za ovo pitanje. Reci korisniku da nemaš tačan podatak i uputi ga na info@solveradev.rs ili na besplatnu konsultaciju. NE IZMIŠLJAJ.",
      });
    }

    return NextResponse.json({ result: chunks.join("\n\n") });
  } catch (error) {
    console.error("Voice knowledge lookup error:", error);
    return NextResponse.json({
      result:
        "Greška pri pretrazi. Reci da trenutno nemaš pristup podacima i uputi na info@solveradev.rs.",
    });
  }
}
