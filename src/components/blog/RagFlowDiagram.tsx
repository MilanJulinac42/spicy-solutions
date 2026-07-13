"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MessageSquare,
  Search,
  Database,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

const STEPS = [
  { icon: MessageSquare, label: "Pitanje posetioca", sub: "„Koliko košta chatbot?“" },
  { icon: Search, label: "Pretraga baze znanja", sub: "vektorska pretraga" },
  { icon: Database, label: "Pronađeni delovi", sub: "tvoji pravi podaci" },
  { icon: Sparkles, label: "AI sastavlja odgovor", sub: "samo iz konteksta" },
  // Only the payoff step carries colour.
  { icon: CheckCircle2, label: "Odgovor", sub: "bez izmišljanja", accent: true },
];

export function RagFlowDiagram() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <figure
      ref={ref}
      className="my-8 rounded-2xl border border-border-default bg-surface-secondary p-5 md:p-6"
    >
      <figcaption className="mb-5 text-xs font-mono uppercase tracking-wider text-foreground-muted">
        Kako RAG chatbot dolazi do odgovora
      </figcaption>

      <div className="flex flex-col md:flex-row md:items-stretch gap-2">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="contents md:flex md:flex-1 md:items-center">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.4 }}
                className={`flex-1 rounded-xl border p-3 text-center ${
                  step.accent
                    ? "border-emerald-400/25 bg-emerald-400/[0.05]"
                    : "border-border-default bg-surface"
                }`}
              >
                <div
                  className={`mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-surface-secondary ${
                    step.accent ? "text-emerald-400" : "text-foreground-muted"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-xs font-semibold text-foreground leading-tight">
                  {step.label}
                </div>
                <div className="mt-0.5 text-[11px] text-foreground-muted leading-tight">
                  {step.sub}
                </div>
              </motion.div>

              {i < STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: i * 0.15 + 0.1, duration: 0.3 }}
                  className="flex items-center justify-center text-foreground-muted/50 md:px-0.5"
                >
                  <ChevronDown className="h-4 w-4 md:hidden" />
                  <ChevronRight className="hidden h-4 w-4 md:block" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-[13px] leading-relaxed text-foreground-muted">
        Ključ je korak 2–3: bot <strong className="text-foreground">prvo pronađe</strong> tačne
        delove tvoje baze znanja, pa tek onda odgovara. Zato ne izmišlja — ako ništa ne pronađe,
        pošteno kaže „javite se“ umesto da pogodi.
      </p>
    </figure>
  );
}
