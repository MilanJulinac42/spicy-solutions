// Run local Lighthouse via CLI for production pages, parse JSON, summarize.
import { spawnSync } from "node:child_process";
import { readFileSync, existsSync, unlinkSync } from "node:fs";

const BASE = "https://www.solveradev.rs";

const PAGES = [
  { name: "Home", path: "/" },
  { name: "Process", path: "/proces" },
  { name: "Service detail", path: "/usluge/websites" },
  { name: "Project starter", path: "/zapocni-projekat" },
];

type Strategy = "mobile" | "desktop";

function color(score: number | undefined | null): string {
  if (score == null) return "?";
  if (score >= 0.9) return "🟢";
  if (score >= 0.5) return "🟡";
  return "🔴";
}
function fmt(n: number | undefined | null): string {
  if (n == null) return "  - ";
  return Math.round(n * 100).toString().padStart(3);
}
function ms(v: number | undefined): string {
  if (v == null) return "  - ";
  return `${Math.round(v)}ms`.padStart(7);
}
function sec(v: number | undefined): string {
  if (v == null) return "  - ";
  return `${(v / 1000).toFixed(2)}s`.padStart(7);
}

function runOne(url: string, strategy: Strategy, outFile: string): boolean {
  if (existsSync(outFile)) unlinkSync(outFile);
  const args = [
    "--yes",
    "lighthouse",
    url,
    "--quiet",
    `--chrome-flags=--headless=new --no-sandbox`,
    `--form-factor=${strategy}`,
    "--throttling-method=simulate",
    strategy === "desktop" ? "--preset=desktop" : "",
    "--only-categories=performance,accessibility,best-practices,seo",
    "--output=json",
    `--output-path=${outFile}`,
  ].filter(Boolean);
  spawnSync("npx", args, { stdio: "ignore", shell: true, timeout: 180000 });
  return existsSync(outFile);
}

type LHR = {
  categories: Record<string, { score: number | null }>;
  audits: Record<string, { numericValue?: number; details?: { type?: string; overallSavingsMs?: number }; title?: string }>;
};

function summarize(file: string) {
  const data = JSON.parse(readFileSync(file, "utf8")) as LHR;
  const c = data.categories;
  const a = data.audits;
  return {
    perf: c.performance?.score,
    a11y: c.accessibility?.score,
    bp: c["best-practices"]?.score,
    seo: c.seo?.score,
    lcp: a["largest-contentful-paint"]?.numericValue,
    cls: a["cumulative-layout-shift"]?.numericValue,
    tbt: a["total-blocking-time"]?.numericValue,
    fcp: a["first-contentful-paint"]?.numericValue,
    audits: a,
  };
}

async function runFor(strategy: Strategy) {
  console.log(`\n========== ${strategy.toUpperCase()} ==========`);
  console.log("Page              | Perf | A11y | BP  | SEO | LCP     | CLS   | TBT     | FCP");
  console.log("------------------|------|------|-----|-----|---------|-------|---------|--------");

  const results: { name: string; r: ReturnType<typeof summarize> | null }[] = [];
  for (const p of PAGES) {
    const out = `lh-${p.name.replace(/\s+/g, "-").toLowerCase()}-${strategy}.json`;
    const ok = runOne(`${BASE}${p.path}`, strategy, out);
    if (!ok) {
      console.log(`${p.name.padEnd(17)} | ERROR (no output)`);
      results.push({ name: p.name, r: null });
      continue;
    }
    const r = summarize(out);
    results.push({ name: p.name, r });
    const cls = r.cls != null ? r.cls.toFixed(3).padStart(5) : "  -  ";
    console.log(
      [
        p.name.padEnd(17),
        `${color(r.perf)}${fmt(r.perf)}`,
        `${color(r.a11y)}${fmt(r.a11y)}`,
        `${color(r.bp)}${fmt(r.bp)} `,
        `${color(r.seo)}${fmt(r.seo)} `,
        sec(r.lcp),
        cls,
        ms(r.tbt),
        sec(r.fcp),
      ].join(" | ")
    );
  }
  return results;
}

function topOpportunities(audits: Record<string, { details?: { type?: string; overallSavingsMs?: number }; title?: string }>) {
  const opps: { title: string; savings: number }[] = [];
  for (const [, a] of Object.entries(audits)) {
    if (a.details?.type === "opportunity" && (a.details.overallSavingsMs ?? 0) > 50) {
      opps.push({ title: a.title ?? "(no title)", savings: a.details.overallSavingsMs ?? 0 });
    }
  }
  opps.sort((a, b) => b.savings - a.savings);
  return opps.slice(0, 6);
}

async function main() {
  console.log(`Lighthouse (local) for ${BASE}`);
  const mobile = await runFor("mobile");
  const desktop = await runFor("desktop");

  const home = mobile.find((m) => m.name === "Home")?.r;
  if (home) {
    console.log(`\n========== TOP OPPORTUNITIES (mobile) — Home ==========`);
    const opps = topOpportunities(home.audits);
    if (opps.length === 0) console.log("  (none significant)");
    for (const o of opps) console.log(`  ~${Math.round(o.savings)}ms  ${o.title}`);
  }

  const proc = mobile.find((m) => m.name === "Process")?.r;
  if (proc) {
    console.log(`\n========== TOP OPPORTUNITIES (mobile) — Process ==========`);
    const opps = topOpportunities(proc.audits);
    if (opps.length === 0) console.log("  (none significant)");
    for (const o of opps) console.log(`  ~${Math.round(o.savings)}ms  ${o.title}`);
  }

  void desktop;
  console.log();
}

main().catch(console.error);
