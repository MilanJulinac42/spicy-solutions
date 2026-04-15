"use client";

import { Globe, Building2, Brain, Workflow } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { OptionCard } from "../OptionCard";
import type { ServiceType } from "@/types/calculator";

const services: { id: ServiceType; icon: typeof Globe }[] = [
  { id: "websites", icon: Globe },
  { id: "enterprise", icon: Building2 },
  { id: "ai", icon: Brain },
  { id: "automation", icon: Workflow },
];

type Props = {
  value: ServiceType | null;
  onChange: (v: ServiceType) => void;
};

export function ServiceTypeStep({ value, onChange }: Props) {
  const t = useTranslations("Calculator.serviceType");

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6 text-center">{t("title")}</h2>
      <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {services.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <OptionCard
              icon={s.icon}
              title={t(s.id)}
              description={t(`${s.id}Desc`)}
              selected={value === s.id}
              onClick={() => onChange(s.id)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
