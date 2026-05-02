"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Shield, Code2, Clock, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const trustPoints = [
  { icon: Code2, key: "code" },
  { icon: Shield, key: "ownership" },
  { icon: Clock, key: "speed" },
  { icon: Users, key: "direct" },
] as const;

export function WhyTrustUs() {
  const t = useTranslations("WhyTrustUs");

  return (
    <section className="py-20 md:py-28 bg-surface-secondary">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {trustPoints.map(({ icon: Icon, key }) => (
            <motion.div
              key={key}
              variants={fadeInUp}
              className="p-6 rounded-2xl bg-surface border border-border-default hover:border-spicy-400/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-spicy-400/10 text-spicy-400 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t(`${key}.title`)}
                  </h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {t(`${key}.description`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
