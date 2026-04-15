"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

type Props = {
  serviceType: string | null;
  scope: Record<string, unknown>;
  enabled: boolean;
};

export function ExitIntentPopup({ serviceType, scope, enabled }: Props) {
  const t = useTranslations("Calculator.exitIntent");
  const locale = useLocale();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!enabled || dismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !show && !dismissed) {
        setShow(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [enabled, show, dismissed]);

  function handleDismiss() {
    setShow(false);
    setDismissed(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          locale,
          source: "calculator-exit",
          need: serviceType || "unknown",
          conversation: { serviceType, partialScope: scope, exitIntent: true },
        }),
      });
      setSent(true);
      setTimeout(() => handleDismiss(), 2000);
    } catch {
      // silently fail
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60"
            onClick={handleDismiss}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed z-[61] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-surface border border-border-default rounded-2xl p-6 shadow-2xl"
          >
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!sent ? (
              <>
                <h3 className="text-lg font-bold text-foreground mb-2 pr-8">
                  {t("title")}
                </h3>
                <p className="text-sm text-foreground-muted mb-5">
                  {t("subtitle")}
                </p>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("placeholder")}
                    className="flex-1 px-4 py-3 rounded-lg bg-surface-secondary border border-border-default text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-spicy-400/50 focus:border-spicy-400 transition-all text-sm"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-spicy-400 text-white rounded-lg font-medium hover:bg-spicy-500 transition-colors shrink-0 cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-spicy-400 font-semibold">{t("success")}</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
