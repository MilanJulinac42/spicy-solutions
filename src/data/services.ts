import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "chatbot",
    icon: "MessageSquare",
    titleKey: "ServicesOverview.chatbot.title",
    descriptionKey: "ServicesOverview.chatbot.description",
    features: [
      "Services.chatbot.features.f1",
      "Services.chatbot.features.f2",
      "Services.chatbot.features.f3",
      "Services.chatbot.features.f4",
      "Services.chatbot.features.f5",
    ],
    technologies: ["OpenAI", "Anthropic", "pgvector", "Next.js", "Supabase"],
    category: "ai",
  },
  {
    id: "voice",
    icon: "Phone",
    titleKey: "ServicesOverview.voice.title",
    descriptionKey: "ServicesOverview.voice.description",
    features: [
      "Services.voice.features.f1",
      "Services.voice.features.f2",
      "Services.voice.features.f3",
      "Services.voice.features.f4",
      "Services.voice.features.f5",
    ],
    technologies: ["Twilio", "LiveKit", "ElevenLabs", "Whisper", "OpenAI Realtime"],
    category: "ai",
  },
  {
    id: "aiIntegrations",
    icon: "Sparkles",
    titleKey: "ServicesOverview.aiIntegrations.title",
    descriptionKey: "ServicesOverview.aiIntegrations.description",
    features: [
      "Services.aiIntegrations.features.f1",
      "Services.aiIntegrations.features.f2",
      "Services.aiIntegrations.features.f3",
      "Services.aiIntegrations.features.f4",
      "Services.aiIntegrations.features.f5",
    ],
    technologies: ["OpenAI", "Claude", "LangChain", "Vector DB", "REST APIs"],
    category: "ai",
  },
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
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    category: "web",
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
    technologies: ["Node.js", ".NET", "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS"],
    category: "web",
  },
];

export const primaryServices = services.filter((s) => s.category === "ai");
export const secondaryServices = services.filter((s) => s.category === "web");
