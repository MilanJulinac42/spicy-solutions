"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Globe,
  Building2,
  Brain,
  Workflow,
  TrendingDown,
  ArrowRight,
  ChevronDown,
  MessageCircleQuestion,
  Monitor,
  ShoppingCart,
  LayoutDashboard,
  FileText,
  Phone,
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
  ExternalLink,
  TrendingUp,
  Calculator,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CTABanner } from "@/components/sections/CTABanner";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerContainerFast,
  scaleSpring,
} from "@/lib/animations";
import { services } from "@/data/services";
import { ServiceIllustration } from "@/components/features/ServiceIllustration";
import Link from "next/link";
import { notFound } from "next/navigation";

const serviceIcons: Record<string, React.ElementType> = {
  websites: Globe,
  enterprise: Building2,
  ai: Brain,
  automation: Workflow,
};

const featureIconsMap: Record<string, React.ElementType[]> = {
  websites: [Smartphone, Search, Zap, PenTool, Code2],
  enterprise: [GitBranch, BarChart3, Shield, RefreshCw, BookOpen],
  ai: [Bot, Link2, Database, Clock, Cpu],
  automation: [LayoutDashboard, Link2, RefreshCw, Clock, Bell],
};

const exampleIconsMap: Record<string, React.ElementType[]> = {
  websites: [Monitor, ShoppingCart, LayoutDashboard, FileText],
  enterprise: [Building2, Workflow, LayoutDashboard, Globe],
  ai: [Brain, Monitor, FileText, Globe],
  automation: [Workflow, FileText, Monitor, ShoppingCart],
};

