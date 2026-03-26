"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type IconType } from "react-icons";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiDotnet,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiVercel,
  SiOpenai,
  SiLangchain,
  SiN8N,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { Badge } from "@/components/ui/Badge";
import { staggerContainerFast, scaleSpring } from "@/lib/animations";
import {
  technologies,
  techCategories,
  type TechCategory,
} from "@/lib/constants";

const techIcons: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  React: SiReact,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  Python: SiPython,
  ".NET": SiDotnet,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  Docker: SiDocker,
  Vercel: SiVercel,
  AWS: FaAws,
  n8n: SiN8N,
  OpenAI: SiOpenai,
  LangChain: SiLangchain,
};

const techColors: Record<string, string> = {
  "Next.js": "group-hover:text-white group-hover:bg-white/10",
  React: "group-hover:text-sky-400 group-hover:bg-sky-400/10",
  TypeScript: "group-hover:text-blue-400 group-hover:bg-blue-400/10",
  "Tailwind CSS": "group-hover:text-cyan-400 group-hover:bg-cyan-400/10",
  "Node.js": "group-hover:text-green-400 group-hover:bg-green-400/10",
  Python: "group-hover:text-yellow-400 group-hover:bg-yellow-400/10",
  ".NET": "group-hover:text-violet-400 group-hover:bg-violet-400/10",
  PostgreSQL: "group-hover:text-blue-300 group-hover:bg-blue-300/10",
  MongoDB: "group-hover:text-green-400 group-hover:bg-green-400/10",
  Redis: "group-hover:text-red-400 group-hover:bg-red-400/10",
  Docker: "group-hover:text-sky-400 group-hover:bg-sky-400/10",
  Vercel: "group-hover:text-white group-hover:bg-white/10",
  AWS: "group-hover:text-amber-400 group-hover:bg-amber-400/10",
  n8n: "group-hover:text-orange-400 group-hover:bg-orange-400/10",
  OpenAI: "group-hover:text-emerald-400 group-hover:bg-emerald-400/10",
  LangChain: "group-hover:text-purple-400 group-hover:bg-purple-400/10",
};

export function TechStack() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState<"All" | TechCategory>(
    "All"
  );

  const filtered =
    activeCategory === "All"
      ? technologies
      : technologies.filter((tech) => tech.category === activeCategory);

  return (
    <section className="py-20 md:py-28 bg-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t("About.tech.title")}
          subtitle={t("About.tech.subtitle")}
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {techCategories.map((cat) => {
            const count =
              cat === "All"
                ? technologies.length
                : technologies.filter((tech) => tech.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "text-spicy-400"
                    : "text-foreground-muted hover:text-foreground-secondary"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryTab"
                    className="absolute inset-0 rounded-full bg-spicy-400/10 border border-spicy-400/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {cat}
                  <Badge>{count}</Badge>
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Tech Cards Grid */}
        <motion.div
          layout
          variants={staggerContainerFast}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((tech) => {
              const Icon = techIcons[tech.name];
              const colorClasses = techColors[tech.name] || "";
              return (
                <motion.div
                  key={tech.name}
                  layout
                  variants={scaleSpring}
                  initial="hidden"
                  animate="visible"
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    transition: { duration: 0.2 },
                  }}
                >
                  <TiltCard intensity={8}>
                    <div className="group p-5 rounded-2xl glass border border-border-default hover:border-spicy-400/30 hover:shadow-lg hover:shadow-spicy-400/5 transition-all duration-300 h-full">
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                        }}
                        className={`w-10 h-10 mb-3 flex items-center justify-center rounded-xl bg-spicy-400/10 text-spicy-400 transition-colors duration-300 ${colorClasses}`}
                      >
                        {Icon && <Icon className="w-5 h-5" />}
                      </motion.div>
                      <h4 className="text-sm font-semibold text-foreground">
                        {tech.name}
                      </h4>
                      <p className="text-xs text-foreground-muted mt-1">
                        {tech.description}
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
