import { Globe, Building2, Sparkles, Workflow, type LucideIcon } from "lucide-react";

export type ServiceType = "ai" | "automation" | "websites" | "enterprise";

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
  ai: {
    icon: Sparkles,
    subtypes: ["chatbot", "voice", "assistant", "integration", "other"],
    features: [
      "leadCapture",
      "knowledgeBase",
      "calendarBooking",
      "smsNotify",
      "crmIntegration",
      "handoff",
      "multilang",
      "dashboard",
      "analytics",
      "apiAccess",
    ],
    featuresBySubtype: {
      chatbot: ["leadCapture", "knowledgeBase", "calendarBooking", "smsNotify", "crmIntegration", "handoff", "multilang", "dashboard"],
      voice: ["calendarBooking", "smsNotify", "crmIntegration", "handoff", "multilang", "dashboard", "analytics"],
      assistant: ["knowledgeBase", "multilang", "dashboard", "apiAccess"],
      integration: ["crmIntegration", "smsNotify", "apiAccess", "dashboard", "analytics"],
      other: ["leadCapture", "knowledgeBase", "crmIntegration", "multilang", "apiAccess", "dashboard", "analytics"],
    },
    scopeOptions: ["pilot", "small", "medium", "large"],
    timelineOptions: ["urgent", "normal", "flexible"],
    budgetOptions: ["tier1", "tier2", "tier3", "tier4", "unsure"],
  },
  automation: {
    icon: Workflow,
    subtypes: ["crmSync", "apiIntegration", "scraping", "workflow", "reporting", "marketing"],
    features: [
      "workflow",
      "zapier",
      "customApi",
      "dbSync",
      "errorHandling",
      "notifications",
      "scheduling",
    ],
    featuresBySubtype: {
      crmSync: ["workflow", "customApi", "dbSync", "errorHandling", "notifications"],
      apiIntegration: ["customApi", "dbSync", "errorHandling", "notifications", "scheduling"],
      scraping: ["workflow", "scheduling", "errorHandling", "notifications"],
      workflow: ["workflow", "zapier", "errorHandling", "notifications", "scheduling"],
      reporting: ["scheduling", "notifications", "dbSync", "customApi"],
      marketing: ["workflow", "zapier", "notifications", "scheduling"],
    },
    scopeOptions: ["small", "medium", "large"],
    timelineOptions: ["urgent", "normal", "flexible"],
    budgetOptions: ["tier1", "tier2", "tier3", "tier4", "unsure"],
  },
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
      internal: ["auth", "rbac", "reporting", "realtime", "api", "notifications", "audit"],
      dashboard: ["auth", "rbac", "reporting", "realtime", "api", "notifications"],
      saas: ["auth", "rbac", "reporting", "realtime", "api", "payment", "multitenant", "audit", "notifications"],
      crm: ["auth", "rbac", "reporting", "api", "payment", "audit", "notifications"],
      b2b: ["auth", "rbac", "reporting", "api", "payment", "multitenant", "audit", "notifications"],
    },
    scopeOptions: ["small", "medium", "large"],
    timelineOptions: ["urgent", "normal", "flexible"],
    budgetOptions: ["tier1", "tier2", "tier3", "tier4", "unsure"],
  },
};

export const SERVICE_TYPES: ServiceType[] = ["ai", "automation", "websites", "enterprise"];

export const CONTACT_CHANNELS = ["email", "phone", "whatsapp"] as const;
export type ContactChannel = (typeof CONTACT_CHANNELS)[number];
