"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp } from "@/lib/animations";

/**
 * Real work, shown because the rest of the site asks for trust without offering
 * any evidence. One project gets a wide layout rather than a lonely tile in a
 * grid — a half-empty grid reads as "that's all there is".
 */

const PROJECTS = [
  {
    name: "Spiko Edu",
    kind: "Škola jezika · Bačka Palanka",
    image: "/radovi/spiko-edu.png",
    href: "https://www.spikoedu.rs",
    summary:
      "Prezentaciona stranica za školu nemačkog i engleskog jezika. Posetilac vidi kurseve i nivoe, cene i utiske polaznika, pa zakaže besplatne konsultacije — bez traženja i bez zvanja. Radio sam sve sam, od prazne strane do sajta na internetu.",
    highlights: [
      "Dizajn i izrada od nule",
      "Tekstovi i raspored stranica",
      "Podešavanje domena i puštanje u rad",
      "Prilagođeno telefonu, tabletu i računaru",
    ],
  },
];

export function Work() {
  return (
    <section className="py-20 md:py-28 bg-surface-secondary">
      <Container>
        <SectionHeading
          title="Radovi"
          subtitle="Projekti koje sam radio — kliknite i pogledajte uživo, ne na slici."
        />

        <div className="space-y-8">
          {PROJECTS.map((p) => (
            <motion.article
              key={p.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInUp}
              className="group overflow-hidden rounded-2xl border border-border-default bg-surface"
            >
              <div className="grid gap-0 lg:grid-cols-5">
                {/* Screenshot */}
                <Link
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block overflow-hidden lg:col-span-3"
                >
                  <Image
                    src={p.image}
                    alt={`Naslovna strana sajta ${p.name}`}
                    width={1886}
                    height={961}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </Link>

                {/* Details */}
                <div className="flex flex-col justify-center p-6 md:p-8 lg:col-span-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-foreground-muted">
                    {p.kind}
                  </div>
                  <h3 className="mt-2 text-2xl font-bold text-foreground">{p.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                    {p.summary}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {p.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2.5 text-sm text-foreground-secondary"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-spicy-400" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 self-start rounded-lg border border-spicy-400/30 bg-spicy-400/10 px-4 py-2.5 text-sm font-semibold text-spicy-400 transition-all hover:border-spicy-400 hover:bg-spicy-400 hover:text-white"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Pogledaj sajt uživo
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
