// Structured data builders (JSON-LD / schema.org).
// Renders as <script type="application/ld+json"> in layouts so Google can
// surface rich results (knowledge panel, sitelinks, FAQ accordion).

const SITE_URL = "https://www.solveradev.rs";
const LOGO_URL = `${SITE_URL}/logo.png`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: "Solvera",
  alternateName: "Solvera Dev",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: LOGO_URL,
    width: 512,
    height: 512,
  },
  image: LOGO_URL,
  description:
    "Solvera gradi AI rešenja — chatbot-ove, voice agente, interne asistente i AI integracije po meri. Web razvoj sekundarno. Direktan rad sa inženjerom.",
  email: "info@solveradev.rs",
  telephone: "+381638384196",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Novi Sad",
    addressCountry: "RS",
  },
  areaServed: ["RS", "ME", "BA", "HR", "SI", "MK"],
  sameAs: [
    "https://github.com/MilanJulinac42",
    "https://www.linkedin.com/in/milanjulinac/",
    "https://www.instagram.com/solveradev.rs/",
  ],
  founder: {
    "@type": "Person",
    name: "Milan Julinac",
  },
  knowsAbout: [
    "AI chatbot development",
    "RAG",
    "OpenAI",
    "Anthropic Claude",
    "Voice AI agents",
    "Twilio",
    "LiveKit",
    "ElevenLabs",
    "OpenAI Realtime",
    "Internal AI assistants",
    "AI integrations",
    "LangChain",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "Custom business software",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  url: SITE_URL,
  name: "Solvera",
  description: "Vi vodite biznis, ja brinem o tehnologiji",
  inLanguage: "sr-RS",
  publisher: { "@id": `${SITE_URL}#organization` },
};

// --- Service schemas (one per /usluge/[slug] page) ---------------------------

type ServiceSlug =
  | "chatbot"
  | "voice"
  | "assistant"
  | "aiIntegrations"
  | "websites"
  | "enterprise";

const SERVICE_DATA: Record<
  ServiceSlug,
  { name: string; description: string; serviceType: string }
> = {
  chatbot: {
    name: "AI Chatbot za sajt",
    description:
      "RAG chatbot integrisan sa vašom bazom znanja — odgovara 24/7 na osnovu vaših dokumenata, kvalifikuje upite i hvata leadove. Srpski i engleski.",
    serviceType: "AI chatbot development",
  },
  voice: {
    name: "AI Voice agent — prima pozive",
    description:
      "AI agent na vašem telefonskom broju koji prima pozive, vodi razgovor, rezerviše termine i prebacuje vama. Twilio, LiveKit, ElevenLabs, OpenAI Realtime.",
    serviceType: "Voice AI agent development",
  },
  assistant: {
    name: "Interni AI Asistent",
    description:
      "Privatan AI asistent obučen na vašoj internoj dokumentaciji. Self-hosted ili enterprise cloud — vaši zaposleni pitaju umesto da pretražuju.",
    serviceType: "Internal AI assistant development",
  },
  aiIntegrations: {
    name: "AI integracije po meri",
    description:
      "Konkretne AI automatizacije za vaš proces — obrada dokumenata, klasifikacija mejlova, sumarizacija, agentski tokovi sa tool use.",
    serviceType: "Custom AI integration",
  },
  websites: {
    name: "Sajtovi i web aplikacije",
    description:
      "Brzi, moderni sajtovi u Next.js i React-u. Fiksna cena, lansiranje za 1-3 nedelje, kod ostaje vaš. Sekundarna usluga.",
    serviceType: "Web development",
  },
  enterprise: {
    name: "Poslovni sistemi",
    description:
      "Custom poslovni softver — interni sistemi, dashboard-i, integracije. Često se gradi oko AI sloja kao temelja procesa.",
    serviceType: "Custom business software development",
  },
};

export function serviceSchema(slug: string) {
  const data = SERVICE_DATA[slug as ServiceSlug];
  if (!data) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.name,
    serviceType: data.serviceType,
    description: data.description,
    url: `${SITE_URL}/usluge/${slug}`,
    provider: { "@id": `${SITE_URL}#organization` },
    areaServed: ["RS", "ME", "BA", "HR", "SI", "MK"],
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/zapocni-projekat`,
    },
  };
}

// --- FAQPage (mirrors Process.faq in messages/sr.json) -----------------------

export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Kako počinje saradnja?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pošaljete zahtev preko dugmeta „Započnite projekat“ ili kontakt forme. U roku od 24 sata javljam se sa terminom za besplatan uvodni razgovor (oko 30 minuta). Posle razgovora dobijate pisanu ponudu sa fiksnom cenom i rokom.",
      },
    },
    {
      "@type": "Question",
      name: "Kako se plaća?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pola cene na početku, pola pre puštanja u rad. Za projekte veće od 5000€ plaćanje se deli na tri dela. Može preko računa (firma na firmu) ili karticom.",
      },
    },
    {
      "@type": "Question",
      name: "Šta ako poželim izmene tokom rada?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Manje izmene (tekst, boje, raspored elemenata) su uključene u cenu. Za veće izmene (nove funkcionalnosti) dajem procenu dodatnog vremena i cene — vi odlučujete da li se radi ili ne.",
      },
    },
    {
      "@type": "Question",
      name: "Šta ako dođe do kašnjenja?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ako kasnim ja — rokovi su fiksni i dodatni trošak ide na moj račun. Ako kasnimo zbog čekanja na vaš sadržaj ili odobrenje, dogovaramo novi termin. U svakom trenutku tačno znate gde smo i zašto.",
      },
    },
    {
      "@type": "Question",
      name: "Šta se dešava nakon puštanja u rad?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prvih 30 dana — besplatno ispravljanje grešaka. Posle toga birate: mesečni paket održavanja (fiksna cena) ili rad po potrebi (po satu ili po zadatku). Kod i serveri su vaši — možete da nastavite sami ili sa drugim timom kad god poželite.",
      },
    },
  ],
};

/**
 * Helper to render a JSON-LD object as a string suitable for
 * `dangerouslySetInnerHTML`. Strips </script> safely (defense in depth).
 */
export function jsonLdString(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
