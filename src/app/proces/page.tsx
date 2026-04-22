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
  Ruler,
  Database,
  Layers,
  RefreshCw,
  Activity,
  MessageSquareText,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { trackEvent } from "@/lib/analytics";

type TrackId = "websites" | "enterprise" | "ai" | "automation";

type PhaseAnimKey =
  | "investigation"
  | "creative"
  | "building"
  | "launch"
  | "scoping"
  | "dataPrep"
  | "mvp"
  | "iteration"
  | "monitoring"
  | "testing"
  | "flow";

interface PhaseMeta {
  key: string;
  anim: PhaseAnimKey;
}

interface TrackMeta {
  id: TrackId;
  icon: LucideIcon;
  phases: readonly PhaseMeta[];
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
    phases: [
      { key: "discovery", anim: "investigation" },
      { key: "design", anim: "creative" },
      { key: "development", anim: "building" },
      { key: "launch", anim: "launch" },
    ],
  },
  {
    id: "enterprise",
    icon: Building2,
    phases: [
      { key: "discovery", anim: "investigation" },
      { key: "scoping", anim: "scoping" },
      { key: "mvp", anim: "mvp" },
      { key: "iteration", anim: "iteration" },
      { key: "launch", anim: "launch" },
    ],
  },
  {
    id: "ai",
    icon: Brain,
    phases: [
      { key: "audit", anim: "investigation" },
      { key: "data", anim: "dataPrep" },
      { key: "prototype", anim: "testing" },
      { key: "integration", anim: "building" },
      { key: "monitoring", anim: "monitoring" },
    ],
  },
  {
    id: "automation",
    icon: Workflow,
    phases: [
      { key: "mapping", anim: "investigation" },
      { key: "first", anim: "flow" },
      { key: "expansion", anim: "building" },
    ],
  },
];

const FAQ_KEYS = ["start", "payment", "changes", "delay", "afterLaunch"] as const;

