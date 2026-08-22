/**
 * Audit sitemap URLs for explicit alternates.canonical in page metadata source.
 * Run: npx tsx scripts/audit-canonical-coverage.ts
 */
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { getSitemapRoutes } from "../lib/seo/public-routes";

/** Map sitemap path → expected page.tsx (app router). */
function pageFileForRoute(routePath: string): string | null {
  if (routePath === "/") return path.join("app", "page.tsx");
  const segment = routePath.replace(/^\//, "");
  const candidates = [
    path.join("app", "(site)", segment, "page.tsx"),
    path.join("app", segment, "page.tsx"),
  ];
  return candidates.find((file) => existsSync(path.join(process.cwd(), file))) ?? null;
}

function hasExplicitCanonical(filePath: string): boolean {
  const src = readFileSync(path.join(process.cwd(), filePath), "utf8");
  return /alternates\s*:\s*\{[^}]*canonical/.test(src) || /withPageCanonical\s*\(/.test(src);
}

function main() {
  const routes = getSitemapRoutes();
  const missing: string[] = [];
  const ok: string[] = [];

  for (const route of routes) {
    const file = pageFileForRoute(route.path);
    if (!file) {
      missing.push(`${route.path} (page file not found)`);
      continue;
    }
    if (hasExplicitCanonical(file)) ok.push(route.path);
    else missing.push(`${route.path} → ${file}`);
  }

  console.log(`OK (${ok.length}):`, ok.join(", ") || "(none)");
  if (missing.length) {
    console.error(`MISSING (${missing.length}):`);
    for (const item of missing) console.error(`  - ${item}`);
    process.exit(1);
  }
  console.log("All sitemap routes have explicit canonical metadata.");
}

main();
