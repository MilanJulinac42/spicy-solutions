import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { HomeServices } from "@/components/sections/HomeServices";

const MissedCallsCalculator = dynamic(() => import("@/components/sections/MissedCallsCalculator").then(m => ({ default: m.MissedCallsCalculator })), { ssr: true });
const HomeSteps = dynamic(() => import("@/components/sections/HomeSteps").then(m => ({ default: m.HomeSteps })), { ssr: true });
const HomeAbout = dynamic(() => import("@/components/sections/HomeAbout").then(m => ({ default: m.HomeAbout })), { ssr: true });
const WorkPreview = dynamic(() => import("@/components/sections/WorkPreview").then(m => ({ default: m.WorkPreview })), { ssr: true });
const HomeFaq = dynamic(() => import("@/components/sections/HomeFaq").then(m => ({ default: m.HomeFaq })), { ssr: true });
const CTABanner = dynamic(() => import("@/components/sections/CTABanner").then(m => ({ default: m.CTABanner })), { ssr: true });

// Order follows the questions a business owner asks, in order: what is it,
// what does it cost, how does it go, who am I dealing with, has he done it
// before, what about the details — then one clear way to start.
export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeServices />
      <MissedCallsCalculator />
      <HomeSteps />
      <HomeAbout />
      <WorkPreview />
      <HomeFaq />
      <CTABanner />
    </>
  );
}
