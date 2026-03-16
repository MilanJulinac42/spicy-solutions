import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { Stats } from "@/components/sections/Stats";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTABanner } from "@/components/sections/CTABanner";
import { SectionDivider } from "@/components/ui/SectionDivider";

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
      <SectionDivider variant="wave" fillClassName="text-surface-secondary" />
      <ProblemSection />
      <SectionDivider variant="diagonal" flip fillClassName="text-surface" />
      <ServicesOverview />
      <SectionDivider variant="curve" fillClassName="text-surface-secondary" />
      <Stats />
      <SectionDivider variant="wave" flip fillClassName="text-surface" />
      <ProjectsShowcase />
      <SectionDivider variant="diagonal" fillClassName="text-surface-secondary" />
      <Testimonials />
      <SectionDivider variant="curve" flip fillClassName="text-spicy-400" />
      <CTABanner />
    </>
  );
}
