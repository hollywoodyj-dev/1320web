import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { SeoArticleTemplate } from "@/components/seo/seo-article-template";
import { getSeoArticleBySlug, seoArticlePath } from "@/lib/seo/articles";
import "@/styles/guides-density-v1.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Do not export `generateStaticParams` while the published registry can be empty.
 * An empty static-params list caused production HTTP 500 for unknown/unpublished
 * `/guides/[slug]` routes (dev returned 404). Force on-demand render + notFound().
 */
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getSeoArticleBySlug(slug);
  if (!article) {
    return { title: "Guide Not Found", robots: { index: false, follow: false } };
  }
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: seoArticlePath(article.slug) },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: seoArticlePath(article.slug),
    },
  };
}

export default async function GuideArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getSeoArticleBySlug(slug);
  if (!article) notFound();
  const canonical = seoArticlePath(article.slug);
  if (canonical !== `/guides/${slug}`) {
    permanentRedirect(canonical);
  }
  return <SeoArticleTemplate article={article} />;
}
