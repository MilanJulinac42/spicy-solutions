/**
 * Kept out of lib/blog.ts on purpose: that module reads the filesystem, so
 * importing anything from it into a client component pulls `fs` into the
 * browser bundle and the build fails.
 */
export function formatDateSr(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("sr-RS", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}
