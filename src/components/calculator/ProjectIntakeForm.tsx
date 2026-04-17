"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Send, CheckCircle2, Check } from "lucide-react";
import {
  SERVICE_CONFIG,
  SERVICE_TYPES,
  CONTACT_CHANNELS,
  type ServiceType,
  type ContactChannel,
} from "@/lib/projectIntakeConfig";

interface FormData {
  service: ServiceType | null;
  subtype: string;
  features: string[];
  scope: string;
  description: string;
  timeline: string;
  budget: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  channel: ContactChannel;
}

const INITIAL_DATA: FormData = {
  service: null,
  subtype: "",
  features: [],
  scope: "",
  description: "",
  timeline: "",
  budget: "",
  name: "",
  email: "",
  company: "",
  phone: "",
  channel: "email",
};

export function ProjectIntakeForm() {
  const t = useTranslations("StartProject");
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const cfg = data.service ? SERVICE_CONFIG[data.service] : null;
  const serviceBase = data.service ? `services.${data.service}` : "";

  // Dinamička lista features: filtrirana po izabranom subtype-u.
  // Ako subtype nije izabran, prikazuju se sve features za taj tip usluge.
  const availableFeatures: readonly string[] = (() => {
    if (!cfg) return [];
    if (data.subtype && cfg.featuresBySubtype[data.subtype]) {
      return cfg.featuresBySubtype[data.subtype];
    }
    return cfg.features;
  })();

  const stepNames = [
    t("steps.service"),
    t("steps.scope"),
    t("steps.details"),
    t("steps.contact"),
  ];

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function setSubtype(subtype: string) {
    setData((d) => {
      if (!d.service) return { ...d, subtype };
      const allowed = SERVICE_CONFIG[d.service].featuresBySubtype[subtype] ?? [];
      // Skini features koji više nisu u listi za novi subtype
      const filteredFeatures = d.features.filter((f) => allowed.includes(f));
      return { ...d, subtype, features: filteredFeatures };
    });
  }

  function toggleFeature(key: string) {
    setData((d) => ({
      ...d,
      features: d.features.includes(key)
        ? d.features.filter((f) => f !== key)
        : [...d.features, key],
    }));
  }

  function canProceed(): boolean {
    switch (step) {
      case 1:
        return data.service !== null;
      case 2:
        return data.subtype !== "";
      case 3:
        return data.description.trim().length > 0;
      case 4:
        return data.name.trim().length > 0 && data.email.trim().length > 0;
      default:
        return false;
    }
  }

  function goNext() {
    if (!canProceed()) return;
    setDirection(1);
    setStep((s) => s + 1);
  }

  function goBack() {
    setDirection(-1);
    setStep((s) => s - 1);
  }

  async function handleSubmit() {
    if (!canProceed() || !data.service || !cfg) return;
    setSubmitting(true);
    setError(false);

    try {
      const featuresText = data.features.length
        ? data.features
            .map((f) => t(`${serviceBase}.features.${f}`))
            .join(", ")
        : "—";

      const res = await fetch("https://formspree.io/f/mzdkekob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `Novi projekat: ${t(`${serviceBase}.title`)} — ${data.subtype ? t(`${serviceBase}.subtypes.${data.subtype}`) : ""}`,
          Ime: data.name,
          Email: data.email,
          Kompanija: data.company || "—",
          Telefon: data.phone || "—",
          "Preferirani kontakt": t(`contact.channels.${data.channel}`),
          "Tip projekta": t(`${serviceBase}.title`),
          Podtip: data.subtype
            ? t(`${serviceBase}.subtypes.${data.subtype}`)
            : "—",
          Funkcionalnosti: featuresText,
          Obim: data.scope
            ? t(`${serviceBase}.scopeOptions.${data.scope}`)
            : "—",
          "Opis projekta": data.description,
          "Okvirni rok": data.timeline
            ? t(`${serviceBase}.timelineOptions.${data.timeline}`)
            : "—",
          "Okvirni budžet": data.budget
            ? t(`${serviceBase}.budgetOptions.${data.budget}`)
            : "—",
        }),
      });

      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  // ── Success screen ──
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3">
          {t("success.title")}
        </h3>
        <p className="text-foreground-muted mb-8">{t("success.subtitle")}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-spicy-400 text-white rounded-lg font-medium hover:bg-spicy-500 transition-colors"
        >
          {t("success.backHome")}
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* ── Progress indicator ── */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-10">
        {stepNames.map((name, i) => (
          <div key={i} className="flex items-center gap-1 sm:gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                step > i + 1
                  ? "bg-spicy-400 text-white"
                  : step === i + 1
                    ? "bg-spicy-400 text-white"
                    : "bg-surface-tertiary text-foreground-muted"
              }`}
            >
              {step > i + 1 ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={`text-sm hidden md:block ${
                step === i + 1
                  ? "text-foreground font-medium"
                  : "text-foreground-muted"
              }`}
            >
              {name}
            </span>
            {i < stepNames.length - 1 && (
              <div
                className={`w-6 sm:w-10 md:w-12 h-px mx-1 sm:mx-2 transition-colors ${
                  step > i + 1 ? "bg-spicy-400" : "bg-border-default"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* ── Step content ── */}
      <div className="min-h-[420px] relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {/* ───── STEP 1: Service type ───── */}
            {step === 1 && (
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  {t("serviceTitle")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SERVICE_TYPES.map((key) => {
                    const Icon = SERVICE_CONFIG[key].icon;
                    const selected = data.service === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          // Reset scope/features/timeline/budget if service changes
                          if (data.service !== key) {
                            setData((d) => ({
                              ...d,
                              service: key,
                              subtype: "",
                              features: [],
                              scope: "",
                              timeline: "",
                              budget: "",
                            }));
                          }
                        }}
                        className={`group p-5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                          selected
                            ? "border-spicy-400 bg-spicy-400/5"
                            : "border-border-default hover:border-spicy-400/40"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                            selected
                              ? "bg-spicy-400 text-white"
                              : "bg-surface-tertiary text-foreground-muted group-hover:text-spicy-400"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4 className="font-semibold text-foreground mb-1">
                          {t(`services.${key}.title`)}
                        </h4>
                        <p className="text-sm text-foreground-muted">
                          {t(`services.${key}.description`)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ───── STEP 2: Scope (subtype + features + size) ───── */}
            {step === 2 && cfg && data.service && (
              <div className="space-y-7">
                <h3 className="text-xl font-semibold text-foreground">
                  {t("scopeTitle")}
                </h3>

                {/* Subtype */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    {t(`${serviceBase}.subtypeLabel`)} *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {cfg.subtypes.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSubtype(opt)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                          data.subtype === opt
                            ? "bg-spicy-400 text-white"
                            : "bg-surface-tertiary text-foreground-muted hover:text-foreground hover:bg-surface-elevated"
                        }`}
                      >
                        {t(`${serviceBase}.subtypes.${opt}`)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features checklist */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    {t(`${serviceBase}.featuresLabel`)}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {availableFeatures.map((f) => {
                      const checked = data.features.includes(f);
                      return (
                        <button
                          key={f}
                          type="button"
                          onClick={() => toggleFeature(f)}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm font-medium text-left transition-all cursor-pointer ${
                            checked
                              ? "border-spicy-400 bg-spicy-400/5 text-foreground"
                              : "border-border-default text-foreground-muted hover:border-spicy-400/40 hover:text-foreground"
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                              checked
                                ? "bg-spicy-400 text-white"
                                : "border border-border-default"
                            }`}
                          >
                            {checked && <Check className="w-3.5 h-3.5" />}
                          </span>
                          {t(`${serviceBase}.features.${f}`)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Scope (pages / users / docs / integrations) */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    {t(`${serviceBase}.scopeLabel`)}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {cfg.scopeOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() =>
                          update("scope", data.scope === opt ? "" : opt)
                        }
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                          data.scope === opt
                            ? "bg-spicy-400 text-white"
                            : "bg-surface-tertiary text-foreground-muted hover:text-foreground hover:bg-surface-elevated"
                        }`}
                      >
                        {t(`${serviceBase}.scopeOptions.${opt}`)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ───── STEP 3: Details (description + timeline + budget) ───── */}
            {step === 3 && cfg && data.service && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground">
                  {t("detailsTitle")}
                </h3>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t("details.descriptionLabel")} *
                  </label>
                  <textarea
                    value={data.description}
                    onChange={(e) => update("description", e.target.value)}
                    placeholder={t("details.descriptionPlaceholder")}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-border-default bg-surface text-foreground placeholder:text-foreground-muted focus:border-spicy-400 focus:ring-1 focus:ring-spicy-400 outline-none transition-colors resize-none"
                  />
                </div>

                {/* Timeline — dynamic per service */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    {t("details.timelineLabel")}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {cfg.timelineOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() =>
                          update("timeline", data.timeline === opt ? "" : opt)
                        }
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                          data.timeline === opt
                            ? "bg-spicy-400 text-white"
                            : "bg-surface-tertiary text-foreground-muted hover:text-foreground hover:bg-surface-elevated"
                        }`}
                      >
                        {t(`${serviceBase}.timelineOptions.${opt}`)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget — dynamic per service */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    {t("details.budgetLabel")}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {cfg.budgetOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() =>
                          update("budget", data.budget === opt ? "" : opt)
                        }
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                          data.budget === opt
                            ? "bg-spicy-400 text-white"
                            : "bg-surface-tertiary text-foreground-muted hover:text-foreground hover:bg-surface-elevated"
                        }`}
                      >
                        {t(`${serviceBase}.budgetOptions.${opt}`)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ───── STEP 4: Contact ───── */}
            {step === 4 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground">
                  {t("contactTitle")}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t("contact.nameLabel")} *
                    </label>
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border-default bg-surface text-foreground focus:border-spicy-400 focus:ring-1 focus:ring-spicy-400 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t("contact.emailLabel")} *
                    </label>
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border-default bg-surface text-foreground focus:border-spicy-400 focus:ring-1 focus:ring-spicy-400 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t("contact.companyLabel")}
                    </label>
                    <input
                      type="text"
                      value={data.company}
                      onChange={(e) => update("company", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border-default bg-surface text-foreground focus:border-spicy-400 focus:ring-1 focus:ring-spicy-400 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t("contact.phoneLabel")}
                    </label>
                    <input
                      type="tel"
                      value={data.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border-default bg-surface text-foreground focus:border-spicy-400 focus:ring-1 focus:ring-spicy-400 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Preferred channel */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    {t("contact.preferredChannelLabel")}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CONTACT_CHANNELS.map((ch) => (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => update("channel", ch)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                          data.channel === ch
                            ? "bg-spicy-400 text-white"
                            : "bg-surface-tertiary text-foreground-muted hover:text-foreground hover:bg-surface-elevated"
                        }`}
                      >
                        {t(`contact.channels.${ch}`)}
                      </button>
                    ))}
                  </div>
                </div>

                {error && <p className="text-sm text-red-400">{t("error")}</p>}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Navigation ── */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border-default">
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("back")}
          </button>
        ) : (
          <div />
        )}
        {step < 4 ? (
          <button
            type="button"
            onClick={goNext}
            disabled={!canProceed()}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-spicy-400 text-white rounded-lg font-medium hover:bg-spicy-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            {t("next")}
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canProceed() || submitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-spicy-400 text-white rounded-lg font-medium hover:bg-spicy-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            {submitting ? t("submitting") : t("submit")}
            <Send className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
