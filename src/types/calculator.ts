export type ServiceType = "websites" | "enterprise";

export type WebsiteProjectType = "landing" | "multiPage" | "ecommerce" | "webapp";
export type EnterpriseProjectType = "internalTool" | "saas" | "dashboard" | "apiIntegration";

export type TimelineOption = "standard" | "priority" | "urgent";

export type WebsiteScope = {
  projectType: WebsiteProjectType;
  pages: "1to5" | "6to15" | "15plus";
  cms: boolean;
  customDesign: boolean;
};

export type EnterpriseScope = {
  projectType: EnterpriseProjectType;
  complexity: "simple" | "medium" | "complex";
  auth: boolean;
  integrations: "0" | "1to3" | "4plus";
};

export type ProjectScope = WebsiteScope | EnterpriseScope;

export type PriceRange = {
  min: number;
  max: number;
};

export type WizardState = {
  currentStep: number;
  serviceType: ServiceType | null;
  scope: Partial<ProjectScope>;
  timeline: TimelineOption | null;
  result: PriceRange | null;
};
