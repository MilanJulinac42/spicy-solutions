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
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  LifeBuoy,
  ArrowRight,
  Search,
  Palette,
  Code2,
  Rocket,
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

// Animated illustration per step index (cycles 0-3)
function PhaseVisual({ index }: { index: number }) {
  const slot = index % 4;

  if (slot === 0) {
    // Discovery — scanning magnifier with orbiting dots
    return (
      <div className="relative w-full h-48 md:h-56 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute w-40 h-40 md:w-48 md:h-48 rounded-full border-2 border-spicy-400/40"
        >
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-spicy-400 shadow-[0_0_12px_rgba(255,90,31,0.8)]" />
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-spicy-400/80 shadow-[0_0_8px_rgba(255,90,31,0.6)]" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-44 h-44 rounded-full bg-spicy-400/30 blur-2xl"
        />
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-16 h-16 rounded-2xl bg-spicy-400/20 border-2 border-spicy-400/60 flex items-center justify-center shadow-[0_0_20px_rgba(255,90,31,0.3)]"
        >
          <Search className="w-8 h-8 text-spicy-400" />
        </motion.div>
      </div>
    );
  }

  if (slot === 1) {
    // Design — stacked floating layers
    return (
      <div className="relative w-full h-48 md:h-56 flex items-center justify-center">
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [-5, -3, -5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-28 h-20 rounded-xl bg-surface border-2 border-spicy-400/50 -translate-x-12 translate-y-5 shadow-lg shadow-spicy-400/20"
        />
        <motion.div
          animate={{ y: [0, -14, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="absolute w-32 h-24 rounded-xl bg-surface-secondary border-2 border-spicy-400/70 shadow-2xl shadow-spicy-400/30 flex items-center justify-center"
        >
          <Palette className="w-8 h-8 text-spicy-400" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [6, 4, 6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          className="absolute w-20 h-14 rounded-xl bg-spicy-400/25 border-2 border-spicy-400/40 translate-x-16 -translate-y-7"
        />
      </div>
    );
  }

  if (slot === 2) {
    // Development — code brackets with typing dots
    return (
      <div className="relative w-full h-48 md:h-56 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-48 h-48 rounded-full bg-spicy-400/20 blur-2xl"
        />
        <div className="relative flex items-center gap-3">
          <motion.span
            animate={{ x: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl font-mono font-bold text-spicy-400/80"
          >
            {"<"}
          </motion.span>
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-14 h-14 rounded-2xl bg-spicy-400/20 border-2 border-spicy-400/60 flex items-center justify-center shadow-[0_0_24px_rgba(255,90,31,0.35)]"
          >
            <Code2 className="w-7 h-7 text-spicy-400" />
          </motion.div>
          <motion.span
            animate={{ x: [0, 6, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl font-mono font-bold text-spicy-400/80"
          >
            {"/>"}
          </motion.span>
        </div>
        <div className="absolute bottom-6 flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
              className="w-2 h-2 rounded-full bg-spicy-400 shadow-[0_0_8px_rgba(255,90,31,0.6)]"
            />
          ))}
        </div>
        {/* Floating code particles */}
        {["{}", "[]", "()", "=>"].map((sym, i) => (
          <motion.span
            key={sym}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            className="absolute font-mono text-sm font-bold text-spicy-400/40"
            style={{
              left: `${10 + i * 25}%`,
              top: `${15 + (i % 2) * 60}%`,
            }}
          >
            {sym}
          </motion.span>
        ))}
      </div>
    );
  }

  // slot === 3 — Launch — rocket with rising trails
  return (
    <div className="relative w-full h-48 md:h-56 flex items-center justify-center overflow-hidden">
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-16 h-16 rounded-2xl bg-spicy-400/20 border-2 border-spicy-400/60 flex items-center justify-center z-10 shadow-[0_0_24px_rgba(255,90,31,0.4)]"
      >
        <Rocket className="w-8 h-8 text-spicy-400" />
      </motion.div>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <motion.div
          key={i}
          animate={{
            y: [60, -110],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeOut",
          }}
          className="absolute w-1 h-14 bg-gradient-to-t from-spicy-400/0 via-spicy-400/90 to-spicy-400 rounded-full shadow-[0_0_12px_rgba(255,90,31,0.8)]"
          style={{ left: `${28 + i * 6}%` }}
        />
      ))}
      <motion.div
        animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0.35, 0.7] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        className="absolute w-44 h-44 rounded-full bg-spicy-400/30 blur-2xl"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-32 h-32 rounded-full border-2 border-spicy-400/30"
      />
    </div>
  );
}

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

          {/* Tabs — 2x2 grid on mobile, flex on desktop */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3 mb-10 max-w-md sm:max-w-none mx-auto">
            {TRACKS.map(({ id, icon: Icon }) => {
              const isActive = id === activeTrack;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTrack(id)}
                  className={`relative flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-spicy-400 text-white shadow-lg shadow-spicy-400/25"
                      : "bg-surface border border-border-default text-foreground-secondary hover:text-foreground hover:border-spicy-400/30"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{t(`Process.tracks.${id}.label`)}</span>
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
              className="max-w-6xl mx-auto"
            >
              {/* Overview */}
              <div className="text-center mb-10">
                <p className="text-lg text-foreground-muted max-w-3xl mx-auto">
                  {t(`Process.tracks.${activeTrack}.overview`)}
                </p>
              </div>

              {/* Phases timeline — alternating with illustration on opposite side */}
              <div className="relative pb-16 md:pb-20">
                {/* Vertical line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 bg-gradient-to-b from-transparent via-spicy-400/40 to-transparent" />

                <div className="space-y-4 md:space-y-2">
                  {activeMeta.phases.map((phase, idx) => {
                    const isRight = idx % 2 === 1;
                    return (
                      <motion.div
                        key={phase}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.4 }}
                        className={`relative flex flex-col md:flex-row gap-4 md:gap-8 items-center ${
                          isRight ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        {/* Dot */}
                        <div className="absolute left-6 md:left-1/2 top-6 md:top-1/2 w-4 h-4 rounded-full bg-spicy-400 ring-4 ring-surface-secondary md:-translate-x-1/2 md:-translate-y-1/2 z-10" />

                        {/* Illustration side (desktop only) */}
                        <div className="hidden md:flex md:flex-1 items-center justify-center">
                          <PhaseVisual index={idx} />
                        </div>

                        {/* Content card */}
                        <div className="md:flex-1 pl-16 md:pl-0 w-full">
                          <div className="bg-surface border border-border-default rounded-2xl p-6 hover:border-spicy-400/30 transition-colors">
                            <span className="text-xs font-mono font-semibold text-spicy-400 uppercase tracking-wider">
                              {t("Process.labels.step", { number: idx + 1 })}
                            </span>
                            <h4 className="text-xl font-bold text-foreground mt-2 mb-2">
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

                {/* Finish node */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: activeMeta.phases.length * 0.1 + 0.1, duration: 0.4 }}
                  className="absolute left-6 md:left-1/2 -bottom-2 md:-translate-x-1/2 flex items-center gap-2"
                >
                  <div className="w-8 h-8 -ml-2 md:-ml-4 rounded-full bg-emerald-500/15 ring-4 ring-surface-secondary flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider md:hidden">
                    {t("Process.labels.done")}
                  </span>
                </motion.div>
              </div>

              {/* Throughout the project */}
              <div className="mt-16 md:mt-20">
                <motion.h4
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm font-semibold text-foreground-muted uppercase tracking-wider text-center mb-6"
                >
                  {t("Process.labels.throughout")}
                </motion.h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
