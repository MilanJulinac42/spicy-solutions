"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionHeadingProps {
  title: string;
  /** Rendered after the title in the serif accent face. */
  accent?: string;
  /** Short label above the title. */
  eyebrow?: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  /**
   * The page's own top heading should be an h1, and several pages are built
   * entirely from these sections — so their highest heading was an h2 and the
   * page had no h1 at all. Stays h2 everywhere else: one h1 per page.
   */
  as?: "h1" | "h2";
}

export function SectionHeading({
  title,
  accent,
  eyebrow,
  subtitle,
  centered = true,
  className = "",
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeInUp}
      className={`mb-12 md:mb-14 ${centered ? "text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-spicy-300">
          {eyebrow}
        </p>
      )}
      <Heading className="text-3xl md:text-4xl lg:text-[2.9rem] font-semibold leading-[1.1] text-foreground text-balance">
        {title}
        {accent && (
          <>
            {" "}
            <em className="accent-serif text-metal">{accent}</em>
          </>
        )}
      </Heading>
      {subtitle && (
        <p
          className={`mt-5 text-base md:text-lg text-foreground-muted leading-relaxed max-w-2xl text-pretty ${
            centered ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
