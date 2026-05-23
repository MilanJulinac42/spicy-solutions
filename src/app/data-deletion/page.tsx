"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, Shield, AlertCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const ITEM_KEYS = ["i1", "i2", "i3", "i4"] as const;

export default function DataDeletionPage() {
  const t = useTranslations("DataDeletion");
  const [email, setEmail] = useState("");
  const [igHandle, setIgHandle] = useState("");
  const [business, setBusiness] = useState("");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setError(false);

    try {
      const res = await fetch("https://formspree.io/f/mzdkekob", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "Zahtev za brisanje podataka",
          Email: email,
          "Instagram/Messenger handle": igHandle || "—",
          "Biznis sa kojim je komunicirao": business || "—",
          Razlog: reason || "—",
          "Tip zahteva": "DATA_DELETION_REQUEST",
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

  if (submitted) {
    return (
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t("form.success.title")}
            </h2>
            <p className="text-foreground-muted leading-relaxed">
              {t("form.success.subtitle")}
            </p>
          </motion.div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <Container>
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            {/* Intro */}
            <motion.p
              variants={fadeInUp}
              className="text-foreground-secondary leading-relaxed mb-10"
            >
              {t("intro")}
            </motion.p>

            {/* What happens */}
            <motion.div variants={fadeInUp} className="mb-10 p-6 rounded-2xl glass">
              <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-spicy-400" />
                {t("whatHappens.title")}
              </h3>
              <ul className="space-y-2">
                {ITEM_KEYS.map((k) => (
                  <li
                    key={k}
                    className="flex items-start gap-2 text-sm text-foreground-secondary"
                  >
                    <CheckCircle2 className="w-4 h-4 text-spicy-400 shrink-0 mt-0.5" />
                    <span>{t(`whatHappens.items.${k}`)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Form */}
            <motion.form
              variants={fadeInUp}
              onSubmit={handleSubmit}
              className="space-y-5 p-6 md:p-8 rounded-2xl glass"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t("form.title")}
              </h3>

              <Field
                label={t("form.emailLabel")}
                required
                help={t("form.emailHelp")}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("form.emailPlaceholder")}
                  className="w-full px-4 py-2.5 rounded-lg bg-surface-tertiary border border-border-default text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-spicy-400 transition-colors"
                />
              </Field>

              <Field label={t("form.igHandleLabel")} help={t("form.igHandleHelp")}>
                <input
                  type="text"
                  value={igHandle}
                  onChange={(e) => setIgHandle(e.target.value)}
                  placeholder={t("form.igHandlePlaceholder")}
                  className="w-full px-4 py-2.5 rounded-lg bg-surface-tertiary border border-border-default text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-spicy-400 transition-colors"
                />
              </Field>

              <Field label={t("form.businessLabel")}>
                <input
                  type="text"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  placeholder={t("form.businessPlaceholder")}
                  className="w-full px-4 py-2.5 rounded-lg bg-surface-tertiary border border-border-default text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-spicy-400 transition-colors"
                />
              </Field>

              <Field label={t("form.reasonLabel")}>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={t("form.reasonPlaceholder")}
                  className="w-full px-4 py-2.5 rounded-lg bg-surface-tertiary border border-border-default text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-spicy-400 transition-colors resize-none"
                />
              </Field>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{t("form.error")}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || !email.trim()}
                className="w-full px-6 py-3 rounded-lg bg-spicy-400 text-white font-medium hover:bg-spicy-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? t("form.submitting") : t("form.submit")}
              </button>
            </motion.form>

            {/* Alternative */}
            <motion.div variants={fadeInUp} className="mt-10 text-center">
              <h4 className="text-sm font-semibold text-foreground mb-2">
                {t("alternative.title")}
              </h4>
              <p className="text-sm text-foreground-muted">
                {t("alternative.body")}
              </p>
              <a
                href="mailto:info@solveradev.rs?subject=Zahtev%20za%20brisanje%20podataka"
                className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-spicy-400 hover:text-spicy-300 transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@solveradev.rs
              </a>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}

function Field({
  label,
  required,
  help,
  children,
}: {
  label: string;
  required?: boolean;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {label} {required && <span className="text-spicy-400">*</span>}
      </label>
      {children}
      {help && <p className="text-xs text-foreground-muted mt-1">{help}</p>}
    </div>
  );
}
