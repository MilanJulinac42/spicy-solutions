import type { Metadata } from "next";
import { PricingView } from "@/components/pricing/PricingView";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Cene — sajtovi, poslovni sistemi i AI asistenti",
  description:
    "Fiksne cene i rokovi: sajt od 590€ za 7 dana, poslovni sistemi od 1.500€, AI asistent od 690€. Partner paket od 39€ mesečno. Besplatan probni sajt pre plaćanja.",
  alternates: { canonical: "https://www.solveradev.rs/cene" },
  openGraph: {
    title: "Cene — Solvera",
    description: "Sajt od 590€ za 7 dana. Besplatan probni sajt pre plaćanja.",
    url: "https://www.solveradev.rs/cene",
    type: "website",
  },
};

export default function PricingPage() {
  return (
    <>
      <PricingView />
      <div className="pt-24 md:pt-32">
        <CTABanner />
      </div>
    </>
  );
}
