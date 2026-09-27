import type { Metadata } from "next";
import { Suspense } from "react";
import { TrialView } from "@/components/trial/TrialView";

export const metadata: Metadata = {
  title: "Besplatan probni sajt za 48h",
  description:
    "Pošaljite ime firme i čime se bavite — za 48h dobijate probnu verziju sajta ili AI asistenta napravljenu za vas. Plaćate tek ako vam se svidi.",
  alternates: { canonical: "https://www.solveradev.rs/probni-sajt" },
  openGraph: {
    title: "Pogledajte svoj novi sajt pre nego što platite",
    description: "Besplatna probna verzija za 48h — plaćate tek ako vam se svidi.",
    url: "https://www.solveradev.rs/probni-sajt",
    type: "website",
  },
};

export default function TrialPage() {
  // useSearchParams (preselected service) needs a Suspense boundary.
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <TrialView />
    </Suspense>
  );
}
