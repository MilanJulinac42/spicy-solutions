"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Building2,
  MessageSquare,
  Phone,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/sections/CTABanner";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { services } from "@/data/services";
import { ServiceIllustration } from "@/components/features/ServiceIllustration";

const serviceIcons: Record<string, typeof Globe> = {
  websites: Globe,
  enterprise: Building2,
  chatbot: MessageSquare,
  voice: Phone,
  aiIntegrations: Sparkles,
};

const processSteps = ["step1", "step2", "step3", "step4"] as const;

export default function ServicesPage() {
  const t = useTranslations();

  return (
    <>
      {/* Page header */}
      <section className="relative pt-32 pb-2 md:pt-40 md:pb-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(900px 420px at 70% 0%, rgba(214,186,140,0.08), transparent 65%)" }}
        />
        <Container className="relative">
          <SectionHeading
            as="h1"
            eyebrow={t("Services.eyebrow")}
            title={t("Services.title")}
            accent={t("Services.titleAccent")}
            subtitle={t("Services.subtitle")}
            centered={false}
            className="!mb-10"
          />

          {/* Jump links — five services is a long page. */}
          <nav aria-label={t("Services.title")} className="flex flex-wrap gap-2">
            {services.map((s) => {
              const Icon = serviceIcons[s.id];
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="btn-matte inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                >
                  <Icon className="h-4 w-4 text-spicy-300" />
                  {t(`Services.${s.id}.title`)}
                </a>
              );
            })}
          </nav>
        </Container>
      </section>

      {/* One block per service */}
      <div className="pb-8 md:pb-12">
        {services.map((service, index) => {
          const Icon = serviceIcons[service.id];
          const isReversed = index % 2 !== 0;

          return (
            <section key={service.id} id={service.id} className="scroll-mt-24 py-10 md:py-14">
              <Container>
                <div className="card-matte rounded-[2rem] p-6 md:p-10 lg:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.15 }}
                      variants={fadeInUp}
                      className={isReversed ? "lg:order-2" : ""}
                    >
                      <span className="medallion h-12 w-12 rounded-2xl flex items-center justify-center">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h2 className="mt-6 text-2xl md:text-3xl font-semibold text-foreground">
                        {t(`Services.${service.id}.title`)}
                      </h2>
                      <p className="mt-4 text-[15px] md:text-base leading-relaxed text-foreground-muted text-pretty">
                        {t(`Services.${service.id}.description`)}
                      </p>

                      <ul className="mt-6 space-y-3">
                        {service.features.map((featureKey) => (
                          <li key={featureKey} className="flex items-start gap-3 text-[15px] text-foreground-secondary">
                            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-spicy-300" />
                            <span>{t(featureKey)}</span>
                          </li>
                        ))}
                      </ul>

                      <p className="mt-6 border-l border-spicy-700 pl-4 text-sm leading-relaxed text-foreground-secondary italic">
                        {t(`Services.${service.id}.comparison`)}
                      </p>

                      <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-border-default pt-6">
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-foreground-muted">
                            {t("Services.priceLabel")}
                          </p>
                          <p className="mt-1.5 text-[15px] font-semibold text-spicy-200">
                            {t(`ServicesOverview.${service.id}.price`)}
                          </p>
                        </div>
                        <Link
                          href={`/usluge/${service.id}`}
                          className="btn-matte group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
                        >
                          {t("Services.learnMore")}
                          <ArrowRight className="h-4 w-4 text-spicy-300 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </motion.div>

                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.15 }}
                      variants={fadeInUp}
                      className={isReversed ? "lg:order-1" : ""}
                    >
                      <ServiceIllustration serviceId={service.id} />
                    </motion.div>
                  </div>
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      {/* Process */}
      <section className="py-24 md:py-32 border-t border-border-default bg-surface-secondary">
        <Container>
          <SectionHeading
            title={t("Services.process.title")}
            accent={t("Services.process.titleAccent")}
            subtitle={t("Services.process.subtitle")}
            centered={false}
          />
          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
          >
            {processSteps.map((step, i) => (
              <motion.li key={step} variants={fadeInUp}>
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-semibold text-metal leading-none tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i < processSteps.length - 1 && (
                    <span aria-hidden="true" className="hidden lg:block hairline-metal flex-1" />
                  )}
                </div>
                <h3 className="mt-6 text-lg font-semibold text-foreground">
                  {t(`Services.process.${step}.title`)}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-foreground-muted text-pretty">
                  {t(`Services.process.${step}.description`)}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </Container>
      </section>

      <div className="pt-24 md:pt-32">
        <CTABanner />
      </div>
    </>
  );
}
