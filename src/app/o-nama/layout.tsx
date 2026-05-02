import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nama",
  description:
    "Solvera — Milan Julinac, full-stack inženjer iz Novog Sada. Bez posrednika, direktna komunikacija i tehnologija koja pokreće biznis.",
  alternates: { canonical: "https://www.solveradev.rs/o-nama" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
