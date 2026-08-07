import { db } from "./db.js";

/**
 * Connected Instagram accounts and their tokens.
 *
 * Replaces the single IG_ACCESS_TOKEN this service started with. A webhook says
 * which account it arrived for, and that decides both whose knowledge answers
 * the question and which token sends the reply — get it wrong and one client's
 * assistant answers another client's customer.
 *
 * Tokens live in the database rather than the environment: Meta's expire after
 * 60 days, the refreshed value has to survive a redeploy, and host variables
 * can't be written from code.
 */

const GRAPH = "https://graph.instagram.com";
const REFRESH_AFTER_DAYS = 45; // comfortably inside the 60-day window
const CHECK_EVERY = 12 * 60 * 60 * 1000;
const CACHE_TTL = 5 * 60 * 1000;

/** Cached so a busy thread doesn't hit the database per message. Short TTL so a
 *  newly connected account starts working without a restart. */
let cache = new Map();
let cachedAt = 0;

async function loadAll() {
  const { data, error } = await db()
    .from("ig_accounts")
    .select("ig_user_id, tenant_id, access_token, username, updated_at");

  if (error) throw error;

  cache = new Map(
    (data ?? []).map((row) => [
      String(row.ig_user_id),
      {
        igUserId: String(row.ig_user_id),
        tenantId: row.tenant_id,
        token: row.access_token,
        username: row.username,
        updatedAt: new Date(row.updated_at),
      },
    ])
  );
  cachedAt = Date.now();
  return cache;
}

async function accounts() {
  if (Date.now() - cachedAt > CACHE_TTL) await loadAll();
  return cache;
}

/**
 * The account a webhook arrived for.
 *
 * Falls back to the environment token while only one account exists — this
 * service ran single-tenant before, and a lookup problem must not take a live
 * assistant down with it.
 */
export async function accountFor(igUserId) {
  try {
    const found = (await accounts()).get(String(igUserId));
    if (found) return found;
  } catch (err) {
    console.error("account lookup failed:", err.message);
  }

  if (process.env.IG_ACCESS_TOKEN) {
    console.warn(`nalog ${igUserId} nije u bazi — koristim token iz okruženja`);
    return {
      igUserId: String(igUserId),
      tenantId: process.env.DEFAULT_TENANT ?? "solvera",
      token: process.env.IG_ACCESS_TOKEN,
      username: null,
      updatedAt: new Date(0),
    };
  }

  return null;
}

export async function saveAccount({ igUserId, tenantId, token, username }) {
  const { error } = await db().from("ig_accounts").upsert({
    ig_user_id: String(igUserId),
    tenant_id: tenantId,
    access_token: token,
    username: username ?? null,
    updated_at: new Date().toISOString(),
  });

  if (error) throw error;
  cachedAt = 0; // next read picks it up
}

/** Who a token belongs to. Also our check that a token actually works. */
export async function whoAmI(token) {
  const res = await fetch(`${GRAPH}/me?fields=id,username&access_token=${token}`);
  if (!res.ok) throw new Error(`/me: ${res.status} ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

/**
 * Meta only delivers messages for accounts subscribed to the `messages` field,
 * and subscribing is per account with that account's own token.
 *
 * This is the step that gets forgotten. Skip it and connecting looks like it
 * worked — the token is in the database, the client saw a success page — but no
 * webhook ever arrives and the assistant sits silent with nothing in the logs.
 */
export async function subscribeToMessages(token) {
  const res = await fetch(
    `${GRAPH}/v23.0/me/subscribed_apps?subscribed_fields=messages`,
    { method: "POST", headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) {
    throw new Error(`pretplata: ${res.status} ${(await res.text()).slice(0, 200)}`);
  }
  return res.json();
}

function daysSince(date) {
  return (Date.now() - date.getTime()) / (24 * 60 * 60 * 1000);
}

async function refreshOne(account) {
  const url = new URL(`${GRAPH}/refresh_access_token`);
  url.searchParams.set("grant_type", "ig_refresh_token");
  url.searchParams.set("access_token", account.token);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 200)}`);

  const data = await res.json();
  if (!data.access_token) throw new Error("odgovor bez access_token");

  await saveAccount({ ...account, token: data.access_token });
  return Math.round((data.expires_in ?? 0) / 86400);
}

/** Refreshes every account that is old enough. Safe to call as often as we like. */
export async function refreshAll() {
  const results = [];

  try {
    for (const account of (await loadAll()).values()) {
      const age = daysSince(account.updatedAt);
      if (age < REFRESH_AFTER_DAYS) continue;

      try {
        const days = await refreshOne(account);
        console.log(`token osvežen za ${account.username ?? account.igUserId}, važi još ~${days} dana`);
        results.push({ igUserId: account.igUserId, refreshed: true });
      } catch (err) {
        // Loud, because missing this means a client's assistant goes silent two
        // months from now with nothing pointing at why.
        console.error(
          `!!! OSVEŽAVANJE TOKENA NIJE USPELO za ${account.username ?? account.igUserId}:`,
          err.message
        );
        results.push({ igUserId: account.igUserId, refreshed: false, error: err.message });
      }
    }
  } catch (err) {
    console.error("!!! NE MOGU DA PROČITAM NALOGE:", err.message);
  }

  return results;
}

/**
 * Moves the original hand-made token into the accounts table on first boot.
 *
 * Without this the very account the service was built for would be the one
 * account it doesn't know about — it works through the fallback above, but
 * never gets refreshed and dies at day 60.
 */
export async function adoptEnvToken() {
  const token = process.env.IG_ACCESS_TOKEN;
  if (!token) return;

  try {
    if ((await loadAll()).size > 0) return;

    const me = await whoAmI(token);
    await saveAccount({
      igUserId: me.id,
      tenantId: process.env.DEFAULT_TENANT ?? "solvera",
      token,
      username: me.username,
    });
    console.log(`nalog ${me.username} (${me.id}) preuzet iz okruženja u bazu`);
  } catch (err) {
    console.error("preuzimanje tokena iz okruženja nije uspelo:", err.message);
  }
}

/** For /status — lets us see the state without opening the database. */
export async function accountsStatus() {
  try {
    const list = [...(await loadAll()).values()].map((a) => {
      const age = daysSince(a.updatedAt);
      return {
        nalog: a.username ?? a.igUserId,
        klijent: a.tenantId,
        starostTokenaDana: Math.floor(age),
        istekZaDana: Math.max(0, Math.floor(60 - age)),
        osvezavaSeZaDana: Math.max(0, Math.ceil(REFRESH_AFTER_DAYS - age)),
      };
    });
    return { izvor: "baza", broj: list.length, nalozi: list };
  } catch (err) {
    return { izvor: "okruženje", greska: err.message };
  }
}

export function startRefreshLoop() {
  void adoptEnvToken().then(() => refreshAll());
  setInterval(() => void refreshAll(), CHECK_EVERY);
}
