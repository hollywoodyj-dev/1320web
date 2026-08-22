import type { Metadata } from "next";
import { WhatDoesYourBirthdayMeanPage } from "@/components/seo/pages/what-does-your-birthday-mean-page";
import { WHAT_DOES_YOUR_BIRTHDAY_MEAN_ARTICLE } from "@/lib/seo/content/what-does-your-birthday-mean";
import { CANONICAL_SITE_URL } from "@/lib/platform-config";
import { seoArticlePath } from "@/lib/seo/articles";

const article = WHAT_DOES_YOUR_BIRTHDAY_MEAN_ARTICLE;
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
            alt: "Four layers of birthday meaning: factual date, personal memory, symbolic interpretation and individual choice",
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

export default function WhatDoesYourBirthdayMeanRoute() {
  return <WhatDoesYourBirthdayMeanPage />;
}
