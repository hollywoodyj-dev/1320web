import type { Metadata } from "next";
import { NumerologyByDobVsSoulBlueprintPage } from "@/components/seo/pages/numerology-by-dob-vs-soul-blueprint-page";
import { NUMEROLOGY_BY_DOB_VS_SOUL_BLUEPRINT_ARTICLE } from "@/lib/seo/content/numerology-by-date-of-birth-vs-soul-blueprint";
import { CANONICAL_SITE_URL } from "@/lib/platform-config";
import { seoArticlePath } from "@/lib/seo/articles";

const article = NUMEROLOGY_BY_DOB_VS_SOUL_BLUEPRINT_ARTICLE;
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
            alt: "Comparison of birth-date numerology outputs such as Life Path and Birthday Number with the 1320 Soul Blueprint Foundation Mirrors S1, S3, S2 and S0",
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

export default function NumerologyByDateOfBirthVsSoulBlueprintRoute() {
  return <NumerologyByDobVsSoulBlueprintPage />;
}
