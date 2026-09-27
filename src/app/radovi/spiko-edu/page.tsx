import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CTABanner } from "@/components/sections/CTABanner";

/**
 * Case study built only from facts already published on the site. When the
 * school provides a quote and before/after numbers, they go in a "Rezultati"
 * section here — never invent them.
 */

export const metadata: Metadata = {
  title: "Spiko Edu — sajt za 5 dana, platforma za 3 nedelje",
  description:
    "Kako je škola jezika Spiko Edu iz Bačke Palanke dobila sajt za 5 dana i kompletnu onlajn platformu za 3 nedelje: kursevi, zakazivanje časova, Zoom, AI tutor i plaćanje karticom.",
  alternates: { canonical: "https://www.solveradev.rs/radovi/spiko-edu" },
};

const FACTS = [
  { value: "5 dana", label: "sajt od prazne strane do interneta" },
  { value: "3 nedelje", label: "kompletna platforma za onlajn školu" },
  { value: "1 osoba", label: "plan, dizajn, izrada i puštanje u rad" },
];

const SITE = [
  "Kursevi i nivoi na jednom mestu, sa cenama i utiscima polaznika",
  "Zakazivanje besplatne konsultacije bez poziva i poruka",
  "Prilagođeno telefonu, tabletu i računaru",
  "Pripremljeno za Google pretragu",
];

const PLATFORM = [
  "Škola sama pravi kurseve, lekcije i vežbe — bez programera",
  "Nalozi polaznika, praćenje napretka i ponavljanje gradiva",
  "Zakazivanje časa: sistem proverava kad je nastavnik slobodan, pravi Zoom link i upisuje termin u kalendar",
  "AI tutor koji objašnjava gradivo i greške",
  "Video lekcije i plaćanje karticom preko domaće banke",
];

export default function SpikoCaseStudy() {
  return (
    <>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(900px 480px at 75% 5%, rgba(214,186,140,0.09), transparent 62%)" }}
        />
        <Container className="relative">
          <Link href="/radovi" className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 text-spicy-300" />
            Radovi
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-spicy-300">
            Studija slučaja · Škola jezika · Bačka Palanka
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-foreground text-balance">
            Spiko Edu: cela škola jezika onlajn{" "}
            <em className="accent-serif text-metal-sheen">za tri nedelje.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-foreground-muted">
            Škola nemačkog i engleskog jezika dobila je prvo sajt koji dovodi upise, a zatim platformu na kojoj polaznici
            uče, vežbaju i zakazuju časove — a škola sve vodi sama, bez programera.
          </p>

          <dl className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FACTS.map((f) => (
              <div key={f.value} className="card-matte rounded-3xl p-6">
                <dt className="text-4xl font-semibold text-metal leading-none">{f.value}</dt>
                <dd className="mt-3 text-sm text-foreground-muted">{f.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Part 1: website */}
      <section className="py-16 md:py-24 border-t border-border-default">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground-muted">Korak 1 · 5 dana</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground">Sajt koji dovodi upise</h2>
              <p className="mt-4 text-[15px] md:text-base leading-relaxed text-foreground-muted">
                Posetilac vidi kurseve i nivoe, cene i utiske polaznika, pa zakaže besplatnu konsultaciju — bez traženja i
                bez zvanja.
              </p>
              <ul className="mt-6 space-y-3">
                {SITE.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-[15px] text-foreground-secondary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-spicy-300" />
                    {s}
                  </li>
                ))}
              </ul>
              <a
                href="https://www.spikoedu.rs"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-matte mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
              >
                spikoedu.rs
                <ArrowUpRight className="h-4 w-4 text-spicy-300" />
              </a>
            </div>
            <div className="card-matte overflow-hidden rounded-3xl">
              <Image src="/radovi/spiko-edu.png" alt="Naslovna strana sajta Spiko Edu" width={1886} height={961} className="h-auto w-full" />
            </div>
          </div>
        </Container>
      </section>

      {/* Part 2: platform */}
      <section className="py-16 md:py-24 border-t border-border-default bg-surface-secondary">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
            <div className="space-y-4 lg:order-1 order-2">
              <div className="card-matte overflow-hidden rounded-3xl">
                <Image src="/radovi/kurs.png" alt="Naslovna strana platforme Spiko Edu" width={1898} height={901} className="h-auto w-full" />
              </div>
              <div className="card-matte overflow-hidden rounded-3xl">
                <Image src="/radovi/admin.png" alt="Administratorski panel platforme Spiko Edu" width={1910} height={978} className="h-auto w-full" />
              </div>
            </div>
            <div className="lg:order-2 order-1">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground-muted">Korak 2 · 3 nedelje</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground">Platforma na kojoj radi cela škola</h2>
              <p className="mt-4 text-[15px] md:text-base leading-relaxed text-foreground-muted">
                Polaznik uči i vežba svojim tempom, a čas uživo zakaže kroz sistem — koji sam napravi Zoom sastanak i upiše
                termin u kalendar nastavnika.
              </p>
              <ul className="mt-6 space-y-3">
                {PLATFORM.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-[15px] text-foreground-secondary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-spicy-300" />
                    {s}
                  </li>
                ))}
              </ul>
              <a
                href="https://kurs.spikoedu.rs"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-matte mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
              >
                kurs.spikoedu.rs
                <ArrowUpRight className="h-4 w-4 text-spicy-300" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="card-matte rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Vodite školu jezika?</h2>
              <p className="mt-2 text-[15px] text-foreground-muted">Pogledajte šta ista rešenja mogu da urade za vašu školu.</p>
            </div>
            <Link href="/za/skole-jezika" className="btn-metal inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold">
              Rešenja za škole jezika
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
