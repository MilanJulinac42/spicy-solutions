"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "sr" : "en";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-tertiary hover:bg-spicy-400/10 transition-colors text-sm font-medium text-foreground-secondary hover:text-spicy-400 cursor-pointer"
      aria-label="Switch language"
    >
      <Languages className="w-4 h-4" />
      <span className="uppercase">{locale === "en" ? "SR" : "EN"}</span>
    </button>
  );
}
