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
  email: "milanjulinac996@gmail.com",
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
  { name: "Next.js", category: "Frontend", description: "React framework for production" },
  { name: "React", category: "Frontend", description: "UI component library" },
  { name: "TypeScript", category: "Frontend", description: "Type-safe JavaScript" },
  { name: "Tailwind CSS", category: "Frontend", description: "Utility-first CSS framework" },
  { name: "Node.js", category: "Backend", description: "Server-side JavaScript runtime" },
  { name: "Python", category: "Backend", description: "Versatile scripting language" },
  { name: ".NET", category: "Backend", description: "Enterprise application platform" },
  { name: "PostgreSQL", category: "Database", description: "Advanced relational database" },
  { name: "MongoDB", category: "Database", description: "NoSQL document database" },
  { name: "Redis", category: "Database", description: "In-memory data store" },
  { name: "Docker", category: "DevOps", description: "Container platform" },
  { name: "Vercel", category: "DevOps", description: "Frontend cloud platform" },
  { name: "AWS", category: "DevOps", description: "Cloud infrastructure services" },
  { name: "n8n", category: "AI", description: "Workflow automation tool" },
  { name: "OpenAI", category: "AI", description: "AI model integration" },
  { name: "LangChain", category: "AI", description: "LLM application framework" },
];
