import type { Metadata } from "next";
import { serviceSchema, jsonLdString } from "@/lib/jsonld";

const META: Record<string, { title: string; description: string }> = {
  chatbot: {
    title: "AI Chatbot za sajt",
    description:
      "RAG chatbot na vašem sajtu — odgovara na osnovu vaše baze znanja, kvalifikuje upite, hvata leadove. Setup 1–2 nedelje, srpski i engleski.",
  },
  voice: {
    title: "AI Voice agent — prima pozive",
    description:
      "AI agent na vašem telefonskom broju. Prirodan srpski glas, rezervacije, FAQ, prebacivanje na vas kad treba. Twilio + ElevenLabs + OpenAI Realtime.",
  },
  assistant: {
    title: "Interni AI Asistent",
    description:
      "Privatan AI asistent obučen na vašoj dokumentaciji i procedurama. Self-hosted ili enterprise cloud — vaši ljudi pitaju umesto da pretražuju Drive.",
  },
  aiIntegrations: {
    title: "AI integracije po meri",
    description:
      "Konkretne AI automatizacije za vaš proces — obrada dokumenata, triage mejlova, sumarizacija, agentski tokovi sa tool use.",
  },
  websites: {
    title: "Sajtovi i web aplikacije",
    description:
      "Brzi, moderni sajtovi u Next.js i React-u. Fiksna cena, lansiranje za 1-3 nedelje, kod ostaje vaš. SEO i performanse uključeni.",
  },
  enterprise: {
    title: "Poslovni sistemi",
    description:
      "Custom poslovni softver — interni sistemi, dashboard-i, integracije sa postojećim alatima. Skalabilna arhitektura, sigurnost i podrška.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = META[slug];
  if (!m) return {};
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: `https://www.solveradev.rs/usluge/${slug}` },
  };
}

export default async function ServiceDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const schema = serviceSchema(slug);
  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }}
        />
      )}
      {children}
    </>
  );
}
