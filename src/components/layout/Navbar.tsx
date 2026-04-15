"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, ChevronDown, Globe, Building2, Brain, Workflow } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/constants";
import Image from "next/image";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { MobileMenu } from "./MobileMenu";

const serviceSublinks = [
  { id: "websites", icon: Globe, titleKey: "Services.websites.title" },
  { id: "enterprise", icon: Building2, titleKey: "Services.enterprise.title" },
  { id: "ai", icon: Brain, titleKey: "Services.ai.title" },
  { id: "automation", icon: Workflow, titleKey: "Services.automation.title" },
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
            ? "bg-surface/90 backdrop-blur-md border-b border-border-default shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled ? "h-16" : "h-20"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="group">
              <Image src="/logo.png" alt="Solvera" width={140} height={112} priority className="h-28 w-auto group-hover:scale-105 transition-transform" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href === "/services" && pathname.startsWith("/services/"));
                const isServices = link.href === "/services";

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
                            ? "text-spicy-400"
                            : "text-foreground-secondary hover:text-foreground hover:bg-surface-tertiary"
                        }`}
                      >
                        {t(link.titleKey)}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                        {isActive && (
                          <motion.div
                            layoutId="navbar-indicator"
                            className="absolute bottom-0 left-2 right-2 h-0.5 bg-spicy-400 rounded-full"
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
                            <div className="bg-surface-elevated border border-border-default rounded-xl shadow-xl overflow-hidden">
                              {serviceSublinks.map((sub) => {
                                const SubIcon = sub.icon;
                                const isSubActive = pathname === `/services/${sub.id}`;
                                return (
                                  <Link
                                    key={sub.id}
                                    href={`/services/${sub.id}`}
                                    onClick={() => setServicesOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                                      isSubActive
                                        ? "bg-spicy-400/10 text-spicy-400"
                                        : "text-foreground-secondary hover:bg-surface-tertiary hover:text-foreground"
                                    }`}
                                  >
                                    <SubIcon className="w-4 h-4 shrink-0" />
                                    {t(sub.titleKey)}
                                  </Link>
                                );
                              })}
                              <div className="border-t border-border-default">
                                <Link
                                  href="/services"
                                  onClick={() => setServicesOpen(false)}
                                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground-muted hover:bg-surface-tertiary hover:text-foreground transition-colors"
                                >
                                  {t("Services.viewAll")}
                                </Link>
                                <Link
                                  href="/calculator"
                                  onClick={() => setServicesOpen(false)}
                                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-spicy-400 hover:bg-spicy-400/10 transition-colors"
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
                        ? "text-spicy-400"
                        : "text-foreground-secondary hover:text-foreground hover:bg-surface-tertiary"
                    }`}
                  >
                    {t(link.titleKey)}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-spicy-400 rounded-full"
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
              <ThemeToggle />
              <Link
                href="/contact"
                className="px-5 py-2 bg-spicy-400 text-white rounded-lg text-sm font-medium hover:bg-spicy-500 transition-colors shadow-lg shadow-spicy-400/25 hover:shadow-xl hover:shadow-spicy-400/40"
              >
                {t("Navbar.getStarted")}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-surface-tertiary transition-colors cursor-pointer"
            >
              <Menu className="w-6 h-6" />
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
