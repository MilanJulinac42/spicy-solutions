"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Eye,
  MessageSquare,
  FileCheck,
  Key,
  Globe,
  Building2,
  Brain,
  Workflow,
  Check,
  ChevronDown,
  MessageCircle,
  LifeBuoy,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

type TrackId = "websites" | "enterprise" | "ai" | "automation";

interface TrackMeta {
  id: TrackId;
  icon: LucideIcon;
  phases: readonly string[];
}

const PRINCIPLES: { key: string; icon: LucideIcon }[] = [
  { key: "transparency", icon: Eye },
  { key: "direct", icon: MessageSquare },
  { key: "fixed", icon: FileCheck },
  { key: "ownership", icon: Key },
];

const TRACKS: TrackMeta[] = [
  {
    id: "websites",
    icon: Globe,
    phases: ["discovery", "design", "development", "launch"],
  },
  {
    id: "enterprise",
    icon: Building2,
    phases: ["discovery", "mvp", "iteration", "launch"],
  },
  {
    id: "ai",
    icon: Brain,
    phases: ["audit", "prototype", "integration", "monitoring"],
  },
  {
    id: "automation",
    icon: Workflow,
    phases: ["mapping", "first", "expansion", "handoff"],
  },
];

const FAQ_KEYS = ["start", "payment", "changes", "delay", "afterLaunch"] as const;

export default function ProcessPage() {
  const t = useTranslations();
  const [activeTrack, setActiveTrack] = useState<TrackId>("websites");
  const [openFaq, setOpenFaq] = useState<string | null>("start");

  const activeMeta = TRACKS.find((tr) => tr.id === activeTrack)!;

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-spicy-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-spicy-400/3 rounded-full blur-3xl" />
        </div>
        <Container>
          <SectionHeading
            title={t("Process.title")}
            subtitle={t("Process.subtitle")}
          />
        </Container>
      </section>

      {/* Principles */}
      <section className="pb-20 md:pb-28">
        <Container>
          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center"
          >
            {t("Process.principles.title")}
          </motion.h3>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {PRINCIPLES.map(({ key, icon: Icon }) => (
              <motion.div
                key={key}
                variants={fadeInUp}
                className="p-6 rounded-2xl glass hover:border-spicy-400/30 hover:shadow-lg hover:shadow-spicy-400/5 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-12 h-12 mb-4 flex items-center justify-center rounded-xl bg-spicy-400/10 text-spicy-400"
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {t(`Process.principles.items.${key}.title`)}
                </h4>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {t(`Process.principles.items.${key}.description`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Tracks */}
      <section className="py-20 md:py-28 bg-surface-secondary">
        <Container>
          <SectionHeading
            title={t("Process.tracksTitle")}
            subtitle={t("Process.tracksSubtitle")}
          />

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
            {TRACKS.map(({ id, icon: Icon }) => {
              const isActive = id === activeTrack;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTrack(id)}
                  className={`relative flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-spicy-400 text-white shadow-lg shadow-spicy-400/25"
                      : "bg-surface border border-border-default text-foreground-secondary hover:text-foreground hover:border-spicy-400/30"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t(`Process.tracks.${id}.label`)}</span>
                </button>
              );
            })}
          </div>

          {/* Active track content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTrack}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl mx-auto"
            >
              {/* Overview */}
              <div className="text-center mb-10">
                <p className="text-lg text-foreground-muted max-w-3xl mx-auto">
                  {t(`Process.tracks.${activeTrack}.overview`)}
                </p>
              </div>

              {/* Phases timeline */}
              <div className="relative">
                {/* Vertical line (mobile + desktop) */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border-default md:-translate-x-1/2" />

                <div className="space-y-8 md:space-y-12">
                  {activeMeta.phases.map((phase, idx) => {
                    const isRight = idx % 2 === 1;
                    return (
                      <motion.div
                        key={phase}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.4 }}
                        className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                          isRight ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        {/* Dot */}
                        <div className="absolute left-6 md:left-1/2 top-6 w-4 h-4 rounded-full bg-spicy-400 ring-4 ring-surface-secondary md:-translate-x-1/2 z-10" />

                        {/* Spacer for desktop */}
                        <div className="hidden md:block md:flex-1" />

                        {/* Content card */}
                        <div className="md:flex-1 pl-16 md:pl-0">
                          <div className="bg-surface border border-border-default rounded-2xl p-6 hover:border-spicy-400/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-xs font-mono font-semibold text-spicy-400 uppercase tracking-wider">
                                {t("Process.labels.step", { number: idx + 1 })}
                              </span>
                            </div>
                            <h4 className="text-xl font-bold text-foreground mb-2">
                              {t(`Process.tracks.${activeTrack}.phases.${phase}.name`)}
                            </h4>
                            <p className="text-sm text-foreground-muted leading-relaxed mb-4">
                              {t(`Process.tracks.${activeTrack}.phases.${phase}.description`)}
                            </p>
                            <ul className="space-y-2">
                              {(t.raw(
                                `Process.tracks.${activeTrack}.phases.${phase}.deliverables`
                              ) as string[]).map((d, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-foreground-secondary">
                                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Communication + Post-launch */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 rounded-2xl bg-surface border border-border-default"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-spicy-400/10 text-spicy-400">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-semibold text-foreground">
                      {t("Process.labels.communication")}
                    </h4>
                  </div>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {t(`Process.tracks.${activeTrack}.communication`)}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="p-6 rounded-2xl bg-surface border border-border-default"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-spicy-400/10 text-spicy-400">
                      <LifeBuoy className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-semibold text-foreground">
                      {t("Process.labels.postLaunch")}
                    </h4>
                  </div>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {t(`Process.tracks.${activeTrack}.postLaunch`)}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading title={t("Process.faqTitle")} />

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQ_KEYS.map((key) => {
              const isOpen = openFaq === key;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="border border-border-default rounded-xl bg-surface overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : key)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-surface-tertiary transition-colors cursor-pointer"
                  >
                    <span className="text-base md:text-lg font-semibold text-foreground">
                      {t(`Process.faq.${key}.question`)}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-foreground-muted shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-4 text-sm md:text-base text-foreground-muted leading-relaxed">
                          {t(`Process.faq.${key}.answer`)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-surface-secondary">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("Process.cta.title")}
            </h2>
            <p className="text-lg text-foreground-muted mb-8">
              {t("Process.cta.subtitle")}
            </p>
            <Link
              href="/zapocni-projekat"
              className="inline-flex items-center gap-2 px-8 py-4 bg-spicy-400 text-white rounded-xl font-semibold hover:bg-spicy-500 transition-colors shadow-lg shadow-spicy-400/25 hover:shadow-xl hover:shadow-spicy-400/40"
            >
              {t("Process.cta.button")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
