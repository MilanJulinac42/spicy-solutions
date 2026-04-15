"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { OptionCard } from "../OptionCard";
import type { ServiceType } from "@/types/calculator";

type Props = {
  serviceType: ServiceType;
  scope: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
};

function ScopeQuestion({
  label,
  children,
  delay = 0,
}: {
  label: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="space-y-3"
    >
      <h3 className="text-sm font-semibold text-foreground">{label}</h3>
      {children}
    </motion.div>
  );
}

function YesNo({
  value,
  onChange,
  tYes,
  tNo,
}: {
  value: boolean | undefined;
  onChange: (v: boolean) => void;
  tYes: string;
  tNo: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <OptionCard title={tYes} selected={value === true} onClick={() => onChange(true)} compact />
      <OptionCard title={tNo} selected={value === false} onClick={() => onChange(false)} compact />
    </div>
  );
}

function WebsiteScope({ scope, onChange, t }: { scope: Record<string, unknown>; onChange: Props["onChange"]; t: (k: string) => string }) {
  return (
    <div className="space-y-6">
      <ScopeQuestion label={t("projectType")}>
        <div className="grid sm:grid-cols-2 gap-3">
          {(["landing", "multiPage", "ecommerce", "webapp"] as const).map((v) => (
            <OptionCard
              key={v}
              title={t(v)}
              description={t(`${v}Desc`)}
              selected={scope.projectType === v}
              onClick={() => onChange("projectType", v)}
              compact
            />
          ))}
        </div>
      </ScopeQuestion>

      <ScopeQuestion label={t("pages")} delay={0.05}>
        <div className="grid grid-cols-3 gap-3">
          {(["1to5", "6to15", "15plus"] as const).map((v) => (
            <OptionCard
              key={v}
              title={t(`pages${v.charAt(0).toUpperCase() + v.slice(1)}`)}
              selected={scope.pages === v}
              onClick={() => onChange("pages", v)}
              compact
            />
          ))}
        </div>
      </ScopeQuestion>

      <ScopeQuestion label={t("cms")} delay={0.1}>
        <YesNo value={scope.cms as boolean | undefined} onChange={(v) => onChange("cms", v)} tYes={t("../yes")} tNo={t("../no")} />
      </ScopeQuestion>

      <ScopeQuestion label={t("customDesign")} delay={0.15}>
        <YesNo value={scope.customDesign as boolean | undefined} onChange={(v) => onChange("customDesign", v)} tYes={t("../yes")} tNo={t("../no")} />
      </ScopeQuestion>
    </div>
  );
}

function EnterpriseScope({ scope, onChange, t }: { scope: Record<string, unknown>; onChange: Props["onChange"]; t: (k: string) => string }) {
  return (
    <div className="space-y-6">
      <ScopeQuestion label={t("projectType")}>
        <div className="grid sm:grid-cols-2 gap-3">
          {(["internalTool", "saas", "dashboard", "apiIntegration"] as const).map((v) => (
            <OptionCard
              key={v}
              title={t(v)}
              description={t(`${v}Desc`)}
              selected={scope.projectType === v}
              onClick={() => onChange("projectType", v)}
              compact
            />
          ))}
        </div>
      </ScopeQuestion>

      <ScopeQuestion label={t("complexity")} delay={0.05}>
        <div className="grid grid-cols-3 gap-3">
          {(["simple", "medium", "complex"] as const).map((v) => (
            <OptionCard
              key={v}
              title={t(v)}
              selected={scope.complexity === v}
              onClick={() => onChange("complexity", v)}
              compact
            />
          ))}
        </div>
      </ScopeQuestion>

      <ScopeQuestion label={t("auth")} delay={0.1}>
        <YesNo value={scope.auth as boolean | undefined} onChange={(v) => onChange("auth", v)} tYes={t("../yes")} tNo={t("../no")} />
      </ScopeQuestion>

      <ScopeQuestion label={t("integrations")} delay={0.15}>
        <div className="grid grid-cols-3 gap-3">
          {(["0", "1to3", "4plus"] as const).map((v) => (
            <OptionCard
              key={v}
              title={t(`int${v}`)}
              selected={scope.integrations === v}
              onClick={() => onChange("integrations", v)}
              compact
            />
          ))}
        </div>
      </ScopeQuestion>
    </div>
  );
}

