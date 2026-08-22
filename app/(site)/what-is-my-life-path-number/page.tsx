import type { Metadata } from "next";
import { WhatIsMyLifePathNumberPage } from "@/components/seo/pages/what-is-my-life-path-number-page";
import { WHAT_IS_MY_LIFE_PATH_NUMBER_ARTICLE } from "@/lib/seo/content/what-is-my-life-path-number";
import { CANONICAL_SITE_URL } from "@/lib/platform-config";
import { seoArticlePath } from "@/lib/seo/articles";

const article = WHAT_IS_MY_LIFE_PATH_NUMBER_ARTICLE;
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
            alt: "Birth date reduced through month, day and year into one Life Path Number",
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

export default function WhatIsMyLifePathNumberRoute() {
  return <WhatIsMyLifePathNumberPage />;
}
