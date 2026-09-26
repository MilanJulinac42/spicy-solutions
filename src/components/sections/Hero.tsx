"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Globe, LayoutDashboard, MessageSquare } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const ease = [0.22, 1, 0.36, 1] as const;

function Label({ icon: Icon, children }: { icon: typeof Globe; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-spicy-700/60 bg-[#141416]/90 px-2.5 py-1 text-[11px] font-semibold text-spicy-200 backdrop-blur">
      <Icon className="h-3 w-3" />
      {children}
    </span>
  );
}

/**
 * All three things Solvera makes, shown with real work: a client's live site,
 * the admin panel of a system built for them, and an AI assistant reply.
 * Screenshots over mock-ups — they are the proof.
 */
function HeroCollage() {
  const t = useTranslations("Hero.collage");

  return (
    <div className="relative mx-auto w-full max-w-[600px] pb-16 sm:pb-20">
      {/* Website in a matte browser frame */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.2 }}
        className="card-matte relative overflow-hidden rounded-2xl"
      >
        <div className="flex items-center gap-1.5 border-b border-border-default px-4 py-3">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#3A3A40]" />
          ))}
          <span className="ml-3 h-5 flex-1 max-w-[220px] rounded-full bg-[#232327] px-3 text-[10px] leading-5 text-foreground-muted">
            spikoedu.rs
          </span>
        </div>
        <div className="relative aspect-[1886/961]">
          <Image
            src="/radovi/spiko-edu.png"
            alt="Sajt škole jezika Spiko Edu"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 600px"
            className="object-cover object-top"
          />
        </div>
        <div className="absolute left-4 top-14">
          <Label icon={Globe}>{t("site")}</Label>
        </div>
      </motion.div>

      {/* Business system, overlapping bottom-left */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.45 }}
        className="card-matte absolute bottom-0 -left-3 sm:-left-10 w-[58%] overflow-hidden rounded-xl shadow-2xl shadow-black/60"
      >
        <div className="relative aspect-[1910/978]">
          <Image
            src="/radovi/admin.png"
            alt="Administratorski panel platforme Spiko Edu"
            fill
            sizes="(max-width: 1024px) 55vw, 350px"
            className="object-cover object-top"
          />
        </div>
        <div className="absolute left-3 top-3">
          <Label icon={LayoutDashboard}>{t("system")}</Label>
        </div>
      </motion.div>

      {/* AI assistant reply, bottom-right */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.7 }}
        className="card-matte absolute bottom-3 -right-2 sm:-right-8 w-[46%] min-w-[200px] rounded-2xl p-3.5 shadow-2xl shadow-black/60"
      >
        <Label icon={MessageSquare}>{t("ai")}</Label>
        <div className="mt-3 flex flex-col gap-2">
          <span className="self-end max-w-[90%] rounded-2xl rounded-br-md bg-[#2A2A30] px-3 py-2 text-[12px] leading-snug text-foreground">
            {t("q")}
          </span>
          <span
            className="self-start max-w-[92%] rounded-2xl rounded-bl-md px-3 py-2 text-[12px] leading-snug text-ink"
            style={{ background: "var(--metal-champagne-soft)" }}
          >
            {t("a")}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative overflow-hidden">
      {/* Soft metallic light from the top-right — the only atmosphere. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 520px at 78% 18%, rgba(214,186,140,0.10), transparent 60%), radial-gradient(700px 420px at 10% 90%, rgba(255,255,255,0.03), transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-14 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-2 rounded-full border border-border-default bg-surface-secondary/80 px-3.5 py-1.5 text-xs font-medium text-foreground-secondary"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--metal-champagne)" }} />
              {t("eyebrow")}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.05 }}
              className="mt-7 text-[2.6rem] leading-[1.05] sm:text-6xl xl:text-[4.5rem] font-semibold text-foreground text-balance"
            >
              {t("title")}{" "}
              <em className="accent-serif text-metal-sheen block mt-1 text-[1.08em]">
                {t("titleHighlight")}
              </em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.15 }}
              className="mt-7 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-foreground-muted leading-relaxed text-pretty"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.25 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
            >
              <Link
                href="/kontakt"
                onClick={() =>
                  trackEvent("cta_click", {
                    cta_location: "hero",
                    cta_label: "kontakt_primary",
                    destination: "/kontakt",
                  })
                }
                className="btn-metal group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold"
              >
                {t("cta")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/radovi"
                onClick={() =>
                  trackEvent("cta_click", {
                    cta_location: "hero",
                    cta_label: "work_secondary",
                    destination: "/radovi",
                  })
                }
                className="btn-matte w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold"
              >
                {t("ctaWork")}
              </Link>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3"
            >
              {(["price", "time", "direct"] as const).map((k) => (
                <li key={k} className="inline-flex items-center gap-2 text-sm text-foreground-secondary">
                  <Check className="w-4 h-4 text-spicy-300" />
                  {t(`facts.${k}`)}
                </li>
              ))}
            </motion.ul>
          </div>

          <div className="relative px-2 sm:px-8 lg:px-0">
            <HeroCollage />
          </div>
        </div>
      </div>
    </section>
  );
}
