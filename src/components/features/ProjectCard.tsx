"use client";

import { motion } from "framer-motion";
import { Globe, Building2, Brain, Workflow, ShoppingCart, Bot, Repeat, Unlock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { fadeInUp } from "@/lib/animations";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  category: string;
}

const categoryIcons: Record<string, React.ElementType> = {
  website: ShoppingCart,
  ai: Bot,
  automation: Repeat,
  enterprise: Unlock,
};

const categoryAccents: Record<string, { bg: string; border: string; icon: string; glow: string }> = {
  enterprise: {
    bg: "from-spicy-400/10 via-spicy-400/5 to-transparent",
    border: "border-spicy-400/20",
    icon: "text-spicy-400 bg-spicy-400/10",
    glow: "group-hover:shadow-spicy-400/10",
  },
  ai: {
    bg: "from-emerald-400/10 via-emerald-400/5 to-transparent",
    border: "border-emerald-400/20",
    icon: "text-emerald-400 bg-emerald-400/10",
    glow: "group-hover:shadow-emerald-400/10",
  },
  automation: {
    bg: "from-violet-400/10 via-violet-400/5 to-transparent",
    border: "border-violet-400/20",
    icon: "text-violet-400 bg-violet-400/10",
    glow: "group-hover:shadow-violet-400/10",
  },
  website: {
    bg: "from-sky-400/10 via-sky-400/5 to-transparent",
    border: "border-sky-400/20",
    icon: "text-sky-400 bg-sky-400/10",
    glow: "group-hover:shadow-sky-400/10",
  },
};

export function ProjectCard({
  title,
  description,
  technologies,
  category,
}: ProjectCardProps) {
  const Icon = categoryIcons[category] || Globe;
  const accent = categoryAccents[category] || categoryAccents.enterprise;

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className={`group relative rounded-2xl bg-surface-secondary border ${accent.border} hover:border-spicy-400/40 overflow-hidden transition-all duration-300 hover:shadow-xl ${accent.glow}`}
    >
      {/* Subtle gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${accent.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative p-6 md:p-8">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl ${accent.icon} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="w-6 h-6" />
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-spicy-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-foreground-muted leading-relaxed mb-5">
          {description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
