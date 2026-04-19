// Run Lighthouse via Google PageSpeed Insights API for key production pages.
// No auth needed for low volume.

const BASE = "https://www.solveradev.rs";

const PAGES = [
  { name: "Home", path: "/" },
  { name: "Process", path: "/proces" },
  { name: "Service detail", path: "/usluge/sajtovi" },
  { name: "Project starter", path: "/zapocni-projekat" },
];

type Strategy = "mobile" | "desktop";

async function lhr(url: string, strategy: Strategy) {
  const params = new URLSearchParams({ url, strategy });
  for (const c of ["performance", "accessibility", "best-practices", "seo"]) {
    params.append("category", c);
  }
  const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error(`PSI HTTP ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

function fmt(n: number | undefined): string {
  if (n == null) return "  - ";
  const s = Math.round(n * 100).toString();
  return s.padStart(3);
}

function color(score: number | undefined): string {
  if (score == null) return "?";
  if (score >= 0.9) return "🟢";
  if (score >= 0.5) return "🟡";
  return "🔴";
}

function ms(v: number | undefined): string {
  if (v == null) return "  - ";
  return `${Math.round(v)}ms`.padStart(7);
}

function s(v: number | undefined): string {
  if (v == null) return "  - ";
  return `${(v / 1000).toFixed(2)}s`.padStart(7);
}

async function runFor(strategy: Strategy) {
  console.log(`\n========== ${strategy.toUpperCase()} ==========`);
  console.log("Page              | Perf | A11y | BP | SEO | LCP   | CLS   | TBT   | FCP");
  console.log("------------------|------|------|----|----|-------|-------|-------|-------");

  for (const p of PAGES) {
    try {
      const data = await lhr(`${BASE}${p.path}`, strategy);
      const cats = data.lighthouseResult?.categories || {};
      const audits = data.lighthouseResult?.audits || {};

      const perf = cats.performance?.score;
      const a11y = cats.accessibility?.score;
      const bp = cats["best-practices"]?.score;
      const seo = cats.seo?.score;

      const lcp = audits["largest-contentful-paint"]?.numericValue;
      const cls = audits["cumulative-layout-shift"]?.numericValue;
      const tbt = audits["total-blocking-time"]?.numericValue;
      const fcp = audits["first-contentful-paint"]?.numericValue;

      const row = [
        p.name.padEnd(17),
        `${color(perf)}${fmt(perf)}`,
        `${color(a11y)}${fmt(a11y)}`,
        `${color(bp)}${fmt(bp)}`,
        `${color(seo)}${fmt(seo)}`,
        s(lcp),
        cls != null ? cls.toFixed(3).padStart(5) : "  -  ",
        ms(tbt),
        s(fcp),
      ];
      console.log(row.join(" | "));
    } catch (e) {
      console.log(`${p.name.padEnd(17)} | ERROR: ${(e as Error).message}`);
    }

    // Stagger to avoid PSI rate limit
    await new Promise((r) => setTimeout(r, 1000));
  }
}

async function topOpportunities(strategy: Strategy) {
  console.log(`\n========== TOP OPPORTUNITIES (${strategy}) — Home page ==========`);
  try {
    const data = await lhr(`${BASE}/`, strategy);
    const audits = data.lighthouseResult?.audits || {};
    const opps: { id: string; title: string; savings: number }[] = [];
    for (const [id, a] of Object.entries<Record<string, unknown>>(audits)) {
      const audit = a as { details?: { type?: string; overallSavingsMs?: number }; title?: string; score?: number | null };
      if (audit.details?.type === "opportunity" && (audit.details.overallSavingsMs ?? 0) > 0) {
        opps.push({
          id,
          title: audit.title ?? id,
          savings: audit.details.overallSavingsMs ?? 0,
        });
      }
    }
    opps.sort((a, b) => b.savings - a.savings);
    for (const o of opps.slice(0, 5)) {
      console.log(`  ~${Math.round(o.savings)}ms  ${o.title}`);
    }
    if (opps.length === 0) console.log("  (none significant)");
  } catch (e) {
    console.log(`  ERROR: ${(e as Error).message}`);
  }
}

async function main() {
  console.log(`Lighthouse via PSI for ${BASE}`);
  await runFor("mobile");
  await runFor("desktop");
  await topOpportunities("mobile");
  console.log();
}

main().catch(console.error);
