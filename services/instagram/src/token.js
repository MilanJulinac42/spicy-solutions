import { createClient } from "@supabase/supabase-js";

/**
 * Keeps the Instagram access token alive.
 *
 * Meta issues a long-lived token that expires after 60 days and then simply
 * stops working — no warning, no error until a message goes unanswered. That
 * failure would land on a paying client, so the token refreshes itself well
 * before the deadline.
 *
 * The refreshed value goes to the database rather than the environment:
 * Railway variables can't be written from code, so an in-memory or env-only
 * token would be lost on the next deploy and we'd be back on the original one.
 */

const SETTING_KEY = "ig_access_token";
const REFRESH_AFTER_DAYS = 45; // comfortably inside the 60-day window
const CHECK_EVERY = 12 * 60 * 60 * 1000;

let _db;
function db() {
  _db ??= createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  return _db;
}

/** Cached so every incoming message doesn't hit the database. */
let cached = null; // { token, updatedAt }

async function readStored() {
  const { data, error } = await db()
    .from("app_settings")
    .select("value, updated_at")
    .eq("key", SETTING_KEY)
    .maybeSingle();

  if (error) throw error;
  return data ? { token: data.value, updatedAt: new Date(data.updated_at) } : null;
}

async function store(token) {
  const updatedAt = new Date();
  const { error } = await db()
    .from("app_settings")
    .upsert({ key: SETTING_KEY, value: token, updated_at: updatedAt.toISOString() });
  if (error) throw error;
  cached = { token, updatedAt };
}

/**
 * Current token. Falls back to the environment when the database is
 * unreachable or the table hasn't been created — a lookup problem must not
 * take messaging down with it.
 */
export async function getAccessToken() {
  if (cached) return cached.token;

  try {
    const stored = await readStored();
    if (stored) {
      cached = stored;
      return stored.token;
    }
    // First run: adopt the token from the environment so refreshes have a base.
    if (process.env.IG_ACCESS_TOKEN) {
      await store(process.env.IG_ACCESS_TOKEN);
      return process.env.IG_ACCESS_TOKEN;
    }
  } catch (err) {
    console.error("token lookup failed, using env token:", err.message);
  }

  return process.env.IG_ACCESS_TOKEN;
}

function daysSince(date) {
  return (Date.now() - date.getTime()) / (24 * 60 * 60 * 1000);
}

/** Refreshes when the token is old enough. Safe to call as often as we like. */
export async function maybeRefresh() {
  try {
    const current = cached ?? (await readStored());
    if (!current) {
      await getAccessToken(); // seeds from env
      return { refreshed: false, reason: "seeded" };
    }

    const age = daysSince(current.updatedAt);
    if (age < REFRESH_AFTER_DAYS) {
      return { refreshed: false, reason: `star ${Math.floor(age)} dana` };
    }

    const url = new URL("https://graph.instagram.com/refresh_access_token");
    url.searchParams.set("grant_type", "ig_refresh_token");
    url.searchParams.set("access_token", current.token);

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`${res.status} ${(await res.text()).slice(0, 200)}`);
    }

    const data = await res.json();
    if (!data.access_token) throw new Error("odgovor bez access_token");

    await store(data.access_token);
    console.log(
      `token osvežen, važi još ~${Math.round((data.expires_in ?? 0) / 86400)} dana`
    );
    return { refreshed: true };
  } catch (err) {
    // Loud, because the consequence of missing this is a client's assistant
    // going silent two months from now with nothing in the logs.
    console.error("!!! OSVEŽAVANJE TOKENA NIJE USPELO:", err.message);
    return { refreshed: false, error: err.message };
  }
}

/** For the /token-status endpoint — lets us check without opening the database. */
export async function tokenStatus() {
  try {
    const current = cached ?? (await readStored());
    if (!current) return { source: "env", note: "još nije upisan u bazu" };
    const age = daysSince(current.updatedAt);
    return {
      source: "baza",
      poslednjeOsvezavanje: current.updatedAt.toISOString(),
      starostDana: Math.floor(age),
      istekZaDana: Math.max(0, Math.floor(60 - age)),
      osvezavaSeZaDana: Math.max(0, Math.ceil(REFRESH_AFTER_DAYS - age)),
    };
  } catch (err) {
    return { source: "env", greska: err.message };
  }
}

export function startRefreshLoop() {
  void maybeRefresh();
  setInterval(() => void maybeRefresh(), CHECK_EVERY);
}
