"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileSignature, LifeBuoy, MessageSquareReply, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const POINTS = [
  { key: "contract", icon: FileSignature },
  { key: "support", icon: LifeBuoy },
  { key: "reply", icon: MessageSquareReply },
  { key: "data", icon: ShieldCheck },
] as const;

/**
 * The site sells "you work directly with me", so the person has to be on the
 * home page — the old trust section was four icon cards and no face.
 */
export function HomeAbout() {
  const t = useTranslations("Home.about");

  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">
          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="rounded-[2rem] p-[2px]" style={{ background: "var(--metal-champagne)" }}>
              <div className="relative overflow-hidden rounded-[calc(2rem-2px)] bg-surface-secondary aspect-[4/5]">
                <Image
                  src="/team/milan.jpg"
                  alt={t("photoAlt")}
                  fill
                  sizes="(max-width: 1024px) 90vw, 440px"
                  className="object-cover object-top"
                  style={{ filter: "contrast(1.05) brightness(0.95)" }}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                <figcaption className="absolute bottom-5 left-6">
                  <span className="block text-lg font-semibold text-white">{t("name")}</span>
                  <span className="block text-sm text-white/70">{t("role")}</span>
                </figcaption>
              </div>
            </div>
          </motion.figure>

          <div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-spicy-300">
                {t("eyebrow")}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[2.9rem] font-semibold leading-[1.1] text-foreground text-balance">
                {t("title")}{" "}
                <em className="accent-serif text-metal">{t("accent")}</em>
              </h2>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-foreground-muted text-pretty max-w-xl">
                {t("body")}
              </p>
            </motion.div>

            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-7"
            >
              {POINTS.map(({ key, icon: Icon }) => (
                <motion.li key={key} variants={fadeInUp} className="flex gap-4">
                  <span className="medallion h-10 w-10 shrink-0 rounded-xl flex items-center justify-center">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-foreground">
                      {t(`points.${key}.title`)}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-foreground-muted">
                      {t(`points.${key}.body`)}
                    </span>
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <Link
              href="/o-solveri"
              className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors"
            >
              {t("more")}
              <ArrowRight className="h-4 w-4 text-spicy-300 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
