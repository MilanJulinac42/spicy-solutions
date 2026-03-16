"use client";

import { motion, type Variants } from "framer-motion";

interface AnimatedElementProps {
  children: React.ReactNode;
  variants: Variants;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}

export function AnimatedElement({
  children,
  variants,
  className = "",
  as = "div",
}: AnimatedElementProps) {
  const Component = motion.create(as);

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      className={className}
    >
      {children}
    </Component>
  );
}
