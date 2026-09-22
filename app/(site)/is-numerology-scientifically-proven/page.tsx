import type { Metadata } from "next";
import { IsNumerologyScientificallyProvenPage } from "@/components/seo/pages/is-numerology-scientifically-proven-page";
import { IS_NUMEROLOGY_SCIENTIFICALLY_PROVEN_ARTICLE } from "@/lib/seo/content/is-numerology-scientifically-proven";
import { seoArticlePath } from "@/lib/seo/articles";
import { CANONICAL_SITE_URL } from "@/lib/platform-config";
import { OG_IMAGE_ALTS } from "@/lib/seo/site-open-graph";

const article = IS_NUMEROLOGY_SCIENTIFICALLY_PROVEN_ARTICLE;
const path = seoArticlePath(article.slug);
const absoluteUrl = `${CANONICAL_SITE_URL.replace(/\/$/, "")}${path}`;
const ogImage = article.ogImage
  ? `${CANONICAL_SITE_URL.replace(/\/$/, "")}${article.ogImage}`
  : undefined;

export const metadata: Metadata = {
  title: {
    absolute: article.title,
  },
  description: article.description,
  alternates: { canonical: path },
  openGraph: {
    title: article.ogTitle ?? article.headline,
    description: article.ogDescription ?? article.description,
    type: "article",
    url: absoluteUrl,
    images: ogImage
      ? [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: OG_IMAGE_ALTS.isNumerologyScientificallyProven,
          },
        ]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: article.ogTitle ?? article.headline,
    description: article.ogDescription ?? article.description,
    images: ogImage ? [ogImage] : undefined,
  },
};

export const dynamic = "force-static";

export default function IsNumerologyScientificallyProvenRoute() {
  return <IsNumerologyScientificallyProvenPage />;
}
