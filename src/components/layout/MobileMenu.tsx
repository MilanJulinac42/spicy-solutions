"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navLinks } from "@/lib/constants";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { staggerContainer, fadeInRight } from "@/lib/animations";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  const t = useTranslations();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
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

            <nav className="flex-1 p-4">
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-1"
              >
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.li key={link.href} variants={fadeInRight}>
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
                    </motion.li>
                  );
                })}
              </motion.ul>
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
