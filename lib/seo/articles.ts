/** SEO article registry — only `published: true` articles are routed and sitemapped. */

import { WHAT_IS_A_SOUL_BLUEPRINT_ARTICLE } from "@/lib/seo/content/what-is-a-soul-blueprint";
import { LIFE_PATH_VS_SOUL_BLUEPRINT_ARTICLE } from "@/lib/seo/content/life-path-number-vs-soul-blueprint";
import { WHAT_IS_MY_LIFE_PATH_NUMBER_ARTICLE } from "@/lib/seo/content/what-is-my-life-path-number";
import { NUMEROLOGY_BY_DOB_VS_SOUL_BLUEPRINT_ARTICLE } from "@/lib/seo/content/numerology-by-date-of-birth-vs-soul-blueprint";
import { BIRTHDAY_NUMBER_VS_LIFE_PATH_VS_SOUL_BLUEPRINT_ARTICLE } from "@/lib/seo/content/birthday-number-vs-life-path-vs-soul-blueprint";
import type { SeoArticle, SeoPlannedArticle } from "@/lib/seo/types";
import { FREE_BLUEPRINT_HREF } from "@/lib/seo/types";

/**
 * Published SEO articles. Root-canonical pages set `path` explicitly.
 */
export const SEO_ARTICLES: SeoArticle[] = [
  WHAT_IS_A_SOUL_BLUEPRINT_ARTICLE,
  LIFE_PATH_VS_SOUL_BLUEPRINT_ARTICLE,
  WHAT_IS_MY_LIFE_PATH_NUMBER_ARTICLE,
  NUMEROLOGY_BY_DOB_VS_SOUL_BLUEPRINT_ARTICLE,
  BIRTHDAY_NUMBER_VS_LIFE_PATH_VS_SOUL_BLUEPRINT_ARTICLE,
];

/** Roadmap for hub display (Architecture v1.0 formal order). */
export const SEO_PLANNED_ARTICLES: SeoPlannedArticle[] = [
  {
    slug: "what-is-a-soul-blueprint",
    title: "What Is a Soul Blueprint?",
    cluster: "soul-blueprint-foundation",
    phase: "P1",
    status: "published",
  },
  {
    slug: "life-path-number-vs-soul-blueprint",
    title: "Life Path Number vs Soul Blueprint",
    cluster: "life-path-numerology",
    phase: "P2",
    status: "published",
  },
  {
    slug: "what-is-my-life-path-number",
    title: "What Is My Life Path Number?",
    cluster: "life-path-numerology",
    phase: "P3",
    status: "published",
  },
  {
    slug: "numerology-by-date-of-birth-vs-soul-blueprint",
    title: "Numerology by Date of Birth vs Soul Blueprint",
    cluster: "birth-date-numerology",
    phase: "P4",
    status: "published",
  },
  {
    slug: "birthday-number-vs-life-path-number",
    title: "Birthday Number vs Life Path Number vs Soul Blueprint",
    cluster: "birthday-number",
    phase: "P5",
    status: "published",
  },
  {
    slug: "what-does-your-birthday-mean",
    title: "What Does Your Birthday Mean?",
    cluster: "birthday-meaning",
    phase: "P6",
    status: "planned",
  },
  {
    slug: "numerology-reading-vs-soul-blueprint-report",
    title: "Numerology Reading vs Soul Blueprint Report",
    cluster: "life-path-numerology",
    phase: "P7",
    status: "planned",
  },
  {
    slug: "how-to-find-your-life-purpose",
    title: "How to Find Your Life Purpose Without Forcing an Answer",
    cluster: "life-direction",
    phase: "P8",
    status: "planned",
  },
  {
    slug: "why-do-i-repeat-the-same-relationship-patterns",
    title: "Why Do I Repeat the Same Relationship Patterns?",
    cluster: "relationships-shadow-integration",
    phase: "P9",
    status: "planned",
  },
  {
    slug: "shadow-work-prompts-for-repeating-patterns",
    title: "Shadow Work Prompts for Recognising Repeating Patterns",
    cluster: "relationships-shadow-integration",
    phase: "P10",
    status: "planned",
  },
];

export function getPublishedSeoArticles(): SeoArticle[] {
  return SEO_ARTICLES.filter((article) => article.published);
}

export function getSeoArticleBySlug(slug: string): SeoArticle | null {
  return getPublishedSeoArticles().find((article) => article.slug === slug) ?? null;
}

/** Canonical path for a published article (supports root overrides such as Page 01). */
export function seoArticlePath(slug: string): string {
  const article = SEO_ARTICLES.find((item) => item.slug === slug);
  if (article?.path) return article.path;
  return `/guides/${slug}`;
}

export function defaultFreeBlueprintCta(label = "Discover Your Free Soul Blueprint") {
  return {
    label,
    href: FREE_BLUEPRINT_HREF,
    intent: "free_blueprint" as const,
  };
}
