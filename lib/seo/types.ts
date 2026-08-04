/** SEO content types — Keyword Architecture v1.0 · Phase 0+ */

export type SeoCluster =
  | "soul-blueprint-foundation"
  | "life-path-numerology"
  | "birth-date-numerology"
  | "birthday-number"
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
  intent:
    | "free_blueprint"
    | "full_report"
    | "sample_report"
    | "session"
    | "soul_blueprint_definition"
    | "life_path_calculation"
    | "life_path_comparison"
    | "birth_date_numerology"
    | "birthday_meaning"
    | "birthday_number_comparison"
    | "related"
    | "other";
};

export type SeoBreadcrumbItem = {
  label: string;
  href?: string;
};

export type SeoSchemaBreadcrumbItem = {
  name: string;
  path: string;
};

export type SeoArticle = {
  slug: string;
  /**
   * Canonical path. Defaults to `/guides/${slug}` when omitted.
   * Page 01 uses root `/what-is-a-soul-blueprint` (no `/guides` duplicate).
   */
  path?: string;
  title: string;
  description: string;
  /** H1 — usually matches search question. */
  headline: string;
  eyebrow?: string;
  /** One-sentence clear answer under the H1 (may contain \n\n for paragraphs). */
  directAnswer: string;
  heroSupporting?: string;
  /** Short boundary under the hero answer. */
  boundaryLine?: string;
  cluster: SeoCluster;
  primaryKeyword?: string;
  primaryKeywords: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  breadcrumbVisible?: SeoBreadcrumbItem[];
  breadcrumbSchema?: SeoSchemaBreadcrumbItem[];
  heroCta?: SeoArticleCta;
  heroSecondaryCta?: SeoArticleCta;
  sections: SeoArticleSection[];
  faq: SeoArticleFaq[];
  related: { title: string; href: string }[];
  /** Place mid CTA after this section id when set. */
  midCtaAfterSectionId?: string;
  midCta?: SeoArticleCta;
  endHeading?: string;
  endSupporting?: string[];
  endCta: SeoArticleCta;
  endSecondaryCta?: SeoArticleCta;
  endBoundary?: string;
  author: string;
  authorTitle?: string;
  /** Defaults to Person when omitted. Page 02 uses Organization. */
  authorType?: "Person" | "Organization";
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
