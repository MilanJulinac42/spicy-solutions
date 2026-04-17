import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { BentoServices } from "@/components/sections/BentoServices";

const Stats = dynamic(() => import("@/components/sections/Stats").then(m => ({ default: m.Stats })), { ssr: true });
const ProjectsShowcase = dynamic(() => import("@/components/sections/ProjectsShowcase").then(m => ({ default: m.ProjectsShowcase })), { ssr: true });
const WhyTrustUs = dynamic(() => import("@/components/sections/WhyTrustUs").then(m => ({ default: m.WhyTrustUs })), { ssr: true });
const CTABanner = dynamic(() => import("@/components/sections/CTABanner").then(m => ({ default: m.CTABanner })), { ssr: true });

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <BentoServices />
      <Stats />
      <ProjectsShowcase />
      <WhyTrustUs />
      <CTABanner />
    </>
  );
}
