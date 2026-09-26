"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const STEPS = ["s1", "s2", "s3"] as const;

export function HomeSteps() {
  const t = useTranslations("Home.steps");

  return (
    <section className="py-24 md:py-32 border-t border-border-default bg-surface-secondary">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            accent={t("accent")}
            centered={false}
            className="!mb-0 max-w-2xl"
          />
          <Link
            href="/proces"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors"
          >
            {t("more")}
            <ArrowRight className="h-4 w-4 text-spicy-300 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8"
        >
          {STEPS.map((k, i) => (
            <motion.li key={k} variants={fadeInUp} className="relative">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-semibold text-metal leading-none tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {i < STEPS.length - 1 && (
                  <span aria-hidden="true" className="hidden md:block hairline-metal flex-1" />
                )}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">{t(`items.${k}.title`)}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-foreground-muted text-pretty max-w-sm">
                {t(`items.${k}.body`)}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}
