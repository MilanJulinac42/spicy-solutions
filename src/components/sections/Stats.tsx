"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { fadeInUp, staggerContainer } from "@/lib/animations";

function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [started, target, duration]);

  return { count, start: () => setStarted(true) };
}

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
}

function StatItem({ value, suffix, label }: StatItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { count, start } = useCounter(value);

  useEffect(() => {
    if (isInView) start();
  }, [isInView, start]);

  return (
    <motion.div ref={ref} variants={fadeInUp} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-spicy-400">
        {count}
        <span>{suffix}</span>
      </div>
      <div className="mt-2 text-sm text-foreground-muted">{label}</div>
    </motion.div>
  );
}

export function Stats() {
  const t = useTranslations("Stats");

  const stats = [
    { value: 50, suffix: "+", label: t("projects") },
    { value: 30, suffix: "+", label: t("clients") },
    { value: 20, suffix: "+", label: t("technologies") },
    { value: 5, suffix: "+", label: t("experience") },
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
