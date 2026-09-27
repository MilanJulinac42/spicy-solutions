"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Keep in sync with src/data/pricing.ts (voice assistant + its Partner plan).
const VOICE_SETUP = 990;
const VOICE_MONTHLY = 79;
const WEEKS_PER_MONTH = 4.3;

const eur = (n: number) => `${Math.round(n).toLocaleString("sr-RS")}€`;

function Slider({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-4">
        <span className="text-[15px] text-foreground-secondary">{label}</span>
        <span className="text-lg font-semibold text-foreground tabular-nums">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="calc-range mt-3 w-full"
        style={{ "--pct": `${pct}%` } as React.CSSProperties}
      />
    </label>
  );
}

export function MissedCallsCalculator() {
  const t = useTranslations("Calculator");
  const [missed, setMissed] = useState(6);
  const [rate, setRate] = useState(30);
  const [value, setValue] = useState(40);

  const monthly = missed * WEEKS_PER_MONTH * (rate / 100) * value;
  const net = monthly - VOICE_MONTHLY;
  const payback = net > 0 ? VOICE_SETUP / net : null;
  const paybackLabel =
    payback === null ? "—" : payback < 1 ? `< 1 ${t("month")}` : `${Math.ceil(payback)} ${t("months")}`;

  return (
    <section className="py-24 md:py-32 border-t border-border-default">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
          <div>
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              accent={t("accent")}
              subtitle={t("subtitle")}
              centered={false}
              className="!mb-10"
            />
            <div className="space-y-8">
              <Slider label={t("missed")} value={missed} display={String(missed)} min={1} max={40} step={1} onChange={setMissed} />
              <Slider label={t("rate")} value={rate} display={`${rate}%`} min={5} max={80} step={5} onChange={setRate} />
              <Slider label={t("value")} value={value} display={eur(value)} min={10} max={1000} step={10} onChange={setValue} />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] p-px"
            style={{ background: "linear-gradient(160deg, rgba(214,186,140,0.55), rgba(255,255,255,0.05) 45%, rgba(214,186,140,0.25))" }}
          >
            <div
              className="rounded-[calc(2rem-1px)] p-8 md:p-10"
              style={{ background: "radial-gradient(500px 240px at 50% 0%, rgba(214,186,140,0.10), transparent 70%), #18181B" }}
            >
              <p className="text-sm uppercase tracking-[0.18em] text-foreground-muted">{t("monthly")}</p>
              <p className="mt-3 text-6xl md:text-7xl font-semibold text-metal leading-none tabular-nums" aria-live="polite">
                {eur(monthly)}
              </p>
              <p className="mt-4 text-foreground-secondary">
                {t("yearly")}: <span className="font-semibold text-foreground tabular-nums">{eur(monthly * 12)}</span>
              </p>
              <div className="hairline-metal my-8" />
              <p className="text-[15px] text-foreground-secondary">{t("payback")}</p>
              <p className="mt-2 text-3xl font-semibold text-foreground tabular-nums">{paybackLabel}</p>
              <Link
                href="/probni-sajt?usluga=asistent"
                className="btn-metal group mt-8 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold"
              >
                {t("cta")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <p className="mt-6 text-xs text-foreground-muted">{t("note")}</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
