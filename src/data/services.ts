import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "websites",
    icon: "Globe",
    titleKey: "ServicesOverview.websites.title",
    descriptionKey: "ServicesOverview.websites.description",
    features: [
      "Services.websites.features.f1",
      "Services.websites.features.f2",
      "Services.websites.features.f3",
      "Services.websites.features.f4",
      "Services.websites.features.f5",
    ],
    technologies: ["Next.js", "WordPress", "Tailwind CSS", "React"],
  },
  {
    id: "enterprise",
    icon: "Building2",
    titleKey: "ServicesOverview.enterprise.title",
    descriptionKey: "ServicesOverview.enterprise.description",
    features: [
      "Services.enterprise.features.f1",
      "Services.enterprise.features.f2",
      "Services.enterprise.features.f3",
      "Services.enterprise.features.f4",
      "Services.enterprise.features.f5",
    ],
    technologies: ["Node.js", "PostgreSQL", "Docker", "TypeScript"],
  },
  {
    id: "ai",
    icon: "Brain",
    titleKey: "ServicesOverview.ai.title",
    descriptionKey: "ServicesOverview.ai.description",
    features: [
      "Services.ai.features.f1",
      "Services.ai.features.f2",
      "Services.ai.features.f3",
      "Services.ai.features.f4",
      "Services.ai.features.f5",
    ],
    technologies: ["OpenAI", "LangChain", "Python", "Pinecone"],
  },
  {
    id: "automation",
    icon: "Workflow",
    titleKey: "ServicesOverview.automation.title",
    descriptionKey: "ServicesOverview.automation.description",
    features: [
      "Services.automation.features.f1",
      "Services.automation.features.f2",
      "Services.automation.features.f3",
      "Services.automation.features.f4",
      "Services.automation.features.f5",
    ],
    technologies: ["n8n", "REST APIs", "Webhooks", "Node.js"],
  },
];
