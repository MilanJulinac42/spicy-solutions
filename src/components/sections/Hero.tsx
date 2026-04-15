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
import { TerminalAnimation } from "@/components/hero/TerminalAnimation";

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
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Mouse-follow gradient (desktop only) */}
      <div
        className="absolute inset-0 hidden md:block pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,107,53,0.06), transparent 60%)`,
        }}
      />

      {/* Animated background orbs (desktop only) */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-spicy-400/20 rounded-full blur-[128px] animate-pulse"
          style={{ animationDuration: "6s" }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-spicy-400/10 rounded-full blur-[128px] animate-pulse"
          style={{ animationDuration: "8s" }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,107,53,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8 text-center lg:text-left"
          >
            {/* Badge with shimmer */}
            <motion.div variants={fadeInUp} className="hidden sm:block">
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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-7xl font-bold text-foreground leading-tight"
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
              className="max-w-xl text-base sm:text-lg md:text-xl text-foreground-muted leading-relaxed lg:mx-0 mx-auto"
            >
              {t("subtitle")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-spicy-400 text-white rounded-lg text-base font-semibold hover:bg-spicy-500 transition-all shadow-lg shadow-spicy-400/25 hover:shadow-xl hover:shadow-spicy-400/40"
              >
                {t("cta")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-border-default text-foreground rounded-lg text-base font-semibold hover:border-spicy-400 hover:text-spicy-400 transition-all"
              >
                {t("ctaCalculator")}
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Terminal Animation — desktop with 3D perspective */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-8 bg-spicy-400/[0.04] rounded-3xl blur-3xl" />
            <div className="relative" style={{ perspective: "1200px" }}>
              <div
                className="transition-transform duration-700"
                style={{ transform: "rotateY(-2deg) rotateX(1deg)" }}
              >
                <TerminalAnimation />
              </div>
            </div>
          </motion.div>

          {/* Terminal — mobile (no perspective, compact) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="lg:hidden mx-auto max-w-md w-full"
          >
            <TerminalAnimation />
          </motion.div>
        </div>
      </div>

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
    </section>
  );
}
