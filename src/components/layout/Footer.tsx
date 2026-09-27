"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Linkedin, Instagram, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { siteConfig } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";

const WHATSAPP_URL = `https://wa.me/${siteConfig.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Zdravo! Interesuje me besplatna konsultacija."
)}`;

const linkCls = "text-sm text-foreground-muted hover:text-foreground transition-colors";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="relative bg-surface border-t border-border-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <Logo size={36} />
            <p className="mt-5 max-w-xs text-sm text-foreground-muted leading-relaxed">
              {t("Footer.description")}
            </p>
            <Link
              href="/probni-sajt"
              className="btn-metal mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              {t("Navbar.getStarted")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <nav className="lg:col-span-2" aria-label={t("Footer.quickLinks")}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-secondary mb-4">
              {t("Footer.quickLinks")}
            </h3>
            <ul className="space-y-3">
              <li><Link href="/usluge" className={linkCls}>{t("Navbar.services")}</Link></li>
              <li><Link href="/cene" className={linkCls}>{t("Navbar.pricing")}</Link></li>
              <li><Link href="/radovi" className={linkCls}>{t("Navbar.work")}</Link></li>
              <li><Link href="/proces" className={linkCls}>{t("Navbar.process")}</Link></li>
              <li><Link href="/o-solveri" className={linkCls}>{t("Navbar.about")}</Link></li>
              <li><Link href="/blog" className={linkCls}>{t("Navbar.blog")}</Link></li>
              <li><Link href="/kontakt" className={linkCls}>{t("Navbar.contact")}</Link></li>
            </ul>
          </nav>

          <nav className="lg:col-span-3" aria-label={t("Footer.services")}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-secondary mb-4">
              {t("Footer.services")}
            </h3>
            <ul className="space-y-3">
              <li><Link href="/usluge/websites" className={linkCls}>{t("ServicesOverview.websites.title")}</Link></li>
              <li><Link href="/usluge/enterprise" className={linkCls}>{t("ServicesOverview.enterprise.title")}</Link></li>
              <li><Link href="/usluge/chatbot" className={linkCls}>{t("ServicesOverview.chatbot.title")}</Link></li>
              <li><Link href="/usluge/voice" className={linkCls}>{t("ServicesOverview.voice.title")}</Link></li>
              <li><Link href="/usluge/aiIntegrations" className={linkCls}>{t("ServicesOverview.aiIntegrations.title")}</Link></li>
              <li className="pt-2"><Link href="/za/skole-jezika" className={linkCls}>Za škole jezika</Link></li>
              <li><Link href="/za/saloni" className={linkCls}>Za salone i frizere</Link></li>
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-secondary mb-4">
              {t("Footer.connect")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${siteConfig.email}`} className={`${linkCls} inline-flex items-center gap-2.5`}>
                  <Mail className="w-4 h-4 text-spicy-300 shrink-0" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className={`${linkCls} inline-flex items-center gap-2.5`}>
                  <Phone className="w-4 h-4 text-spicy-300 shrink-0" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`${linkCls} inline-flex items-center gap-2.5`}>
                  <SiWhatsapp className="w-4 h-4 text-spicy-300 shrink-0" />
                  WhatsApp
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-sm text-foreground-muted">
                <MapPin className="w-4 h-4 text-spicy-300 shrink-0" />
                {siteConfig.address}
              </li>
            </ul>
            <div className="flex items-center gap-2 mt-6">
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="btn-matte p-2.5 rounded-full"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="btn-matte p-2.5 rounded-full"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright + registration details.
            Deliberately quiet: nobody comes here to read it, but it has to be
            findable — platform verifications and business clients both check
            that the entity behind the site is a real, registered one. */}
        <div className="mt-14 pt-8 border-t border-border-default flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm text-foreground-secondary">{t("Footer.copyright")}</p>
            <p className="text-xs text-foreground-muted leading-relaxed max-w-2xl">
              {siteConfig.legal.name} · {siteConfig.legal.form} ·{" "}
              {t("Footer.registrationNumber")} {siteConfig.legal.registrationNumber} ·{" "}
              {t("Footer.taxNumber")} {siteConfig.legal.taxNumber} ·{" "}
              {t("Footer.seat")} {siteConfig.legal.address}
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link href="/politika-privatnosti" className="text-xs text-foreground-muted hover:text-foreground transition-colors">{t("Footer.privacy")}</Link></li>
            <li><Link href="/uslovi-koriscenja" className="text-xs text-foreground-muted hover:text-foreground transition-colors">{t("Footer.terms")}</Link></li>
            <li><Link href="/data-deletion" className="text-xs text-foreground-muted hover:text-foreground transition-colors">{t("Footer.dataDeletion")}</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
