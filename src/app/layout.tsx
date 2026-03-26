import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solvera | Vi vodite biznis, mi brinemo o tehnologiji",
  description:
    "Od sajtova do poslovnih sistema, AI chatbot-ova do automatizacije — isporučujemo tehnologiju koja pokreće vaš biznis napred. Brza isporuka, direktna komunikacija, bez kompromisa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
