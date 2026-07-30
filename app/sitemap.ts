import type { MetadataRoute } from "next";
import { CANONICAL_SITE_URL } from "@/lib/platform-config";
import { getSitemapRoutes } from "@/lib/seo/public-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = CANONICAL_SITE_URL.replace(/\/$/, "");
  const lastModified = new Date();

  return getSitemapRoutes().map((route) => ({
    url: `${siteUrl}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
