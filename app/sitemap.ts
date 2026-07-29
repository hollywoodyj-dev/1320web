import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/platform-config";
import { PUBLIC_SEO_ROUTES } from "@/lib/seo/public-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  const lastModified = new Date();

  return PUBLIC_SEO_ROUTES.map((route) => ({
    url: `${siteUrl}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
