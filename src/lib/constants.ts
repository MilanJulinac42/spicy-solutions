import type { NavLink } from "@/types";

export const navLinks: NavLink[] = [
  { titleKey: "Navbar.home", href: "/" },
  { titleKey: "Navbar.services", href: "/services" },
  { titleKey: "Navbar.about", href: "/about" },
  { titleKey: "Navbar.contact", href: "/contact" },
];

export const siteConfig = {
  name: "Solvera",
  description: "IT Outsourcing & Digital Solutions",
  url: "https://solveradev.rs",
  email: "hello@solveradev.rs",
  phone: "+381 XX XXX XXXX",
  address: "Belgrade, Serbia",
  socials: {
    github: "https://github.com/solvera",
    linkedin: "https://linkedin.com/company/solvera",
    twitter: "https://twitter.com/solvera",
  },
};

export const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "n8n",
  "OpenAI",
  "LangChain",
  "Tailwind CSS",
  "Vercel",
  "AWS",
  "Redis",
  "WordPress",
];
