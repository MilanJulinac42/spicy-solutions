/**
 * Free trial capacity and qualification. Every trial is 1–3 hours of unpaid
 * work, so only serious requests get one, and only a few per week:
 *
 *  - serious + a slot free  → trial built within 48h        (source "trial")
 *  - serious + week is full → queued for next week          (source "trial-queued")
 *  - just exploring         → written offer instead of a trial (source "trial-offer")
 *
 * Only "trial" rows count against the week, so the number shown on the page
 * is always the real one. Change WEEKLY_SLOTS to take on more or fewer.
 */

export const WEEKLY_SLOTS = 3;

export const TIMING = [
  { id: "odmah", label: "Što pre" },
  { id: "mesec", label: "U narednih mesec dana" },
  { id: "kasnije", label: "Za 2–3 meseca" },
  { id: "istrazujem", label: "Samo se raspitujem" },
] as const;

export const BUDGET = [
  { id: "do600", label: "Do 600€" },
  { id: "600-1200", label: "600–1.200€" },
  { id: "1200-3000", label: "1.200–3.000€" },
  { id: "3000plus", label: "Preko 3.000€" },
  { id: "nisam", label: "Nisam siguran" },
] as const;

export type TimingId = (typeof TIMING)[number]["id"];
export type BudgetId = (typeof BUDGET)[number]["id"];

/** Someone who wants to start within a month gets a trial. Everyone else gets
 *  a proper written offer — still useful to them, and costs minutes, not hours. */
export function isSerious(timing: string): boolean {
  return timing === "odmah" || timing === "mesec";
}

export type TrialOutcome = "trial" | "queued" | "offer";
