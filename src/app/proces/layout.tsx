import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proces rada",
  description:
    "Kako radimo: 4 jasna koraka od ideje do lansiranja — pregled, dizajn i probna verzija, razvoj i predaja. Bez agencijskog labirinta, direktno sa inženjerima.",
  alternates: { canonical: "https://www.solveradev.rs/proces" },
};

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
