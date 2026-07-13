import { Check, X, RefreshCw, BadgeCheck } from "lucide-react";

/**
 * Dead-simple, static "rent vs own" comparison for SaaS chatbot subscriptions
 * vs a custom bot. No interactivity — just two columns you scan in 3 seconds.
 */

const SAAS = [
  "Plaćaš svakog meseca — zauvek",
  "Podaci prolaze kroz tuđu platformu",
  "Prestaneš da plaćaš → nemaš ništa",
];

const CUSTOM = [
  "Platiš jednom + mali trošak modela",
  "Bot i podaci su tvoji",
  "Možeš da nastaviš sa bilo kim",
];

export function SaasVsCustom() {
  return (
    <div className="my-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* SaaS */}
        <div className="rounded-2xl border border-border-default bg-surface-secondary p-5">
          <div className="mb-4 flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-foreground-muted" />
            <div>
              <div className="font-semibold text-foreground">SaaS pretplata</div>
              <div className="text-xs text-foreground-muted">iznajmljuješ</div>
            </div>
          </div>
          <ul className="space-y-2.5">
            {SAAS.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-foreground-muted">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-foreground-muted/60" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Custom */}
        <div className="rounded-2xl border border-spicy-400/30 bg-spicy-400/[0.05] p-5">
          <div className="mb-4 flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-spicy-400" />
            <div>
              <div className="font-semibold text-foreground">Custom bot</div>
              <div className="text-xs text-spicy-400">poseduješ</div>
            </div>
          </div>
          <ul className="space-y-2.5">
            {CUSTOM.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-foreground-secondary">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-3 text-center text-[13px] text-foreground-muted">
        Gruba računica: na ~€100/mes, SaaS te za 2 godine košta{" "}
        <strong className="text-foreground">~€2.400</strong>. Custom bot ~€1.200 setup — i ostaje{" "}
        <strong className="text-foreground">tvoj</strong>.
      </p>
    </div>
  );
}
