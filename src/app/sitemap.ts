import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.solveradev.rs";

  const routes = ["", "/services", "/about", "/contact", "/privacy", "/terms"];

  return routes.map((route) => ({
    url: `${baseUrl}/sr${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/services" ? 0.9 : 0.7,
  }));
}
