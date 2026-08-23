/**
 * Public indexable routes for robots disallow + legacy helpers.
 * Sitemap membership is owned by lib/seo/intent-manifest.ts (single source of truth).
 */

import { getSitemapRoutesFromManifest } from "@/lib/seo/intent-manifest";

export type PublicSeoRoute = {
  path: string;
  /** Relative priority hint for crawlers (0–1). */
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
};

/** @deprecated Prefer getSitemapRoutesFromManifest — kept for any residual imports. */
export function getSitemapRoutes(): PublicSeoRoute[] {
  return getSitemapRoutesFromManifest();
}

/** Paths crawlers should not index (prefix match in robots.txt). */
export const ROBOTS_DISALLOW_PATHS = [
  "/account",
  "/admin",
  "/api/",
  "/auth/",
  "/checkout",
  "/facilitator",
  "/integration/",
  "/lp/",
  "/my-report",
  "/living-blueprint/",
  "/report/",
  "/report-system-preview",
  "/generating",
  "/result",
  "/mobile-report-v2",
  "/full-report-v2-phase1",
  "/sample-report",
  "/sample-report-v2",
  "/booking/success",
  /** Session URLs only. `/reflect` itself is D-class (noindex, not in sitemap); this prefix does not match it. */
  "/reflect/",
  "/login",
  "/signup",
  "/forgot-password",
] as const;
