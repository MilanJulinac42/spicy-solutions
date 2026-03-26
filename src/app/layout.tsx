import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Solvera | Vi vodite biznis, mi brinemo o tehnologiji",
    template: "%s | Solvera",
  },
  description:
    "Od sajtova do poslovnih sistema, AI chatbot-ova do automatizacije — isporučujemo tehnologiju koja pokreće vaš biznis napred. Brza isporuka, direktna komunikacija, bez kompromisa.",
  metadataBase: new URL("https://www.solveradev.rs"),
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: "https://www.solveradev.rs",
    siteName: "Solvera",
    title: "Solvera | Vi vodite biznis, mi brinemo o tehnologiji",
    description:
      "Od sajtova do poslovnih sistema, AI chatbot-ova do automatizacije — isporučujemo tehnologiju koja pokreće vaš biznis napred.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Solvera - IT rešenja za srpske biznise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solvera | Vi vodite biznis, mi brinemo o tehnologiji",
    description:
      "Od sajtova do poslovnih sistema, AI chatbot-ova do automatizacije — isporučujemo tehnologiju koja pokreće vaš biznis napred.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://www.solveradev.rs/sr",
    languages: {
      sr: "https://www.solveradev.rs/sr",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
