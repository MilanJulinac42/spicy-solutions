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

type Project = {
  name: string;
  kind: string;
  /** Which service this proves — service pages show only their own work. */
  service: "websites" | "enterprise";
  images: { src: string; alt: string }[];
  /** Omitted while a project has nothing public to open. */
  href?: string;
  summary: string;
  highlights: string[];
};

const PROJECTS: Project[] = [
  {
    name: "Spiko Edu — platforma za kurseve",
    kind: "Sistem za onlajn školu",
    service: "enterprise",
    images: [
      { src: "/radovi/kurs.png", alt: "Naslovna strana platforme Spiko Edu" },
      { src: "/radovi/admin.png", alt: "Administratorski panel platforme Spiko Edu" },
    ],
    href: "https://kurs.spikoedu.rs",
    summary:
      "Cela škola jezika onlajn. Škola sama pravi kurseve, lekcije i vežbe, polaznik uči i vežba svojim tempom, a čas uživo se zakaže kroz sistem — koji sam napravi Zoom sastanak i upiše termin u kalendar nastavnika.",
    highlights: [
      "Kursevi, lekcije i vežbe — škola ih pravi sama, bez programera",
      "Nalozi polaznika, praćenje napretka i ponavljanje gradiva",
      "Zakazivanje časa: proverava kad je nastavnik slobodan, pravi Zoom link",
      "AI tutor koji objašnjava gradivo i greške",
      "Video lekcije i plaćanje karticom preko domaće banke",
    ],
  },
  {
    name: "Spiko Edu",
    kind: "Škola jezika · Bačka Palanka",
    service: "websites",
    images: [{ src: "/radovi/spiko-edu.png", alt: "Naslovna strana sajta Spiko Edu" }],
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

type WorkProps = {
  /** Overridden on service pages, where "Radovi" is less apt than an example. */
  title?: string;
  subtitle?: string;
  /** Narrows to one service's work; omitted on the home page, which shows all. */
  service?: Project["service"];
};

export function Work({
  title = "Radovi",
  subtitle = "Projekti koje sam radio — kliknite i pogledajte uživo, ne na slici.",
  service,
}: WorkProps) {
  const projects = service ? PROJECTS.filter((p) => p.service === service) : PROJECTS;
  if (projects.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-surface-secondary">
      <Container>
        <SectionHeading title={title} subtitle={subtitle} />

        <div className="space-y-8">
          {projects.map((p, i) => (
            <motion.article
              key={p.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInUp}
              className="group overflow-hidden rounded-2xl border border-border-default bg-surface"
            >
              <div className="grid gap-0 lg:grid-cols-5">
                {/* Screenshots. A second one earns its place when the first can't
                    show the whole story — a course page says nothing about the
                    panel the client actually runs it from. */}
                <div
                  className={`flex flex-col gap-px bg-border-default lg:col-span-3 ${
                    i % 2 === 1 ? "lg:order-last" : ""
                  }`}
                >
                  {p.images.map((img) => (
                    <div key={img.src} className="relative flex-1 overflow-hidden bg-surface">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={1886}
                        height={961}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                    </div>
                  ))}
                </div>

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

                  {p.href ? (
                  <Link
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 self-start rounded-lg border border-spicy-400/30 bg-spicy-400/10 px-4 py-2.5 text-sm font-semibold text-spicy-400 transition-all hover:border-spicy-400 hover:bg-spicy-400 hover:text-white"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Pogledaj uživo
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  ) : (
                    <span className="mt-6 self-start rounded-lg border border-border-default px-4 py-2.5 text-sm text-foreground-muted">
                      Uskoro dostupno
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
