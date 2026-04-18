"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  AlertTriangle,
  TrendingDown,
  Clock,
  Lock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const problems = [
  { key: "p1", icon: Clock, hover: { rotate: -25 } },
  { key: "p2", icon: TrendingDown, hover: { x: [-2, 2, -2, 2, 0] } },
  { key: "p3", icon: AlertTriangle, hover: { rotate: [0, -8, 8, -6, 6, 0] } },
  { key: "p4", icon: Lock, hover: { y: [0, -2, 0, -2, 0] } },
];

const solutionPoints = ["point1", "point2", "point3", "point4"];

export function ProblemSection() {
  const t = useTranslations("ProblemSection");

  return (
    <section className="py-20 md:py-28 bg-surface-secondary">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        {/* Problems grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10"
        >
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.key}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative p-6 rounded-2xl bg-surface border border-border-default hover:border-red-400/40 hover:shadow-xl hover:shadow-red-500/10 transition-all overflow-hidden"
              >
                {/* Subtle red glow on hover */}
                <div className="pointer-events-none absolute -top-20 -right-20 w-48 h-48 rounded-full bg-red-500/0 group-hover:bg-red-500/10 blur-3xl transition-all duration-500" />

                <div className="relative flex items-start justify-between gap-3 mb-4">
                  <motion.div
                    whileHover={problem.hover}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-500/10 text-red-400 group-hover:bg-red-500/20 group-hover:text-red-300 transition-colors"
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-red-400/80 bg-red-500/5 border border-red-500/20 rounded-full px-3 py-1 mt-1">
                    {t(`problems.${problem.key}.stat`)}
                  </span>
                </div>

                <h3 className="relative text-lg font-semibold text-foreground mb-2">
                  {t(`problems.${problem.key}.title`)}
                </h3>
                <p className="relative text-sm text-foreground-muted leading-relaxed">
                  {t(`problems.${problem.key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* "Sounds familiar?" hook */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center text-base md:text-lg text-foreground-muted italic mb-10"
        >
          {t("soundsFamiliar")}
        </motion.p>

        {/* Solution area */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="relative p-8 md:p-10 rounded-2xl glass border-spicy-400/20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            {t("solution.title")}
          </h3>
          <ul className="space-y-4 mb-8">
            {solutionPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-foreground-secondary"
              >
                <CheckCircle2 className="w-5 h-5 text-spicy-400 shrink-0 mt-0.5" />
                <span>{t(`solution.${point}`)}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-spicy-400 text-white rounded-lg text-base font-semibold hover:bg-spicy-500 transition-all shadow-lg shadow-spicy-400/25 hover:shadow-xl hover:shadow-spicy-400/30"
            >
              {t("cta")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/zapocni-projekat"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-foreground rounded-lg text-base font-semibold border border-border-default hover:border-spicy-400/40 hover:text-spicy-400 transition-all"
            >
              {t("ctaSecondary")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
