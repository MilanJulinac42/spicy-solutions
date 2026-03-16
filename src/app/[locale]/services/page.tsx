"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Globe,
  Building2,
  Brain,
  Workflow,
  Search,
  Palette,
  Code2,
  Rocket,
  CheckCircle2,
  TrendingDown,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { CTABanner } from "@/components/sections/CTABanner";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";
import { services } from "@/data/services";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

const serviceIcons = {
  websites: Globe,
  enterprise: Building2,
  ai: Brain,
  automation: Workflow,
};

const processSteps = [
  { icon: Search, step: "step1" },
  { icon: Palette, step: "step2" },
  { icon: Code2, step: "step3" },
  { icon: Rocket, step: "step4" },
];

export default function ServicesPage() {
  const t = useTranslations();

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <SectionHeading
            title={t("Services.title")}
            subtitle={t("Services.subtitle")}
          />
        </Container>
      </section>

      {/* Detailed Service Sections */}
      {services.map((service, index) => {
        const Icon = serviceIcons[service.id as keyof typeof serviceIcons];
        const isReversed = index % 2 !== 0;

        return (
          <section
            key={service.id}
            className={`py-16 md:py-20 ${index % 2 === 0 ? "" : "bg-surface-secondary"}`}
          >
            <Container>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isReversed ? "lg:direction-rtl" : ""}`}
              >
                {/* Content */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={isReversed ? fadeInRight : fadeInLeft}
                  className={isReversed ? "lg:order-2" : ""}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-spicy-400/10 text-spicy-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                      {t(`Services.${service.id}.title`)}
                    </h3>
                  </div>
                  <p className="text-foreground-muted leading-relaxed mb-6">
                    {t(`Services.${service.id}.description`)}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((featureKey) => (
                      <li
                        key={featureKey}
                        className="flex items-start gap-2 text-foreground-secondary"
                      >
                        <CheckCircle2 className="w-5 h-5 text-spicy-400 shrink-0 mt-0.5" />
                        <span>{t(featureKey)}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Pricing comparison callout */}
                  <div className="p-4 rounded-xl bg-spicy-400/5 border border-spicy-400/20 mb-6">
                    <div className="flex items-start gap-3">
                      <TrendingDown className="w-5 h-5 text-spicy-400 shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-foreground-secondary">
                        {t(`Services.${service.id}.comparison`)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </motion.div>

                {/* Visual */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={isReversed ? fadeInLeft : fadeInRight}
                  className={isReversed ? "lg:order-1" : ""}
                >
                  <div className="aspect-square max-w-md mx-auto rounded-2xl bg-gradient-to-br from-spicy-400/20 via-spicy-400/10 to-transparent border border-border-default flex items-center justify-center">
                    <Icon className="w-24 h-24 text-spicy-400/40" />
                  </div>
                </motion.div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* Process Section */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            title={t("Services.process.title")}
            subtitle={t("Services.process.subtitle")}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                variants={fadeInUp}
                className="relative text-center"
              >
                {/* Connector line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-border-default" />
                )}

                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-spicy-400/10 text-spicy-400 relative">
                  <step.icon className="w-7 h-7" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-spicy-400 text-white text-xs font-bold">
                    {index + 1}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {t(`Services.process.${step.step}.title`)}
                </h4>
                <p className="text-sm text-foreground-muted">
                  {t(`Services.process.${step.step}.description`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-surface-secondary">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("Services.cta.title")}
            </h2>
            <p className="text-lg text-foreground-muted mb-8">
              {t("Services.cta.subtitle")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-spicy-400 text-white rounded-lg text-base font-semibold hover:bg-spicy-500 transition-colors shadow-lg shadow-spicy-400/25"
            >
              {t("Services.cta.button")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
