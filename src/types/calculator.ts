export type ServiceType = "websites" | "enterprise" | "ai" | "automation";

export type WebsiteProjectType = "landing" | "multiPage" | "ecommerce" | "webapp";
export type EnterpriseProjectType = "internalTool" | "saas" | "dashboard" | "apiIntegration";
export type AiProjectType = "faqBot" | "ragBot" | "multiChannel";
export type AutomationWorkflowCount = "1to3" | "4to7" | "8plus";

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

export type AiScope = {
  projectType: AiProjectType;
  knowledgeSource: "website" | "documents" | "database";
  multiLang: boolean;
  analytics: boolean;
};

export type AutomationScope = {
  workflowCount: AutomationWorkflowCount;
  complexity: "simple" | "multiStep" | "errorHandling";
  integrations: "1to3" | "4to7" | "8plus";
  monitoring: boolean;
};

export type ProjectScope = WebsiteScope | EnterpriseScope | AiScope | AutomationScope;

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
