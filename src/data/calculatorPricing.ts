import type {
  ServiceType,
  TimelineOption,
  PriceRange,
  WebsiteScope,
  EnterpriseScope,
  ProjectScope,
} from "@/types/calculator";

type RangeConfig = { min: number; max: number };

const PRICING = {
  websites: {
    base: {
      landing: { min: 300, max: 600 },
      multiPage: { min: 500, max: 1200 },
      ecommerce: { min: 1000, max: 2500 },
      webapp: { min: 1500, max: 4000 },
    },
    pages: {
      "1to5": 1.0,
      "6to15": 1.3,
      "15plus": 1.6,
    },
    cms: { min: 200, max: 400 },
    customDesign: { min: 300, max: 600 },
  },
  enterprise: {
    base: {
      internalTool: { min: 2000, max: 5000 },
      saas: { min: 4000, max: 12000 },
      dashboard: { min: 1500, max: 4000 },
      apiIntegration: { min: 1000, max: 3000 },
    },
    complexity: {
      simple: 1.0,
      medium: 1.5,
      complex: 2.2,
    },
    auth: { min: 300, max: 800 },
    integrations: {
      "0": { min: 0, max: 0 },
      "1to3": { min: 400, max: 800 },
      "4plus": { min: 800, max: 2000 },
    },
  },
  timeline: {
    standard: 1.0,
    priority: 1.2,
    urgent: 1.4,
  },
} as const;

function roundTo50(n: number): number {
  return Math.round(n / 50) * 50;
}

function addRange(a: RangeConfig, b: RangeConfig): RangeConfig {
  return { min: a.min + b.min, max: a.max + b.max };
}

function multiplyRange(r: RangeConfig, m: number): RangeConfig {
  return { min: roundTo50(r.min * m), max: roundTo50(r.max * m) };
}

function calcWebsites(scope: WebsiteScope): PriceRange {
  let range: RangeConfig = { ...PRICING.websites.base[scope.projectType] };
  const pagesMult = PRICING.websites.pages[scope.pages];
  range = multiplyRange(range, pagesMult);
  if (scope.cms) range = addRange(range, PRICING.websites.cms);
  if (scope.customDesign) range = addRange(range, PRICING.websites.customDesign);
  return range;
}

function calcEnterprise(scope: EnterpriseScope): PriceRange {
  let range: RangeConfig = { ...PRICING.enterprise.base[scope.projectType] };
  const compMult = PRICING.enterprise.complexity[scope.complexity];
  range = multiplyRange(range, compMult);
  if (scope.auth) range = addRange(range, PRICING.enterprise.auth);
  range = addRange(range, PRICING.enterprise.integrations[scope.integrations]);
  return range;
}

export function calculatePriceRange(
  serviceType: ServiceType,
  scope: ProjectScope,
  timeline: TimelineOption
): PriceRange {
  let range: PriceRange;

  switch (serviceType) {
    case "websites":
      range = calcWebsites(scope as WebsiteScope);
      break;
    case "enterprise":
      range = calcEnterprise(scope as EnterpriseScope);
      break;
  }

  const timelineMult = PRICING.timeline[timeline];
  range = multiplyRange(range, timelineMult);

  return range;
}

// Estimated timeline in weeks based on price range
export function estimateTimeline(
  _serviceType: ServiceType,
  priceRange: PriceRange,
  timeline: TimelineOption
): { min: number; max: number } {
  const baseWeeksMin = Math.max(1, Math.round(priceRange.min / 500));
  const baseWeeksMax = Math.max(2, Math.round(priceRange.max / 400));

  const timelineDiv = { standard: 1, priority: 0.7, urgent: 0.5 };
  const div = timelineDiv[timeline];

  return {
    min: Math.max(1, Math.round(baseWeeksMin * div)),
    max: Math.max(2, Math.round(baseWeeksMax * div)),
  };
}
