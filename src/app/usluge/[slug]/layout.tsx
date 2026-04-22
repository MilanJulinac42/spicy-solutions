import type { Metadata } from "next";
import { serviceSchema, jsonLdString } from "@/lib/jsonld";

const META: Record<string, { title: string; description: string }> = {
  websites: {
    title: "Sajtovi",
    description:
      "Brzi, moderni sajtovi u Next.js i React-u. Fiksna cena, lansiranje za 1-3 nedelje, kod ostaje vaš. SEO i performanse uključeni.",
  },
  enterprise: {
    title: "Poslovni sistemi",
    description:
      "Custom poslovni softver — interni sistemi, dashboard-i, integracije sa postojećim alatima. Skalabilna arhitektura, sigurnost i podrška.",
  },
  ai: {
    title: "AI chatbot-ovi",
    description:
      "AI chatbot-ovi i asistenti integrisani sa vašim podacima. RAG, OpenAI, prilagođeni vašem domenu — od korisničke podrške do automatizacije prodaje.",
  },
  automation: {
    title: "Automatizacija procesa",
    description:
      "n8n, custom skripte i integracije koje povezuju vaše alate i eliminišu ručni rad. Manje grešaka, više vremena za biznis.",
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
