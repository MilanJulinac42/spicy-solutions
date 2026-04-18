"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  ArrowUpRight,
  Globe,
  Building2,
  Brain,
  Workflow,
} from "lucide-react";

/* ═══════════════════════════════════════════
   MICRO-ANIMATIONS — one per service card
   ═══════════════════════════════════════════ */

function MiniBrowser({ inView }: { inView: boolean }) {
  return (
    <div className="w-full h-[170px] rounded-lg overflow-hidden bg-[#0d1117] border border-white/[0.06]">
      {/* Chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#161b22] border-b border-white/[0.06]">
        <div className="w-2 h-2 rounded-full bg-[#ff5f57]/70" />
        <div className="w-2 h-2 rounded-full bg-[#febc2e]/70" />
        <div className="w-2 h-2 rounded-full bg-[#28c840]/70" />
        <div className="ml-2 flex-1 h-4 rounded-full bg-white/[0.06] max-w-[140px]" />
      </div>
      {/* Page */}
      <div className="p-3 space-y-2.5">
        {/* Nav */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex items-center justify-between"
        >
          <div className="w-10 h-2.5 rounded bg-spicy-400/40" />
          <div className="flex gap-2">
            <div className="w-7 h-2 rounded bg-white/[0.08]" />
            <div className="w-7 h-2 rounded bg-white/[0.08]" />
            <div className="w-7 h-2 rounded bg-white/[0.08]" />
          </div>
        </motion.div>
        {/* Hero block */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          className="h-12 rounded bg-gradient-to-r from-spicy-400/20 via-spicy-400/10 to-transparent origin-left"
        />
        {/* Cards row */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.85 + i * 0.12, duration: 0.35 }}
              className="flex-1 h-9 rounded bg-white/[0.03] border border-white/[0.06]"
            >
              <div className="m-1.5 w-4 h-1.5 rounded bg-white/[0.08]" />
              <div className="mx-1.5 w-8 h-1 rounded bg-white/[0.05]" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniDashboard({ inView }: { inView: boolean }) {
  const bars = [55, 35, 75, 45, 85, 60];
  return (
    <div className="w-full h-[170px] rounded-lg overflow-hidden bg-[#0d1117] border border-white/[0.06] p-3">
      {/* Stats */}
      <div className="flex gap-2 mb-3">
        {[
          { label: "Korisnici", value: "2.4k", cls: "text-blue-400" },
          { label: "Prihod", value: "\u20AC12k", cls: "text-emerald-400" },
          { label: "Rast", value: "+18%", cls: "text-amber-400" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: -6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 + i * 0.1, duration: 0.35 }}
            className="flex-1 px-2 py-1.5 rounded bg-white/[0.03] border border-white/[0.06]"
          >
            <div className="text-[8px] text-gray-500 leading-none mb-0.5">
              {s.label}
            </div>
            <div className={`text-[11px] font-bold ${s.cls}`}>{s.value}</div>
          </motion.div>
        ))}
      </div>
      {/* Bar chart */}
      <div className="flex items-end gap-[5px] h-[72px] px-1">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={inView ? { height: `${h}%` } : {}}
            transition={{
              delay: 0.55 + i * 0.08,
              duration: 0.5,
              ease: "easeOut",
            }}
            className="flex-1 rounded-t bg-gradient-to-t from-blue-500/50 to-blue-400/20"
          />
        ))}
      </div>
    </div>
  );
}

