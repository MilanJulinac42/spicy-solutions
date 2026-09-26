"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Globe, LayoutDashboard, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

// Three equal offers. AI is one of them, not the headline — the business
// sells whatever a client actually needs.
const SERVICES = [
  { key: "websites", href: "/usluge/websites", icon: Globe },
  { key: "enterprise", href: "/usluge/enterprise", icon: LayoutDashboard },
  { key: "ai", href: "/usluge", icon: Sparkles },
] as const;

export function HomeServices() {
  const t = useTranslations("Home.services");

  return (
    <section id="usluge" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          accent={t("accent")}
          subtitle={t("subtitle")}
          centered={false}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5"
        >
          {SERVICES.map(({ key, href, icon: Icon }) => {
            const bullets = t.raw(`items.${key}.bullets`) as string[];
            return (
              <motion.div key={key} variants={fadeInUp}>
                <Link
                  href={href}
                  className="card-matte group relative flex h-full flex-col rounded-3xl p-7 lg:p-8 transition-colors hover:border-[#3C3A38]"
                >
                  <div className="flex items-center justify-between">
                    <span className="medallion h-12 w-12 rounded-2xl flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full border border-border-default px-3 py-1 text-xs font-medium text-foreground-secondary">
                      {t(`items.${key}.tag`)}
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl lg:text-[1.35rem] font-semibold text-foreground">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted text-pretty">
                    {t(`items.${key}.lead`)}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-foreground-secondary">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-spicy-300" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <div className="hairline-metal mb-6" />
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-xs text-foreground-muted">{t("from")}</p>
                        <p className="text-3xl font-semibold text-metal leading-none mt-1">
                          {t(`items.${key}.price`)}
                        </p>
                        <p className="mt-2 text-xs text-foreground-muted">
                          {t("upkeep")} {t(`items.${key}.upkeep`)}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground-secondary transition-colors group-hover:text-spicy-200">
                        {t("more")}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
