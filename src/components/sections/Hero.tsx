"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  fadeInUp,
  staggerContainer,
  textRevealContainer,
  textRevealWord,
} from "@/lib/animations";
import { useRef, useCallback } from "react";
import { TerminalAnimation } from "@/components/hero/TerminalAnimation";

export function Hero() {
  const t = useTranslations("Hero");
  const heroRef = useRef<HTMLElement>(null);

  /* ── 3D Tilt (reuses TiltCard pattern) ── */
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 25 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width; // 0–1
      const my = (e.clientY - rect.top) / rect.height;
      const cx = mx - 0.5; // -0.5–0.5
      const cy = my - 0.5;

      rotateX.set(cy * -10);
      rotateY.set(cx * 10);

      // Update CSS custom props for spotlight + glare (no rAF needed)
      el.style.setProperty("--spot-x", `${mx * 100}%`);
      el.style.setProperty("--spot-y", `${my * 100}%`);
    },
    [rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    heroRef.current?.style.setProperty("--spot-x", "50%");
    heroRef.current?.style.setProperty("--spot-y", "50%");
  }, [rotateX, rotateY]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden noise-overlay hero-beam"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        { "--spot-x": "50%", "--spot-y": "50%" } as React.CSSProperties
      }
    >
      {/* ── Aurora Background ── */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        <div
          className="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, #FF6B35 0%, transparent 70%)",
            top: "10%",
            left: "-10%",
            animation: "aurora-1 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
            top: "50%",
            right: "-5%",
            animation: "aurora-2 25s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[700px] h-[700px] rounded-full blur-[120px] opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)",
            bottom: "-10%",
            left: "30%",
            animation: "aurora-3 18s ease-in-out infinite",
          }}
        />
      </div>

      {/* ── Mouse-follow spotlight ── */}
      <div
        className="absolute inset-0 hidden md:block pointer-events-none"
        style={{
          background:
            "radial-gradient(800px circle at var(--spot-x) var(--spot-y), rgba(255,107,53,0.1), transparent 60%)",
        }}
      />

      {/* ── Grid pattern ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,107,53,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 lg:py-0 z-[2]">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8 text-center lg:text-left"
          >
            {/* Badge */}
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

            {/* Headline */}
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
                    className="inline-block mr-[0.3em] headline-shimmer"
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

          {/* Right: Interactive 3D Terminal — Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            {/* Holographic glow behind terminal */}
            <div
              className="absolute -inset-6 rounded-3xl blur-2xl opacity-30"
              style={{
                background:
                  "conic-gradient(from var(--holo-angle, 0deg), rgba(255,107,53,0.2), rgba(139,92,246,0.2), rgba(6,182,212,0.2), rgba(16,185,129,0.2), rgba(255,107,53,0.2))",
                animation: "holo-spin 6s linear infinite",
              }}
            />

            {/* 3D Tilt container */}
            <div style={{ perspective: 1200 }}>
              <motion.div
                style={{
                  rotateX: springX,
                  rotateY: springY,
                  transformStyle: "preserve-3d",
                }}
                className="will-change-transform relative"
              >
                {/* Mouse glare overlay */}
                <div
                  className="absolute inset-0 z-10 rounded-xl pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at var(--spot-x) var(--spot-y), rgba(255,255,255,0.07) 0%, transparent 60%)",
                  }}
                />
                <div className="holo-border rounded-xl">
                  <TerminalAnimation />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Terminal — Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="lg:hidden mx-auto max-w-md w-full"
          >
            <div className="holo-border rounded-xl">
              <TerminalAnimation />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]"
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