function MiniChat({ inView }: { inView: boolean }) {
  return (
    <div className="w-full h-[170px] rounded-lg overflow-hidden bg-[#0d1117] border border-white/[0.06] p-3 flex flex-col justify-end gap-2.5">
      {/* User message */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="self-end max-w-[75%] px-3 py-2 rounded-2xl rounded-br-sm bg-spicy-400/20 border border-spicy-400/10"
      >
        <span className="text-[10px] text-gray-300 leading-tight">
          {"Kako da povećam prodaju?"}
        </span>
      </motion.div>
      {/* Typing indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={
          inView ? { opacity: [0, 1, 1, 0] } : {}
        }
        transition={{ delay: 0.8, duration: 1.2, times: [0, 0.08, 0.75, 1] }}
        className="self-start flex gap-1 px-3 py-2"
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-violet-400/60 animate-pulse"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </motion.div>
      {/* Bot response */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 1.8, duration: 0.4 }}
        className="self-start max-w-[80%] px-3 py-2 rounded-2xl rounded-bl-sm bg-violet-500/10 border border-violet-500/15"
      >
        <span className="text-[10px] text-gray-300 leading-tight inline-flex items-baseline gap-1">
          {"Na osnovu vaših podataka, preporučujem 3 strategije"}
          <span className="inline-flex gap-0.5 items-end pb-0.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                className="w-[3px] h-[3px] rounded-full bg-violet-300"
              />
            ))}
          </span>
        </span>
      </motion.div>
    </div>
  );
}

