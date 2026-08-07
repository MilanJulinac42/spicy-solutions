import { createClient } from "@supabase/supabase-js";

/**
 * One database client for the whole service.
 *
 * Built on first use rather than at import: a bad SUPABASE_URL would otherwise
 * crash the process at boot, and on a host that reads as a total outage — the
 * webhook can't even answer Meta's verification handshake — instead of what it
 * actually is, a failed lookup.
 */
let client;

export function db() {
  client ??= createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  return client;
}
