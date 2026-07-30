"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { fadeInUp, staggerContainer } from "@/lib/animations";

/**
 * Single price rather than tiers: packages invited the reader to guess which
 * box they fall into, when the honest answer is that the price depends on their
 * documents and integrations. So we show the entry price and what moves it.
 */

const INCLUDED = [
  "Asistent u uglu vašeg sajta, na srpskom",
  "Odgovara iz vaših podataka — cene, usluge, radno vreme",
  "Uzima ime i mejl kada vidi zainteresovanog klijenta",
  "Kaže „ne znam“ umesto da izmišlja",
  "Pregled razgovora — vidite šta posetioci pitaju",
];

const PRICE_FACTORS = [
  "Koliko toga treba da zna — nekoliko čestih pitanja ili cela dokumentacija",
  "Da li se povezuje sa programima koje već koristite",
  "Da li samo odgovara ili i zakazuje i upisuje podatke",
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
          className="mb-12 text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Koliko košta
          </h2>
          <p className="text-base md:text-lg text-foreground-muted leading-relaxed">
            Fiksna cena, dogovorena unapred — bez skrivenih troškova. Tačan iznos
            dajem posle kratkog razgovora, kada vidim šta vam treba.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2"
        >
          {/* One-off */}
          <motion.div
            variants={fadeInUp}
            className="rounded-2xl border border-spicy-400/30 bg-spicy-400/[0.05] p-6 md:p-8"
          >
            <div className="text-sm font-medium text-foreground-secondary">Izrada</div>
            <div className="mt-1 text-4xl font-bold text-foreground">od 450€</div>
            <div className="mt-1 text-xs text-foreground-muted">jednokratno, plaća se jednom</div>

            <ul className="mt-6 space-y-2.5">
              {INCLUDED.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-foreground-secondary"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-spicy-400" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Monthly */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col rounded-2xl border border-border-default bg-surface-secondary p-6 md:p-8"
          >
            <div className="text-sm font-medium text-foreground-secondary">Održavanje</div>
            <div className="mt-1 text-4xl font-bold text-foreground">od 20€</div>
            <div className="mt-1 text-xs text-foreground-muted">mesečno, opciono</div>

            <p className="mt-6 text-sm leading-relaxed text-foreground-muted">
              Sve uključeno u jedan iznos — rad asistenta, praćenje, dopune baze znanja
              i sitne izmene. Nema odvojenog računa za korišćenje.
            </p>

            <div className="mt-5 rounded-xl border border-border-subtle bg-surface p-4">
              <div className="mb-2 text-xs font-mono uppercase tracking-wider text-foreground-muted">
                Šta pomera cenu
              </div>
              <ul className="space-y-2">
                {PRICE_FACTORS.map((f) => (
                  <li key={f} className="text-sm leading-relaxed text-foreground-muted">
                    · {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-8 flex flex-col items-center gap-4 text-center"
        >
          <p className="max-w-xl text-sm text-foreground-muted">
            Prva tri meseca doterivanja odgovora su uključena. Asistent i podaci ostaju
            vaši — održavanje je opciono, bez njega i dalje radi.
          </p>
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
