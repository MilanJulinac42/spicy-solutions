import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { BUDGET, TIMING, WEEKLY_SLOTS, isSerious, type TrialOutcome } from "@/data/trial";

/**
 * Free-trial requests: records each one and tells the page how many trial
 * slots are left this week (Monday–Sunday, Belgrade time).
 *
 * Built without lib/db on purpose — that module throws at import when the
 * Supabase env vars are missing, and this route must degrade to "capacity
 * unknown" instead of taking the trial page down with it.
 */

function db(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? createClient(url, key) : null;
}

const TZ = "Europe/Belgrade";

/** Belgrade wall-clock parts for an instant, independent of the server's zone. */
function belgradeParts(d: Date) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: TZ,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
      weekday: "short",
    })
      .formatToParts(d)
      .map((x) => [x.type, x.value])
  );
  return {
    y: +p.year,
    m: +p.month - 1,
    d: +p.day,
    h: +p.hour,
    min: +p.minute,
    dow: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(p.weekday),
  };
}

/** Monday 00:00 in Belgrade, as a UTC instant — and the Monday after it. */
function weekBounds(now = new Date()) {
  const b = belgradeParts(now);
  // Belgrade's current UTC offset (DST-aware), from the wall clock vs. the instant.
  const offsetMs = Date.UTC(b.y, b.m, b.d, b.h, b.min) - Math.floor(now.getTime() / 60_000) * 60_000;
  const mondayWall = Date.UTC(b.y, b.m, b.d - b.dow, 0, 0);
  return {
    start: new Date(mondayWall - offsetMs),
    nextStart: new Date(mondayWall + 7 * 86_400_000 - offsetMs),
  };
}

async function takenThisWeek(client: SupabaseClient): Promise<number> {
  const { start } = weekBounds();
  const { count, error } = await client
    .from("leads")
    .select("id", { count: "exact", head: true })
    .eq("source", "trial")
    .gte("created_at", start.toISOString());
  if (error) throw error;
  return count ?? 0;
}

export async function GET() {
  const client = db();
  if (!client) return NextResponse.json({ known: false, slots: WEEKLY_SLOTS });
  try {
    const taken = await takenThisWeek(client);
    return NextResponse.json(
      {
        known: true,
        slots: WEEKLY_SLOTS,
        remaining: Math.max(0, WEEKLY_SLOTS - taken),
        nextWeek: weekBounds().nextStart.toISOString(),
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (e) {
    console.error("Trial capacity error:", e);
    return NextResponse.json({ known: false, slots: WEEKLY_SLOTS });
  }
}

// In-memory limiter — per instance only, enough to stop a form being hammered.
const hits = new Map<string, { n: number; reset: number }>();
function limited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now > h.reset) {
    hits.set(ip, { n: 1, reset: now + 10 * 60_000 });
    return false;
  }
  h.n++;
  return h.n > 5;
}

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Honeypot: bots fill every field. Pretend it worked.
  if (clip(body.website, 200)) return NextResponse.json({ outcome: "offer" satisfies TrialOutcome });

  const firma = clip(body.firma, 120);
  const delatnost = clip(body.delatnost, 200);
  const ime = clip(body.ime, 120);
  const kontakt = clip(body.kontakt, 160);
  const usluga = clip(body.usluga, 60);
  const link = clip(body.link, 300);
  const timing = clip(body.timing, 20);
  const budget = clip(body.budget, 20);

  if (!firma || !delatnost || !ime || !kontakt) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const timingLabel = TIMING.find((t) => t.id === timing)?.label;
  const budgetLabel = BUDGET.find((b) => b.id === budget)?.label;
  if (!timingLabel || !budgetLabel) {
    return NextResponse.json({ error: "Invalid qualification" }, { status: 400 });
  }

  const client = db();
  let outcome: TrialOutcome = isSerious(timing) ? "trial" : "offer";

  if (client) {
    try {
      if (outcome === "trial" && (await takenThisWeek(client)) >= WEEKLY_SLOTS) outcome = "queued";

      const isEmail = kontakt.includes("@");
      const { error } = await client.from("leads").insert({
        name: ime,
        email: isEmail ? kontakt : null,
        phone: isEmail ? null : kontakt,
        company: firma,
        industry: delatnost.slice(0, 100),
        preferred_time: timingLabel,
        need: [`Probni sajt — ${usluga || "?"}`, `Kada: ${timingLabel}`, `Budžet: ${budgetLabel}`, link && `Link: ${link}`, `Delatnost: ${delatnost}`]
          .filter(Boolean)
          .join(" | "),
        locale: "sr",
        source: outcome === "trial" ? "trial" : outcome === "queued" ? "trial-queued" : "trial-offer",
      });
      if (error) throw error;
    } catch (e) {
      // Never lose the lead over a database hiccup — the email copy still goes out.
      console.error("Trial save error:", e);
    }
  }

  return NextResponse.json({ outcome });
}
