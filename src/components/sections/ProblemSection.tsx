"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
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
  { key: "p1", icon: TrendingDown },
  { key: "p2", icon: Clock },
  { key: "p3", icon: AlertTriangle },
  { key: "p4", icon: Lock },
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
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16"
        >
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.key}
                variants={fadeInUp}
                className="group p-6 rounded-2xl bg-surface border border-border-default hover:border-red-400/30 hover:shadow-lg hover:shadow-red-500/10 transition-all"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-500/10 text-red-400 mb-4 group-hover:bg-red-500/20 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t(`problems.${problem.key}.title`)}
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {t(`problems.${problem.key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

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
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-spicy-400 text-white rounded-lg text-base font-semibold hover:bg-spicy-500 transition-all shadow-lg shadow-spicy-400/25 hover:shadow-xl hover:shadow-spicy-400/30"
          >
            {t("cta")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
