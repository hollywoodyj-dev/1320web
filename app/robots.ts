import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/platform-config";
import { ROBOTS_DISALLOW_PATHS } from "@/lib/seo/public-routes";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl().replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...ROBOTS_DISALLOW_PATHS],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
