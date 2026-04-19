import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Započni projekat",
  description:
    "Popunite kratak formular i dobijte okvirnu cenu i predlog rešenja u 24h. Sajt, poslovni sistem, AI chatbot ili automatizacija — opišite šta vam treba.",
  alternates: { canonical: "https://www.solveradev.rs/zapocni-projekat" },
};

export default function StartProjectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
