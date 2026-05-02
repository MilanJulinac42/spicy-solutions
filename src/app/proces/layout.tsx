import type { Metadata } from "next";
import { faqPageSchema, jsonLdString } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Proces rada",
  description:
    "Kako radim: 4 jasna koraka od ideje do lansiranja — pregled, dizajn i probna verzija, razvoj i predaja. Bez agencijskog labirinta, direktno sa inženjerom.",
  alternates: { canonical: "https://www.solveradev.rs/proces" },
};

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(faqPageSchema) }}
      />
      {children}
    </>
  );
}
