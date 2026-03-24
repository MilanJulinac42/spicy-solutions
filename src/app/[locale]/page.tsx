import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { Stats } from "@/components/sections/Stats";
// import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { WhyTrustUs } from "@/components/sections/WhyTrustUs";
import { CTABanner } from "@/components/sections/CTABanner";

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
      {/* <ProjectsShowcase /> */}
      <WhyTrustUs />
      <CTABanner />
    </>
  );
}
