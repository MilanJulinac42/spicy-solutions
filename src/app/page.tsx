import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { BentoServices } from "@/components/sections/BentoServices";

const WhyTrustUs = dynamic(() => import("@/components/sections/WhyTrustUs").then(m => ({ default: m.WhyTrustUs })), { ssr: true });
const HomeFaq = dynamic(() => import("@/components/sections/HomeFaq").then(m => ({ default: m.HomeFaq })), { ssr: true });
const CTABanner = dynamic(() => import("@/components/sections/CTABanner").then(m => ({ default: m.CTABanner })), { ssr: true });

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <BentoServices />
      <WhyTrustUs />
      <HomeFaq />
      <CTABanner />
    </>
  );
}
