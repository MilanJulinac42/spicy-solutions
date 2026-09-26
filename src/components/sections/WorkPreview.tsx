"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { PROJECTS } from "./Work";

/**
 * Home-page version of the portfolio: one screenshot per project, all the same
 * size, so the section is scannable. The full write-ups live on /radovi.
 */
export function WorkPreview() {
  const t = useTranslations("Home.work");

  return (
    <section className="py-24 md:py-32 border-t border-border-default bg-surface-secondary">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            accent={t("accent")}
            subtitle={t("subtitle")}
            centered={false}
            className="!mb-0 max-w-2xl"
          />
          <Link
            href="/radovi"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors"
          >
            {t("all")}
            <ArrowRight className="h-4 w-4 text-spicy-300 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {PROJECTS.map((p) => {
            const cover = p.images[p.cover ?? 0];
            return (
            <motion.article key={p.name} variants={fadeInUp} className="card-matte group flex flex-col overflow-hidden rounded-3xl">
              {/* Screenshots are ~1900×960 — the box matches, so nothing is cropped. */}
              <div className="relative aspect-[1900/960] overflow-hidden border-b border-border-default bg-surface">
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-muted">{p.kind}</p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted line-clamp-3">{p.summary}</p>
                {p.duration && (
                  <p className="mt-4 text-xs text-foreground-secondary">
                    Urađeno za <span className="font-semibold text-foreground">{p.duration}</span>
                  </p>
                )}
                {p.href && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto pt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-spicy-200 hover:text-spicy-100 transition-colors"
                  >
                    {t("live")}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
