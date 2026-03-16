"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function CTABanner() {
  const t = useTranslations("CTA");

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Orange gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-spicy-500 via-spicy-400 to-spicy-300" />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-white/80"
          >
            {t("subtitle")}
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-spicy-500 rounded-lg text-base font-semibold hover:bg-white/90 transition-colors shadow-xl"
            >
              {t("button")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
