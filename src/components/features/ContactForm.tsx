"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

export function ContactForm() {
  const t = useTranslations("Contact.form");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate form submission - replace with actual API call
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className="space-y-5"
    >
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {t("name")}
        </label>
        <input
          type="text"
          required
          className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border-default text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-spicy-400/50 focus:border-spicy-400 transition-all"
          placeholder={t("name")}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {t("email")}
        </label>
        <input
          type="email"
          required
          className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border-default text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-spicy-400/50 focus:border-spicy-400 transition-all"
          placeholder={t("email")}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {t("company")}
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border-default text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-spicy-400/50 focus:border-spicy-400 transition-all"
          placeholder={t("company")}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {t("service")}
        </label>
        <select
          required
          className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border-default text-foreground focus:outline-none focus:ring-2 focus:ring-spicy-400/50 focus:border-spicy-400 transition-all"
          defaultValue=""
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
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {t("message")}
        </label>
        <textarea
          required
          rows={5}
          className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border-default text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-spicy-400/50 focus:border-spicy-400 transition-all resize-none"
          placeholder={t("message")}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-spicy-400 text-white rounded-lg font-semibold hover:bg-spicy-500 transition-colors shadow-lg shadow-spicy-400/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
          </>
        )}
      </button>

      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-4 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
        >
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm">{t("success")}</span>
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20"
        >
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm">{t("error")}</span>
        </motion.div>
      )}
    </motion.form>
  );
}
