import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Javite se na info@solveradev.rs ili WhatsApp +381 63 838 4196. Odgovor u roku od 24h, direktno od inženjera.",
  alternates: { canonical: "https://www.solveradev.rs/kontakt" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
