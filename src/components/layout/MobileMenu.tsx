"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Globe, Building2, Brain, Workflow } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navLinks } from "@/lib/constants";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const serviceSublinks = [
  { id: "websites", icon: Globe, titleKey: "Services.websites.title" },
  { id: "enterprise", icon: Building2, titleKey: "Services.enterprise.title" },
  { id: "ai", icon: Brain, titleKey: "Services.ai.title" },
  { id: "automation", icon: Workflow, titleKey: "Services.automation.title" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  const t = useTranslations();
  const [servicesExpanded, setServicesExpanded] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            className="fixed right-0 top-0 bottom-0 w-72 bg-surface-elevated border-l border-border-default z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-border-default">
              <span className="text-lg font-bold text-spicy-400">Menu</span>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-surface-tertiary transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 p-4 overflow-y-auto">
              <ul className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const isServices = link.href === "/services";

                  if (isServices) {
                    return (
                      <li key={link.href}>
                        <button
                          onClick={() => setServicesExpanded(!servicesExpanded)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                            isActive || pathname.startsWith("/services/")
                              ? "bg-spicy-400/10 text-spicy-400"
                              : "text-foreground-secondary hover:bg-surface-tertiary hover:text-foreground"
                          }`}
                        >
                          {t(link.titleKey)}
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesExpanded ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {servicesExpanded && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <li>
                                <Link
                                  href="/services"
                                  onClick={onClose}
                                  className={`block pl-8 pr-4 py-2.5 text-sm transition-colors ${
                                    pathname === "/services"
                                      ? "text-spicy-400"
                                      : "text-foreground-muted hover:text-foreground"
                                  }`}
                                >
                                  {t("Services.viewAll")}
                                </Link>
                              </li>
                              {serviceSublinks.map((sub) => {
                                const SubIcon = sub.icon;
                                const isSubActive = pathname === `/services/${sub.id}`;
                                return (
                                  <li key={sub.id}>
                                    <Link
                                      href={`/services/${sub.id}`}
                                      onClick={onClose}
                                      className={`flex items-center gap-2.5 pl-8 pr-4 py-2.5 text-sm transition-colors ${
                                        isSubActive
                                          ? "text-spicy-400"
                                          : "text-foreground-muted hover:text-foreground"
                                      }`}
                                    >
                                      <SubIcon className="w-3.5 h-3.5 shrink-0" />
                                      {t(sub.titleKey)}
                                    </Link>
                                  </li>
                                );
                              })}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  }

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                          isActive
                            ? "bg-spicy-400/10 text-spicy-400"
                            : "text-foreground-secondary hover:bg-surface-tertiary hover:text-foreground"
                        }`}
                      >
                        {t(link.titleKey)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="p-4 border-t border-border-default flex items-center gap-3">
              <ThemeToggle />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
