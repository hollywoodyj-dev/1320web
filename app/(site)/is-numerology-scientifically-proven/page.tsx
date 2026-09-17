import type { Metadata } from "next";
import { IsNumerologyScientificallyProvenPage } from "@/components/seo/pages/is-numerology-scientifically-proven-page";
import { IS_NUMEROLOGY_SCIENTIFICALLY_PROVEN_ARTICLE } from "@/lib/seo/content/is-numerology-scientifically-proven";
import { seoArticlePath } from "@/lib/seo/articles";
import { CANONICAL_SITE_URL } from "@/lib/platform-config";

const article = IS_NUMEROLOGY_SCIENTIFICALLY_PROVEN_ARTICLE;
const path = seoArticlePath(article.slug);
const absoluteUrl = `${CANONICAL_SITE_URL.replace(/\/$/, "")}${path}`;

export const metadata: Metadata = {
  title: {
    absolute: article.title,
  },
  description: article.description,
  alternates: { canonical: path },
  openGraph: {
    title: article.headline,
    description: article.description,
    type: "article",
    url: absoluteUrl,
  },
  twitter: {
    card: "summary",
    title: article.headline,
    description: article.description,
  },
};

export const dynamic = "force-static";

export default function IsNumerologyScientificallyProvenRoute() {
  return <IsNumerologyScientificallyProvenPage />;
}
