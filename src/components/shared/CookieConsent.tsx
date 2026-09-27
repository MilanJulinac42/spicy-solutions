"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import { GA_ID } from "@/lib/analytics";

/**
 * Analytics consent via Google Consent Mode v2 (advanced). gtag loads for
 * everyone, but starts with every storage type denied: until the visitor
 * accepts, no cookies are set and Google only receives cookieless pings
 * (page viewed, form sent) that it uses for aggregate modelling. That keeps
 * lead conversions countable for Google Ads without tracking anyone who said
 * no. Accepting upgrades consent in place; declining leaves it denied.
 *
 * The choice is remembered so the banner asks once, and can be changed later
 * from the privacy policy.
 */

const STORAGE_KEY = "solvera-cookie-consent";

type Choice = "accepted" | "declined";

const GRANTED = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
};
const DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
};

export function CookieConsent() {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [decided, setDecided] = useState(false); // avoids a flash before we read storage

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "accepted" || stored === "declined") setChoice(stored);
    } catch {
      /* private mode — behave as undecided */
    }
    setDecided(true);
  }, []);

  // Let the privacy policy reopen this without a page reload.
  useEffect(() => {
    function reopen() {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
      setChoice(null);
    }
    window.addEventListener("solvera:open-cookie-settings", reopen);
    return () => window.removeEventListener("solvera:open-cookie-settings", reopen);
  }, []);

  function decide(next: Choice) {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    window.gtag?.("consent", "update", next === "accepted" ? GRANTED : DENIED);
    setChoice(next);
  }

  return (
    <>
      {/* Consent defaults are set in the same script, before config, from the
          stored choice — so a returning visitor who accepted is measured fully
          from the first hit, and nobody is ever measured with cookies before
          saying yes. */}
      <Script id="google-consent" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          var accepted = false;
          try { accepted = localStorage.getItem('${STORAGE_KEY}') === 'accepted'; } catch (e) {}
          gtag('consent', 'default', Object.assign(
            accepted ? ${JSON.stringify(GRANTED)} : ${JSON.stringify(DENIED)},
            { wait_for_update: 500 }
          ));
          gtag('set', 'ads_data_redaction', true);
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false, anonymize_ip: true });
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      <AnimatePresence>
        {decided && choice === null && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            role="dialog"
            aria-label="Saglasnost za kolačiće"
            className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-2xl border border-border-default bg-surface-elevated p-4 shadow-2xl md:inset-x-6 md:bottom-6 md:p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex flex-1 items-start gap-3">
                <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-spicy-300" />
                <p className="text-sm leading-relaxed text-foreground-muted">
                  Uz vašu saglasnost koristim Google kolačiće da vidim koliko ljudi
                  poseti sajt i odakle dolaze upiti. Bez toga sajt radi isto.{" "}
                  <Link
                    href="/politika-privatnosti"
                    className="text-foreground underline decoration-border-default underline-offset-2 hover:decoration-spicy-400"
                  >
                    Detaljnije
                  </Link>
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => decide("declined")}
                  className="btn-matte flex-1 rounded-full px-4 py-2.5 text-sm font-medium sm:flex-none"
                >
                  Ne, hvala
                </button>
                <button
                  onClick={() => decide("accepted")}
                  className="btn-metal flex-1 rounded-full px-4 py-2.5 text-sm font-semibold sm:flex-none"
                >
                  Prihvatam
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
