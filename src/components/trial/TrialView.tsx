"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FORMSPREE_FORMS } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { BUDGET, TIMING, WEEKLY_SLOTS, isSerious, type BudgetId, type TimingId, type TrialOutcome } from "@/data/trial";

type Capacity = { known: boolean; slots: number; remaining?: number };

const SERVICES = ["sajt", "asistent", "sistem", "nisam"] as const;
type Service = (typeof SERVICES)[number];

const inputCls =
  "w-full rounded-2xl border border-border-default bg-surface px-4 py-3.5 text-[15px] text-foreground placeholder:text-foreground-muted/70 outline-none transition-colors focus:border-spicy-600";

function Chips<T extends string>({
  legend,
  options,
  value,
  onChange,
  cols = 2,
}: {
  legend: string;
  options: readonly { id: T; label: string }[];
  value: T | null;
  onChange: (v: T) => void;
  cols?: 2 | 3;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-foreground-secondary">{legend}</legend>
      <div className={`grid gap-2 ${cols === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2"}`}>
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            aria-pressed={value === o.id}
            className={`rounded-2xl border px-3 py-3 text-left text-sm font-medium transition-colors cursor-pointer ${
              value === o.id
                ? "border-spicy-500 bg-spicy-900/40 text-foreground"
                : "border-border-default text-foreground-muted hover:text-foreground hover:border-[#3A3A40]"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/** Real, live count of this week's free slots — hidden when it can't be known. */
function CapacityBadge({ capacity }: { capacity: Capacity | null }) {
  const t = useTranslations("Trial.capacity");
  if (!capacity?.known || capacity.remaining === undefined) return null;
  const { remaining, slots } = capacity;
  return (
    <div className="mb-6 rounded-2xl border border-border-default bg-surface px-4 py-3.5">
      <div className="flex items-center gap-3">
        <span className="flex gap-1.5" aria-hidden="true">
          {Array.from({ length: slots }).map((_, i) => (
            <span
              key={i}
              className={`h-2.5 w-2.5 rounded-full ${i < slots - remaining ? "bg-[#3A3A40]" : ""}`}
              style={i >= slots - remaining ? { background: "var(--metal-champagne)" } : undefined}
            />
          ))}
        </span>
        <span className="text-sm font-semibold text-foreground">
          {remaining > 0 ? t("left", { n: remaining, total: slots }) : t("full")}
        </span>
      </div>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="group flex w-full items-center gap-6 py-5 text-left cursor-pointer"
      >
        <span className="flex-1 text-base font-medium text-foreground group-hover:text-spicy-100 transition-colors">{q}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-spicy-300 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pb-5 pr-10 text-[15px] leading-relaxed text-foreground-muted"
          >
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function TrialView() {
  const t = useTranslations("Trial");
  const params = useSearchParams();
  const pre = params.get("usluga");
  const [service, setService] = useState<Service>(SERVICES.includes(pre as Service) ? (pre as Service) : "sajt");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [timing, setTiming] = useState<TimingId | null>(null);
  const [budget, setBudget] = useState<BudgetId | null>(null);
  const [capacity, setCapacity] = useState<Capacity | null>(null);
  const [outcome, setOutcome] = useState<TrialOutcome>("trial");
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    fetch("/api/trial", { cache: "no-store" })
      .then((r) => r.json())
      .then(setCapacity)
      .catch(() => setCapacity({ known: false, slots: WEEKLY_SLOTS }));
  }, []);

  const weekFull = capacity?.known === true && capacity.remaining === 0;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!timing || !budget) {
      setMissing(true);
      return;
    }
    setMissing(false);
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    const fields = Object.fromEntries(data.entries()) as Record<string, string>;
    const serviceLabel = t(`form.serviceOptions.${service}`);

    // 1) Record it and learn the outcome (trial / queued / offer). If the
    //    database is unreachable, fall back to the rule without the count.
    let result: TrialOutcome = isSerious(timing) ? (weekFull ? "queued" : "trial") : "offer";
    try {
      const r = await fetch("/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, usluga: serviceLabel, timing, budget }),
      });
      if (r.ok) result = (await r.json()).outcome ?? result;
    } catch {
      /* keep the fallback outcome */
    }

    // 2) Email copy — this is what actually lands in the inbox.
    const label = { trial: "PROBNI SAJT", queued: "RED ZA PONEDELJAK", offer: "SAMO PONUDA" }[result];
    data.set("_subject", `[${label}] ${fields.firma || "novi upit"}`);
    data.set("usluga", serviceLabel);
    data.set("kada", TIMING.find((x) => x.id === timing)!.label);
    data.set("budzet", BUDGET.find((x) => x.id === budget)!.label);
    data.set("ishod", label);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORMS.contact}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      setOutcome(result);
      setStatus("success");
      form.reset();
      trackEvent("generate_lead", {
        form_id: "trial_form",
        service,
        timing,
        budget,
        lead_quality: result === "offer" ? "exploring" : "qualified",
      });
    } catch {
      setStatus("error");
      trackEvent("form_error", { form_id: "trial_form" });
    }
  }

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(900px 480px at 75% 5%, rgba(214,186,140,0.10), transparent 62%)" }}
      />
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-14 lg:gap-16">
          {/* Pitch */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-spicy-300">{t("eyebrow")}</p>
            {/* The pitch follows the chosen service — "your new site" is wrong
                when someone picked the AI assistant. */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-semibold leading-[1.05] text-foreground text-balance">
                  {t(`variants.${service}.title`)}{" "}
                  <em className="accent-serif text-metal-sheen block mt-1">{t(`variants.${service}.accent`)}</em>
                </h1>
                <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-foreground-muted text-pretty">
                  {t(`variants.${service}.subtitle`)}
                </p>
              </motion.div>
            </AnimatePresence>

            <motion.ol
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mt-12 space-y-7"
            >
              {(["s1", "s2", "s3"] as const).map((k, i) => (
                <motion.li key={k} variants={fadeInUp} className="flex gap-5">
                  <span className="text-3xl font-semibold text-metal leading-none tabular-nums w-10 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-foreground">{t(`steps.${k}.title`)}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-foreground-muted max-w-md">{t(`steps.${k}.body`)}</span>
                  </span>
                </motion.li>
              ))}
            </motion.ol>

            <div className="mt-12 max-w-xl divide-y divide-border-default border-y border-border-default">
              {(["q1", "q2", "q3", "q4"] as const).map((k) => (
                <Faq key={k} q={t(`faq.${k}.q`)} a={t(`faq.${k}.a`)} />
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:sticky lg:top-28 self-start rounded-[2rem] p-px"
            style={{ background: "linear-gradient(160deg, rgba(214,186,140,0.6), rgba(255,255,255,0.05) 45%, rgba(214,186,140,0.25))" }}
          >
            <div className="rounded-[calc(2rem-1px)] bg-[#18181B] p-6 md:p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center py-16 text-center">
                  <span className="medallion h-14 w-14 rounded-2xl flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6" />
                  </span>
                  <p className="mt-6 text-xl font-semibold text-foreground">{t(`outcome.${outcome}.title`)}</p>
                  <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-foreground-muted">{t(`outcome.${outcome}.body`)}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <CapacityBadge capacity={capacity} />
                  <Chips
                    legend={t("form.service")}
                    options={SERVICES.map((id) => ({ id, label: t(`form.serviceOptions.${id}`) }))}
                    value={service}
                    onChange={setService}
                  />

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-foreground-secondary">{t("form.business")}</span>
                    <input name="firma" required className={inputCls} placeholder={t("form.businessPh")} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-foreground-secondary">{t("form.activity")}</span>
                    <input name="delatnost" required className={inputCls} placeholder={t("form.activityPh")} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-foreground-secondary">{t("form.link")}</span>
                    <input name="link" type="text" inputMode="url" className={inputCls} placeholder={t("form.linkPh")} />
                  </label>
                  <Chips legend={t("form.timing")} options={TIMING} value={timing} onChange={setTiming} />
                  <Chips legend={t("form.budget")} options={BUDGET} value={budget} onChange={setBudget} cols={3} />
                  <p className={`text-xs leading-relaxed ${missing ? "text-red-300" : "text-foreground-muted"}`}>
                    {t("form.qualifyNote")}
                  </p>
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-foreground-secondary">{t("form.name")}</span>
                      <input name="ime" required className={inputCls} autoComplete="name" />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-foreground-secondary">{t("form.contact")}</span>
                      <input name="kontakt" required className={inputCls} placeholder={t("form.contactPh")} />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-metal group w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-[15px] font-semibold disabled:opacity-70 cursor-pointer"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t("form.sending")}
                      </>
                    ) : (
                      <>
                        {weekFull ? t("form.submitQueued") : t("form.submit")}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                  {status === "error" && <p className="text-sm text-red-300">{t("form.error")}</p>}
                  <p className="text-xs text-foreground-muted">{t("form.privacy")}</p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
