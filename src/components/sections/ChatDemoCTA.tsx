"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { openSolveraChat } from "@/lib/openChat";

/**
 * Live-demo banner for the chatbot service page: turns the (otherwise
 * easy-to-miss) floating chat widget into a self-selling proof point. Clicking a
 * sample question opens the widget and sends that question to the bot so a real
 * answer streams in immediately.
 */
export function ChatDemoCTA() {
  const t = useTranslations("ChatDemo");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const questions = [t("q1"), t("q2"), t("q3")];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-violet-400/25 bg-gradient-to-br from-violet-500/[0.12] via-surface to-spicy-400/[0.06] p-5 md:p-6 mb-6"
    >
      {/* subtle grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,85,247,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative">
        {/* live badge */}
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
            {t("badge")}
          </span>
        </div>

        <h3 className="flex items-center gap-2 text-lg md:text-xl font-semibold text-foreground">
          <Sparkles className="h-5 w-5 shrink-0 text-violet-400" />
          <span>{t("title")}</span>
        </h3>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-foreground-muted">
          {t("description")}
        </p>

        {/* sample questions + CTA share one row on desktop, stack on mobile */}
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-foreground-muted">{t("tryLabel")}</span>
            {questions.map((q) => (
              <button
                key={q}
                onClick={() => openSolveraChat(q, "chatbot_page_chip")}
                className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1.5 text-xs font-medium text-violet-300 transition-all hover:border-violet-400 hover:bg-violet-400 hover:text-white"
              >
                {q}
              </button>
            ))}
          </div>

          {/* primary CTA — right of the questions, full width on mobile */}
          <button
            onClick={() => openSolveraChat(undefined, "chatbot_page_button")}
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-spicy-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-spicy-400/30 transition-all hover:bg-spicy-500 hover:shadow-xl hover:shadow-spicy-400/40 max-sm:w-full"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{t("cta")}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
