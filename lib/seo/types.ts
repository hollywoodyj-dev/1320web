/** SEO content types — Keyword Architecture v1.0 · Phase 0 */

export type SeoCluster =
  | "soul-blueprint-foundation"
  | "life-path-numerology"
  | "birthday-meaning"
  | "life-direction"
  | "relationships-shadow-integration";

export type SeoArticleSection = {
  id: string;
  title: string;
  /** Plain paragraphs; keep governance-safe language. */
  paragraphs: string[];
};

export type SeoArticleFaq = {
  question: string;
  answer: string;
};

export type SeoArticleCta = {
  label: string;
  href: string;
  /** Analytics intent for CTA clicks. */
  intent: "free_blueprint" | "full_report" | "session" | "related" | "other";
};

export type SeoArticle = {
  slug: string;
  title: string;
  description: string;
  /** H1 — usually matches search question. */
  headline: string;
  /** One-sentence clear answer under the H1. */
  directAnswer: string;
  cluster: SeoCluster;
  primaryKeywords: string[];
  sections: SeoArticleSection[];
  faq: SeoArticleFaq[];
  related: { title: string; href: string }[];
  midCta?: SeoArticleCta;
  endCta: SeoArticleCta;
  author: string;
  reviewer: string;
  publishedAt: string;
  updatedAt: string;
  version: string;
  /** When false, route 404s and sitemap excludes the URL. */
  published: boolean;
};

export type SeoPlannedArticle = {
  slug: string;
  title: string;
  cluster: SeoCluster;
  phase: string;
  status: "planned" | "draft" | "published";
};

export const SEO_HUB_PATH = "/guides" as const;
export const FREE_BLUEPRINT_HREF = "/free-soul-blueprint" as const;
export const DEFAULT_SEO_AUTHOR = "1320 Editorial" as const;
export const DEFAULT_SEO_REVIEWER = "Wisewave" as const;
