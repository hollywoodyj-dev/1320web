import type { Metadata } from "next";
import { BirthdayNumberVsLifePathVsSoulBlueprintPage } from "@/components/seo/pages/birthday-number-vs-life-path-page";
import { BIRTHDAY_NUMBER_VS_LIFE_PATH_VS_SOUL_BLUEPRINT_ARTICLE } from "@/lib/seo/content/birthday-number-vs-life-path-vs-soul-blueprint";
import { CANONICAL_SITE_URL } from "@/lib/platform-config";
import { seoArticlePath } from "@/lib/seo/articles";

const article = BIRTHDAY_NUMBER_VS_LIFE_PATH_VS_SOUL_BLUEPRINT_ARTICLE;
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
            alt: "Comparison of Birthday Number 14/5, Life Path Number 3 and the 1320 Soul Blueprint Foundation Mirrors S1, S3, S2 and S0",
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

export default function BirthdayNumberVsLifePathVsSoulBlueprintRoute() {
  return <BirthdayNumberVsLifePathVsSoulBlueprintPage />;
}
