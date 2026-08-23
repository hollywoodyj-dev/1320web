import Image from "next/image";
import Link from "next/link";
import { FaqSection } from "@/components/conversion/faq-section";
import { InnerPageLayout } from "@/components/inner-page-layout";
import { SeoArticleAnalytics } from "@/components/seo/seo-article-analytics";
import { SeoArticleCtaLink } from "@/components/seo/seo-article-cta-link";
import { seoArticlePath } from "@/lib/seo/articles";
import {
  PAGE01_COMPARISON,
  PAGE01_FIXED,
  PAGE01_FOUNDATIONS,
  PAGE01_FREE_AND_FULL,
  PAGE01_FULL_MAP,
  PAGE01_HOW_CREATED,
  PAGE01_HOW_TO_USE,
  PAGE01_MAP_NOT_LABEL,
  PAGE01_MEANING,
  PAGE01_NOT,
  PAGE01_TRADITIONS,
} from "@/lib/seo/content/what-is-a-soul-blueprint-body";
import { WHAT_IS_A_SOUL_BLUEPRINT_ARTICLE } from "@/lib/seo/content/what-is-a-soul-blueprint";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import "@/styles/guides-density-v1.css";
import "@/styles/what-is-soul-blueprint-v1.css";

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function WhatIsSoulBlueprintPage() {
  const article = WHAT_IS_A_SOUL_BLUEPRINT_ARTICLE;
  const path = seoArticlePath(article.slug);
  const articleLd = buildArticleJsonLd(article);
  const breadcrumbLd = buildBreadcrumbJsonLd(article);
  const answerParagraphs = splitParagraphs(article.directAnswer);
  const supportingParagraphs = splitParagraphs(article.heroSupporting ?? "");

  return (
    <InnerPageLayout className="conversion-page guides-page guides-article-page wisb-page">
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

      <header className="inner-page-hero wisb-hero">
        <p className="blueprint-eyebrow">{article.eyebrow}</p>
        <h1 className="inner-page-title text-gold-gradient">{article.headline}</h1>

        <div className="wisb-direct-answer">
          {answerParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="blueprint-lead">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="wisb-hero-support">
          {supportingParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <div className="blueprint-hero-actions wisb-hero-actions">
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

        <figure className="wisb-hero-figure">
          <Image
            src={article.ogImage ?? "/seo/what-is-a-soul-blueprint-1320.webp"}
            alt="1320 Soul Blueprint diagram showing the four Foundation Mirrors in the order S1, S3, S2 and S0"
            width={1200}
            height={630}
            className="wisb-hero-image"
            priority
          />
        </figure>
      </header>

      <article className="guides-article glass-card wisb-article">
        <section id={PAGE01_MEANING.id} className="guides-article-section">
          <h2>{PAGE01_MEANING.title}</h2>
          {PAGE01_MEANING.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <aside className="wisb-highlight" aria-label="Key distinction">
            {PAGE01_MEANING.highlight.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </aside>
        </section>

        <section id={PAGE01_MAP_NOT_LABEL.id} className="guides-article-section">
          <h2>{PAGE01_MAP_NOT_LABEL.title}</h2>
          {PAGE01_MAP_NOT_LABEL.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <blockquote className="wisb-quote">{PAGE01_MAP_NOT_LABEL.quote}</blockquote>
        </section>

        <section id={PAGE01_FOUNDATIONS.id} className="guides-article-section">
          <h2>{PAGE01_FOUNDATIONS.title}</h2>
          <p>{PAGE01_FOUNDATIONS.intro}</p>
          <p className="wisb-sequence">{PAGE01_FOUNDATIONS.sequence}</p>
          <p>{PAGE01_FOUNDATIONS.sequenceNote}</p>
          <ol className="wisb-foundation-list">
            {PAGE01_FOUNDATIONS.items.map((item, index) => (
              <li key={item.code}>
                <h3>
                  Foundation {index + 1} · {item.code} · {item.title}
                </h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
          <p>{PAGE01_FOUNDATIONS.summaryTitle}</p>
          <ul className="wisb-summary-list">
            {PAGE01_FOUNDATIONS.summary.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section id={PAGE01_FULL_MAP.id} className="guides-article-section">
          <h2>{PAGE01_FULL_MAP.title}</h2>
          {PAGE01_FULL_MAP.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <ul className="wisb-layer-list">
            {PAGE01_FULL_MAP.layers.map((layer) => (
              <li key={layer.code}>
                <strong>
                  {layer.code} · {layer.title}
                </strong>
                <p>{layer.body}</p>
              </li>
            ))}
          </ul>
          {PAGE01_FULL_MAP.closing.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
        </section>

        <section id={PAGE01_HOW_CREATED.id} className="guides-article-section">
          <h2>{PAGE01_HOW_CREATED.title}</h2>
          {PAGE01_HOW_CREATED.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <ol className="wisb-process">
            {PAGE01_HOW_CREATED.process.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="wisb-boundary">{PAGE01_HOW_CREATED.boundary}</p>
        </section>

        <section id={PAGE01_COMPARISON.id} className="guides-article-section">
          <h2>{PAGE01_COMPARISON.title}</h2>
          <p>
            <strong>{PAGE01_COMPARISON.lead}</strong>
          </p>
          {PAGE01_COMPARISON.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <p className="wisb-boundary">{PAGE01_COMPARISON.closing}</p>
        </section>

        <section id={PAGE01_TRADITIONS.id} className="guides-article-section">
          <h2>{PAGE01_TRADITIONS.title}</h2>
          <p>
            <strong>{PAGE01_TRADITIONS.lead}</strong>
          </p>
          {PAGE01_TRADITIONS.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <p className="wisb-boundary">{PAGE01_TRADITIONS.closing}</p>
        </section>

        <section id={PAGE01_FIXED.id} className="guides-article-section">
          <h2>{PAGE01_FIXED.title}</h2>
          {PAGE01_FIXED.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <aside className="wisb-highlight" aria-label="Relationship with the Blueprint">
            {PAGE01_FIXED.highlight.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </aside>
        </section>

        <section id={PAGE01_HOW_TO_USE.id} className="guides-article-section">
          <h2>{PAGE01_HOW_TO_USE.title}</h2>
          {PAGE01_HOW_TO_USE.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <ol className="wisb-use-steps">
            {PAGE01_HOW_TO_USE.steps.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="wisb-boundary">{PAGE01_HOW_TO_USE.boundary}</p>
        </section>

        <section id={PAGE01_FREE_AND_FULL.id} className="guides-article-section">
          <h2>{PAGE01_FREE_AND_FULL.title}</h2>
          <h3>{PAGE01_FREE_AND_FULL.freeTitle}</h3>
          <p>{PAGE01_FREE_AND_FULL.freeIntro}</p>
          <ul>
            {PAGE01_FREE_AND_FULL.freeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{PAGE01_FREE_AND_FULL.freeClosing}</p>
          <h3>{PAGE01_FREE_AND_FULL.fullTitle}</h3>
          <p>{PAGE01_FREE_AND_FULL.fullIntro}</p>
          <p>{PAGE01_FREE_AND_FULL.fullClosing}</p>
          {PAGE01_FREE_AND_FULL.conversion.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {article.midCta ? (
            <p className="guides-mid-cta">
              <SeoArticleCtaLink
                cta={article.midCta}
                slug={article.slug}
                cluster={article.cluster}
                placement="mid_page"
                primaryKeyword={article.primaryKeyword}
                className="gold-button"
              />
            </p>
          ) : null}
        </section>

        <section id={PAGE01_NOT.id} className="guides-article-section">
          <h2>{PAGE01_NOT.title}</h2>
          <p>{PAGE01_NOT.intro}</p>
          <ul>
            {PAGE01_NOT.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {PAGE01_NOT.closing.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        {article.faq.length ? (
          <FaqSection
            title="FAQ"
            items={article.faq.map((item) => ({ q: item.question, a: item.answer }))}
          />
        ) : null}

        <section className="guides-related" aria-label="Continue exploring">
          <h2>Continue Exploring</h2>
          <ul>
            {article.related.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="guides-end-cta wisb-final-cta">
          <h2>{article.endHeading ?? "Gentle Next Step"}</h2>
          {(article.endSupporting ?? []).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="wisb-final-actions">
            <SeoArticleCtaLink
              cta={article.endCta}
              slug={article.slug}
              cluster={article.cluster}
              placement="final"
              primaryKeyword={article.primaryKeyword}
              className="gold-button"
            />
            {article.endSecondaryCta ? (
              <SeoArticleCtaLink
                cta={article.endSecondaryCta}
                slug={article.slug}
                cluster={article.cluster}
                placement="final"
                primaryKeyword={article.primaryKeyword}
                className="blueprint-secondary-link"
              />
            ) : null}
          </div>
          {article.endBoundary ? <p className="wisb-boundary">{article.endBoundary}</p> : null}
        </section>
      </article>
    </InnerPageLayout>
  );
}
