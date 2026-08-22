/**
 * Build-time sitemap generator — writes public/sitemap.xml from static route registry.
 * Run: npx tsx scripts/generate-sitemap.ts
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { CANONICAL_SITE_URL } from "../lib/platform-config";
import { getSitemapRoutes } from "../lib/seo/public-routes";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function main() {
  const siteUrl = CANONICAL_SITE_URL.replace(/\/$/, "");
  const lastModified = new Date().toISOString();
  const routes = getSitemapRoutes();

  const body = routes
    .map((route) => {
      const loc = `${siteUrl}${route.path === "/" ? "" : route.path}`;
      return [
        "  <url>",
        `    <loc>${escapeXml(loc)}</loc>`,
        `    <lastmod>${lastModified}</lastmod>`,
        `    <changefreq>${route.changeFrequency}</changefreq>`,
        `    <priority>${route.priority.toFixed(2)}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    body,
    "</urlset>",
    "",
  ].join("\n");

  const outPath = path.join(process.cwd(), "public", "sitemap.xml");
  writeFileSync(outPath, xml, "utf8");
  console.log(`Wrote ${routes.length} URLs to ${outPath}`);
}

main();
