"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Shield, CheckCircle2, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const sections = ["section1", "section2", "section3", "section4", "section5"] as const;

const sectionItemCounts: Record<string, string[]> = {
  section1: ["i1", "i2", "i3", "i4"],
  section2: ["i1", "i2", "i3"],
  section4: ["i1", "i2", "i3", "i4"],
};

export default function PrivacyPage() {
  const t = useTranslations("Privacy");

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        </Container>
      </section>

      {/* Content */}
      <section className="pb-20 md:pb-28">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            {/* Last updated + intro */}
            <motion.div variants={fadeInUp} className="mb-12">
              <p className="text-sm text-foreground-muted mb-4">
                {t("lastUpdated")}
              </p>
              <p className="text-foreground-secondary leading-relaxed">
                {t("intro")}
              </p>
            </motion.div>

            {/* Section 1: What Data We Collect */}
            <motion.div variants={fadeInUp} className="mb-10">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-spicy-400/10 text-spicy-400 text-sm font-bold">
                  1
                </span>
                {t("section1.title")}
              </h3>
              <p className="text-foreground-muted leading-relaxed mb-4">
                {t("section1.p1")}
              </p>
              <ul className="space-y-2 mb-4">
                {sectionItemCounts.section1.map((key) => (
                  <li
                    key={key}
                    className="flex items-start gap-2 text-foreground-secondary"
                  >
                    <CheckCircle2 className="w-4 h-4 text-spicy-400 shrink-0 mt-1" />
                    <span className="text-sm">{t(`section1.items.${key}`)}</span>
                  </li>
                ))}
              </ul>
              <p className="text-foreground-muted leading-relaxed">
                {t("section1.p2")}
              </p>
            </motion.div>

            {/* Section 2: How We Use Your Data */}
            <motion.div variants={fadeInUp} className="mb-10">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-spicy-400/10 text-spicy-400 text-sm font-bold">
                  2
                </span>
                {t("section2.title")}
              </h3>
              <ul className="space-y-2 mb-4">
                {sectionItemCounts.section2.map((key) => (
                  <li
                    key={key}
                    className="flex items-start gap-2 text-foreground-secondary"
                  >
                    <CheckCircle2 className="w-4 h-4 text-spicy-400 shrink-0 mt-1" />
                    <span className="text-sm">{t(`section2.items.${key}`)}</span>
                  </li>
                ))}
              </ul>
              <p className="text-foreground-muted leading-relaxed italic">
                {t("section2.p1")}
              </p>
            </motion.div>

            {/* Section 3: Data Storage & Security */}
            <motion.div variants={fadeInUp} className="mb-10">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-spicy-400/10 text-spicy-400 text-sm font-bold">
                  3
                </span>
                {t("section3.title")}
              </h3>
              <p className="text-foreground-muted leading-relaxed mb-3">
                {t("section3.p1")}
              </p>
              <p className="text-foreground-muted leading-relaxed">
                {t("section3.p2")}
              </p>
            </motion.div>

            {/* Section 4: Your Rights */}
            <motion.div variants={fadeInUp} className="mb-10">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-spicy-400/10 text-spicy-400 text-sm font-bold">
                  4
                </span>
                {t("section4.title")}
              </h3>
              <p className="text-foreground-muted leading-relaxed mb-4">
                {t("section4.p1")}
              </p>
              <ul className="space-y-2 mb-4">
                {sectionItemCounts.section4.map((key) => (
                  <li
                    key={key}
                    className="flex items-start gap-2 text-foreground-secondary"
                  >
                    <CheckCircle2 className="w-4 h-4 text-spicy-400 shrink-0 mt-1" />
                    <span className="text-sm">{t(`section4.items.${key}`)}</span>
                  </li>
                ))}
              </ul>
              <p className="text-foreground-muted leading-relaxed">
                {t("section4.p2")}
              </p>
            </motion.div>

            {/* Section 5: Contact */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-spicy-400/10 text-spicy-400 text-sm font-bold">
                  5
                </span>
                {t("section5.title")}
              </h3>
              <p className="text-foreground-muted leading-relaxed mb-4">
                {t("section5.p1")}
              </p>
              <div className="p-6 rounded-2xl glass">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-spicy-400" />
                  <span className="font-semibold text-foreground">
                    {t("section5.company")}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-foreground-muted">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-spicy-400 shrink-0" />
                    <span>{t("section5.address")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-spicy-400 shrink-0" />
                    <a
                      href={`mailto:${t("section5.email")}`}
                      className="hover:text-spicy-400 transition-colors"
                    >
                      {t("section5.email")}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
