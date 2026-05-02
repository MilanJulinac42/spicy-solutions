import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { FloatingWidgets } from "@/components/layout/FloatingWidgets";
import { PageviewTracker } from "@/components/analytics/PageviewTracker";
import { Suspense } from "react";
import {
  organizationSchema,
  websiteSchema,
  jsonLdString,
} from "@/lib/jsonld";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
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
    default: "Solvera | Vi vodite biznis, mi brinemo o tehnologiji",
    template: "%s | Solvera",
  },
  description:
    "Od sajtova do poslovnih sistema, AI chatbot-ova do automatizacije — isporučujem tehnologiju koja pokreće vaš biznis napred. Brza isporuka, direktna komunikacija, bez kompromisa.",
  metadataBase: new URL("https://www.solveradev.rs"),
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: "https://www.solveradev.rs",
    siteName: "Solvera",
    title: "Solvera | Vi vodite biznis, mi brinemo o tehnologiji",
    description:
      "Od sajtova do poslovnih sistema, AI chatbot-ova do automatizacije — isporučujem tehnologiju koja pokreće vaš biznis napred.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solvera | Vi vodite biznis, mi brinemo o tehnologiji",
    description:
      "Od sajtova do poslovnih sistema, AI chatbot-ova do automatizacije — isporučujem tehnologiju koja pokreće vaš biznis napred.",
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-surface text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale="sr" messages={messages}>
            <ScrollProgress />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <FloatingWidgets />
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-WDNDKK0PBT"
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', 'G-WDNDKK0PBT', { send_page_view: false });
              `}
            </Script>
            <Suspense fallback={null}>
              <PageviewTracker />
            </Suspense>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
