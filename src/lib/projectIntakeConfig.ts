import { Globe, Building2, Brain, Workflow, type LucideIcon } from "lucide-react";

export type ServiceType = "websites" | "enterprise" | "ai" | "automation";

export interface ServiceConfig {
  icon: LucideIcon;
  subtypes: readonly string[];
  features: readonly string[];
  /**
   * Features koji se prikazuju za svaki podtip — implicitne funkcionalnosti
   * (npr. "shop" za E-commerce) su izbačene iz liste jer se podrazumevaju.
   * Ako subtype nije izabran, prikazuju se sve features.
   */
  featuresBySubtype: Record<string, readonly string[]>;
  scopeOptions: readonly string[];
  timelineOptions: readonly string[];
  budgetOptions: readonly string[];
}

export const SERVICE_CONFIG: Record<ServiceType, ServiceConfig> = {
  websites: {
    icon: Globe,
    subtypes: ["landing", "corporate", "ecommerce", "portfolio", "blog"],
    features: [
      "contactForm",
      "blog",
      "shop",
      "booking",
      "cms",
      "multilang",
      "newsletter",
      "livechat",
      "seo",
      "analytics",
    ],
    featuresBySubtype: {
      landing: ["contactForm", "newsletter", "livechat", "seo", "analytics"],
      corporate: [
        "contactForm",
        "blog",
        "cms",
        "multilang",
        "newsletter",
        "livechat",
        "seo",
        "analytics",
      ],
      // E-commerce: "shop" je implicitno — ne prikazujemo ga
      ecommerce: [
        "cms",
        "multilang",
        "newsletter",
        "livechat",
        "seo",
        "analytics",
        "blog",
        "booking",
      ],
      portfolio: [
        "contactForm",
        "cms",
        "multilang",
        "seo",
        "analytics",
        "booking",
      ],
      // Blog / Magazin: "blog" je implicitno
      blog: ["cms", "multilang", "newsletter", "livechat", "seo", "analytics"],
    },
    scopeOptions: ["small", "medium", "large"],
    timelineOptions: ["urgent", "normal", "flexible"],
    budgetOptions: ["tier1", "tier2", "tier3", "tier4", "unsure"],
  },
  enterprise: {
    icon: Building2,
    subtypes: ["internal", "dashboard", "saas", "crm", "b2b"],
    features: [
      "auth",
      "rbac",
      "reporting",
      "realtime",
      "api",
      "payment",
      "multitenant",
      "audit",
      "notifications",
    ],
    featuresBySubtype: {
      // Interni alat: bez payment / multitenant (nerelevantno)
      internal: ["auth", "rbac", "reporting", "realtime", "api", "notifications", "audit"],
      // Dashboard: reporting/realtime je "srce" — ostale features su dodatne
      dashboard: ["auth", "rbac", "reporting", "realtime", "api", "notifications"],
      // SaaS: sve features su relevantne
      saas: ["auth", "rbac", "reporting", "realtime", "api", "payment", "multitenant", "audit", "notifications"],
      // CRM/ERP: bez multitenant (jedno-firma)
      crm: ["auth", "rbac", "reporting", "api", "payment", "audit", "notifications"],
      // B2B portal: sve osim realtime (manje kritično)
      b2b: ["auth", "rbac", "reporting", "api", "payment", "multitenant", "audit", "notifications"],
    },
    scopeOptions: ["small", "medium", "large"],
    timelineOptions: ["urgent", "normal", "flexible"],
    budgetOptions: ["tier1", "tier2", "tier3", "tier4", "unsure"],
  },
  ai: {
    icon: Brain,
    subtypes: ["chatbot", "rag", "content", "agent", "voice", "ocr"],
    features: [
      "knowledgeBase",
      "leadCapture",
      "crmIntegration",
      "multilang",
      "analytics",
      "apiAccess",
      "handoff",
      "fineTuning",
    ],
    featuresBySubtype: {
      // Chatbot: customer support fokus — lead capture, CRM, handoff relevantni
      chatbot: ["knowledgeBase", "leadCapture", "crmIntegration", "multilang", "analytics", "apiAccess", "handoff"],
      // RAG: knowledge base je implicitno, ali fine-tuning i API relevantni
      rag: ["multilang", "analytics", "apiAccess", "fineTuning"],
      // Content generator: ne treba knowledgeBase/leadCapture/handoff
      content: ["multilang", "analytics", "apiAccess", "fineTuning"],
      // AI agent: workflow fokus
      agent: ["knowledgeBase", "crmIntegration", "apiAccess", "fineTuning", "analytics"],
      // Voice AI: bez apiAccess (sam je interfejs), bez fineTuning
      voice: ["knowledgeBase", "leadCapture", "crmIntegration", "multilang", "analytics", "handoff"],
      // OCR: obrada dokumenata — samo multilang, analytics, apiAccess
      ocr: ["multilang", "analytics", "apiAccess"],
    },
    scopeOptions: ["small", "medium", "large"],
    timelineOptions: ["urgent", "normal", "flexible"],
    budgetOptions: ["tier1", "tier2", "tier3", "tier4", "unsure"],
  },
  automation: {
    icon: Workflow,
    subtypes: [
      "marketing",
      "crmSync",
      "apiIntegration",
      "scraping",
      "workflow",
      "reporting",
    ],
    features: [
      "n8n",
      "zapier",
      "customApi",
      "dbSync",
      "errorHandling",
      "notifications",
      "scheduling",
    ],
    featuresBySubtype: {
      // Marketing: zapier-friendly, često email/trigger-based
      marketing: ["zapier", "customApi", "dbSync", "errorHandling", "notifications", "scheduling"],
      // CRM sync: bez n8n/workflow (one-to-one sync fokus)
      crmSync: ["zapier", "customApi", "dbSync", "errorHandling", "notifications"],
      // API integration: custom API fokus, sve relevantno
      apiIntegration: ["n8n", "customApi", "dbSync", "errorHandling", "notifications", "scheduling"],
      // Scraping: ne treba notifications obavezno, fokus na scheduling/error
      scraping: ["n8n", "customApi", "dbSync", "errorHandling", "scheduling"],
      // Workflow (n8n/Make): n8n je implicitno — sve ostalo relevantno
      workflow: ["zapier", "customApi", "dbSync", "errorHandling", "notifications", "scheduling"],
      // Reporting: fokus na scheduling i notifikacije
      reporting: ["n8n", "customApi", "dbSync", "errorHandling", "notifications", "scheduling"],
    },
    scopeOptions: ["small", "medium", "large"],
    timelineOptions: ["urgent", "normal", "flexible"],
    budgetOptions: ["tier1", "tier2", "tier3", "tier4", "unsure"],
  },
};

export const SERVICE_TYPES: ServiceType[] = [
  "websites",
  "enterprise",
  "ai",
  "automation",
];

export const CONTACT_CHANNELS = ["email", "phone", "whatsapp"] as const;
export type ContactChannel = (typeof CONTACT_CHANNELS)[number];
