// Lightweight wrapper around GA4 (gtag.js) — loaded in src/app/layout.tsx.
// Safe to call before gtag is ready (no-op if not present, e.g. ad-blocker
// or pre-hydration). Call sites stay tiny: trackEvent("cta_click", { label }).

type GtagFn = (
  command: "event" | "config" | "set" | "consent",
  action: string,
  params?: Record<string, unknown>
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

export const GA_ID = "G-WDNDKK0PBT";

/**
 * Fire a GA4 event. No-op if gtag isn't loaded yet (ad-blocker, SSR, etc.).
 *
 * Use GA4-recommended event names where possible:
 *   - generate_lead   (form submitted successfully)
 *   - form_start      (user focuses first field)
 *   - sign_up         (account created)
 *   - select_content  (CTA / link click)
 *
 * For our own events we prefix with `solvera_` to keep them grouped in GA4.
 */
export function trackEvent(
  name: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/** Manual pageview — GA4 already auto-tracks, but Next.js SPA navigations
 * sometimes need a nudge if the script loads after hydration. */
export function trackPageview(url: string): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("config", GA_ID, { page_path: url });
}
