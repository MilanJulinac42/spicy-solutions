"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const items = ["security", "switch", "timeline", "changes", "contract"];

export function HomeFaq() {
  const t = useTranslations("HomeFaq");
  const [open, setOpen] = useState<string | null>("security");

  return (
    <section className="py-20 md:py-28 bg-surface-secondary">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-3xl mx-auto space-y-3"
        >
          {items.map((key) => {
            const isOpen = open === key;
            return (
              <motion.div
                key={key}
                variants={fadeInUp}
                className="rounded-2xl bg-surface border border-border-default overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : key)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-4 text-left px-5 py-4 hover:bg-surface-secondary/60 transition-colors"
                >
                  <span className="text-base md:text-lg font-semibold text-foreground flex-1">
                    {t(`items.${key}.question`)}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-foreground-muted shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm md:text-base text-foreground-muted leading-relaxed">
                        {t(`items.${key}.answer`)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 text-sm font-medium text-spicy-400 hover:text-spicy-300 transition-colors"
          >
            <MessageCircleQuestion className="w-4 h-4" />
            {t("cta")}
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
