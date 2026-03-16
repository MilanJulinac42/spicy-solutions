"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Shield,
  Eye,
  Handshake,
  Users,
  Flame,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";
import { technologies } from "@/lib/constants";

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
              <div className="aspect-square max-w-md mx-auto rounded-2xl bg-gradient-to-br from-spicy-400/20 via-spicy-400/10 to-transparent border border-border-default flex items-center justify-center">
                <Flame className="w-32 h-32 text-spicy-400/30" />
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
                  className="p-6 rounded-2xl bg-surface border border-border-default text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-xl bg-spicy-400/10 text-spicy-400">
                    <Icon className="w-6 h-6" />
                  </div>
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
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading title={t("About.team.title")} />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto"
          >
            {(["member1", "member2"] as const).map((member) => (
              <motion.div
                key={member}
                variants={fadeInUp}
                className="text-center p-8 rounded-2xl bg-surface-secondary border border-border-default"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-spicy-400 to-spicy-500 flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-foreground">
                  {t(`About.team.${member}.name`)}
                </h4>
                <p className="text-sm text-spicy-400 font-medium mb-2">
                  {t(`About.team.${member}.role`)}
                </p>
                <p className="text-sm text-foreground-muted">
                  {t(`About.team.${member}.bio`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Technologies */}
      <section className="py-20 md:py-28 bg-surface-secondary">
        <Container>
          <SectionHeading title={t("About.tech.title")} />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-wrap justify-center gap-3"
          >
            {technologies.map((tech) => (
              <motion.div key={tech} variants={fadeInUp}>
                <span className="inline-flex items-center px-4 py-2 rounded-lg bg-surface border border-border-default text-sm font-medium text-foreground-secondary hover:border-spicy-400/50 hover:text-spicy-400 transition-colors">
                  {tech}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
    </>
  );
}
