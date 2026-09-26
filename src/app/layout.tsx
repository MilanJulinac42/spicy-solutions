import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Manrope, Instrument_Serif, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWidgets } from "@/components/layout/FloatingWidgets";
import { PageviewTracker } from "@/components/analytics/PageviewTracker";
import { CookieConsent } from "@/components/shared/CookieConsent";
import { Suspense } from "react";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
  jsonLdString,
} from "@/lib/jsonld";
import "@/app/globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

// Serif accent for a word or two inside headlines — never for body copy.
const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: "Solvera | Vi vodite biznis, ja brinem o tehnologiji",
    template: "%s | Solvera",
  },
  description:
    "Sajtovi, poslovni sistemi i AI rešenja za firme u Srbiji — web aplikacije, interni alati, AI chatbot i voice agent na srpskom. Fiksna cena, podrška i posle isporuke. Direktan rad sa inženjerom iz Novog Sada.",
  keywords: [
    "AI automatizacija Srbija",
    "AI chatbot za srpske firme",
    "AI voice agent srpski",
    "AI asistent za firme",
    "AI integracije Srbija",
    "razvoj sajtova Novi Sad",
    "Next.js developer Srbija",
    "freelance inženjer Srbija",
  ],
  metadataBase: new URL("https://www.solveradev.rs"),
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: "https://www.solveradev.rs",
    siteName: "Solvera",
    title: "Solvera | Vi vodite biznis, ja brinem o tehnologiji",
    description:
      "Sajtovi, poslovni sistemi i AI rešenja za firme u Srbiji. Fiksna cena, ugovor i podrška posle isporuke.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solvera | Vi vodite biznis, ja brinem o tehnologiji",
    description:
      "Sajtovi, poslovni sistemi i AI rešenja za firme u Srbiji. Fiksna cena, ugovor i podrška posle isporuke.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://www.solveradev.rs",
  },
  // Google Search Console ownership check. Must sit in <head> — the GA snippet
  // loads lazily for performance, so it can't serve as the verification signal.
  verification: {
    google: "Ibx4LOWXOqLsKamIieyCnG2rKci6D_zPaP7ZcLIvyuk",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <html lang="sr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(localBusinessSchema) }}
        />
      </head>
      <body
        className={`${manrope.variable} ${instrumentSerif.variable} ${geistMono.variable} antialiased bg-surface text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale="sr" messages={messages}>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <FloatingWidgets />
            {/* Analytics is mounted by CookieConsent, and only after the visitor
                agrees — declining must mean the script never loads. */}
            <CookieConsent />
            <Suspense fallback={null}>
              <PageviewTracker />
            </Suspense>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
