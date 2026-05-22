"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Calendar, ArrowRight, X } from "lucide-react";

const STORAGE_KEY = "solvera_topbanner_dismissed_v1";

const subscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};
const getSnapshot = () => window.localStorage.getItem(STORAGE_KEY);
const getServerSnapshot = () => null;

export function TopBanner() {
  const t = useTranslations("TopBanner");
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [localDismissed, setLocalDismissed] = useState(false);

  const dismiss = useCallback(() => {
    window.localStorage.setItem(STORAGE_KEY, "1");
    setLocalDismissed(true);
  }, []);

  if (stored || localDismissed) return null;

  return (
    <div className="relative z-50 bg-gradient-to-r from-spicy-500 via-spicy-400 to-spicy-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-3 text-center">
        <div className="hidden sm:flex items-center justify-center w-6 h-6 rounded-full bg-white/20 shrink-0">
          <Calendar className="w-3.5 h-3.5" />
        </div>
        <p className="text-xs sm:text-sm leading-tight">
          <span className="font-semibold uppercase tracking-wider mr-2 px-1.5 py-0.5 rounded bg-white/15">
            {t("highlight")}
          </span>
          <span className="opacity-95">{t("text")}</span>
          <Link
            href="/kontakt"
            className="ml-2 inline-flex items-center gap-1 font-semibold underline underline-offset-2 decoration-white/60 hover:decoration-white"
          >
            {t("cta")}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label={t("dismissAria")}
          className="ml-auto shrink-0 w-7 h-7 -mr-2 sm:mr-0 flex items-center justify-center rounded-md text-white/80 hover:text-white hover:bg-white/15 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
