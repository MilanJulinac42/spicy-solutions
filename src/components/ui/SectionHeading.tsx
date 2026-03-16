"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className = "",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className={`mb-12 md:mb-16 ${centered ? "text-center" : ""} ${className}`}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "4rem" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className={`mt-4 h-1 bg-spicy-400 rounded-full ${centered ? "mx-auto" : ""}`}
      />
    </motion.div>
  );
}
