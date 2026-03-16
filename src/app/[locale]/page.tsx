import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { Stats } from "@/components/sections/Stats";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { Testimonials } from "@/components/sections/Testimonials";
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
      <ServicesOverview />
      <Stats />
      <ProjectsShowcase />
      <Testimonials />
      <CTABanner />
    </>
  );
}
