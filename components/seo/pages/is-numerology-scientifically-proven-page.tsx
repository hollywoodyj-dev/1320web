import Link from "next/link";
import { FaqSection } from "@/components/conversion/faq-section";
import { InnerPageLayout } from "@/components/inner-page-layout";
import { SeoArticleAnalytics } from "@/components/seo/seo-article-analytics";
import { SeoArticleCtaLink } from "@/components/seo/seo-article-cta-link";
import { seoArticlePath } from "@/lib/seo/articles";
import { IS_NUMEROLOGY_SCIENTIFICALLY_PROVEN_ARTICLE } from "@/lib/seo/content/is-numerology-scientifically-proven";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import "@/styles/guides-density-v1.css";

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function IsNumerologyScientificallyProvenPage() {
  const article = IS_NUMEROLOGY_SCIENTIFICALLY_PROVEN_ARTICLE;
  const path = seoArticlePath(article.slug);
  const articleLd = buildArticleJsonLd(article);
  const breadcrumbLd = buildBreadcrumbJsonLd(article);
  const answerParagraphs = splitParagraphs(article.directAnswer);
  const supportingParagraphs = splitParagraphs(article.heroSupporting ?? "");

  return (
    <InnerPageLayout className="conversion-page guides-page guides-article-page">
      <SeoArticleAnalytics
        slug={article.slug}
        cluster={article.cluster}
        path={path}
        primaryKeyword={article.primaryKeyword}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <nav className="guides-breadcrumb" aria-label="Breadcrumb">
        {(article.breadcrumbVisible ?? []).map((item, index, list) => {
          const isLast = index === list.length - 1;
          return (
            <span key={`${item.label}-${index}`}>
              {index > 0 ? <span aria-hidden="true"> / </span> : null}
              {item.href && !isLast ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
            </span>
          );
        })}
      </nav>

      <header className="inner-page-hero">
        <p className="blueprint-eyebrow">{article.eyebrow}</p>
        <h1 className="inner-page-title text-gold-gradient">{article.headline}</h1>

        {supportingParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="blueprint-lead">
            {paragraph}
          </p>
        ))}

        <div className="guides-direct-answer">
          {answerParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        {article.boundaryLine ? (
          <p className="conversion-boundary">{article.boundaryLine}</p>
        ) : null}

        <div className="blueprint-hero-actions">
          {article.heroCta ? (
            <SeoArticleCtaLink
              cta={article.heroCta}
              slug={article.slug}
              cluster={article.cluster}
              placement="hero"
              primaryKeyword={article.primaryKeyword}
              className="gold-button"
            />
          ) : null}
          {article.heroSecondaryCta ? (
            <SeoArticleCtaLink
              cta={article.heroSecondaryCta}
              slug={article.slug}
              cluster={article.cluster}
              placement="hero"
              primaryKeyword={article.primaryKeyword}
              className="blueprint-secondary-link"
            />
          ) : null}
        </div>
      </header>

      {article.sections.map((section) => (
        <section key={section.id} id={section.id} className="guides-section glass-card">
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </section>
      ))}

      {article.faq?.length ? (
        <FaqSection
          title="FAQ"
          items={article.faq.map((item) => ({ q: item.question, a: item.answer }))}
        />
      ) : null}

      <section className="blueprint-final-cta glass-card">
        <h2>{article.endHeading}</h2>
        {(article.endSupporting ?? []).map((line) => (
          <p key={line.slice(0, 48)}>{line}</p>
        ))}
        {article.endCta ? (
          <SeoArticleCtaLink
            cta={article.endCta}
            slug={article.slug}
            cluster={article.cluster}
            placement="final"
            primaryKeyword={article.primaryKeyword}
            className="gold-button"
          />
        ) : null}
        {article.endSecondaryCta ? (
          <SeoArticleCtaLink
            cta={article.endSecondaryCta}
            slug={article.slug}
            cluster={article.cluster}
            placement="final"
            primaryKeyword={article.primaryKeyword}
            className="blueprint-secondary-link block mt-3"
          />
        ) : null}
        {article.endBoundary ? (
          <p className="blueprint-disclaimer mt-4">{article.endBoundary}</p>
        ) : null}
      </section>
    </InnerPageLayout>
  );
}
