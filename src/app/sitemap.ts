import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { services } from "@/data/services";

const baseUrl = "https://www.solveradev.rs";

/**
 * Routes are listed by hand, so anything added later is invisible to search
 * until someone remembers this file — which is exactly what happened to the
 * service pages: all five were live and indexable, none were ever submitted.
 * Service slugs now come from the same source the pages are built from, so a
 * sixth service can't go missing.
 */
const staticRoutes = [
  "",
  "/usluge",
  "/radovi",
  "/proces",
  "/o-solveri",
  "/blog",
  "/kontakt",
  "/zapocni-projekat",
  "/politika-privatnosti",
  "/uslovi-koriscenja",
  "/data-deletion",
];

/** Legal pages exist to be findable, not ranked. */
const LOW_PRIORITY = ["/politika-privatnosti", "/uslovi-koriscenja", "/data-deletion"];

function priority(route: string) {
  if (route === "") return 1;
  if (route === "/usluge") return 0.9;
  if (LOW_PRIORITY.includes(route)) return 0.3;
  return 0.7;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: priority(route),
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/usluge/${service.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...serviceEntries, ...postEntries];
}
