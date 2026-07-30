import { CANONICAL_SITE_URL } from "@/lib/platform-config";
import type { SeoArticle } from "@/lib/seo/types";
import { seoArticlePath } from "@/lib/seo/articles";

function absoluteUrl(path: string): string {
  const base = CANONICAL_SITE_URL.replace(/\/$/, "");
  if (path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildArticleJsonLd(article: SeoArticle) {
  const path = seoArticlePath(article.slug);
  const url = absoluteUrl(path);
  const image = article.ogImage ? absoluteUrl(article.ogImage) : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    ...(image ? { image: [image] } : {}),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: article.author,
      ...(article.authorTitle ? { jobTitle: article.authorTitle } : {}),
    },
    editor: {
      "@type": "Organization",
      name: article.reviewer,
    },
    publisher: {
      "@type": "Organization",
      name: "1320 Soul Code",
      url: absoluteUrl("/"),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    inLanguage: "en",
    version: article.version,
  };
}

export function buildBreadcrumbJsonLd(article: SeoArticle) {
  const items =
    article.breadcrumbSchema ??
    ([
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides" },
      { name: article.headline, path: seoArticlePath(article.slug) },
    ] as const);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Optional FAQPage JSON-LD — not required for Page 01 rich-result strategy. */
export function buildFaqJsonLd(article: SeoArticle) {
  if (!article.faq.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
