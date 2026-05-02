"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Shield,
  Eye,
  Handshake,
  MessageCircle,
  Wallet,
  Zap,
  Key,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
} from "@/lib/animations";
import { TechStack } from "@/components/sections/TechStack";
import { siteConfig } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

const valueIcons = {
  innovation: Lightbulb,
  quality: Shield,
  transparency: Eye,
  partnership: Handshake,
};

const valueKeys = ["innovation", "quality", "transparency", "partnership"] as const;

const whySoloIcons = {
  direct: MessageCircle,
  price: Wallet,
  speed: Zap,
  ownership: Key,
};

const whySoloKeys = ["direct", "price", "speed", "ownership"] as const;

export default function AboutPage() {
  const t = useTranslations();
  const waNumber = siteConfig.phone.replace(/[^0-9]/g, "");

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <Container>
          <SectionHeading
            title={t("About.title")}
            subtitle={t("About.subtitle")}
          />
        </Container>
      </section>

      {/* Intro — photo + bio */}
      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
            {/* Terminal-style intro card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeInLeft}
              className="lg:col-span-2"
            >
              <div className="relative max-w-md mx-auto">
                {/* Glow */}
                <div className="absolute -inset-3 rounded-3xl bg-spicy-400/15 blur-2xl opacity-60" />

                {/* Terminal window */}
                <div className="relative rounded-xl overflow-hidden border border-border-default bg-surface-secondary shadow-xl">
                  {/* Title bar */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-surface-tertiary border-b border-border-default">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="ml-2 text-xs text-foreground-muted font-mono">
                      milan@solvera ~ zsh
                    </span>
                  </div>

                  {/* Terminal body */}
                  <div className="p-5 md:p-6 font-mono text-[13px] md:text-sm space-y-4 leading-relaxed">
                    {/* whoami */}
                    <div>
                      <div>
                        <span className="text-spicy-400">~/solvera</span>
                        <span className="text-foreground-muted"> $ </span>
                        <span className="text-foreground">whoami</span>
                      </div>
                      <div className="pl-2 mt-1 text-foreground-secondary">
                        Milan Julinac
                      </div>
                      <div className="pl-2 text-foreground-muted text-xs">
                        full-stack inženjer · Novi Sad
                      </div>
                    </div>

                    {/* cat stack.txt */}
                    <div>
                      <div>
                        <span className="text-spicy-400">~/solvera</span>
                        <span className="text-foreground-muted"> $ </span>
                        <span className="text-foreground">cat stack.txt</span>
                      </div>
                      <div className="pl-2 mt-1 space-y-0.5 text-xs text-foreground-secondary">
                        <div>
                          <span className="text-purple-400">frontend</span>
                          <span className="text-foreground-muted"> → </span>
                          Next.js · React · TypeScript
                        </div>
                        <div>
                          <span className="text-purple-400">backend </span>
                          <span className="text-foreground-muted"> → </span>
                          Node.js · PostgreSQL
                        </div>
                        <div>
                          <span className="text-purple-400">cloud   </span>
                          <span className="text-foreground-muted"> → </span>
                          AWS · Vercel · Docker
                        </div>
                        <div>
                          <span className="text-purple-400">ai      </span>
                          <span className="text-foreground-muted"> → </span>
                          OpenAI · n8n · LangChain
                        </div>
                      </div>
                    </div>

                    {/* status */}
                    <div>
                      <div>
                        <span className="text-spicy-400">~/solvera</span>
                        <span className="text-foreground-muted"> $ </span>
                        <span className="text-foreground">status</span>
                      </div>
                      <div className="pl-2 mt-1 space-y-0.5 text-xs">
                        <div className="flex items-center gap-2">
                          <motion.span
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"
                          />
                          <span className="text-emerald-400">
                            Dostupan za nove projekte
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground-secondary">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-spicy-400" />
                          Odgovor &lt; 24h
                        </div>
                        <div className="flex items-center gap-2 text-foreground-secondary">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-spicy-400" />
                          Fiksna cena, fiksan rok
                        </div>
                      </div>
                    </div>

                    {/* Cursor */}
                    <div className="flex items-center pt-1">
                      <span className="text-spicy-400">~/solvera</span>
                      <span className="text-foreground-muted"> $ </span>
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-2 h-4 ml-0.5 bg-spicy-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeInRight}
              className="lg:col-span-3"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {t("About.intro.name")}
              </h2>
              <p className="text-spicy-400 font-medium mb-6">
                {t("About.intro.role")}
              </p>
              <p className="text-foreground-muted leading-relaxed mb-4">
                {t("About.intro.bio1")}
              </p>
              <p className="text-foreground-muted leading-relaxed mb-6">
                {t("About.intro.bio2")}
              </p>

              <div className="flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-secondary border border-border-default text-foreground-muted">
                  <MapPin className="w-3.5 h-3.5 text-spicy-400" />
                  {t("About.intro.locationLabel")}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-secondary border border-border-default text-foreground-muted">
                  <Zap className="w-3.5 h-3.5 text-spicy-400" />
                  {t("About.intro.experienceLabel")}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-secondary border border-border-default text-foreground-muted">
                  <Clock className="w-3.5 h-3.5 text-spicy-400" />
                  {t("About.intro.stackLabel")}
                </span>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 bg-surface-secondary">
        <Container>
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeInUp}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                {t("About.story.title")}
              </h3>
              <p className="text-foreground-muted leading-relaxed mb-4 text-base md:text-lg">
                {t("About.story.p1")}
              </p>
              <p className="text-foreground-muted leading-relaxed text-base md:text-lg">
                {t("About.story.p2")}
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Why Solo */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            title={t("About.whySolo.title")}
            subtitle={t("About.whySolo.subtitle")}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {whySoloKeys.map((key) => {
              const Icon = whySoloIcons[key];
              return (
                <motion.div
                  key={key}
                  variants={fadeInUp}
                  className="p-6 md:p-8 rounded-2xl glass hover:border-spicy-400/30 hover:shadow-lg hover:shadow-spicy-400/5 transition-all duration-300"
                >
                  <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-xl bg-spicy-400/10 text-spicy-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                    {t(`About.whySolo.${key}.title`)}
                  </h4>
                  <p className="text-sm md:text-base text-foreground-muted leading-relaxed">
                    {t(`About.whySolo.${key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-surface-secondary">
        <Container>
          <SectionHeading title={t("About.values.title")} />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
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

      {/* Technologies */}
      <TechStack />

      {/* Collaboration — transparency about external collaborators */}
      <section className="py-20 md:py-28 bg-surface-secondary">
        <Container>
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeInUp}
              className="p-8 md:p-10 rounded-2xl glass border border-border-default"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-spicy-400/10 text-spicy-400">
                  <Handshake className="w-5 h-5" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground">
                  {t("About.collaboration.title")}
                </h3>
              </div>
              <p className="text-foreground-muted leading-relaxed mb-3">
                {t("About.collaboration.p1")}
              </p>
              <p className="text-foreground-muted leading-relaxed">
                {t("About.collaboration.p2")}
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t("About.cta.title")}
            </h2>
            <p className="text-base md:text-lg text-foreground-muted mb-8 max-w-2xl mx-auto">
              {t("About.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/kontakt"
                onClick={() =>
                  trackEvent("cta_click", {
                    cta_location: "about_bottom",
                    cta_label: "schedule_call",
                    destination: "/kontakt",
                  })
                }
                className="group inline-flex items-center gap-2 px-8 py-4 bg-spicy-400 text-white rounded-lg text-base font-semibold hover:bg-spicy-500 transition-all shadow-lg shadow-spicy-400/25 hover:shadow-xl hover:shadow-spicy-400/40"
              >
                {t("About.cta.button")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("contact_click", {
                    channel: "whatsapp",
                    cta_location: "about_bottom",
                  })
                }
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-border-default text-foreground rounded-lg text-base font-semibold hover:border-spicy-400 hover:text-spicy-400 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                {t("About.cta.secondary")}
              </a>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
