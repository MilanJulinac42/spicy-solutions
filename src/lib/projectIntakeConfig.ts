import { Globe, Building2, type LucideIcon } from "lucide-react";

export type ServiceType = "websites" | "enterprise";

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

export const SERVICE_TYPES: ServiceType[] = ["websites", "enterprise"];

export const CONTACT_CHANNELS = ["email", "phone", "whatsapp"] as const;
export type ContactChannel = (typeof CONTACT_CHANNELS)[number];
