"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Building2,
  Phone,
  ArrowRight,
  ChevronDown,
  Monitor,
  ShoppingCart,
  LayoutDashboard,
  FileText,
  Smartphone,
  Search,
  Zap,
  PenTool,
  Code2,
  Shield,
  BarChart3,
  Users,
  GitBranch,
  BookOpen,
  MessageSquare,
  Database,
  Bot,
  Cpu,
  Link2,
  RefreshCw,
  Clock,
  Bell,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/sections/CTABanner";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { services } from "@/data/services";
import { ServiceIllustration } from "@/components/features/ServiceIllustration";
import { ChatDemoCTA } from "@/components/sections/ChatDemoCTA";
import { ChatbotPricing } from "@/components/sections/ChatbotPricing";
import { VoiceDemoBooking } from "@/components/sections/VoiceDemoBooking";
import { VoiceDemo } from "@/components/voice/VoiceDemo";
import { Work } from "@/components/sections/Work";
import Link from "next/link";
import { notFound } from "next/navigation";

const serviceIcons: Record<string, React.ElementType> = {
  websites: Globe,
  enterprise: Building2,
  chatbot: MessageSquare,
  voice: Phone,
  aiIntegrations: Sparkles,
};

const featureIconsMap: Record<string, React.ElementType[]> = {
  chatbot: [Database, Users, Globe, Zap, BarChart3],
  voice: [Bot, Phone, MessageSquare, Link2, FileText],
  aiIntegrations: [FileText, GitBranch, Clock, Cpu, Link2],
  websites: [Smartphone, Search, Zap, PenTool, Code2],
  enterprise: [GitBranch, BarChart3, Shield, RefreshCw, BookOpen],
};

