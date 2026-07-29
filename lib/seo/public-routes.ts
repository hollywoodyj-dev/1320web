/**
 * Public indexable routes for sitemap + Search Console submission.
 * Keep private / transactional / tokenized surfaces out of this list.
 */

export type PublicSeoRoute = {
  path: string;
  /** Relative priority hint for crawlers (0–1). */
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
};

/** Marketing, product, and legal pages safe to index. */
export const PUBLIC_SEO_ROUTES: PublicSeoRoute[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/free-soul-blueprint", priority: 0.95, changeFrequency: "weekly" },
  { path: "/your-code", priority: 0.9, changeFrequency: "weekly" },
  { path: "/full-report", priority: 0.9, changeFrequency: "weekly" },
  { path: "/booking", priority: 0.85, changeFrequency: "weekly" },
  { path: "/about-1320", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blueprint", priority: 0.8, changeFrequency: "monthly" },
  { path: "/full-report-v2", priority: 0.75, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/reflect", priority: 0.65, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.4, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.4, changeFrequency: "yearly" },
  { path: "/disclaimer", priority: 0.4, changeFrequency: "yearly" },
];

/** Paths crawlers should not index (prefix match in robots.txt). */
export const ROBOTS_DISALLOW_PATHS = [
  "/account",
  "/api/",
  "/auth/",
  "/checkout",
  "/facilitator",
  "/integration/",
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
  "/reflect/",
  "/login",
  "/signup",
  "/forgot-password",
] as const;
