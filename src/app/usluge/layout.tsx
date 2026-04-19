import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usluge",
  description:
    "Sajtovi, poslovni sistemi, AI chatbot-ovi i automatizacija procesa. Fiksna cena, jasan rok, kod ostaje vaš. Pogledajte sve usluge i okvirne cene.",
  alternates: { canonical: "https://www.solveradev.rs/usluge" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
