"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  ChevronDown,
  Globe,
  Building2,
  MessageSquare,
  Phone,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "./MobileMenu";

const serviceSublinks = [
  { id: "websites", icon: Globe, titleKey: "Services.websites.title" },
  { id: "enterprise", icon: Building2, titleKey: "Services.enterprise.title" },
  { id: "chatbot", icon: MessageSquare, titleKey: "Services.chatbot.title" },
  { id: "voice", icon: Phone, titleKey: "Services.voice.title" },
  { id: "aiIntegrations", icon: Sparkles, titleKey: "Services.aiIntegrations.title" },
];

export function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const ticking = useRef(false);
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      ticking.current = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
        ticking.current = false;
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          isScrolled
            ? "bg-surface/80 backdrop-blur-xl border-b border-border-default"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled ? "h-16" : "h-[76px]"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="group">
              <span className="sr-only">Solvera — početna</span>
              <Logo size={34} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href === "/usluge" && pathname.startsWith("/usluge/"));
                const isServices = link.href === "/usluge";

                if (isServices) {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <Link
                        href={link.href}
                        className={`relative flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? "text-foreground"
                            : "text-foreground-muted hover:text-foreground"
                        }`}
                      >
                        {t(link.titleKey)}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                        {isActive && (
                          <motion.div
                            layoutId="navbar-indicator"
                            className="absolute -bottom-0.5 left-4 right-4 h-px bg-gradient-to-r from-transparent via-spicy-300 to-transparent"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Link>
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-80"
                          >
                            <div className="card-matte rounded-2xl overflow-hidden p-1.5">
                              {serviceSublinks.map((sub) => {
                                const SubIcon = sub.icon;
                                const isSubActive = pathname === `/usluge/${sub.id}`;
                                return (
                                  <Link
                                    key={sub.id}
                                    href={`/usluge/${sub.id}`}
                                    onClick={() => setServicesOpen(false)}
                                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm transition-colors ${
                                      isSubActive
                                        ? "bg-surface-tertiary text-foreground"
                                        : "text-foreground-secondary hover:bg-surface-tertiary hover:text-foreground"
                                    }`}
                                  >
                                    <SubIcon className="w-4 h-4 shrink-0 text-spicy-300" />
                                    {t(sub.titleKey)}
                                  </Link>
                                );
                              })}
                              <div className="mt-1.5 pt-1.5 border-t border-border-default">
                                <Link
                                  href="/usluge"
                                  onClick={() => setServicesOpen(false)}
                                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-foreground-muted hover:bg-surface-tertiary hover:text-foreground transition-colors"
                                >
                                  {t("Services.viewAll")}
                                </Link>
                                <Link
                                  href="/zapocni-projekat"
                                  onClick={() => setServicesOpen(false)}
                                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-spicy-300 hover:bg-surface-tertiary transition-colors"
                                >
                                  {t("Navbar.calculator")} →
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "text-foreground"
                        : "text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    {t(link.titleKey)}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-0.5 left-4 right-4 h-px bg-gradient-to-r from-transparent via-spicy-300 to-transparent"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/kontakt"
                className="btn-metal px-5 py-2.5 rounded-full text-sm font-semibold"
              >
                {t("Navbar.getStarted")}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Otvori meni"
              className="lg:hidden p-2 rounded-lg hover:bg-surface-tertiary transition-colors cursor-pointer"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
