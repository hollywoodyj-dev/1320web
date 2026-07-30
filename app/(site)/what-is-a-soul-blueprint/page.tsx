import type { Metadata } from "next";
import { WhatIsSoulBlueprintPage } from "@/components/seo/pages/what-is-soul-blueprint-page";
import { WHAT_IS_A_SOUL_BLUEPRINT_ARTICLE } from "@/lib/seo/content/what-is-a-soul-blueprint";
import { CANONICAL_SITE_URL } from "@/lib/platform-config";
import { seoArticlePath } from "@/lib/seo/articles";

const article = WHAT_IS_A_SOUL_BLUEPRINT_ARTICLE;
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
            alt: "1320 Soul Blueprint diagram showing the four Foundation Mirrors in the order S1, S3, S2 and S0",
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

export default function WhatIsASoulBlueprintRoute() {
  return <WhatIsSoulBlueprintPage />;
}
