import Link from "next/link";
import { FaqSection } from "@/components/conversion/faq-section";
import { InnerPageHero } from "@/components/inner-page-hero";
import { InnerPageLayout } from "@/components/inner-page-layout";
import { SeoArticleAnalytics } from "@/components/seo/seo-article-analytics";
import { SeoArticleCtaLink } from "@/components/seo/seo-article-cta-link";
import { seoArticlePath } from "@/lib/seo/articles";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
} from "@/lib/seo/json-ld";
import type { SeoArticle } from "@/lib/seo/types";
import { SEO_HUB_PATH } from "@/lib/seo/types";

type SeoArticleTemplateProps = {
  article: SeoArticle;
};

export function SeoArticleTemplate({ article }: SeoArticleTemplateProps) {
  const path = seoArticlePath(article.slug);
  const articleLd = buildArticleJsonLd(article);
  const breadcrumbLd = buildBreadcrumbJsonLd(article);
  const faqLd = buildFaqJsonLd(article);
  const midIndex = Math.max(1, Math.floor(article.sections.length / 2) - 1);

  return (
    <InnerPageLayout className="conversion-page guides-page guides-article-page">
      <SeoArticleAnalytics slug={article.slug} cluster={article.cluster} path={path} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      ) : null}

      <nav className="guides-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true"> / </span>
        <Link href={SEO_HUB_PATH}>Guides</Link>
        <span aria-hidden="true"> / </span>
        <span>{article.title}</span>
      </nav>

      <InnerPageHero eyebrow="1320 Guides" title={article.headline} lead={article.directAnswer} />

      <article className="guides-article glass-card">
        {article.sections.map((section, index) => (
          <section key={section.id} id={section.id} className="guides-article-section">
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
            {article.midCta && index === midIndex ? (
              <p className="guides-mid-cta">
                <SeoArticleCtaLink
                  cta={article.midCta}
                  slug={article.slug}
                  cluster={article.cluster}
                  placement="mid"
                  className="gold-button"
                />
              </p>
            ) : null}
          </section>
        ))}

        {article.faq.length ? (
          <FaqSection
            title="FAQ"
            items={article.faq.map((item) => ({ q: item.question, a: item.answer }))}
          />
        ) : null}

        {article.related.length ? (
          <section className="guides-related" aria-label="Related reading">
            <h2>Related Concepts</h2>
            <ul>
              {article.related.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="guides-end-cta">
          <h2>Gentle Next Step</h2>
          <SeoArticleCtaLink
            cta={article.endCta}
            slug={article.slug}
            cluster={article.cluster}
            placement="end"
            className="gold-button"
          />
        </section>

        <footer className="guides-article-meta">
          <p>
            Author: {article.author} · Reviewer: {article.reviewer}
          </p>
          <p>
            Updated: {article.updatedAt.slice(0, 10)} · Version {article.version}
          </p>
        </footer>
      </article>
    </InnerPageLayout>
  );
}
