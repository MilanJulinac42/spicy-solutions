"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FileText, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const sections = [
  "section1",
  "section2",
  "section3",
  "section4",
  "section5",
  "section6",
  "section7",
  "section8",
] as const;

export default function TermsPage() {
  const t = useTranslations("Terms");

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

            {/* Sections 1-7: Text-only sections */}
            {sections.slice(0, 7).map((section, index) => (
              <motion.div key={section} variants={fadeInUp} className="mb-10">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-spicy-400/10 text-spicy-400 text-sm font-bold">
                    {index + 1}
                  </span>
                  {t(`${section}.title`)}
                </h3>
                <p className="text-foreground-muted leading-relaxed">
                  {t(`${section}.p1`)}
                </p>
                {/* Some sections have p2 */}
                {(section === "section2" ||
                  section === "section3" ||
                  section === "section4" ||
                  section === "section5" ||
                  section === "section6") && (
                  <p className="text-foreground-muted leading-relaxed mt-3">
                    {t(`${section}.p2`)}
                  </p>
                )}
              </motion.div>
            ))}

            {/* Section 8: Contact */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-spicy-400/10 text-spicy-400 text-sm font-bold">
                  8
                </span>
                {t("section8.title")}
              </h3>
              <p className="text-foreground-muted leading-relaxed mb-4">
                {t("section8.p1")}
              </p>
              <div className="p-6 rounded-2xl glass">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-spicy-400" />
                  <span className="font-semibold text-foreground">
                    {t("section8.company")}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-foreground-muted">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-spicy-400 shrink-0" />
                    <span>{t("section8.address")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-spicy-400 shrink-0" />
                    <a
                      href={`mailto:${t("section8.email")}`}
                      className="hover:text-spicy-400 transition-colors"
                    >
                      {t("section8.email")}
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
