"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  X,
  Globe,
  Building2,
  Brain,
  Workflow,
  ShoppingCart,
  LayoutDashboard,
  FileText,
  Monitor,
  ChevronDown,
  ArrowRight,
  MessageCircleQuestion,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import {
  slideInRight,
  slideUpFull,
  fadeIn,
  staggerContainerFast,
  fadeInUp,
  scaleSpring,
} from "@/lib/animations";
import { services } from "@/data/services";
import Link from "next/link";
import { useState } from "react";

interface ServiceDetailPanelProps {
  serviceId: string;
  onClose: () => void;
}

const serviceIcons: Record<string, React.ElementType> = {
  websites: Globe,
  enterprise: Building2,
  ai: Brain,
  automation: Workflow,
};

const exampleIconsMap: Record<string, React.ElementType[]> = {
  websites: [Monitor, ShoppingCart, LayoutDashboard, FileText],
  enterprise: [Building2, Workflow, LayoutDashboard, Globe],
  ai: [Brain, Monitor, FileText, Globe],
  automation: [Workflow, FileText, Monitor, ShoppingCart],
};

const detailAvailable = ["websites", "enterprise", "ai", "automation"];

export function ServiceDetailPanel({
  serviceId,
  onClose,
}: ServiceDetailPanelProps) {
  const t = useTranslations();

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const service = services.find((s) => s.id === serviceId);
  if (!service) return null;

  const hasDetail = detailAvailable.includes(serviceId);
  const Icon = serviceIcons[serviceId] || Globe;

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      />

      {/* Desktop */}
      <motion.div
        className="fixed inset-y-0 right-0 w-full md:w-[60vw] lg:w-[50vw] bg-surface z-50 overflow-y-auto border-l border-border-default shadow-2xl hidden md:block"
        variants={slideInRight}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <PanelContent
          serviceId={serviceId}
          service={service}
          Icon={Icon}
          hasDetail={hasDetail}
          onClose={onClose}
        />
      </motion.div>

      {/* Mobile */}
      <motion.div
        className="fixed inset-0 bg-surface z-50 overflow-y-auto md:hidden"
        variants={slideUpFull}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <PanelContent
          serviceId={serviceId}
          service={service}
          Icon={Icon}
          hasDetail={hasDetail}
          onClose={onClose}
        />
      </motion.div>
    </>
  );
}

function PanelContent({
  serviceId,
  service,
  Icon,
  hasDetail,
  onClose,
}: {
  serviceId: string;
  service: (typeof services)[0];
  Icon: React.ElementType;
  hasDetail: boolean;
  onClose: () => void;
}) {
  const t = useTranslations();

  return (
    <div className="p-6 md:p-10">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-surface-secondary border border-border-default hover:border-spicy-400/30 hover:bg-spicy-400/10 transition-all z-10 cursor-pointer"
      >
        <X className="w-5 h-5 text-foreground-muted" />
      </button>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-spicy-400/10 text-spicy-400">
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold gradient-text">
            {t(`Services.${serviceId}.title`)}
          </h2>
        </div>
      </div>

      {hasDetail ? (
        <>
          {/* Extended description */}
          <p className="text-foreground-muted leading-relaxed mb-8 text-base">
            {t(`Services.${serviceId}.detail.extendedDescription`)}
          </p>

          {/* Examples */}
          <motion.div
            variants={staggerContainerFast}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <h3 className="text-lg font-semibold text-foreground mb-5">
              {t(`Services.${serviceId}.detail.examplesTitle`)}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["e1", "e2", "e3", "e4"].map((key, index) => {
                const icons = exampleIconsMap[serviceId] || exampleIconsMap.websites;
                const ExIcon = icons[index];
                return (
                  <motion.div
                    key={key}
                    variants={fadeInUp}
                    className="p-4 rounded-xl bg-surface-secondary border border-border-default hover:border-spicy-400/20 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-spicy-400/10 text-spicy-400 flex-shrink-0 mt-0.5">
                        <ExIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm mb-1">
                          {t(
                            `Services.${serviceId}.detail.examples.${key}.title`
                          )}
                        </h4>
                        <p className="text-xs text-foreground-muted leading-relaxed">
                          {t(
                            `Services.${serviceId}.detail.examples.${key}.description`
                          )}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Technologies */}
          <motion.div
            variants={staggerContainerFast}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech) => (
                <motion.div
                  key={tech}
                  variants={scaleSpring}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge>{tech}</Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            variants={staggerContainerFast}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <div className="flex items-center gap-2 mb-5">
              <MessageCircleQuestion className="w-5 h-5 text-spicy-400" />
              <h3 className="text-lg font-semibold text-foreground">
                {t(`Services.${serviceId}.detail.faqTitle`)}
              </h3>
            </div>

            <div className="space-y-3">
              {["q1", "q2", "q3", "q4"].map((key) => (
                <FAQItem
                  key={key}
                  question={t(
                    `Services.${serviceId}.detail.faq.${key}.question`
                  )}
                  answer={t(
                    `Services.${serviceId}.detail.faq.${key}.answer`
                  )}
                />
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <Link
              href="/kontakt"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-8 py-4 bg-spicy-400 text-white rounded-lg text-base font-semibold hover:bg-spicy-500 transition-colors shadow-lg shadow-spicy-400/25 w-full sm:w-auto justify-center"
            >
              {t(`Services.${serviceId}.detail.ctaText`)}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </>
      ) : (
        /* Coming soon */
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-full max-w-sm p-8 rounded-2xl border-2 border-dashed border-border-default text-center">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-xl bg-spicy-400/10 text-spicy-400">
              <Icon className="w-6 h-6" />
            </div>
            <p className="text-foreground-muted mb-6">
              {t("Services.detailComingSoon")}
            </p>
            <Link
              href="/kontakt"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-6 py-3 bg-spicy-400 text-white rounded-lg text-sm font-semibold hover:bg-spicy-500 transition-colors"
            >
              {t("Services.cta.button")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className="rounded-xl bg-surface-secondary border border-border-default overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
      >
        <span className="font-medium text-sm text-foreground pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-foreground-muted flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <p className="px-4 pb-4 text-sm text-foreground-muted leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
}
