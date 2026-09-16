import type { Metadata } from "next";
import { Work } from "@/components/sections/Work";
import { CTABanner } from "@/components/sections/CTABanner";

/**
 * Work had no address of its own — it appeared on the home page and inside
 * service pages, so nothing could be linked to, searched for, or sent to a
 * prospect. "Evo šta sam radio" needs one URL.
 */

export const metadata: Metadata = {
  title: "Radovi — projekti koje sam izradio | Solvera",
  description:
    "Sajtovi i poslovni sistemi koje sam izradio — za klijente i kao primer šta može. Šta je napravljeno, koliko je trajalo i na čemu radi, sve uživo.",
  alternates: { canonical: "https://www.solveradev.rs/radovi" },
  openGraph: {
    title: "Radovi — projekti koje sam izradio",
    description:
      "Sajtovi i poslovni sistemi za prave klijente. Šta je napravljeno, koliko je trajalo, i link da pogledate uživo.",
    url: "https://www.solveradev.rs/radovi",
    type: "website",
  },
};

const breadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Početna",
      item: "https://www.solveradev.rs",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Radovi",
      item: "https://www.solveradev.rs/radovi",
    },
  ],
};

export default function RadoviPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Work
        headingAs="h1"
        bare
        subtitle="Projekti za klijente i primeri šta može — od prazne strane do sajta na internetu. Svaki je uživo, kliknite i pogledajte."
      />
      <CTABanner />
    </>
  );
}
