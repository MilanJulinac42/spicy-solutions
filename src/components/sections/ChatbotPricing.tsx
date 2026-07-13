"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { fadeInUp, staggerContainer } from "@/lib/animations";

type Tier = {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  highlight?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "FAQ bot",
    price: "od 600€",
    tagline: "Brz start za sajt sa jasnim pitanjima",
    features: [
      "Bot nad tvojim FAQ-om i sajtom",
      "Lead capture (ime, email)",
      "Srpski + engleski",
      "Widget u uglu sajta",
    ],
  },
  {
    name: "RAG standard",
    price: "od 1200€",
    tagline: "Najčešći izbor — odgovara iz tvojih dokumenata",
    highlight: true,
    features: [
      "Sve iz FAQ bota +",
      "RAG nad tvojim dokumentima (ne izmišlja)",
      "Lead capture u CRM",
      "Analitika razgovora",
      "Prilagođen brand voice",
    ],
  },
  {
    name: "Napredan",
    price: "od 2000€",
    tagline: "Integracije i akcije, ne samo odgovori",
    features: [
      "Sve iz RAG standard +",
      "Integracije (CRM, WhatsApp, Viber)",
      "Custom tokovi i akcije (agent)",
      "Prioritetna podrška",
    ],
  },
];

export function ChatbotPricing() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
          className="mb-12 md:mb-16 text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Procena cene
          </h2>
          <p className="text-base md:text-lg text-foreground-muted leading-relaxed">
            Fiksna cena, dogovorena unapred — bez skrivenih troškova. Rasponi su
            okvirni; tačnu cenu dam posle kratkog razgovora.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
        >
          {TIERS.map((tier) => (
            <motion.div
              key={tier.name}
              variants={fadeInUp}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                tier.highlight
                  ? "border-spicy-400/40 bg-spicy-400/[0.05]"
                  : "border-border-default bg-surface-secondary"
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-6 rounded-full bg-spicy-400 px-3 py-1 text-[11px] font-semibold text-white">
                  Najčešće
                </span>
              )}

              <div className="mb-1 text-sm font-medium text-foreground-secondary">
                {tier.name}
              </div>
              <div className="mb-1 text-3xl font-bold text-foreground">{tier.price}</div>
              <div className="mb-5 text-xs text-foreground-muted">jednokratni setup</div>

              <p className="mb-5 text-sm text-foreground-muted leading-relaxed">
                {tier.tagline}
              </p>

              <ul className="space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground-secondary">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        tier.highlight ? "text-spicy-400" : "text-emerald-400"
                      }`}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Monthly note + CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-8 flex flex-col items-center gap-4 text-center"
        >
          <div className="w-full max-w-md rounded-xl border border-border-default bg-surface-secondary p-4 text-left">
            <div className="mb-3 text-xs font-mono uppercase tracking-wider text-foreground-muted">
              Mesečno (opciono)
            </div>
            <ul className="space-y-3">
              <li className="flex items-start justify-between gap-4">
                <span className="text-sm text-foreground-secondary">
                  Trošak AI modela
                  <span className="block text-xs text-foreground-muted">plaća se po korišćenju</span>
                </span>
                <span className="whitespace-nowrap font-mono text-sm text-foreground">~20–50€</span>
              </li>
              <li className="flex items-start justify-between gap-4">
                <span className="text-sm text-foreground-secondary">
                  Održavanje i podrška
                  <span className="block text-xs text-foreground-muted">
                    monitoring, doterivanje odgovora, izmene baze znanja, prioritet
                  </span>
                </span>
                <span className="whitespace-nowrap font-mono text-sm text-foreground">od 60€</span>
              </li>
            </ul>
            <p className="mt-3 border-t border-border-subtle pt-3 text-xs text-foreground-muted">
              Prva 3 meseca doterivanja odgovora su uključena. Održavanje je opciono — bot i podaci
              ostaju tvoji, bez zaključavanja.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-lg bg-spicy-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-spicy-400/25 transition-colors hover:bg-spicy-500"
            >
              Besplatna konsultacija
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/zapocni-projekat"
              className="inline-flex items-center gap-2 rounded-lg border border-border-default px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-spicy-400/30 hover:text-spicy-400"
            >
              Započni projekat
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