export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const t = useTranslations();

  const service = services.find((s) => s.id === slug);
  if (!service) notFound();

  const Icon = serviceIcons[slug] || Globe;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-surface-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-spicy-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-spicy-400/5 rounded-full blur-3xl" />
        </div>
        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-spicy-400/10 text-spicy-400">
                  <Icon className="w-6 h-6" />
                </div>
                <Link
                  href="/usluge"
                  className="text-sm text-foreground-muted hover:text-spicy-400 transition-colors"
                >
                  ← {t("Services.title")}
                </Link>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                {t(`Services.${slug}.title`)}
              </h1>
              <p className="text-lg text-foreground-muted leading-relaxed mb-8">
                {t(`Services.${slug}.detail.extendedDescription`)}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-spicy-400 text-white rounded-lg text-base font-semibold hover:bg-spicy-500 transition-colors shadow-lg shadow-spicy-400/25"
                >
                  {t(`Services.${slug}.detail.ctaText`)}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+381655108888"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-border-default rounded-lg text-base font-semibold text-foreground hover:border-spicy-400/30 hover:bg-spicy-400/5 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Pozovite nas
                </a>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
            >
              <ServiceIllustration serviceId={slug} />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t(`Services.${slug}.description`)}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="mt-4 h-1 bg-spicy-400 rounded-full mx-auto"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {service.features.map((featureKey, index) => {
              const featureIcons = featureIconsMap[slug] || featureIconsMap.websites;
              const FeatureIcon = featureIcons[index] || Globe;
              return (
              <motion.div
                key={featureKey}
                variants={fadeInUp}
                className="p-6 rounded-2xl bg-surface-secondary border border-border-default hover:border-spicy-400/20 transition-all group"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-spicy-400/10 text-spicy-400 mb-4 group-hover:bg-spicy-400/20 transition-colors">
                  <FeatureIcon className="w-5 h-5" />
                </div>
                <p className="text-foreground font-medium">
                  {t(featureKey)}
                </p>
              </motion.div>
            );
            })}
            {/* Pricing comparison card */}
            <motion.div
              variants={fadeInUp}
              className="p-6 rounded-2xl bg-spicy-400/5 border border-spicy-400/20"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-spicy-400/10 text-spicy-400 mb-4">
                <TrendingDown className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-foreground-secondary">
                {t(`Services.${slug}.comparison`)}
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Examples / Use Cases */}
      <section className="py-20 md:py-28 bg-surface-secondary">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t(`Services.${slug}.detail.examplesTitle`)}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="mt-4 h-1 bg-spicy-400 rounded-full mx-auto"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {["e1", "e2", "e3", "e4"].map((key, index) => {
              const icons = exampleIconsMap[slug] || exampleIconsMap.websites;
              const ExIcon = icons[index];
              return (
                <motion.div
                  key={key}
                  variants={fadeInUp}
                  className="p-6 md:p-8 rounded-2xl bg-surface border border-border-default hover:border-spicy-400/20 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-spicy-400/10 text-spicy-400 flex-shrink-0">
                      <ExIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-2">
                        {t(`Services.${slug}.detail.examples.${key}.title`)}
                      </h3>
                      <p className="text-foreground-muted leading-relaxed">
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

      {/* Portfolio */}
      <section className="py-20 md:py-28">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t(`Services.${slug}.detail.portfolioTitle`)}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="mt-4 h-1 bg-spicy-400 rounded-full mx-auto"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {["p1", "p2"].map((key) => (
              <motion.div
                key={key}
                variants={fadeInUp}
                className="relative p-8 rounded-2xl bg-surface-secondary border border-border-default hover:border-spicy-400/20 transition-all group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-spicy-400 to-spicy-400/40 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {t(`Services.${slug}.detail.portfolio.${key}.title`)}
                </h3>
                <p className="text-foreground-muted leading-relaxed mb-5">
                  {t(`Services.${slug}.detail.portfolio.${key}.description`)}
                </p>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-spicy-400/5 border border-spicy-400/20 w-fit">
                  <TrendingUp className="w-4 h-4 text-spicy-400 shrink-0" />
                  <span className="text-sm font-medium text-spicy-400">
                    {t(`Services.${slug}.detail.portfolio.${key}.result`)}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Technologies */}
      <section className="py-20 md:py-28 bg-surface-secondary">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Tehnologije koje koristimo
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="mt-4 h-1 bg-spicy-400 rounded-full mx-auto"
            />
          </motion.div>

          <motion.div
            variants={staggerContainerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3"
          >
            {service.technologies.map((tech) => (
              <motion.div key={tech} variants={scaleSpring}>
                <span className="inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-medium bg-surface-secondary text-foreground border border-border-default hover:border-spicy-400/30 transition-colors">
                  {tech}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-surface-secondary">
        <Container className="max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <MessageCircleQuestion className="w-6 h-6 text-spicy-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t(`Services.${slug}.detail.faqTitle`)}
              </h2>
            </div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="mt-4 h-1 bg-spicy-400 rounded-full mx-auto"
            />
          </motion.div>

          <motion.div
            variants={staggerContainerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4"
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

      {/* CTA */}
      <section className="py-20 md:py-28">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center p-12 md:p-16 rounded-3xl bg-gradient-to-br from-spicy-400/10 to-spicy-400/5 border border-spicy-400/20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("Services.cta.title")}
            </h2>
            <p className="text-lg text-foreground-muted mb-8 max-w-xl mx-auto">
              {t("Services.cta.subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 px-8 py-4 bg-spicy-400 text-white rounded-lg text-base font-semibold hover:bg-spicy-500 transition-colors shadow-lg shadow-spicy-400/25"
              >
                {t("Services.cta.button")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/zapocni-projekat"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-border-default text-foreground rounded-lg text-base font-semibold hover:border-spicy-400 hover:text-spicy-400 transition-all"
              >
                <Calculator className="w-4 h-4" />
                {t("Navbar.calculator")}
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className="rounded-2xl bg-surface border border-border-default overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer"
      >
        <span className="font-medium text-foreground pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-foreground-muted flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <p className="px-5 md:px-6 pb-5 md:pb-6 text-foreground-muted leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
}
