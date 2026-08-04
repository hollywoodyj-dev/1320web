import Image from "next/image";
import Link from "next/link";
import { FaqSection } from "@/components/conversion/faq-section";
import { InnerPageLayout } from "@/components/inner-page-layout";
import { SeoArticleAnalytics } from "@/components/seo/seo-article-analytics";
import { SeoArticleCtaLink } from "@/components/seo/seo-article-cta-link";
import { seoArticlePath } from "@/lib/seo/articles";
import {
  PAGE06_AT_A_GLANCE,
  PAGE06_CANNOT,
  PAGE06_CULTURAL,
  PAGE06_EXPLORE_MIRROR,
  PAGE06_FACTUAL,
  PAGE06_MEANING_LAYERS,
  PAGE06_MEANINGFUL_WITHOUT_IDENTITY,
  PAGE06_PERSONAL,
  PAGE06_PERSONALITY,
  PAGE06_RESPONSIBLE,
  PAGE06_SYMBOLIC,
  PAGE06_THIRTEEN_TWENTY,
  PAGE06_VS_BIRTHDAY_NUMBER,
  PAGE06_WHY_RESONATE,
} from "@/lib/seo/content/what-does-your-birthday-mean-body";
import { WHAT_DOES_YOUR_BIRTHDAY_MEAN_ARTICLE } from "@/lib/seo/content/what-does-your-birthday-mean";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import "@/styles/guides-density-v1.css";
import "@/styles/what-does-your-birthday-mean-v1.css";

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function WhatDoesYourBirthdayMeanPage() {
  const article = WHAT_DOES_YOUR_BIRTHDAY_MEAN_ARTICLE;
  const path = seoArticlePath(article.slug);
  const articleLd = buildArticleJsonLd(article);
  const breadcrumbLd = buildBreadcrumbJsonLd(article);
  const answerParagraphs = splitParagraphs(article.directAnswer);
  const supportingParagraphs = splitParagraphs(article.heroSupporting ?? "");

  return (
    <InnerPageLayout className="conversion-page guides-page guides-article-page wdym-page">
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

      <header className="inner-page-hero wdym-hero">
        <p className="blueprint-eyebrow">{article.eyebrow}</p>
        <h1 className="inner-page-title text-gold-gradient">{article.headline}</h1>

        <div className="wdym-hero-support">
          {supportingParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <div className="wdym-direct-answer">
          {answerParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="blueprint-lead">
              {paragraph}
            </p>
          ))}
        </div>

        {article.boundaryLine ? <p className="wdym-boundary">{article.boundaryLine}</p> : null}

        <div className="blueprint-hero-actions wdym-hero-actions">
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
        <p className="wdym-quiet-anchor">
          <a href={`#${PAGE06_CANNOT.id}`}>What Can My Birthday Actually Tell Me?</a>
        </p>

        <figure className="wdym-hero-figure">
          <Image
            src={article.ogImage ?? "/seo/what-does-your-birthday-mean-1320.webp"}
            alt="Four layers of birthday meaning: factual date, personal memory, symbolic interpretation and individual choice"
            width={1200}
            height={630}
            className="wdym-hero-image"
            priority
          />
        </figure>
      </header>

      <article className="guides-article glass-card wdym-article">
        <section id={PAGE06_AT_A_GLANCE.id} className="guides-article-section">
          <h2>{PAGE06_AT_A_GLANCE.title}</h2>
          {PAGE06_AT_A_GLANCE.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}

          <div className="wdym-table-wrap" role="region" aria-label="Four kinds of birthday meaning">
            <table className="wdym-comparison-table wdym-layers-table">
              <thead>
                <tr>
                  <th scope="col">Layer</th>
                  <th scope="col">What it describes</th>
                  <th scope="col">What it does not establish</th>
                </tr>
              </thead>
              <tbody>
                {PAGE06_MEANING_LAYERS.map((row) => (
                  <tr key={row.layer}>
                    <th scope="row">{row.layer}</th>
                    <td>{row.describes}</td>
                    <td>{row.doesNotEstablish}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="wdym-mobile-cards" aria-label="Meaning layer cards">
            {PAGE06_MEANING_LAYERS.map((row) => (
              <li key={row.layer} className="wdym-mobile-card">
                <p className="wdym-mobile-card-question">{row.layer}</p>
                <p>
                  <strong>Describes:</strong> {row.describes}
                </p>
                <p>
                  <strong>Does not establish:</strong> {row.doesNotEstablish}
                </p>
              </li>
            ))}
          </ul>

          {PAGE06_AT_A_GLANCE.closing.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section id={PAGE06_FACTUAL.id} className="guides-article-section">
          <h2>{PAGE06_FACTUAL.title}</h2>
          {PAGE06_FACTUAL.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <p className="wdym-boundary">{PAGE06_FACTUAL.boundary}</p>
          <div className="wdym-highlight">
            {PAGE06_FACTUAL.highlight.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </section>

        <section id={PAGE06_CULTURAL.id} className="guides-article-section">
          <h2>{PAGE06_CULTURAL.title}</h2>
          {PAGE06_CULTURAL.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          {PAGE06_CULTURAL.boundary.map((paragraph) => (
            <p key={paragraph} className="wdym-boundary">
              {paragraph}
            </p>
          ))}
        </section>

        <section id={PAGE06_PERSONAL.id} className="guides-article-section">
          <h2>{PAGE06_PERSONAL.title}</h2>
          {PAGE06_PERSONAL.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <div className="wdym-reflection-box">
            <p className="wdym-reflection-prompt">{PAGE06_PERSONAL.reflectionPrompt}</p>
            <ul>
              {PAGE06_PERSONAL.reflectionHints.map((hint) => (
                <li key={hint}>{hint}</li>
              ))}
            </ul>
          </div>
          {PAGE06_PERSONAL.governance.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section id={PAGE06_SYMBOLIC.id} className="guides-article-section">
          <h2>{PAGE06_SYMBOLIC.title}</h2>
          {PAGE06_SYMBOLIC.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          {PAGE06_SYMBOLIC.distinction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul className="wdym-link-list">
            {PAGE06_SYMBOLIC.links.map((link) => (
              <li key={link.href}>
                <SeoArticleCtaLink
                  cta={{
                    label: link.label,
                    href: link.href,
                    intent: link.href.includes("birthday-number")
                      ? "birthday_number_comparison"
                      : "birth_date_numerology",
                  }}
                  slug={article.slug}
                  cluster={article.cluster}
                  placement="related"
                  primaryKeyword={article.primaryKeyword}
                  className="blueprint-secondary-link"
                />
              </li>
            ))}
          </ul>
          {PAGE06_SYMBOLIC.boundary.map((paragraph) => (
            <p key={paragraph} className="wdym-boundary">
              {paragraph}
            </p>
          ))}
        </section>

        <section id={PAGE06_VS_BIRTHDAY_NUMBER.id} className="guides-article-section">
          <h2>{PAGE06_VS_BIRTHDAY_NUMBER.title}</h2>
          {PAGE06_VS_BIRTHDAY_NUMBER.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <p>
            <SeoArticleCtaLink
              cta={{
                label: PAGE06_VS_BIRTHDAY_NUMBER.linkLabel,
                href: PAGE06_VS_BIRTHDAY_NUMBER.linkHref,
                intent: "birthday_number_comparison",
              }}
              slug={article.slug}
              cluster={article.cluster}
              placement="related"
              primaryKeyword={article.primaryKeyword}
              className="blueprint-secondary-link"
            />
          </p>
        </section>

        <section id={PAGE06_PERSONALITY.id} className="guides-article-section">
          <h2>{PAGE06_PERSONALITY.title}</h2>
          <p className="wdym-direct-line">{PAGE06_PERSONALITY.directAnswer}</p>
          {PAGE06_PERSONALITY.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          {PAGE06_PERSONALITY.distinction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {PAGE06_PERSONALITY.searchIntent.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="wdym-highlight-line">{PAGE06_PERSONALITY.highlight}</p>
        </section>

        <section id={PAGE06_WHY_RESONATE.id} className="guides-article-section">
          <h2>{PAGE06_WHY_RESONATE.title}</h2>
          {PAGE06_WHY_RESONATE.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <p>{PAGE06_WHY_RESONATE.reframing}</p>
          <ul>
            {PAGE06_WHY_RESONATE.questions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
          {PAGE06_WHY_RESONATE.boundary.map((paragraph) => (
            <p key={paragraph} className="wdym-boundary">
              {paragraph}
            </p>
          ))}
        </section>

        <section id={PAGE06_CANNOT.id} className="guides-article-section wdym-elevated">
          <h2>{PAGE06_CANNOT.title}</h2>
          <ul className="wdym-cannot-list">
            {PAGE06_CANNOT.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{PAGE06_CANNOT.supporting}</p>
          <p className="wdym-safety">{PAGE06_CANNOT.safety}</p>
        </section>

        <section id={PAGE06_THIRTEEN_TWENTY.id} className="guides-article-section wdym-elevated">
          <h2>{PAGE06_THIRTEEN_TWENTY.title}</h2>
          {PAGE06_THIRTEEN_TWENTY.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <p>{PAGE06_THIRTEEN_TWENTY.foundationIntro}</p>
          <ul className="wdym-foundation-list">
            {PAGE06_THIRTEEN_TWENTY.foundations.map((item) => (
              <li key={item.code}>
                <strong>
                  {item.code} · {item.title}
                </strong>
              </li>
            ))}
          </ul>
          <p className="wdym-sequence">Locked sequence: {PAGE06_THIRTEEN_TWENTY.sequence}</p>
          <p>{PAGE06_THIRTEEN_TWENTY.fullMap}</p>
          <p className="wdym-highlight-line">{PAGE06_THIRTEEN_TWENTY.brandBoundary}</p>
          {PAGE06_THIRTEEN_TWENTY.distinction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section id={PAGE06_EXPLORE_MIRROR.id} className="guides-article-section wdym-elevated">
          <h2>{PAGE06_EXPLORE_MIRROR.title}</h2>
          {PAGE06_EXPLORE_MIRROR.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="wdym-sequence">{PAGE06_EXPLORE_MIRROR.sequence}</p>
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
          <p>
            <SeoArticleCtaLink
              cta={{
                label: "Read: What Is a Soul Blueprint?",
                href: "/what-is-a-soul-blueprint",
                intent: "soul_blueprint_definition",
              }}
              slug={article.slug}
              cluster={article.cluster}
              placement="mid_page"
              primaryKeyword={article.primaryKeyword}
              className="blueprint-secondary-link"
            />
          </p>
          <p className="wdym-boundary">{PAGE06_EXPLORE_MIRROR.boundary}</p>
        </section>

        <section id={PAGE06_MEANINGFUL_WITHOUT_IDENTITY.id} className="guides-article-section">
          <h2>{PAGE06_MEANINGFUL_WITHOUT_IDENTITY.title}</h2>
          {PAGE06_MEANINGFUL_WITHOUT_IDENTITY.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <div className="wdym-highlight">
            {PAGE06_MEANINGFUL_WITHOUT_IDENTITY.highlight.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </section>

        <section id={PAGE06_RESPONSIBLE.id} className="guides-article-section">
          <h2>{PAGE06_RESPONSIBLE.title}</h2>
          <ol className="wdym-principles">
            {PAGE06_RESPONSIBLE.principles.map((item) => (
              <li key={item.number}>
                <strong>
                  {item.number}. {item.title}
                </strong>{" "}
                {item.text}
              </li>
            ))}
          </ol>
          <p className="wdym-reflection-prompt">{PAGE06_RESPONSIBLE.prompt}</p>
        </section>

        <section className="guides-article-section wdym-conversion">
          <h2>{article.endHeading}</h2>
          {(article.endSupporting ?? []).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="guides-mid-cta">
            <SeoArticleCtaLink
              cta={article.endCta}
              slug={article.slug}
              cluster={article.cluster}
              placement="final"
              primaryKeyword={article.primaryKeyword}
              className="gold-button"
            />
          </p>
          {article.endSecondaryCta ? (
            <p>
              <SeoArticleCtaLink
                cta={article.endSecondaryCta}
                slug={article.slug}
                cluster={article.cluster}
                placement="final"
                primaryKeyword={article.primaryKeyword}
                className="blueprint-secondary-link"
              />
            </p>
          ) : null}
          {article.endBoundary ? <p className="wdym-boundary">{article.endBoundary}</p> : null}
        </section>

        <FaqSection
          title="Birthday Meaning FAQ"
          items={article.faq.map((item) => ({ q: item.question, a: item.answer }))}
        />

        <section className="guides-article-section">
          <h2>Related reading</h2>
          <ul className="wdym-related">
            {article.related.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </InnerPageLayout>
  );
}
