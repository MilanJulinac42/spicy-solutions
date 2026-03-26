"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Shield,
  Eye,
  Handshake,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";
import { TechStack } from "@/components/sections/TechStack";
import { TeamSection } from "@/components/features/TeamSection";

const valueIcons = {
  innovation: Lightbulb,
  quality: Shield,
  transparency: Eye,
  partnership: Handshake,
};

const valueKeys = ["innovation", "quality", "transparency", "partnership"] as const;

export default function AboutPage() {
  const t = useTranslations();

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <SectionHeading
            title={t("About.title")}
            subtitle={t("About.subtitle")}
          />
        </Container>
      </section>

      {/* Our Story */}
      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInLeft}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                {t("About.story.title")}
              </h3>
              <p className="text-foreground-muted leading-relaxed mb-4">
                {t("About.story.p1")}
              </p>
              <p className="text-foreground-muted leading-relaxed">
                {t("About.story.p2")}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInRight}
            >
              <div className="aspect-square max-w-md mx-auto rounded-2xl bg-surface-secondary border border-border-default overflow-hidden">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-surface-tertiary border-b border-border-default">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-foreground-muted font-mono">solvera</span>
                </div>
                {/* Terminal content */}
                <div className="p-4 font-mono text-sm space-y-2">
                  <div className="text-spicy-400">$ <span className="text-foreground-secondary">npm run build</span></div>
                  <div className="text-emerald-400">✓ Compiled successfully</div>
                  <div className="text-foreground-muted">→ Deployed in record time</div>
                  <div className="text-foreground-muted">→ Zero vendor lock-in</div>
                  <div className="text-foreground-muted">→ Modern tech stack</div>
                  <div className="text-spicy-400 mt-4">$ <span className="text-foreground-secondary">deploy --production</span></div>
                  <div className="text-emerald-400">✓ Deployed to production</div>
                  <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="text-spicy-400">▌</motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-surface-secondary">
        <Container>
          <SectionHeading
            title={t("About.values.title")}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {valueKeys.map((key) => {
              const Icon = valueIcons[key];
              return (
                <motion.div
                  key={key}
                  variants={fadeInUp}
                  className="p-6 rounded-2xl glass text-center hover:border-spicy-400/30 hover:shadow-lg hover:shadow-spicy-400/5 transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-xl bg-spicy-400/10 text-spicy-400"
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {t(`About.values.${key}.title`)}
                  </h4>
                  <p className="text-sm text-foreground-muted">
                    {t(`About.values.${key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* Team */}
      <TeamSection />

      {/* Technologies */}
      <TechStack />
    </>
  );
}
