"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FORMSPREE_FORMS } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const SERVICES = ["sajt", "asistent", "sistem", "nisam"] as const;
type Service = (typeof SERVICES)[number];

const inputCls =
  "w-full rounded-2xl border border-border-default bg-surface px-4 py-3.5 text-[15px] text-foreground placeholder:text-foreground-muted/70 outline-none transition-colors focus:border-spicy-600";

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("_subject", `Probni sajt — ${data.get("firma") || "novi upit"}`);
    data.set("usluga", t(`form.serviceOptions.${service}`));
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORMS.contact}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
      trackEvent("generate_lead", { form_id: "trial_form", service });
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
              {(["q1", "q2", "q3"] as const).map((k) => (
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
                  <p className="mt-6 max-w-sm text-lg font-medium text-foreground">{t("form.success")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <fieldset>
                    <legend className="mb-3 text-sm font-medium text-foreground-secondary">{t("form.service")}</legend>
                    <div className="grid grid-cols-2 gap-2">
                      {SERVICES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setService(s)}
                          aria-pressed={service === s}
                          className={`rounded-2xl border px-3 py-3 text-left text-sm font-medium transition-colors cursor-pointer ${
                            service === s
                              ? "border-spicy-500 bg-spicy-900/40 text-foreground"
                              : "border-border-default text-foreground-muted hover:text-foreground hover:border-[#3A3A40]"
                          }`}
                        >
                          {t(`form.serviceOptions.${s}`)}
                        </button>
                      ))}
                    </div>
                  </fieldset>

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
                        {t("form.submit")}
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
