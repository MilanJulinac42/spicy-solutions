"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Check, Clock, Globe, LayoutDashboard, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import {
  aiPackages,
  partnerIncludes,
  partnerPlans,
  systemPackage,
  websitePackages,
  type Package,
} from "@/data/pricing";

function PackageCard({ pkg, trialService, cta }: { pkg: Package; trialService: string; cta?: string }) {
  const t = useTranslations("Pricing");
  const inner = (
    <div className={`flex h-full flex-col rounded-[calc(1.5rem-1px)] p-7 lg:p-8 ${pkg.featured ? "bg-[#1C1B1E]" : ""}`}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-foreground">{pkg.name}</h3>
        {pkg.featured && (
          <span className="rounded-full px-3 py-1 text-[11px] font-semibold text-ink" style={{ background: "var(--metal-champagne)" }}>
            {t("popular")}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground-muted min-h-[3.5rem]">{pkg.forWho}</p>
      <div className="mt-6 flex items-baseline gap-2">
        {pkg.from && <span className="text-sm text-foreground-muted">{t("from")}</span>}
        <span className="text-4xl font-semibold text-metal leading-none">{pkg.price}</span>
      </div>
      <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-foreground-secondary">
        <Clock className="h-3.5 w-3.5 text-spicy-300" />
        {t("delivery")} {pkg.delivery}
      </p>
      <div className="hairline-metal my-6" />
      <ul className="space-y-3">
        {pkg.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-foreground-secondary">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-spicy-300" />
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <Link
          href={`/probni-sajt?usluga=${trialService}`}
          className={`${pkg.featured ? "btn-metal" : "btn-matte"} flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold`}
        >
          {cta ?? t("choose")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );

  return (
    <motion.div variants={fadeInUp} className="h-full">
      {pkg.featured ? (
        <div className="h-full rounded-3xl p-px" style={{ background: "linear-gradient(160deg, rgba(214,186,140,0.8), rgba(214,186,140,0.12) 45%, rgba(214,186,140,0.4))" }}>
          {inner}
        </div>
      ) : (
        <div className="card-matte h-full rounded-3xl">{inner}</div>
      )}
    </motion.div>
  );
}

function GroupTitle({ icon: Icon, title, sub }: { icon: typeof Globe; title: string; sub?: string }) {
  return (
    <div className="mb-8 flex items-start gap-4">
      <span className="medallion h-11 w-11 shrink-0 rounded-xl flex items-center justify-center">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">{title}</h2>
        {sub && <p className="mt-1.5 text-[15px] text-foreground-muted">{sub}</p>}
      </div>
    </div>
  );
}

export function PricingView() {
  const t = useTranslations("Pricing");

  return (
    <>
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(900px 420px at 70% 0%, rgba(214,186,140,0.09), transparent 65%)" }}
        />
        <Container className="relative">
          <SectionHeading
            as="h1"
            eyebrow={t("eyebrow")}
            title={t("title")}
            accent={t("accent")}
            subtitle={t("subtitle")}
            centered={false}
            className="!mb-0"
          />
        </Container>
      </section>

      {/* Websites — three fixed packages */}
      <section className="py-12 md:py-16">
        <Container>
          <GroupTitle icon={Globe} title={t("websites")} sub={t("websitesSub")} />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 items-stretch"
          >
            {websitePackages.map((p) => (
              <PackageCard key={p.id} pkg={p} trialService="sajt" />
            ))}
          </motion.div>
        </Container>
      </section>

      {/* AI + systems */}
      <section className="py-12 md:py-16">
        <Container>
          <GroupTitle icon={Sparkles} title={t("ai")} sub={t("aiSub")} />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5"
          >
            {aiPackages.map((p) => (
              <PackageCard key={p.id} pkg={p} trialService="asistent" cta={t("chooseAi")} />
            ))}
          </motion.div>

          <div className="mt-16">
            <GroupTitle icon={LayoutDashboard} title={t("system")} />
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5"
            >
              <PackageCard pkg={systemPackage} trialService="sistem" cta={t("chooseSystem")} />
              <motion.div variants={fadeInUp} className="md:col-span-2">
                <Link
                  href="/radovi/spiko-edu"
                  className="card-matte group flex h-full flex-col overflow-hidden rounded-3xl transition-colors hover:border-[#3C3A38]"
                >
                  <div className="p-7 lg:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-spicy-300">{t("systemProofLabel")}</p>
                    <h3 className="mt-3 text-2xl font-semibold text-foreground">{t("systemProofTitle")}</h3>
                    <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-foreground-muted">{t("systemProofBody")}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-spicy-200">
                      {t("systemProofCta")}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                  {/* The real admin panel — proof fills the card, not empty space. */}
                  <div className="relative mt-auto ml-7 lg:ml-8 flex-1 min-h-[220px] overflow-hidden rounded-tl-2xl border-l border-t border-border-default">
                    <Image
                      src="/radovi/admin.png"
                      alt="Administratorski panel platforme Spiko Edu"
                      fill
                      sizes="(max-width: 768px) 90vw, 55vw"
                      className="object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Partner — monthly care, framed as a teammate, not a fee */}
      <section className="mt-12 py-24 md:py-28 border-t border-border-default bg-surface-secondary">
        <Container>
          <SectionHeading
            eyebrow={t("partnerEyebrow")}
            title={t("partnerTitle")}
            accent={t("partnerAccent")}
            subtitle={t("partnerSubtitle")}
            centered={false}
          />
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14">
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid sm:grid-cols-2 gap-x-8 gap-y-7"
            >
              {partnerIncludes.map((item) => (
                <motion.li key={item.title} variants={fadeInUp} className="flex gap-4">
                  <span className="medallion h-9 w-9 shrink-0 rounded-lg flex items-center justify-center">
                    <Check className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-foreground">{item.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-foreground-muted">{item.body}</span>
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-matte rounded-3xl p-7"
            >
              <ul className="divide-y divide-border-default">
                {partnerPlans.map((plan) => (
                  <li key={plan.id} className="flex items-baseline justify-between gap-4 py-4 first:pt-0 last:pb-0">
                    <span>
                      <span className="block text-[15px] text-foreground">{plan.name}</span>
                      {plan.note && <span className="mt-0.5 block text-xs text-foreground-muted">{plan.note}</span>}
                    </span>
                    <span className="shrink-0 text-right">
                      {plan.from && <span className="mr-1 text-xs text-foreground-muted">{t("from")}</span>}
                      <span className="text-xl font-semibold text-spicy-200">{plan.price}</span>
                      <span className="ml-1 text-xs text-foreground-muted">{t("partnerPrice")}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          <p className="mt-12 text-sm text-foreground-muted">{t("vatNote")}</p>
        </Container>
      </section>
    </>
  );
}
