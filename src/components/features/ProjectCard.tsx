"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { fadeInUp } from "@/lib/animations";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  category: string;
}

const categoryColors: Record<string, string> = {
  website: "from-blue-500 to-blue-600",
  enterprise: "from-purple-500 to-purple-600",
  ai: "from-emerald-500 to-emerald-600",
  automation: "from-amber-500 to-amber-600",
};

export function ProjectCard({
  title,
  description,
  technologies,
  category,
}: ProjectCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl bg-surface-secondary border border-border-default hover:border-spicy-400/50 overflow-hidden transition-all duration-300"
    >
      {/* Project image placeholder with gradient */}
      <div
        className={`h-48 bg-gradient-to-br ${categoryColors[category] || categoryColors.website} relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <ExternalLink className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-spicy-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-foreground-muted leading-relaxed mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