// Animated illustration per phase type — semantic mapping, not index-based.
// Each phase kind gets its own distinct visual so the same animation never
// shows up twice in a single track.
function PhaseVisual({ anim }: { anim: PhaseAnimKey }) {
  if (anim === "investigation") {
    // Discovery / audit / mapping — orbiting ring with magnifier
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

  if (anim === "creative") {
    // Design / prototype — stacked floating layers
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

  if (anim === "building") {
    // Development / integration — code brackets with typing dots
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
        {["{}", "[]", "()", "=>"].map((sym, i) => (
          <motion.span
            key={sym}
            animate={{ y: [0, -10, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            className="absolute font-mono text-sm font-bold text-spicy-400/40"
            style={{ left: `${10 + i * 25}%`, top: `${15 + (i % 2) * 60}%` }}
          >
            {sym}
          </motion.span>
        ))}
      </div>
    );
  }

  if (anim === "launch") {
    // Launch / handoff — rocket with rising trails
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
            animate={{ y: [60, -110], opacity: [0, 1, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18, ease: "easeOut" }}
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

  if (anim === "scoping") {
    // Detailed spec — ruler icon with expanding measurement lines + grid pulse
    return (
      <div className="relative w-full h-48 md:h-56 flex items-center justify-center overflow-hidden">
        {/* Grid pattern pulsing */}
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,107,53,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.25) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Horizontal measurement lines sweeping */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`h-${i}`}
            animate={{ scaleX: [0, 1, 0], opacity: [0, 0.8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
            className="absolute h-[2px] bg-gradient-to-r from-transparent via-spicy-400 to-transparent origin-left"
            style={{ width: "55%", left: "22%", top: `${30 + i * 18}%` }}
          />
        ))}
        {/* Central ruler box */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-16 h-16 rounded-2xl bg-spicy-400/20 border-2 border-spicy-400/60 flex items-center justify-center shadow-[0_0_20px_rgba(255,90,31,0.35)] z-10"
        >
          <Ruler className="w-8 h-8 text-spicy-400" />
        </motion.div>
        {/* Tick marks around */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={`t-${i}`}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}
            className="absolute w-1 h-3 bg-spicy-400 rounded-full"
            style={{
              left: i < 2 ? "20%" : "78%",
              top: i % 2 === 0 ? "25%" : "70%",
            }}
          />
        ))}
      </div>
    );
  }

  if (anim === "dataPrep") {
    // Data ingestion — dots flowing into a database icon
    return (
      <div className="relative w-full h-48 md:h-56 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-40 h-40 rounded-full bg-spicy-400/25 blur-2xl"
        />
        {/* Central database */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-16 h-16 rounded-2xl bg-spicy-400/20 border-2 border-spicy-400/60 flex items-center justify-center shadow-[0_0_24px_rgba(255,90,31,0.4)] z-10"
        >
          <Database className="w-8 h-8 text-spicy-400" />
        </motion.div>
        {/* Falling data dots */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [-60, 30],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeIn",
            }}
            className="absolute w-2 h-2 rounded-full bg-spicy-400 shadow-[0_0_8px_rgba(255,90,31,0.7)]"
            style={{ left: `${32 + i * 6}%`, top: "15%" }}
          />
        ))}
        {/* Bottom support line */}
        <div className="absolute bottom-[28%] w-24 h-[2px] bg-spicy-400/40" />
      </div>
    );
  }

  if (anim === "mvp") {
    // Building up — blocks stacking sequentially
    return (
      <div className="relative w-full h-48 md:h-56 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-40 h-40 rounded-full bg-spicy-400/20 blur-2xl"
        />
        {/* Stacking blocks — each appears with a delay then stays, loops */}
        <div className="relative flex flex-col gap-1.5 items-center z-10">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.7, 1, 1, 0.7],
                y: [-8, 0, 0, 0],
              }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                delay: i * 0.45,
                times: [0, 0.25, 0.9, 1],
                ease: "easeOut",
              }}
              className={`rounded-lg border-2 border-spicy-400/60 bg-spicy-400/15 shadow-[0_0_12px_rgba(255,90,31,0.25)] ${
                i === 2
                  ? "w-14 h-7 flex items-center justify-center"
                  : i === 1
                    ? "w-24 h-7"
                    : "w-32 h-7"
              }`}
            >
              {i === 2 && <Layers className="w-4 h-4 text-spicy-400" />}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (anim === "iteration") {
    // Refine loop — rotating refresh with orbiting sparkles
    return (
      <div className="relative w-full h-48 md:h-56 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-40 h-40 rounded-full bg-spicy-400/25 blur-2xl"
        />
        {/* Central rotating refresh */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="relative w-16 h-16 rounded-2xl bg-spicy-400/20 border-2 border-spicy-400/60 flex items-center justify-center shadow-[0_0_24px_rgba(255,90,31,0.4)] z-10"
        >
          <RefreshCw className="w-8 h-8 text-spicy-400" />
        </motion.div>
        {/* Orbiting sparkle dots */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * 72 * Math.PI) / 180;
          const r = 70;
          return (
            <motion.div
              key={i}
              animate={{
                scale: [0.6, 1.2, 0.6],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                delay: i * 0.25,
                ease: "easeInOut",
              }}
              className="absolute w-2 h-2 rounded-full bg-spicy-400 shadow-[0_0_8px_rgba(255,90,31,0.7)]"
              style={{
                left: `calc(50% + ${Math.cos(angle) * r}px - 4px)`,
                top: `calc(50% + ${Math.sin(angle) * r}px - 4px)`,
              }}
            />
          );
        })}
      </div>
    );
  }

  if (anim === "testing") {
    // Prototype testing — chat bubbles (question → answer) with quality checkmark
    return (
      <div className="relative w-full h-48 md:h-56 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-40 h-40 rounded-full bg-spicy-400/20 blur-2xl"
        />
        {/* User question bubble (top-left) */}
        <motion.div
          animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -4] }}
          transition={{ duration: 3.6, repeat: Infinity, times: [0, 0.2, 0.85, 1], ease: "easeOut" }}
          className="absolute top-5 left-[18%] w-28 h-10 rounded-2xl rounded-bl-sm bg-surface border-2 border-spicy-400/40 flex items-center justify-center shadow-lg shadow-spicy-400/10"
        >
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                className="w-1.5 h-1.5 rounded-full bg-spicy-400/70"
              />
            ))}
          </div>
        </motion.div>
        {/* AI answer bubble (bottom-right) with check */}
        <motion.div
          animate={{ opacity: [0, 0, 1, 1, 0], y: [8, 8, 0, 0, -4], scale: [0.9, 0.9, 1, 1, 0.95] }}
          transition={{ duration: 3.6, repeat: Infinity, times: [0, 0.35, 0.5, 0.85, 1], ease: "easeOut" }}
          className="absolute bottom-6 right-[14%] w-32 h-12 rounded-2xl rounded-br-sm bg-spicy-400/20 border-2 border-spicy-400/60 flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(255,90,31,0.3)]"
        >
          <MessageSquareText className="w-5 h-5 text-spicy-400" />
          <motion.div
            animate={{ scale: [0, 0, 1.2, 1, 1] }}
            transition={{ duration: 3.6, repeat: Infinity, times: [0, 0.5, 0.6, 0.7, 1], ease: "backOut" }}
            className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/70 flex items-center justify-center"
          >
            <Check className="w-3 h-3 text-emerald-400" strokeWidth={3} />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (anim === "flow") {
    // First automation flow — nodes connected with animated data packet traveling
    return (
      <div className="relative w-full h-48 md:h-56 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-40 h-40 rounded-full bg-spicy-400/20 blur-2xl"
        />
        {/* SVG connector line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
          <path
            d="M 80 100 L 200 100 L 320 100"
            fill="none"
            stroke="rgba(255,107,53,0.35)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        </svg>
        {/* Three nodes */}
        <div className="relative w-full flex items-center justify-between px-[18%] z-10">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.15, 1], boxShadow: [
                "0 0 0px rgba(255,90,31,0.3)",
                "0 0 20px rgba(255,90,31,0.6)",
                "0 0 0px rgba(255,90,31,0.3)",
              ] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
              className="w-12 h-12 rounded-xl bg-spicy-400/20 border-2 border-spicy-400/60 flex items-center justify-center"
            >
              <Zap className="w-5 h-5 text-spicy-400" />
            </motion.div>
          ))}
        </div>
        {/* Traveling data packet */}
        <motion.div
          animate={{ left: ["18%", "50%", "82%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, times: [0, 0.1, 0.9, 1], ease: "easeInOut" }}
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-spicy-400 shadow-[0_0_14px_rgba(255,90,31,0.9)]"
        />
      </div>
    );
  }

  // anim === "monitoring" — ECG heartbeat line + pulsing Activity icon
  return (
    <div className="relative w-full h-48 md:h-56 flex items-center justify-center overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-40 h-40 rounded-full bg-spicy-400/25 blur-2xl"
      />
      {/* SVG ECG line */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 200"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 0 100 L 80 100 L 100 60 L 120 140 L 140 80 L 160 100 L 240 100 L 260 60 L 280 140 L 300 80 L 320 100 L 400 100"
          fill="none"
          stroke="rgba(255,107,53,0.9)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 6px rgba(255,90,31,0.6))" }}
        />
      </svg>
      {/* Central activity badge */}
      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-16 h-16 rounded-2xl bg-spicy-400/20 border-2 border-spicy-400/60 flex items-center justify-center shadow-[0_0_24px_rgba(255,90,31,0.4)] z-10"
      >
        <Activity className="w-8 h-8 text-spicy-400" />
      </motion.div>
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
                        key={phase.key}
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
                          <PhaseVisual anim={phase.anim} />
                        </div>

                        {/* Content card */}
                        <div className="md:flex-1 pl-16 md:pl-0 w-full">
                          <div className="bg-surface border border-border-default rounded-2xl p-6 hover:border-spicy-400/30 transition-colors">
                            <span className="text-xs font-mono font-semibold text-spicy-400 uppercase tracking-wider">
                              {t("Process.labels.step", { number: idx + 1 })}
                            </span>
                            <h4 className="text-xl font-bold text-foreground mt-2 mb-2">
                              {t(`Process.tracks.${activeTrack}.phases.${phase.key}.name`)}
                            </h4>
                            <p className="text-sm text-foreground-muted leading-relaxed mb-4">
                              {t(`Process.tracks.${activeTrack}.phases.${phase.key}.description`)}
                            </p>
                            <ul className="space-y-2">
                              {(t.raw(
                                `Process.tracks.${activeTrack}.phases.${phase.key}.deliverables`
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
              onClick={() =>
                trackEvent("cta_click", {
                  cta_location: "process_page_bottom",
                  cta_label: "start_project",
                  destination: "/zapocni-projekat",
                })
              }
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
