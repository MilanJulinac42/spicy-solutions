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

export type Project = {
  name: string;
  kind: string;
  /** Which service this proves — service pages show only their own work. */
  service: "websites" | "enterprise";
  images: { src: string; alt: string }[];
  /** Which image stands for the project on the home page (default: first). */
  cover?: number;
  /** Long-form write-up on this site, when there is one. */
  caseStudy?: string;
  /** Omitted while a project has nothing public to open. */
  href?: string;
  summary: string;
  highlights: string[];
  /** What a visitor can't infer from a screenshot: who did the work, how long
   *  it took, what it's built on. */
  role: string;
  /** Omitted where there is no honest figure — a demo built in the gaps
   *  between client work has no start and end to count. */
  duration?: string;
  stack: string[];
};

export const PROJECTS: Project[] = [
  {
    name: "Spiko Edu — platforma za kurseve",
    kind: "Sistem za onlajn školu",
    service: "enterprise",
    images: [
      { src: "/radovi/kurs.png", alt: "Naslovna strana platforme Spiko Edu" },
      { src: "/radovi/admin.png", alt: "Administratorski panel platforme Spiko Edu" },
    ],
    href: "https://kurs.spikoedu.rs",
    // The course page looks like the school's own site (next card); the admin
    // panel is what makes this one a system.
    cover: 1,
    caseStudy: "/radovi/spiko-edu",
    summary:
      "Cela škola jezika onlajn. Škola sama pravi kurseve, lekcije i vežbe, polaznik uči i vežba svojim tempom, a čas uživo se zakaže kroz sistem — koji sam napravi Zoom sastanak i upiše termin u kalendar nastavnika.",
    highlights: [
      "Kursevi, lekcije i vežbe — škola ih pravi sama, bez programera",
      "Nalozi polaznika, praćenje napretka i ponavljanje gradiva",
      "Zakazivanje časa: proverava kad je nastavnik slobodan, pravi Zoom link",
      "AI tutor koji objašnjava gradivo i greške",
      "Video lekcije i plaćanje karticom preko domaće banke",
    ],
    role: "Sve sam — plan sistema, izrada, baza, povezivanje sa Zoom-om i kalendarom, puštanje u rad",
    duration: "3 nedelje",
    stack: ["Next.js", "Bun", "Supabase", "Zoom", "Google Calendar", "Claude"],
  },
  {
    name: "Spiko Edu",
    kind: "Škola jezika · Bačka Palanka",
    service: "websites",
    images: [{ src: "/radovi/spiko-edu.png", alt: "Naslovna strana sajta Spiko Edu" }],
    href: "https://www.spikoedu.rs",
    caseStudy: "/radovi/spiko-edu",
    summary:
      "Prezentaciona stranica za školu nemačkog i engleskog jezika. Posetilac vidi kurseve i nivoe, cene i utiske polaznika, pa zakaže besplatne konsultacije — bez traženja i bez zvanja. Radio sam sve sam, od prazne strane do sajta na internetu.",
    highlights: [
      "Dizajn i izrada od nule",
      "Tekstovi i raspored stranica",
      "Podešavanje domena i puštanje u rad",
      "Prilagođeno telefonu, tabletu i računaru",
      "Priprema za Google pretragu",
    ],
    role: "Sve sam — dizajn, izrada, tekstovi, podešavanje domena i puštanje u rad",
    duration: "5 dana",
    stack: ["Next.js", "Tailwind", "Vercel"],
  },
  {
    name: "Forno — picerija",
    kind: "Demo · Restoran",
    service: "websites",
    images: [
      { src: "/radovi/forno.png", alt: "Naslovna strana demo sajta picerije Forno" },
      {
        src: "/radovi/forno-prostor.png",
        alt: "Interaktivna mapa prostora na demo sajtu Forno — istaknuta zona sa peći",
      },
    ],
    href: "https://forno-taupe.vercel.app",
    summary:
      "Forno ne postoji. Napravio sam ga da pokažem kako izgleda sajt restorana kad se uradi kako treba: meni koji se čita sa telefona, priča o tome kako se pravi pica, i mapa lokala po kojoj pređete mišem pa vidite gde je peć, gde je bar i koliko ima mesta na terasi.",
    highlights: [
      "Meni po kategorijama, sa oznakama — vege, ljuto, hit, novo",
      "Interaktivna mapa prostora: svaka zona pokazuje šta je i koliko mesta ima",
      "Proces pripreme, od fermentacije testa do stola, sa vremenima",
      "Radno vreme po danima, adresa i uputstva na jednom mestu",
      "Na srpskom i engleskom, jednim klikom",
    ],
    role: "Sve sam — dizajn, tekstovi, izrada, mapa prostora",
    stack: ["Next.js", "Tailwind", "Vercel"],
  },
];

