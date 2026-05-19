import type { NavLink } from "@/types";

export const navLinks: NavLink[] = [
  { titleKey: "Navbar.home", href: "/" },
  { titleKey: "Navbar.services", href: "/usluge" },
  { titleKey: "Navbar.process", href: "/proces" },
  { titleKey: "Navbar.about", href: "/o-nama" },
  { titleKey: "Navbar.contact", href: "/kontakt" },
];

export const siteConfig = {
  name: "Solvera",
  description: "Vi vodite biznis, mi brinemo o tehnologiji",
  url: "https://solveradev.rs",
  email: "info@solveradev.rs",
  phone: "+381 63 838 4196",
  address: "Novi Sad, Srbija",
  socials: {
    github: "https://github.com/MilanJulinac42",
    linkedin: "https://www.linkedin.com/in/milanjulinac/",
    instagram: "https://www.instagram.com/solveradev.rs/",
  },
};

export type TechCategory = "Frontend" | "Backend" | "Database" | "DevOps" | "AI";

export interface Technology {
  name: string;
  category: TechCategory;
  description: string;
}

export const techCategories: ("All" | TechCategory)[] = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "AI",
];

export const technologies: Technology[] = [
  { name: "OpenAI", category: "AI", description: "GPT modeli za chat i agente" },
  { name: "Claude", category: "AI", description: "Anthropic modeli — dugi kontekst, tool use" },
  { name: "LangChain", category: "AI", description: "Orkestracija AI tokova i agenata" },
  { name: "pgvector", category: "AI", description: "RAG nad vašom bazom znanja" },
  { name: "Whisper", category: "AI", description: "Pretvaranje govora u tekst" },
  { name: "ElevenLabs", category: "AI", description: "Realistični AI glasovi na srpskom i drugim jezicima" },
  { name: "LiveKit", category: "AI", description: "Realtime voice agenti niske latencije" },
  { name: "Twilio", category: "AI", description: "Telefonija — AI prima i obavlja pozive" },
  { name: "Next.js", category: "Frontend", description: "Brzi i moderni sajtovi" },
  { name: "React", category: "Frontend", description: "Interaktivni korisnički interfejsi" },
  { name: "TypeScript", category: "Frontend", description: "Kod sa manje grešaka" },
  { name: "Tailwind CSS", category: "Frontend", description: "Lepši dizajn, brže" },
  { name: "Node.js", category: "Backend", description: "Brza obrada na serveru" },
  { name: "Python", category: "Backend", description: "Skripte i AI pipeline-i" },
  { name: ".NET", category: "Backend", description: "Pouzdani poslovni sistemi" },
  { name: "PostgreSQL", category: "Database", description: "Sigurno čuvanje vaših podataka" },
  { name: "Supabase", category: "Database", description: "Postgres + pgvector + Auth out of the box" },
  { name: "Redis", category: "Database", description: "Munjevito brz pristup podacima" },
  { name: "Docker", category: "DevOps", description: "Stabilan rad u svakom okruženju" },
  { name: "Vercel", category: "DevOps", description: "Sajt dostupan za sekunde" },
  { name: "AWS", category: "DevOps", description: "Infrastruktura koja raste sa vama" },
];
