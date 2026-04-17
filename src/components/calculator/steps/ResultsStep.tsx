"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, RotateCcw, CheckCircle2, Send } from "lucide-react";
import Link from "next/link";
import type { PriceRange, ServiceType, TimelineOption } from "@/types/calculator";
import { estimateTimeline } from "@/data/calculatorPricing";

type Props = {
  priceRange: PriceRange;
  serviceType: ServiceType;
  timeline: TimelineOption;
  scope: Record<string, unknown>;
  onStartOver: () => void;
};

function AnimatedNumber({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [current, setCurrent] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    startTime.current = null;
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));
      if (progress < 1) rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [target, duration]);

  return <>{current.toLocaleString("de-DE")}</>;
}

export function ResultsStep({ priceRange, serviceType, timeline, scope, onStartOver }: Props) {
  const t = useTranslations("Calculator.result");
  const tService = useTranslations("Calculator.serviceType");
  const locale = useLocale();
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", company: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const timelineEstimate = estimateTimeline(serviceType, priceRange, timeline);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formState.email.trim()) return;
    setSending(true);
    setError(false);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name || undefined,
          email: formState.email,
          company: formState.company || undefined,
          need: `${serviceType} - calculator`,
          locale,
          source: "calculator",
          conversation: { serviceType, scope, timeline, estimatedRange: priceRange },
        }),
      });
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="text-center mb-8"
      >
        <h2 className="text-xl font-bold text-foreground mb-2">{t("title")}</h2>
        <p className="text-sm text-foreground-muted">{tService(serviceType)}</p>
      </motion.div>

      {/* Price display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-spicy-400/10 to-spicy-500/5 border border-spicy-400/30 rounded-2xl p-6 mb-6"
      >
        <p className="text-sm text-foreground-muted mb-2">{t("priceLabel")}</p>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-4xl font-bold text-spicy-400">
            <AnimatedNumber target={priceRange.min} />
          </span>
          <span className="text-xl text-foreground-muted">—</span>
          <span className="text-4xl font-bold text-spicy-400">
            <AnimatedNumber target={priceRange.max} />
          </span>
          <span className="text-lg font-medium text-foreground-muted">EUR</span>
        </div>
      </motion.div>

      {/* Timeline estimate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex items-center gap-3 bg-surface-secondary border border-border-default rounded-xl px-5 py-4 mb-6"
      >
        <Calendar className="w-5 h-5 text-spicy-400 shrink-0" />
        <div>
          <p className="text-sm text-foreground-muted">{t("timelineLabel")}</p>
          <p className="font-semibold text-foreground">
            {timelineEstimate.min}–{timelineEstimate.max} nedelja
          </p>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xs text-foreground-muted text-center mb-8 leading-relaxed"
      >
        {t("disclaimer")}
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-3"
      >
        <Link
          href={`/kontakt?service=${serviceType}&budget=${priceRange.min}-${priceRange.max}`}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-spicy-400 text-white rounded-lg font-semibold hover:bg-spicy-500 transition-colors shadow-lg shadow-spicy-400/25"
        >
          {t("ctaSchedule")}
          <ArrowRight className="w-4 h-4" />
        </Link>

        {!sent && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-border-default bg-surface-secondary text-foreground rounded-lg font-medium hover:bg-surface-tertiary transition-colors cursor-pointer"
          >
            {t("ctaEmail")}
            <Send className="w-4 h-4" />
          </button>
        )}

        {showForm && !sent && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            onSubmit={handleSubmit}
            className="space-y-3 pt-2"
          >
            <input
              type="text"
              placeholder={t("formName")}
              value={formState.name}
              onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border-default text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-spicy-400/50 focus:border-spicy-400 transition-all"
            />
            <input
              type="email"
              required
              placeholder={t("formEmail")}
              value={formState.email}
              onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border-default text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-spicy-400/50 focus:border-spicy-400 transition-all"
            />
            <input
              type="text"
              placeholder={t("formCompany")}
              value={formState.company}
              onChange={(e) => setFormState((s) => ({ ...s, company: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border-default text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-spicy-400/50 focus:border-spicy-400 transition-all"
            />
            <button
              type="submit"
              disabled={sending}
              className="w-full px-6 py-3.5 bg-spicy-400 text-white rounded-lg font-semibold hover:bg-spicy-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {sending ? "..." : t("formSubmit")}
            </button>
            {error && <p className="text-sm text-red-400 text-center">{t("formError")}</p>}
          </motion.form>
        )}

        {sent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 justify-center py-3 text-green-400"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-medium">{t("formSuccess")}</span>
          </motion.div>
        )}

        <button
          onClick={onStartOver}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {t("startOver")}
        </button>
      </motion.div>
    </div>
  );
}
