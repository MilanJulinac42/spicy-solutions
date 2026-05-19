import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "project1",
    titleKey: "Projects.project1.title",
    descriptionKey: "Projects.project1.description",
    technologies: ["OpenAI", "pgvector", "Next.js", "Supabase"],
    category: "chatbot",
  },
  {
    id: "project2",
    titleKey: "Projects.project2.title",
    descriptionKey: "Projects.project2.description",
    technologies: ["Twilio", "LiveKit", "ElevenLabs", "OpenAI Realtime"],
    category: "voice",
  },
  {
    id: "project3",
    titleKey: "Projects.project3.title",
    descriptionKey: "Projects.project3.description",
    technologies: ["Claude", "LangChain", "Tool use", "Vector DB"],
    category: "assistant",
  },
  {
    id: "project4",
    titleKey: "Projects.project4.title",
    descriptionKey: "Projects.project4.description",
    technologies: ["OpenAI", "LangChain", "REST APIs", "Postgres"],
    category: "aiIntegrations",
  },
];
