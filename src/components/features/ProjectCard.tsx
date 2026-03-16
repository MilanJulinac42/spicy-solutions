"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { fadeInUp } from "@/lib/animations";
import { TiltCard } from "@/components/ui/TiltCard";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  category: string;
}

const categoryGradients: Record<string, string> = {
  website: "from-blue-500 via-indigo-500 to-purple-500",
  enterprise: "from-purple-500 via-pink-500 to-rose-500",
  ai: "from-emerald-500 via-teal-500 to-cyan-500",
  automation: "from-amber-500 via-orange-500 to-red-500",
};

export function ProjectCard({
  title,
  description,
  technologies,
  category,
}: ProjectCardProps) {
  return (
    <TiltCard intensity={8}>
      <motion.div
        variants={fadeInUp}
        whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
        className="group relative rounded-2xl bg-surface-secondary border border-border-default hover:border-spicy-400/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-spicy-400/10"
      >
        {/* Animated gradient image placeholder */}
        <div
          className={`h-48 bg-gradient-to-br ${categoryGradients[category] || categoryGradients.website} animated-mesh relative overflow-hidden`}
        >
          {/* Grid overlay pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.15) 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          />

          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500" />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors"
            >
              <ExternalLink className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </motion.div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-spicy-400 transition-colors duration-300">
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
    </TiltCard>
  );
}
