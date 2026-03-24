"use client";

import { motion } from "framer-motion";
import { Globe, Building2, Brain, Workflow, type LucideIcon } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Building2,
  Brain,
  Workflow,
};

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

export function ServiceCard({ icon, title, description }: ServiceCardProps) {
  const Icon = iconMap[icon] || Globe;

  return (
    <motion.div
      variants={fadeInUp}
      className="group relative p-6 md:p-8 rounded-2xl glass hover:border-spicy-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-spicy-400/10"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-spicy-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 rounded-2xl glass" />

      <div className="relative">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-spicy-400/10 text-spicy-400 mb-5 group-hover:bg-spicy-400 group-hover:text-white transition-colors duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-spicy-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-foreground-muted leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
