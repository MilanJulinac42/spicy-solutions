import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.solveradev.rs";

  const routes = ["", "/usluge", "/proces", "/o-nama", "/kontakt", "/politika-privatnosti", "/uslovi-koriscenja"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/usluge" ? 0.9 : 0.7,
  }));
}
