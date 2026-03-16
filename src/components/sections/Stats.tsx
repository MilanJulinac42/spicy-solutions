"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { fadeInUp, staggerContainer } from "@/lib/animations";

function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const rawProgress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - rawProgress, 3);
      setCount(Math.floor(eased * target));
      setProgress(eased);
      if (rawProgress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [started, target, duration]);

  return { count, progress, start: () => setStarted(true) };
}

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
}

function StatItem({ value, suffix, label }: StatItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { count, progress, start } = useCounter(value);

  useEffect(() => {
    if (isInView) start();
  }, [isInView, start]);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <motion.div ref={ref} variants={fadeInUp} className="text-center">
      <div className="relative inline-flex items-center justify-center w-32 h-32 md:w-36 md:h-36">
        {/* Circular progress ring SVG */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 120 120"
        >
          {/* Background ring */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-spicy-400/10"
          />
          {/* Animated progress ring */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-spicy-400 transition-[stroke-dashoffset] duration-75"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: isInView ? strokeDashoffset : circumference,
            }}
          />
        </svg>
        {/* Stat number */}
        <div className="relative text-4xl md:text-5xl font-bold text-spicy-400">
          {count}
          <span>{suffix}</span>
        </div>
      </div>
      <div className="mt-2 text-sm text-foreground-muted flex items-center justify-center gap-2">
        {/* Pulsing dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-spicy-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-spicy-400" />
        </span>
        {label}
      </div>
    </motion.div>
  );
}

export function Stats() {
  const t = useTranslations("Stats");

  const stats = [
    { value: 60, suffix: "%", label: t("savings") },
    { value: 70, suffix: "%", label: t("cheaper") },
    { value: 200, suffix: "+", label: t("hours") },
    { value: 100, suffix: "%", label: t("satisfaction") },
  ];

  return (
    <section className="py-20 md:py-28 bg-surface-secondary">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
