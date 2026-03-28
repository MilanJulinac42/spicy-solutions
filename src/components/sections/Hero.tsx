"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  fadeInUp,
  staggerContainer,
  textRevealContainer,
  textRevealWord,
} from "@/lib/animations";
import { useState, useCallback } from "react";

export function Hero() {
  const t = useTranslations("Hero");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    []
  );

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Mouse-follow gradient (desktop only) */}
      <div
        className="absolute inset-0 hidden md:block pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,107,53,0.06), transparent 60%)`,
        }}
      />

      {/* Animated background orbs (desktop only for performance) */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-spicy-400/20 rounded-full blur-[128px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-spicy-400/10 rounded-full blur-[128px] animate-pulse" style={{ animationDuration: '8s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,107,53,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Badge with shimmer */}
          <motion.div variants={fadeInUp}>
            <span className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-spicy-400/10 text-spicy-400 overflow-hidden">
              <span className="absolute inset-0 rounded-full border border-spicy-400/20" />
              <span className="absolute inset-0 rounded-full shimmer-border opacity-30" />
              <span className="relative flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-spicy-400 animate-pulse" />
                {t("badge")}
              </span>
            </span>
          </motion.div>

          {/* Main headline with word-by-word reveal */}
          <motion.h1
            variants={textRevealContainer}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
          >
            {t("title")
              .split(" ")
              .map((word, i) => (
                <motion.span
                  key={i}
                  variants={textRevealWord}
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
            <br />
            {t("titleHighlight")
              .split(" ")
              .map((word, i) => (
                <motion.span
                  key={`h-${i}`}
                  variants={textRevealWord}
                  className="inline-block mr-[0.3em] animated-gradient-text"
                >
                  {word}
                </motion.span>
              ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-lg md:text-xl text-foreground-muted leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-spicy-400 text-white rounded-lg text-base font-semibold hover:bg-spicy-500 transition-all shadow-lg shadow-spicy-400/25 hover:shadow-xl hover:shadow-spicy-400/40"
            >
              {t("cta")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-border-default text-foreground rounded-lg text-base font-semibold hover:border-spicy-400 hover:text-spicy-400 transition-all"
            >
              {t("ctaSecondary")}
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-foreground-muted" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
