export interface NavLink {
  titleKey: string;
  href: string;
}

export type ServiceCategory = "ai" | "web";

export interface Service {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  features: string[];
  technologies: string[];
  category: ServiceCategory;
}

export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  technologies: string[];
  category: "chatbot" | "voice" | "assistant" | "aiIntegrations" | "websites" | "enterprise";
}

export interface Testimonial {
  id: string;
  quoteKey: string;
  nameKey: string;
  roleKey: string;
  companyKey: string;
}

export interface TeamMember {
  id: string;
  nameKey: string;
  roleKey: string;
  bioKey: string;
}

export interface ProcessStep {
  titleKey: string;
  descriptionKey: string;
  icon: string;
}
