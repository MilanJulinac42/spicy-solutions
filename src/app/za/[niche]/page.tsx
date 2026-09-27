import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CTABanner } from "@/components/sections/CTABanner";
import { MissedCallsCalculator } from "@/components/sections/MissedCallsCalculator";
import { getNiche, niches } from "@/data/niches";

export function generateStaticParams() {
  return niches.map((n) => ({ niche: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  const { niche } = await params;
  const n = getNiche(niche);
  if (!n) return {};
  const url = `https://www.solveradev.rs/za/${n.slug}`;
  return {
    title: n.metaTitle,
    description: n.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: n.metaTitle, description: n.metaDescription, url, type: "website" },
  };
}

export default async function NichePage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params;
  const n = getNiche(niche);
  if (!n) notFound();

  return (
    <>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(900px 480px at 75% 5%, rgba(214,186,140,0.10), transparent 62%)" }}
        />
        <Container className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-spicy-300">{n.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-foreground text-balance">
            {n.title} <em className="accent-serif text-metal-sheen block mt-1">{n.accent}</em>
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-foreground-muted text-pretty">{n.subtitle}</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              href={`/probni-sajt?usluga=${n.trialService}`}
              className="btn-metal group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold"
            >
              Besplatan probni sajt
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href={n.proof.href} className="btn-matte inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold">
              {n.proof.cta}
            </Link>
          </div>
        </Container>
      </section>

      {/* Pains in their words */}
      <section className="py-20 md:py-24 border-t border-border-default">
        <Container>
          <h2 className="max-w-2xl text-3xl md:text-4xl font-semibold leading-[1.1] text-foreground">
            Zvuči poznato? <em className="accent-serif text-metal">Niste jedini.</em>
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {n.pains.map((p) => (
              <div key={p.title} className="card-matte rounded-3xl p-7">
                <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What fixes it */}
      <section className="py-20 md:py-24 border-t border-border-default bg-surface-secondary">
        <Container>
          <h2 className="max-w-2xl text-3xl md:text-4xl font-semibold leading-[1.1] text-foreground">
            Šta to rešava <em className="accent-serif text-metal">— i koliko košta.</em>
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {n.solutions.map((s, i) => (
              <Link key={s.title} href={s.href} className="card-matte group flex flex-col rounded-3xl p-7 transition-colors hover:border-[#3C3A38]">
                <span className="text-4xl font-semibold text-metal leading-none tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">{s.body}</p>
                <div className="mt-auto pt-6 flex items-center justify-between">
                  <span className="text-[15px] font-semibold text-spicy-200">{s.price}</span>
                  <ArrowUpRight className="h-4 w-4 text-foreground-muted transition-colors group-hover:text-spicy-200" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Proof */}
      <section className="py-20 md:py-24">
        <Container>
          <div
            className="rounded-[2rem] p-px"
            style={{ background: "linear-gradient(135deg, rgba(214,186,140,0.5), rgba(255,255,255,0.05) 45%, rgba(214,186,140,0.25))" }}
          >
            <div className="rounded-[calc(2rem-1px)] bg-[#18181B] p-8 md:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-spicy-300">{n.proof.label}</p>
                <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-foreground">{n.proof.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">{n.proof.body}</p>
              </div>
              <Link href={n.proof.href} className="btn-matte shrink-0 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold">
                {n.proof.cta}
                <ArrowUpRight className="h-4 w-4 text-spicy-300" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {n.trialService === "asistent" && <MissedCallsCalculator />}

      <div className="pt-8">
        <CTABanner />
      </div>
    </>
  );
}
