import type { NavLink } from "@/types";

export const navLinks: NavLink[] = [
  { titleKey: "Navbar.home", href: "/" },
  { titleKey: "Navbar.services", href: "/services" },
  { titleKey: "Navbar.about", href: "/about" },
  { titleKey: "Navbar.contact", href: "/contact" },
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
  { name: "Next.js", category: "Frontend", description: "Brzi i moderni sajtovi" },
  { name: "React", category: "Frontend", description: "Interaktivni korisnički interfejsi" },
  { name: "TypeScript", category: "Frontend", description: "Kod sa manje grešaka" },
  { name: "Tailwind CSS", category: "Frontend", description: "Lepši dizajn, brže" },
  { name: "Node.js", category: "Backend", description: "Brza obrada na serveru" },
  { name: "Python", category: "Backend", description: "Automatizacija i AI rešenja" },
  { name: ".NET", category: "Backend", description: "Pouzdani poslovni sistemi" },
  { name: "PostgreSQL", category: "Database", description: "Sigurno čuvanje vaših podataka" },
  { name: "MongoDB", category: "Database", description: "Fleksibilno skladištenje podataka" },
  { name: "Redis", category: "Database", description: "Munjevito brz pristup podacima" },
  { name: "Docker", category: "DevOps", description: "Stabilan rad u svakom okruženju" },
  { name: "Vercel", category: "DevOps", description: "Sajt dostupan za sekunde" },
  { name: "AWS", category: "DevOps", description: "Infrastruktura koja raste sa vama" },
  { name: "n8n", category: "AI", description: "Automatizacija ponavljajućih zadataka" },
  { name: "OpenAI", category: "AI", description: "Pametni odgovori za vaše korisnike" },
  { name: "LangChain", category: "AI", description: "AI koji razume vaše podatke" },
];
