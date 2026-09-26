"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const items = ["security", "maintenance", "timeline", "changes", "contract"];

export function HomeFaq() {
  const t = useTranslations("HomeFaq");
  const tHome = useTranslations("Home.faq");
  const [open, setOpen] = useState<string | null>("security");

  return (
    <section className="py-24 md:py-32 border-t border-border-default">
      <Container>
        <SectionHeading eyebrow={tHome("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-3xl mx-auto divide-y divide-border-default border-y border-border-default"
        >
          {items.map((key) => {
            const isOpen = open === key;
            return (
              <motion.div
                key={key}
                variants={fadeInUp}
                className="overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : key)}
                  aria-expanded={isOpen}
                  className="group w-full flex items-center gap-6 text-left py-6 cursor-pointer"
                >
                  <span className="text-base md:text-lg font-medium text-foreground flex-1 group-hover:text-spicy-100 transition-colors">
                    {t(`items.${key}.question`)}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-spicy-300 shrink-0 transition-transform duration-300 ${
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
                      <div className="pb-6 pr-10 text-[15px] md:text-base text-foreground-muted leading-relaxed">
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
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors"
          >
            <MessageCircleQuestion className="w-4 h-4 text-spicy-300" />
            {t("cta")}
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
