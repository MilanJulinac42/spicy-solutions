import type { NavLink } from "@/types";

export const navLinks: NavLink[] = [
  { titleKey: "Navbar.home", href: "/" },
  { titleKey: "Navbar.services", href: "/services" },
  { titleKey: "Navbar.about", href: "/about" },
  { titleKey: "Navbar.contact", href: "/contact" },
];

export const siteConfig = {
  name: "Spicy Solutions",
  description: "IT Outsourcing & Digital Solutions",
  url: "https://spicysolutions.dev",
  email: "hello@spicysolutions.dev",
  phone: "+381 XX XXX XXXX",
  address: "Belgrade, Serbia",
  socials: {
    github: "https://github.com/spicysolutions",
    linkedin: "https://linkedin.com/company/spicysolutions",
    twitter: "https://twitter.com/spicysolutions",
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
