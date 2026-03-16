"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-spicy-400/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-spicy-400/10 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-spicy-400/5 rounded-full blur-[128px]" />
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
          {/* Badge */}
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-spicy-400/10 text-spicy-400 border border-spicy-400/20">
              <span className="w-1.5 h-1.5 rounded-full bg-spicy-400 animate-pulse" />
              IT Outsourcing & Digital Solutions
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
          >
            {t("title")}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-spicy-400 to-spicy-300">
              {t("titleHighlight")}
            </span>
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
              className="inline-flex items-center gap-2 px-8 py-4 bg-spicy-400 text-white rounded-lg text-base font-semibold hover:bg-spicy-500 transition-all shadow-lg shadow-spicy-400/25 hover:shadow-xl hover:shadow-spicy-400/30"
            >
              {t("cta")}
              <ArrowRight className="w-4 h-4" />
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
