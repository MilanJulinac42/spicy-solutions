import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zahtev za brisanje podataka",
  description:
    "Zatražite trajno brisanje svih svojih podataka iz Solvera AI chatbot sistema (Instagram, Messenger).",
  alternates: { canonical: "https://www.solveradev.rs/data-deletion" },
  robots: { index: true, follow: true },
};

export default function DataDeletionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