type WorkProps = {
  /** Overridden on service pages, where "Radovi" is less apt than an example. */
  title?: string;
  subtitle?: string;
  /** Narrows to one service's work; omitted on the home page, which shows all. */
  service?: Project["service"];
  /** h1 only on /radovi, where this section is the page. */
  headingAs?: "h1" | "h2";
  /** The page already sits on a background; a second one stacks visibly. */
  bare?: boolean;
};

export function Work({
  title = "Radovi",
  subtitle = "Projekti koje sam radio — kliknite i pogledajte uživo, ne na slici.",
  service,
  headingAs = "h2",
  bare = false,
}: WorkProps) {
  const projects = service ? PROJECTS.filter((p) => p.service === service) : PROJECTS;
  if (projects.length === 0) return null;

  return (
    <section className={`py-20 md:py-28 ${bare ? "" : "bg-surface-secondary"}`}>
      <Container>
        <SectionHeading title={title} subtitle={subtitle} as={headingAs} />

        <div className="space-y-8">
          {projects.map((p, i) => (
            <motion.article
              key={p.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInUp}
              className="card-matte group overflow-hidden rounded-3xl"
            >
              <div className="grid gap-0 lg:grid-cols-5">
                {/* Screenshots. A second one earns its place when the first can't
                    show the whole story — a course page says nothing about the
                    panel the client actually runs it from. */}
                <div
                  className={`flex flex-col justify-center gap-px bg-surface-secondary lg:col-span-3 ${
                    i % 2 === 1 ? "lg:order-last" : ""
                  }`}
                >
                  {p.images.map((img) => (
                    <div key={img.src} className="relative overflow-hidden bg-surface">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={1886}
                        height={961}
                        className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                    </div>
                  ))}
                </div>

                {/* Details */}
                <div className="flex flex-col justify-center p-6 md:p-8 lg:col-span-2">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-muted">
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
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-spicy-300" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* The part a screenshot can't answer: who did it, how long,
                      and what it runs on. */}
                  <dl className="mt-6 space-y-3 border-t border-border-subtle pt-5">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                        Moja uloga
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-foreground-secondary">
                        {p.role}
                      </dd>
                    </div>
                    {p.duration && (
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                          Trajanje
                        </dt>
                        <dd className="text-sm font-medium text-foreground">{p.duration}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="sr-only">Tehnologije</dt>
                      <dd className="flex flex-wrap gap-1.5">
                        {p.stack.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-border-default px-2.5 py-1 text-[11px] text-foreground-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex flex-wrap gap-3">
                  {p.caseStudy && (
                    <Link
                      href={p.caseStudy}
                      className="btn-metal inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
                    >
                      Studija slučaja
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  )}
                  {p.href ? (
                  <Link
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-matte inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
                  >
                    <ExternalLink className="h-4 w-4 text-spicy-300" />
                    Pogledaj uživo
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  ) : (
                    <span className="rounded-full border border-border-default px-4 py-2.5 text-sm text-foreground-muted">
                      Uskoro dostupno
                    </span>
                  )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
