import Image from "next/image";
import Link from "next/link";
import { FaqSection } from "@/components/conversion/faq-section";
import { InnerPageLayout } from "@/components/inner-page-layout";
import { LifePathCalculator } from "@/components/seo/life-path-calculator";
import { SeoArticleAnalytics } from "@/components/seo/seo-article-analytics";
import { SeoArticleCtaLink } from "@/components/seo/seo-article-cta-link";
import { seoArticlePath } from "@/lib/seo/articles";
import { LIFE_PATH_MEANINGS, lifePathSectionId } from "@/lib/life-path/meanings";
import {
  PAGE03_BRIDGE,
  PAGE03_DEFINE_PERSONALITY,
  PAGE03_DIFFERENT_RESULTS,
  PAGE03_HOW_CALCULATED,
  PAGE03_MASTER_NUMBERS,
  PAGE03_MEANINGS_INTRO,
  PAGE03_PREDICT_FUTURE,
  PAGE03_WHAT_IS,
} from "@/lib/seo/content/what-is-my-life-path-number-body";
import { WHAT_IS_MY_LIFE_PATH_NUMBER_ARTICLE } from "@/lib/seo/content/what-is-my-life-path-number";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import "@/styles/guides-density-v1.css";
import "@/styles/what-is-my-life-path-number-v1.css";

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function WhatIsMyLifePathNumberPage() {
  const article = WHAT_IS_MY_LIFE_PATH_NUMBER_ARTICLE;
  const path = seoArticlePath(article.slug);
  const articleLd = buildArticleJsonLd(article);
  const breadcrumbLd = buildBreadcrumbJsonLd(article);
  const answerParagraphs = splitParagraphs(article.directAnswer);

  return (
    <InnerPageLayout className="conversion-page guides-page guides-article-page wimlpn-page">
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

      <header className="inner-page-hero wimlpn-hero">
        <p className="blueprint-eyebrow">{article.eyebrow}</p>
        <h1 className="inner-page-title text-gold-gradient">{article.headline}</h1>

        <div className="wimlpn-direct-answer">
          {answerParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="blueprint-lead">
              {paragraph}
            </p>
          ))}
        </div>

        {article.boundaryLine ? <p className="wimlpn-boundary">{article.boundaryLine}</p> : null}
      </header>

      <LifePathCalculator primaryKeyword={article.primaryKeyword} />

      <figure className="wimlpn-hero-figure">
        <Image
          src={article.ogImage ?? "/seo/what-is-my-life-path-number-1320.webp"}
          alt="Birth date reduced through month, day and year into one Life Path Number"
          width={1200}
          height={630}
          className="wimlpn-hero-image"
          priority
        />
      </figure>

      <article className="guides-article glass-card wimlpn-article">
        <section id={PAGE03_HOW_CALCULATED.id} className="guides-article-section">
          <h2>{PAGE03_HOW_CALCULATED.title}</h2>
          <div className="wimlpn-example">
            <p>{PAGE03_HOW_CALCULATED.exampleDate}</p>
            <ul>
              {PAGE03_HOW_CALCULATED.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
          {PAGE03_HOW_CALCULATED.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <p className="wimlpn-boundary">{PAGE03_HOW_CALCULATED.boundary}</p>
        </section>

        <section id={PAGE03_MEANINGS_INTRO.id} className="guides-article-section">
          <h2>{PAGE03_MEANINGS_INTRO.title}</h2>
          {PAGE03_MEANINGS_INTRO.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}

          {LIFE_PATH_MEANINGS.map((meaning) => (
            <section
              key={meaning.number}
              id={lifePathSectionId(meaning.number)}
              className="wimlpn-meaning"
            >
              <h3>
                Life Path {meaning.number} · {meaning.title}
              </h3>
              <p>{meaning.body}</p>
              <p>
                <strong>Common strengths:</strong> {meaning.strengths}
              </p>
              <p>
                <strong>Possible growth edge:</strong> {meaning.growthEdge}
              </p>
              <p>
                <strong>Reflection:</strong> {meaning.reflection}
              </p>
            </section>
          ))}
        </section>

        <section id={PAGE03_WHAT_IS.id} className="guides-article-section">
          <h2>{PAGE03_WHAT_IS.title}</h2>
          {PAGE03_WHAT_IS.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
        </section>

        <section id={PAGE03_MASTER_NUMBERS.id} className="guides-article-section">
          <h2>{PAGE03_MASTER_NUMBERS.title}</h2>
          {PAGE03_MASTER_NUMBERS.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
        </section>

        <section id={PAGE03_DIFFERENT_RESULTS.id} className="guides-article-section">
          <h2>{PAGE03_DIFFERENT_RESULTS.title}</h2>
          <p>{PAGE03_DIFFERENT_RESULTS.intro}</p>
          <p>Some calculators:</p>
          <ul>
            {PAGE03_DIFFERENT_RESULTS.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{PAGE03_DIFFERENT_RESULTS.closing}</p>
        </section>

        <section id={PAGE03_DEFINE_PERSONALITY.id} className="guides-article-section">
          <h2>{PAGE03_DEFINE_PERSONALITY.title}</h2>
          {PAGE03_DEFINE_PERSONALITY.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
        </section>

        <section id={PAGE03_PREDICT_FUTURE.id} className="guides-article-section">
          <h2>{PAGE03_PREDICT_FUTURE.title}</h2>
          {PAGE03_PREDICT_FUTURE.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
        </section>

        <section id={PAGE03_BRIDGE.id} className="guides-article-section wimlpn-bridge">
          <h2>{PAGE03_BRIDGE.title}</h2>
          {PAGE03_BRIDGE.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <ul className="wimlpn-foundations">
            {PAGE03_BRIDGE.foundations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {PAGE03_BRIDGE.distinction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {PAGE03_BRIDGE.conversion.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="wimlpn-bridge-actions">
            <SeoArticleCtaLink
              cta={article.endCta}
              slug={article.slug}
              cluster={article.cluster}
              placement="bridge"
              primaryKeyword={article.primaryKeyword}
              className="gold-button"
            />
            {article.endSecondaryCta ? (
              <SeoArticleCtaLink
                cta={article.endSecondaryCta}
                slug={article.slug}
                cluster={article.cluster}
                placement="bridge"
                primaryKeyword={article.primaryKeyword}
                className="blueprint-secondary-link"
              />
            ) : null}
          </div>
          <p className="wimlpn-boundary">{PAGE03_BRIDGE.boundary}</p>
          <p>
            <Link href="/what-is-a-soul-blueprint">what a Soul Blueprint means</Link>
          </p>
        </section>

        <FaqSection
          title="Life Path Number FAQ"
          items={article.faq.map((item) => ({
            q: item.question,
            a: item.answer,
          }))}
        />

        {article.related.length > 0 ? (
          <section className="guides-article-section" aria-label="Related guides">
            <h2>Related</h2>
            <ul>
              {article.related.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </InnerPageLayout>
  );
}
