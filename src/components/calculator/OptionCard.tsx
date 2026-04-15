"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type OptionCardProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
};

export function OptionCard({ title, description, icon: Icon, selected, onClick, compact }: OptionCardProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full text-left rounded-xl border-2 transition-colors cursor-pointer ${
        compact ? "px-4 py-3" : "p-5"
      } ${
        selected
          ? "border-spicy-400 bg-spicy-400/10"
          : "border-border-default bg-surface-secondary hover:border-spicy-400/40"
      }`}
    >
      <div className="flex items-start gap-3">
        {Icon && (
          <div
            className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
              selected ? "bg-spicy-400/20 text-spicy-400" : "bg-surface-tertiary text-foreground-muted"
            }`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div className="min-w-0">
          <p className={`font-medium ${selected ? "text-spicy-400" : "text-foreground"} ${compact ? "text-sm" : ""}`}>
            {title}
          </p>
          {description && (
            <p className="text-xs text-foreground-muted mt-0.5 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </motion.button>
  );
}
