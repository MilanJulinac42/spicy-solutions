import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ServicesOverview } from "@/components/sections/ServicesOverview";

const Stats = dynamic(() => import("@/components/sections/Stats").then(m => ({ default: m.Stats })), { ssr: true });
const ProjectsShowcase = dynamic(() => import("@/components/sections/ProjectsShowcase").then(m => ({ default: m.ProjectsShowcase })), { ssr: true });
const WhyTrustUs = dynamic(() => import("@/components/sections/WhyTrustUs").then(m => ({ default: m.WhyTrustUs })), { ssr: true });
const CTABanner = dynamic(() => import("@/components/sections/CTABanner").then(m => ({ default: m.CTABanner })), { ssr: true });

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ProblemSection />
      <ServicesOverview />
      <Stats />
      <ProjectsShowcase />
      <WhyTrustUs />
      <CTABanner />
    </>
  );
}