function AiScope({ scope, onChange, t }: { scope: Record<string, unknown>; onChange: Props["onChange"]; t: (k: string) => string }) {
  return (
    <div className="space-y-6">
      <ScopeQuestion label={t("projectType")}>
        <div className="grid sm:grid-cols-3 gap-3">
          {(["faqBot", "ragBot", "multiChannel"] as const).map((v) => (
            <OptionCard
              key={v}
              title={t(v)}
              description={t(`${v}Desc`)}
              selected={scope.projectType === v}
              onClick={() => onChange("projectType", v)}
              compact
            />
          ))}
        </div>
      </ScopeQuestion>

      <ScopeQuestion label={t("knowledgeSource")} delay={0.05}>
        <div className="grid grid-cols-3 gap-3">
          {(["website", "documents", "database"] as const).map((v) => (
            <OptionCard
              key={v}
              title={t(v)}
              selected={scope.knowledgeSource === v}
              onClick={() => onChange("knowledgeSource", v)}
              compact
            />
          ))}
        </div>
      </ScopeQuestion>

      <ScopeQuestion label={t("multiLang")} delay={0.1}>
        <YesNo value={scope.multiLang as boolean | undefined} onChange={(v) => onChange("multiLang", v)} tYes={t("../yes")} tNo={t("../no")} />
      </ScopeQuestion>

      <ScopeQuestion label={t("analytics")} delay={0.15}>
        <YesNo value={scope.analytics as boolean | undefined} onChange={(v) => onChange("analytics", v)} tYes={t("../yes")} tNo={t("../no")} />
      </ScopeQuestion>
    </div>
  );
}

function AutomationScope({ scope, onChange, t }: { scope: Record<string, unknown>; onChange: Props["onChange"]; t: (k: string) => string }) {
  return (
    <div className="space-y-6">
      <ScopeQuestion label={t("workflowCount")}>
        <div className="grid grid-cols-3 gap-3">
          {(["1to3", "4to7", "8plus"] as const).map((v) => (
            <OptionCard
              key={v}
              title={t(`wf${v}`)}
              selected={scope.workflowCount === v}
              onClick={() => onChange("workflowCount", v)}
              compact
            />
          ))}
        </div>
      </ScopeQuestion>

      <ScopeQuestion label={t("complexity")} delay={0.05}>
        <div className="grid gap-3">
          {(["simple", "multiStep", "errorHandling"] as const).map((v) => (
            <OptionCard
              key={v}
              title={t(v)}
              description={t(`${v}Desc`)}
              selected={scope.complexity === v}
              onClick={() => onChange("complexity", v)}
              compact
            />
          ))}
        </div>
      </ScopeQuestion>

      <ScopeQuestion label={t("integrations")} delay={0.1}>
        <div className="grid grid-cols-3 gap-3">
          {(["1to3", "4to7", "8plus"] as const).map((v) => (
            <OptionCard
              key={v}
              title={t(`int${v}`)}
              selected={scope.integrations === v}
              onClick={() => onChange("integrations", v)}
              compact
            />
          ))}
        </div>
      </ScopeQuestion>

      <ScopeQuestion label={t("monitoring")} delay={0.15}>
        <YesNo value={scope.monitoring as boolean | undefined} onChange={(v) => onChange("monitoring", v)} tYes={t("../yes")} tNo={t("../no")} />
      </ScopeQuestion>
    </div>
  );
}

export function ProjectScopeStep({ serviceType, scope, onChange }: Props) {
  const tScope = useTranslations(`Calculator.scope.${serviceType}`);
  const tCommon = useTranslations("Calculator.scope");

  const t = (key: string) => {
    if (key === "../yes") return tCommon("yes");
    if (key === "../no") return tCommon("no");
    return tScope(key);
  };

  switch (serviceType) {
    case "websites":
      return <WebsiteScope scope={scope} onChange={onChange} t={t} />;
    case "enterprise":
      return <EnterpriseScope scope={scope} onChange={onChange} t={t} />;
    case "ai":
      return <AiScope scope={scope} onChange={onChange} t={t} />;
    case "automation":
      return <AutomationScope scope={scope} onChange={onChange} t={t} />;
  }
}
