"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { siteConfig } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

const WHATSAPP_URL = `https://wa.me/${siteConfig.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Zdravo! Interesuje me besplatna konsultacija."
)}`;

/**
 * Closing call to action. A matte panel with a metal edge rather than a
 * full-bleed colour band — it has to feel like the rest of the page, only
 * brighter, not like a different site.
 */
export function CTABanner() {
  const t = useTranslations("Home.cta");

  return (
    <section className="pt-4 pb-24 md:pb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2.25rem] p-px"
          style={{ background: "linear-gradient(135deg, rgba(214,186,140,0.55), rgba(255,255,255,0.06) 40%, rgba(214,186,140,0.25))" }}
        >
          <div
            className="relative overflow-hidden rounded-[calc(2.25rem-1px)] px-6 py-16 md:px-16 md:py-20 text-center"
            style={{
              background:
                "radial-gradient(700px 300px at 50% 0%, rgba(214,186,140,0.12), transparent 70%), linear-gradient(180deg, #1B1B1F 0%, #151518 100%)",
            }}
          >
            <h2 className="mx-auto max-w-3xl text-3xl md:text-5xl font-semibold leading-[1.1] text-foreground text-balance">
              {t("title")} <em className="accent-serif text-metal-sheen">{t("accent")}</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base md:text-lg leading-relaxed text-foreground-muted text-pretty">
              {t("subtitle")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/probni-sajt"
                onClick={() =>
                  trackEvent("cta_click", { cta_location: "cta_banner", cta_label: "trial", destination: "/probni-sajt" })
                }
                className="btn-metal group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold"
              >
                {t("primary")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("contact_click", { channel: "whatsapp", cta_location: "cta_banner" })}
                className="btn-matte w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold"
              >
                <SiWhatsapp className="w-4 h-4 text-spicy-300" />
                {t("whatsapp")}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
