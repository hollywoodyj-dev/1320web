import { CANONICAL_SITE_URL } from "@/lib/platform-config";
import type { SeoArticle } from "@/lib/seo/types";
import { SEO_HUB_PATH } from "@/lib/seo/types";
import { seoArticlePath } from "@/lib/seo/articles";

function absoluteUrl(path: string): string {
  const base = CANONICAL_SITE_URL.replace(/\/$/, "");
  if (path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildArticleJsonLd(article: SeoArticle) {
  const url = absoluteUrl(seoArticlePath(article.slug));
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: article.author,
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
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: absoluteUrl(SEO_HUB_PATH),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: absoluteUrl(seoArticlePath(article.slug)),
      },
    ],
  };
}

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
