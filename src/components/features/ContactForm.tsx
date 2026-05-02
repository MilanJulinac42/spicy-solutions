"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, ArrowRight, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { trackEvent } from "@/lib/analytics";

export function ContactForm() {
  const t = useTranslations("Contact.form");
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") || "";
  const budget = searchParams.get("budget") || "";
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mzdkekob", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        trackEvent("generate_lead", {
          form_id: "contact_form",
          service: preselectedService || undefined,
          budget: budget || undefined,
        });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        trackEvent("form_error", { form_id: "contact_form" });
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      trackEvent("form_error", { form_id: "contact_form" });
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      className="space-y-5"
    >
      <motion.div variants={fadeInUp}>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {t("name")}
        </label>
        <input
          type="text"
          name="name"
          required
          className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border-default text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-spicy-400/50 focus:border-spicy-400 focus:shadow-[0_0_15px_rgba(255,107,53,0.15)] transition-all"
          placeholder={t("name")}
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {t("email")}
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border-default text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-spicy-400/50 focus:border-spicy-400 focus:shadow-[0_0_15px_rgba(255,107,53,0.15)] transition-all"
          placeholder={t("email")}
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {t("company")} <span className="text-foreground-muted font-normal">({t("optional")})</span>
        </label>
        <input
          type="text"
          name="company"
          className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border-default text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-spicy-400/50 focus:border-spicy-400 focus:shadow-[0_0_15px_rgba(255,107,53,0.15)] transition-all"
          placeholder={t("company")}
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {t("service")}
        </label>
        <select
          name="service"
          required
          className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border-default text-foreground focus:outline-none focus:ring-2 focus:ring-spicy-400/50 focus:border-spicy-400 focus:shadow-[0_0_15px_rgba(255,107,53,0.15)] transition-all"
          defaultValue={preselectedService}
        >
          <option value="" disabled>
            {t("serviceOptions.select")}
          </option>
          <option value="audit">{t("serviceOptions.audit")}</option>
          <option value="websites">{t("serviceOptions.websites")}</option>
          <option value="enterprise">{t("serviceOptions.enterprise")}</option>
          <option value="ai">{t("serviceOptions.ai")}</option>
          <option value="automation">{t("serviceOptions.automation")}</option>
          <option value="other">{t("serviceOptions.other")}</option>
        </select>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {t("message")}
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border-default text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-spicy-400/50 focus:border-spicy-400 focus:shadow-[0_0_15px_rgba(255,107,53,0.15)] transition-all resize-none"
          placeholder={t("message")}
          defaultValue={budget ? `Okvirni budžet iz kalkulatora: ${budget} EUR\n` : ""}
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-spicy-400 text-white rounded-lg font-semibold hover:bg-spicy-500 transition-colors shadow-lg shadow-spicy-400/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {status === "sending" ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {t("sending")}
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              {t("submit")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </motion.div>

      {(status === "success" || status === "error") && (
        <Toast
          status={status}
          onClose={() => setStatus("idle")}
          successText={t("success")}
          errorText={t("error")}
        />
      )}
    </motion.form>
  );
}

function Toast({
  status,
  onClose,
  successText,
  errorText,
}: {
  status: "success" | "error";
  onClose: () => void;
  successText: string;
  errorText: string;
}) {
  const isSuccess = status === "success";

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -40, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        exit={{ opacity: 0, y: -40, x: "-50%" }}
        className={`fixed top-6 left-1/2 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border backdrop-blur-sm ${
          isSuccess
            ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
            : "bg-red-500/15 border-red-500/30 text-red-400"
        }`}
      >
        {isSuccess ? (
          <CheckCircle className="w-5 h-5 shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 shrink-0" />
        )}
        <span className="text-sm font-medium">
          {isSuccess ? successText : errorText}
        </span>
        <button
          onClick={onClose}
          className="ml-2 p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
