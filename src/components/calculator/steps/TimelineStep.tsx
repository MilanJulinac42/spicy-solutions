"use client";

import { Clock, Zap, Flame } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { OptionCard } from "../OptionCard";
import type { TimelineOption } from "@/types/calculator";

const options: { id: TimelineOption; icon: typeof Clock }[] = [
  { id: "standard", icon: Clock },
  { id: "priority", icon: Zap },
  { id: "urgent", icon: Flame },
];

type Props = {
  value: TimelineOption | null;
  onChange: (v: TimelineOption) => void;
};

export function TimelineStep({ value, onChange }: Props) {
  const t = useTranslations("Calculator.timeline");

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6 text-center">{t("title")}</h2>
      <div className="grid gap-4 max-w-lg mx-auto">
        {options.map((o, i) => (
          <motion.div
            key={o.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <OptionCard
              icon={o.icon}
              title={t(o.id)}
              description={t(`${o.id}Desc`)}
              selected={value === o.id}
              onClick={() => onChange(o.id)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
