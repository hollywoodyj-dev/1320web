import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoArticleTemplate } from "@/components/seo/seo-article-template";
import { getPublishedSeoArticles, getSeoArticleBySlug, seoArticlePath } from "@/lib/seo/articles";
import "@/styles/guides-density-v1.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedSeoArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getSeoArticleBySlug(slug);
  if (!article) {
    return { title: "Guide Not Found" };
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
  return <SeoArticleTemplate article={article} />;
}
