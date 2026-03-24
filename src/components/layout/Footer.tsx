"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Flame, Github, Linkedin, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/constants";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-[#0a0a0a] text-gray-300 border-t border-white/5">
      {/* Wave SVG divider */}
      <div className="w-full overflow-hidden leading-[0]">
        <svg
          className="w-full h-12 md:h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z"
            fill="#0a0a0a"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-6 h-6 text-spicy-400" />
              <span className="text-lg font-bold text-white">
                Solvera
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t("Footer.description")}
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-spicy-400/10 hover:text-spicy-400 hover:scale-110 hover:shadow-lg hover:shadow-spicy-400/25 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-spicy-400/10 hover:text-spicy-400 hover:scale-110 hover:shadow-lg hover:shadow-spicy-400/25 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-spicy-400/10 hover:text-spicy-400 hover:scale-110 hover:shadow-lg hover:shadow-spicy-400/25 transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("Footer.quickLinks")}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-400 hover:text-spicy-400 transition-colors link-underline"
                >
                  {t("Navbar.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-gray-400 hover:text-spicy-400 transition-colors link-underline"
                >
                  {t("Navbar.services")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-400 hover:text-spicy-400 transition-colors link-underline"
                >
                  {t("Navbar.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-400 hover:text-spicy-400 transition-colors link-underline"
                >
                  {t("Navbar.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("Footer.services")}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services"
                  className="text-sm text-gray-400 hover:text-spicy-400 transition-colors link-underline"
                >
                  {t("ServicesOverview.websites.title")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-gray-400 hover:text-spicy-400 transition-colors link-underline"
                >
                  {t("ServicesOverview.enterprise.title")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-gray-400 hover:text-spicy-400 transition-colors link-underline"
                >
                  {t("ServicesOverview.ai.title")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-gray-400 hover:text-spicy-400 transition-colors link-underline"
                >
                  {t("ServicesOverview.automation.title")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("Footer.legal")}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-400 hover:text-spicy-400 transition-colors link-underline"
                >
                  {t("Footer.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-400 hover:text-spicy-400 transition-colors link-underline"
                >
                  {t("Footer.terms")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("Footer.connect")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-spicy-400 shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-gray-400 hover:text-spicy-400 transition-colors link-underline"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-spicy-400 shrink-0" />
                <span className="text-sm text-gray-400">{siteConfig.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-spicy-400 shrink-0" />
                <span className="text-sm text-gray-400">{siteConfig.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-gray-500">{t("Footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
