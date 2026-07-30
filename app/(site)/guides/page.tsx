import type { Metadata } from "next";
import Link from "next/link";
import { InnerPageHero } from "@/components/inner-page-hero";
import { InnerPageLayout } from "@/components/inner-page-layout";
import {
  getPublishedSeoArticles,
  SEO_PLANNED_ARTICLES,
  seoArticlePath,
} from "@/lib/seo/articles";
import { FREE_BLUEPRINT_HREF, SEO_HUB_PATH } from "@/lib/seo/types";
import "@/styles/guides-density-v1.css";

export const metadata: Metadata = {
  title: "Guides | 1320 Soul Code",
  description:
    "Educational guides on Soul Blueprint, Life Path, birth date numerology, and reflective self-discovery — from 1320 Soul Code.",
  alternates: { canonical: SEO_HUB_PATH },
};

export default function GuidesHubPage() {
  const published = getPublishedSeoArticles();

  return (
    <InnerPageLayout className="conversion-page guides-page guides-hub-page">
      <InnerPageHero
        eyebrow="1320 Guides"
        title="Guides to Understanding Your Soul Blueprint"
        lead="Clear answers to common questions — then a gentle path to your Free Soul Blueprint. Mirror, not verdict."
      >
        <Link href={FREE_BLUEPRINT_HREF} className="gold-button">
          Discover Your Free Soul Blueprint
        </Link>
      </InnerPageHero>

      <section className="guides-hub-panel glass-card">
        <h2>Published Guides</h2>
        {published.length === 0 ? (
          <p className="guides-hub-empty">
            The first canonical guide — <strong>What Is a Soul Blueprint?</strong> — is being prepared.
            Meanwhile you can generate your Free Soul Blueprint anytime.
          </p>
        ) : (
          <ul className="guides-hub-list">
            {published.map((article) => (
              <li key={article.slug}>
                <Link href={seoArticlePath(article.slug)}>{article.title}</Link>
                <p>{article.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="guides-hub-panel glass-card">
        <h2>Coming Next</h2>
        <p className="guides-hub-note">
          Foundational release order from the locked SEO architecture. Pages publish after approved
          content and Lumen QA.
        </p>
        <ol className="guides-roadmap-list">
          {SEO_PLANNED_ARTICLES.map((item) => {
            const live = published.find((article) => article.slug === item.slug);
            return (
              <li key={item.slug}>
                <span className="guides-phase">{item.phase}</span>
                {live ? (
                  <Link href={seoArticlePath(item.slug)}>{item.title}</Link>
                ) : (
                  <span>{item.title}</span>
                )}
              </li>
            );
          })}
        </ol>
      </section>
    </InnerPageLayout>
  );
}
