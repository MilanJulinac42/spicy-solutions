import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db";

// --- Rate limiting (in-memory, per IP) ---
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 submissions per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimit) {
    if (now > entry.resetAt) rateLimit.delete(ip);
  }
}, 300_000);

/** Readable summary kept in `need` so the details survive even if the
 *  voice-demo columns aren't present yet (see scripts/schema.sql). */
function buildNeed(input: {
  need?: string;
  phone?: string;
  industry?: string;
  preferredTime?: string;
}): string | null {
  const parts = [
    input.need?.trim(),
    input.phone && `Telefon: ${input.phone}`,
    input.industry && `Delatnost: ${input.industry}`,
    input.preferredTime && `Željeni termin: ${input.preferredTime}`,
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(" | ") : null;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();
    const {
      name,
      email,
      company,
      need,
      locale,
      source = "chatbot",
      conversation,
      phone,
      industry,
      preferredTime,
      website, // honeypot — real users never fill this
    } = body;

    // Silently accept bot submissions so they don't retry with a tweak.
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const base = {
      name: name || null,
      email,
      company: company || null,
      need: buildNeed({ need, phone, industry, preferredTime }),
      locale: locale || "sr",
      source,
      conversation: conversation || null,
    };

    const { error } = await supabase
      .from("leads")
      .insert({ ...base, phone: phone || null, industry: industry || null, preferred_time: preferredTime || null });

    // The dedicated columns are optional: if the migration hasn't run yet, fall
    // back to the base row so a real lead is never lost over a schema gap.
    if (error) {
      const looksLikeMissingColumn = /column|schema cache/i.test(error.message);
      if (!looksLikeMissingColumn) throw error;

      const { error: fallbackError } = await supabase.from("leads").insert(base);
      if (fallbackError) throw fallbackError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { error: "Failed to save lead" },
      { status: 500 }
    );
  }
}
