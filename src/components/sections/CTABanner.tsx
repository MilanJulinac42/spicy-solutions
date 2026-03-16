"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const floatingDots = [
  { size: 6, top: "10%", left: "5%", duration: 6, delay: 0 },
  { size: 10, top: "20%", right: "10%", duration: 8, delay: 1 },
  { size: 4, bottom: "15%", left: "15%", duration: 5, delay: 0.5 },
  { size: 8, top: "60%", right: "20%", duration: 7, delay: 2 },
  { size: 5, bottom: "30%", left: "70%", duration: 9, delay: 1.5 },
  { size: 12, top: "40%", left: "85%", duration: 6.5, delay: 0.8 },
  { size: 3, top: "75%", left: "30%", duration: 7.5, delay: 2.5 },
  { size: 7, top: "15%", left: "50%", duration: 5.5, delay: 1.2 },
];

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

      {/* Floating animated circles */}
      {floatingDots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/20"
          style={{
            width: dot.size,
            height: dot.size,
            top: dot.top,
            left: dot.left,
            right: dot.right,
            bottom: dot.bottom,
          }}
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, 10, 0, -10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

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
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-spicy-500 rounded-lg text-base font-semibold hover:bg-white/90 transition-colors shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30"
              style={{
                boxShadow:
                  "0 0 20px rgba(255,255,255,0.3), 0 10px 40px rgba(0,0,0,0.2)",
              }}
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
