import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nama",
  description:
    "Solvera je dvočlani inženjerski tim iz Novog Sada — Milan i Dragan. Bez posrednika, direktna komunikacija i tehnologija koja pokreće biznis.",
  alternates: { canonical: "https://www.solveradev.rs/o-nama" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
