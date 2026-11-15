import type { MetadataRoute } from "next";
import { getDivisions, getDivisionServices } from "@/lib/content";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/why-choose-us", priority: 0.8 },
    { path: "/expertise", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy-policy", priority: 0.2 },
  ];

  for (const division of getDivisions()) {
    pages.push({ path: `/services/${division.slug}`, priority: 0.9 });
    for (const service of getDivisionServices(division)) {
      pages.push({ path: `/services/${division.slug}/${service.slug}`, priority: 0.7 });
    }
  }

  return pages.map(({ path, priority }) => ({ url: absoluteUrl(path), changeFrequency: "monthly", priority }));
}