const exampleIconsMap: Record<string, React.ElementType[]> = {
  chatbot: [MessageSquare, Bot, ShoppingCart, BookOpen],
  voice: [Phone, Clock, Bell, Users],
  aiIntegrations: [FileText, MessageSquare, Clock, Cpu],
  websites: [Monitor, ShoppingCart, LayoutDashboard, FileText],
  enterprise: [Building2, LayoutDashboard, BarChart3, Globe],
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const t = useTranslations();

  const service = services.find((s) => s.id === slug);
  if (!service) notFound();

  const Icon = serviceIcons[slug] || Globe;
  const others = services.filter((s) => s.id !== slug);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(900px 480px at 80% 10%, rgba(214,186,140,0.09), transparent 62%)" }}
        />
        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <Link
                href="/usluge"
                className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
              >
                <ArrowRight className="h-4 w-4 rotate-180 text-spicy-300" />
                {t("Services.title")}
              </Link>
              <div className="mt-8 flex items-center gap-4">
                <span className="medallion h-12 w-12 rounded-2xl flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <h1 className="mt-6 text-4xl md:text-5xl lg:text-[3.4rem] font-semibold leading-[1.05] text-foreground text-balance">
                {t(`Services.${slug}.title`)}
              </h1>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-foreground-muted text-pretty max-w-xl">
                {t(`Services.${slug}.detail.extendedDescription`)}
              </p>
              <p className="mt-6 inline-flex rounded-full border border-border-default px-4 py-2 text-sm font-semibold text-spicy-200">
                {t(`ServicesOverview.${slug}.price`)}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/kontakt"
                  className="btn-metal group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold"
                >
                  {t(`Services.${slug}.detail.ctaText`)}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/zapocni-projekat"
                  className="btn-matte inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold"
                >
                  {t("Navbar.calculator")}
                </Link>
              </div>
            </motion.div>

            <motion.div
              id={slug === "voice" ? "demo" : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.15 }}
              className={slug === "voice" ? "scroll-mt-28" : undefined}
            >
              {/* The voice page shows the real agent here rather than a mocked
                  call: it's the same space, but proof instead of illustration. */}
              {slug === "voice" ? <VoiceDemo /> : <ServiceIllustration serviceId={slug} />}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Live chatbot demo — only on the chatbot service page */}
      {slug === "chatbot" && (
        <section className="pb-8">
          <Container>
            <ChatDemoCTA />
          </Container>
        </section>
      )}

      {/* What you get */}
      <section className="py-24 md:py-28 border-t border-border-default">
        <Container>
          <SectionHeading
            eyebrow={t("Services.featuresHeading")}
            title={t(`Services.${slug}.description`)}
            centered={false}
            className="[&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:lg:text-[2.1rem] [&_h2]:leading-snug max-w-4xl"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {service.features.map((featureKey, index) => {
              const featureIcons = featureIconsMap[slug] || featureIconsMap.websites;
              const FeatureIcon = featureIcons[index] || Globe;
              return (
                <motion.div key={featureKey} variants={fadeInUp} className="card-matte rounded-3xl p-6">
                  <span className="medallion h-10 w-10 rounded-xl flex items-center justify-center">
                    <FeatureIcon className="h-[18px] w-[18px]" />
                  </span>
                  <p className="mt-5 text-[15px] font-medium leading-relaxed text-foreground">{t(featureKey)}</p>
                </motion.div>
              );
            })}
            <motion.div
              variants={fadeInUp}
              className="rounded-3xl p-px"
              style={{ background: "linear-gradient(135deg, rgba(214,186,140,0.5), rgba(255,255,255,0.05) 50%, rgba(214,186,140,0.2))" }}
            >
              <div className="h-full rounded-[calc(1.5rem-1px)] bg-surface-secondary p-6 flex items-center">
                <p className="text-[15px] leading-relaxed text-foreground-secondary italic">
                  {t(`Services.${slug}.comparison`)}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Examples */}
      <section className="py-24 md:py-28 border-t border-border-default bg-surface-secondary">
        <Container>
          <SectionHeading title={t(`Services.${slug}.detail.examplesTitle`)} centered={false} />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {["e1", "e2", "e3", "e4"].map((key, index) => {
              const icons = exampleIconsMap[slug] || exampleIconsMap.websites;
              const ExIcon = icons[index];
              return (
                <motion.div key={key} variants={fadeInUp} className="card-matte rounded-3xl p-6 md:p-8">
                  <div className="flex items-start gap-5">
                    <span className="medallion h-11 w-11 shrink-0 rounded-xl flex items-center justify-center">
                      <ExIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {t(`Services.${slug}.detail.examples.${key}.title`)}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">
                        {t(`Services.${slug}.detail.examples.${key}.description`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* Pricing — only on the chatbot service page */}
      {slug === "chatbot" && <ChatbotPricing />}

      {/* Gated demo booking — only on the voice service page */}
      {slug === "voice" && <VoiceDemoBooking />}

      {/* Real work of this kind beats any description of it */}
      {slug === "websites" && (
        <Work
          service="websites"
          title={t("Services.exampleLabel")}
          subtitle="Sajtovi koje sam napravio — otvorite ih i pogledajte, ne morate mi verovati na reč."
        />
      )}
      {slug === "enterprise" && (
        <Work
          service="enterprise"
          title={t("Services.exampleLabel")}
          subtitle="Sistem koji sam napravio i koji radi — otvorite ga i pogledajte."
        />
      )}

      {/* FAQ */}
      <section className="py-24 md:py-28 border-t border-border-default">
        <Container>
          <SectionHeading title={t(`Services.${slug}.detail.faqTitle`)} />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="max-w-3xl mx-auto divide-y divide-border-default border-y border-border-default"
          >
            {["q1", "q2", "q3", "q4"].map((key) => (
              <FAQItem
                key={key}
                question={t(`Services.${slug}.detail.faq.${key}.question`)}
                answer={t(`Services.${slug}.detail.faq.${key}.answer`)}
              />
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Other services */}
      <section className="pb-8">
        <Container>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-sm text-foreground-muted">Ostale usluge:</span>
            {others.map((s) => {
              const OIcon = serviceIcons[s.id];
              return (
                <Link
                  key={s.id}
                  href={`/usluge/${s.id}`}
                  className="btn-matte inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                >
                  <OIcon className="h-4 w-4 text-spicy-300" />
                  {t(`Services.${s.id}.title`)}
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <div className="pt-16">
        <CTABanner />
      </div>
    </>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div variants={fadeInUp}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="group w-full flex items-center gap-6 py-6 text-left cursor-pointer"
      >
        <span className="flex-1 text-base md:text-lg font-medium text-foreground group-hover:text-spicy-100 transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-spicy-300 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-10 text-[15px] md:text-base leading-relaxed text-foreground-muted">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
