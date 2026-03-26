import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "project1",
    titleKey: "Projects.project1.title",
    descriptionKey: "Projects.project1.description",
    technologies: ["Next.js", "Tailwind", "PostgreSQL", "Stripe"],
    category: "website",
  },
  {
    id: "project2",
    titleKey: "Projects.project2.title",
    descriptionKey: "Projects.project2.description",
    technologies: ["OpenAI", "LangChain", "Python", "React"],
    category: "ai",
  },
  {
    id: "project3",
    titleKey: "Projects.project3.title",
    descriptionKey: "Projects.project3.description",
    technologies: ["n8n", "REST APIs", "PostgreSQL", "Node.js"],
    category: "automation",
  },
  {
    id: "project4",
    titleKey: "Projects.project4.title",
    descriptionKey: "Projects.project4.description",
    technologies: ["React", "Node.js", "MongoDB", "Docker"],
    category: "enterprise",
  },
];
