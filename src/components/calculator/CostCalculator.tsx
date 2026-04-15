"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { WizardProgress } from "./WizardProgress";
import { ServiceTypeStep } from "./steps/ServiceTypeStep";
import { ProjectScopeStep } from "./steps/ProjectScopeStep";
import { TimelineStep } from "./steps/TimelineStep";
import { ResultsStep } from "./steps/ResultsStep";
import { ExitIntentPopup } from "./ExitIntentPopup";
import { calculatePriceRange } from "@/data/calculatorPricing";
import type { ServiceType, TimelineOption, PriceRange, ProjectScope } from "@/types/calculator";

export function CostCalculator() {
  const t = useTranslations("Calculator");
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [serviceType, setServiceType] = useState<ServiceType | null>(null);
  const [scope, setScope] = useState<Record<string, unknown>>({});
  const [timeline, setTimeline] = useState<TimelineOption | null>(null);
  const [result, setResult] = useState<PriceRange | null>(null);

  const handleScopeChange = useCallback((key: string, value: unknown) => {
    setScope((prev) => ({ ...prev, [key]: value }));
  }, []);

  function isScopeComplete(): boolean {
    if (!serviceType) return false;
    switch (serviceType) {
      case "websites":
        return !!(scope.projectType && scope.pages && scope.cms !== undefined && scope.customDesign !== undefined);
      case "enterprise":
        return !!(scope.projectType && scope.complexity && scope.auth !== undefined && scope.integrations);
      case "ai":
        return !!(scope.projectType && scope.knowledgeSource && scope.multiLang !== undefined && scope.analytics !== undefined);
      case "automation":
        return !!(scope.workflowCount && scope.complexity && scope.integrations && scope.monitoring !== undefined);
    }
  }

  function canProceed(): boolean {
    switch (step) {
      case 1:
        return serviceType !== null;
      case 2:
        return isScopeComplete();
      case 3:
        return timeline !== null;
      default:
        return false;
    }
  }

  function goNext() {
    if (!canProceed()) return;
    setDirection(1);

    if (step === 3 && serviceType && timeline) {
      const price = calculatePriceRange(serviceType, scope as ProjectScope, timeline);
      setResult(price);
    }
    setStep((s) => s + 1);
  }

  function goBack() {
    setDirection(-1);
    setStep((s) => s - 1);
  }

  function startOver() {
    setDirection(-1);
    setStep(1);
    setServiceType(null);
    setScope({});
    setTimeline(null);
    setResult(null);
  }

  function handleServiceSelect(s: ServiceType) {
    if (s !== serviceType) {
      setScope({});
    }
    setServiceType(s);
  }

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({
      x: d > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <div className="max-w-3xl mx-auto">
      <ExitIntentPopup
        serviceType={serviceType}
        scope={scope}
        enabled={step >= 2 && step < 4}
      />
      <WizardProgress currentStep={step} />

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
            {step === 1 && (
              <ServiceTypeStep value={serviceType} onChange={handleServiceSelect} />
            )}
            {step === 2 && serviceType && (
              <ProjectScopeStep serviceType={serviceType} scope={scope} onChange={handleScopeChange} />
            )}
            {step === 3 && <TimelineStep value={timeline} onChange={setTimeline} />}
            {step === 4 && result && serviceType && timeline && (
              <ResultsStep
                priceRange={result}
                serviceType={serviceType}
                timeline={timeline}
                scope={scope}
                onStartOver={startOver}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      {step < 4 && (
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border-default">
          {step > 1 ? (
            <button
              onClick={goBack}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("back")}
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={goNext}
            disabled={!canProceed()}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-spicy-400 text-white rounded-lg font-medium hover:bg-spicy-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            {t("next")}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