function MiniWorkflow({ inView }: { inView: boolean }) {
  const nodes = [
    { label: "Email primljen", icon: "📨", color: "border-amber-500/30 bg-amber-500/10", dot: "bg-amber-400" },
    { label: "AI analiza", icon: "🧠", color: "border-violet-500/30 bg-violet-500/10", dot: "bg-violet-400" },
    { label: "CRM update", icon: "📊", color: "border-blue-500/30 bg-blue-500/10", dot: "bg-blue-400" },
    { label: "Slack notif.", icon: "🔔", color: "border-emerald-500/30 bg-emerald-500/10", dot: "bg-emerald-400" },
  ];

  return (
    <div className="w-full h-[170px] rounded-lg overflow-hidden bg-[#0d1117] border border-white/[0.06] relative">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Nodes + connections */}
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="flex items-center gap-0">
          {nodes.map((node, i) => (
            <div key={i} className="flex items-center">
              {/* Node */}
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 10 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{
                  delay: 0.3 + i * 0.15,
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                }}
                className="relative flex flex-col items-center"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${node.color} border flex items-center justify-center text-lg shadow-lg relative overflow-hidden`}
                >
                  {/* Pulse ring on active */}
                  {inView && (
                    <motion.div
                      className={`absolute inset-0 rounded-2xl border ${node.color.replace("bg-", "border-").split(" ")[0]}`}
                      animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        delay: 1.2 + i * 0.4,
                        repeatDelay: 3,
                      }}
                    />
                  )}
                  <span className="relative z-10">{node.icon}</span>
                </div>
                {/* Label */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.7 + i * 0.15 }}
                  className="text-[9px] text-gray-500 mt-1.5 whitespace-nowrap"
                >
                  {node.label}
                </motion.span>
                {/* Status dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 1.0 + i * 0.2, type: "spring", stiffness: 400 }}
                  className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${node.dot} border-2 border-[#0d1117]`}
                />
              </motion.div>
              {/* Connection line */}
              {i < nodes.length - 1 && (
                <div className="relative w-10 h-[2px] mx-1">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 bg-emerald-500/25 origin-left rounded-full"
                  />
                  {/* Flowing dot */}
                  {inView && (
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                      initial={{ left: "-4px", opacity: 0 }}
                      animate={{ left: ["-4px", "calc(100% + 4px)"], opacity: [0, 1, 1, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.2,
                        delay: 1.5 + i * 0.5,
                        repeatDelay: 2.5,
                        ease: "easeInOut",
                        times: [0, 0.1, 0.9, 1],
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   BENTO CARD wrapper
   ═══════════════════════════════════════════ */

interface BentoCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string; // e.g. "spicy" | "blue" | "violet" | "emerald"
  animation: React.ReactNode;
  className?: string;
  delay?: number;
}

const accentMap: Record<
  string,
  { hover: string; iconBg: string; iconText: string; ctaBg: string; ctaHover: string; ctaRing: string }
> = {
  spicy: {
    hover: "hover:border-spicy-400/30",
    iconBg: "bg-spicy-400/10",
    iconText: "text-spicy-400",
    ctaBg: "bg-spicy-400/10 text-spicy-400 border-spicy-400/30",
    ctaHover: "hover:bg-spicy-400 hover:text-white hover:border-spicy-400 hover:shadow-lg hover:shadow-spicy-400/30",
    ctaRing: "group-hover:bg-spicy-400/15",
  },
  blue: {
    hover: "hover:border-blue-400/30",
    iconBg: "bg-blue-400/10",
    iconText: "text-blue-400",
    ctaBg: "bg-blue-400/10 text-blue-400 border-blue-400/30",
    ctaHover: "hover:bg-blue-400 hover:text-white hover:border-blue-400 hover:shadow-lg hover:shadow-blue-400/30",
    ctaRing: "group-hover:bg-blue-400/15",
  },
  violet: {
    hover: "hover:border-violet-400/30",
    iconBg: "bg-violet-400/10",
    iconText: "text-violet-400",
    ctaBg: "bg-violet-400/10 text-violet-400 border-violet-400/30",
    ctaHover: "hover:bg-violet-400 hover:text-white hover:border-violet-400 hover:shadow-lg hover:shadow-violet-400/30",
    ctaRing: "group-hover:bg-violet-400/15",
  },
  emerald: {
    hover: "hover:border-emerald-400/30",
    iconBg: "bg-emerald-400/10",
    iconText: "text-emerald-400",
    ctaBg: "bg-emerald-400/10 text-emerald-400 border-emerald-400/30",
    ctaHover: "hover:bg-emerald-400 hover:text-white hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-400/30",
    ctaRing: "group-hover:bg-emerald-400/15",
  },
};

function BentoCard({
  href,
  icon,
  title,
  description,
  accent,
  animation,
  className = "",
  delay = 0,
}: BentoCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const a = accentMap[accent] ?? accentMap.spicy;
  const t = useTranslations();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className={`group relative rounded-2xl glass overflow-hidden ${a.hover} transition-all duration-500 ${className}`}
    >
      {/* Animation area */}
      <div className="p-5 pb-0">{animation}</div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div
            className={`w-7 h-7 rounded-lg ${a.iconBg} flex items-center justify-center shrink-0`}
          >
            <span className={a.iconText}>{icon}</span>
          </div>
          <h3 className="text-base font-semibold text-foreground truncate">
            {title}
          </h3>
        </div>
        <p className="text-sm text-foreground-muted leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>
        <Link
          href={href}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border ${a.ctaBg} ${a.ctaHover} transition-all`}
        >
          <span>{t("Common.learnMore")}</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════ */

export function BentoServices() {
  const t = useTranslations();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          title={t("ServicesOverview.title")}
          subtitle={t("ServicesOverview.subtitle")}
        />

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4"
        >
          {/* Websites — large */}
          <BentoCard
            className="lg:col-span-7"
            href="/usluge/websites"
            icon={<Globe className="w-4 h-4" />}
            title={t("ServicesOverview.websites.title")}
            description={t("ServicesOverview.websites.description")}
            accent="spicy"
            delay={0}
            animation={<MiniBrowser inView={inView} />}
          />

          {/* Enterprise */}
          <BentoCard
            className="lg:col-span-5"
            href="/usluge/enterprise"
            icon={<Building2 className="w-4 h-4" />}
            title={t("ServicesOverview.enterprise.title")}
            description={t("ServicesOverview.enterprise.description")}
            accent="blue"
            delay={0.1}
            animation={<MiniDashboard inView={inView} />}
          />

          {/* AI */}
          <BentoCard
            className="lg:col-span-5"
            href="/usluge/ai"
            icon={<Brain className="w-4 h-4" />}
            title={t("ServicesOverview.ai.title")}
            description={t("ServicesOverview.ai.description")}
            accent="violet"
            delay={0.2}
            animation={<MiniChat inView={inView} />}
          />

          {/* Automation — large */}
          <BentoCard
            className="lg:col-span-7"
            href="/usluge/automation"
            icon={<Workflow className="w-4 h-4" />}
            title={t("ServicesOverview.automation.title")}
            description={t("ServicesOverview.automation.description")}
            accent="emerald"
            delay={0.3}
            animation={<MiniWorkflow inView={inView} />}
          />
        </div>
      </Container>
    </section>
  );
}
