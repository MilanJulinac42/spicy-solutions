"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, CheckCircle2, Shield } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/features/ContactForm";
import { fadeInRight } from "@/lib/animations";
import { siteConfig } from "@/lib/constants";

export default function ContactPage() {
  const t = useTranslations();

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <SectionHeading
            title={t("Contact.title")}
            subtitle={t("Contact.subtitle")}
          />
        </Container>
      </section>

      {/* Contact Content */}
      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              {/* Free IT Audit info card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-spicy-400/10 via-spicy-400/5 to-transparent border border-spicy-400/20 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-spicy-400/10 text-spicy-400">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {t("Contact.audit.title")}
                  </h3>
                </div>
                <p className="text-sm text-foreground-muted mb-4">
                  {t("Contact.audit.description")}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-foreground-secondary">
                    <CheckCircle2 className="w-4 h-4 text-spicy-400 shrink-0 mt-0.5" />
                    <span>{t("Contact.audit.bullets.b1")}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground-secondary">
                    <CheckCircle2 className="w-4 h-4 text-spicy-400 shrink-0 mt-0.5" />
                    <span>{t("Contact.audit.bullets.b2")}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground-secondary">
                    <CheckCircle2 className="w-4 h-4 text-spicy-400 shrink-0 mt-0.5" />
                    <span>{t("Contact.audit.bullets.b3")}</span>
                  </li>
                </ul>
              </div>

              <ContactForm />
            </div>

            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInRight}
              className="lg:pl-8"
            >
              <h3 className="text-xl font-semibold text-foreground mb-6">
                {t("Contact.info.title")}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-spicy-400/10 text-spicy-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground-muted mb-1">Email</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-foreground hover:text-spicy-400 transition-colors"
                    >
                      {t("Contact.info.email")}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-spicy-400/10 text-spicy-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground-muted mb-1">Phone</p>
                    <span className="text-foreground">
                      {t("Contact.info.phone")}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-spicy-400/10 text-spicy-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground-muted mb-1">
                      Address
                    </p>
                    <span className="text-foreground">
                      {t("Contact.info.address")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-10">
                <h4 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-4">
                  {t("Contact.info.social")}
                </h4>
                <div className="flex items-center gap-3">
                  <a
                    href={siteConfig.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-surface-secondary border border-border-default hover:border-spicy-400/50 hover:text-spicy-400 transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={siteConfig.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-surface-secondary border border-border-default hover:border-spicy-400/50 hover:text-spicy-400 transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={siteConfig.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-surface-secondary border border-border-default hover:border-spicy-400/50 hover:text-spicy-400 transition-all"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Decorative card */}
              <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-spicy-400/10 to-transparent border border-spicy-400/20">
                <p className="text-sm text-foreground-muted leading-relaxed">
                  <span className="text-spicy-400 font-semibold">
                    Spicy Solutions
                  </span>{" "}
                  — {t("Footer.description")}
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
