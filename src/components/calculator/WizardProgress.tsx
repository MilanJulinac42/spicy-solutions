"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

const stepKeys = ["service", "scope", "timeline", "result"] as const;

export function WizardProgress({ currentStep }: { currentStep: number }) {
  const t = useTranslations("Calculator.steps");

  return (
    <div className="flex items-center justify-between mb-10 max-w-lg mx-auto">
      {stepKeys.map((key, i) => {
        const step = i + 1;
        const isCompleted = currentStep > step;
        const isActive = currentStep === step;

        return (
          <div key={key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  isCompleted
                    ? "bg-spicy-400 text-white"
                    : isActive
                    ? "bg-spicy-400 text-white shadow-lg shadow-spicy-400/30"
                    : "bg-surface-tertiary text-foreground-muted border border-border-default"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  isActive ? "text-spicy-400" : isCompleted ? "text-foreground" : "text-foreground-muted"
                }`}
              >
                {t(key)}
              </span>
            </div>
            {i < stepKeys.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 rounded-full transition-colors duration-300 ${
                  currentStep > step ? "bg-spicy-400" : "bg-border-default"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
