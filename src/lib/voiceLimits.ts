import crypto from "crypto";
import { supabase } from "./db";

/**
 * Spend protection for the voice demo.
 *
 * In-memory counters can't be trusted here: on serverless each request may hit
 * a fresh instance, so a per-process Map silently resets and lets an abuser
 * straight through. These checks live in the database so every instance sees
 * the same numbers, with the in-memory pass kept only as a cheap first filter.
 *
 * The daily cap is the important one — per-IP limits do nothing against rotated
 * addresses, and voice minutes are the expensive part of the site.
 */

export const PER_IP_PER_HOUR = 3;
export const PER_DAY_TOTAL = 50;

/** IPs are personal data; only a hash is stored, which is all counting needs. */
function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(`solvera:${ip}`).digest("hex").slice(0, 64);
}

// Cheap first pass — catches repeat hits landing on the same warm instance.
const recent = new Map<string, number[]>();

function memoryAllows(ipHash: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ipHash) ?? []).filter((t) => now - t < 60 * 60 * 1000);
  hits.push(now);
  recent.set(ipHash, hits);
  if (recent.size > 5000) recent.clear(); // bounded; it's only a hint
  return hits.length <= PER_IP_PER_HOUR;
}

export type LimitResult = { allowed: true } | { allowed: false; reason: string };

export async function checkVoiceLimits(ip: string): Promise<LimitResult> {
  const ipHash = hashIp(ip);

  if (!memoryAllows(ipHash)) {
    return {
      allowed: false,
      reason: "Iskoristili ste demo razgovore za ovaj sat. Pokušajte kasnije.",
    };
  }

  const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  try {
    const [perIp, perDay] = await Promise.all([
      supabase
        .from("voice_sessions")
        .select("id", { count: "exact", head: true })
        .eq("ip_hash", ipHash)
        .gte("created_at", hourAgo),
      supabase
        .from("voice_sessions")
        .select("id", { count: "exact", head: true })
        .gte("created_at", dayAgo),
    ]);

    // A missing table or an unreachable database must not open the floodgates,
    // but it also shouldn't break the demo — the in-memory pass above still
    // applies, and the provider-side budget cap is the real backstop.
    if (perIp.error || perDay.error) return { allowed: true };

    if ((perIp.count ?? 0) >= PER_IP_PER_HOUR) {
      return {
        allowed: false,
        reason: "Iskoristili ste demo razgovore za ovaj sat. Pokušajte kasnije.",
      };
    }

    if ((perDay.count ?? 0) >= PER_DAY_TOTAL) {
      return {
        allowed: false,
        reason:
          "Demo je danas dostigao dnevni limit. Javite se na info@solveradev.rs i rado ću vam pustiti demo uživo.",
      };
    }

    return { allowed: true };
  } catch {
    return { allowed: true };
  }
}

/** Records a started session. Failure here must never block the call. */
export async function recordVoiceSession(ip: string): Promise<void> {
  try {
    await supabase.from("voice_sessions").insert({ ip_hash: hashIp(ip) });
  } catch {
    /* logging is best effort */
  }
}
