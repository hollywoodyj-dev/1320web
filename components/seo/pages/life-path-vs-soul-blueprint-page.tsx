import Image from "next/image";
import Link from "next/link";
import { FaqSection } from "@/components/conversion/faq-section";
import { InnerPageLayout } from "@/components/inner-page-layout";
import { SeoArticleAnalytics } from "@/components/seo/seo-article-analytics";
import { SeoArticleCtaLink } from "@/components/seo/seo-article-cta-link";
import { seoArticlePath } from "@/lib/seo/articles";
import {
  PAGE02_AT_A_GLANCE,
  PAGE02_CALCULATION,
  PAGE02_CANNOT,
  PAGE02_CAN_SHOW,
  PAGE02_COMPARISON_TABLE,
  PAGE02_GO_BEYOND,
  PAGE02_ONE_VS_MULTI,
  PAGE02_REPLACE,
  PAGE02_RESPONSIBLE,
  PAGE02_SHARED,
  PAGE02_SOUL_BLUEPRINT,
  PAGE02_WHAT_IS_LIFE_PATH,
  PAGE02_WHICH,
} from "@/lib/seo/content/life-path-number-vs-soul-blueprint-body";
import { LIFE_PATH_VS_SOUL_BLUEPRINT_ARTICLE } from "@/lib/seo/content/life-path-number-vs-soul-blueprint";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import "@/styles/guides-density-v1.css";
import "@/styles/life-path-vs-soul-blueprint-v1.css";

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function LifePathVsSoulBlueprintPage() {
  const article = LIFE_PATH_VS_SOUL_BLUEPRINT_ARTICLE;
  const path = seoArticlePath(article.slug);
  const articleLd = buildArticleJsonLd(article);
  const breadcrumbLd = buildBreadcrumbJsonLd(article);
  const answerParagraphs = splitParagraphs(article.directAnswer);
  const supportingParagraphs = splitParagraphs(article.heroSupporting ?? "");

  return (
    <InnerPageLayout className="conversion-page guides-page guides-article-page lpvsb-page">
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

      <header className="inner-page-hero lpvsb-hero">
        <p className="blueprint-eyebrow">{article.eyebrow}</p>
        <h1 className="inner-page-title text-gold-gradient">{article.headline}</h1>

        <div className="lpvsb-hero-support">
          {supportingParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <div className="lpvsb-direct-answer">
          {answerParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="blueprint-lead">
              {paragraph}
            </p>
          ))}
        </div>

        {article.boundaryLine ? <p className="lpvsb-boundary">{article.boundaryLine}</p> : null}

        <div className="blueprint-hero-actions lpvsb-hero-actions">
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

        <figure className="lpvsb-hero-figure">
          <Image
            src={article.ogImage ?? "/seo/life-path-number-vs-soul-blueprint-1320.webp"}
            alt="Comparison between one Life Path Number and the four 1320 Soul Blueprint Foundation Mirrors S1, S3, S2 and S0"
            width={1200}
            height={630}
            className="lpvsb-hero-image"
            priority
          />
        </figure>
      </header>

      <article className="guides-article glass-card lpvsb-article">
        <section id={PAGE02_AT_A_GLANCE.id} className="guides-article-section">
          <h2>{PAGE02_AT_A_GLANCE.title}</h2>
          {PAGE02_AT_A_GLANCE.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}

          <div className="lpvsb-table-wrap" role="region" aria-label="Life Path Number vs Soul Blueprint comparison">
            <table className="lpvsb-comparison-table">
              <thead>
                <tr>
                  <th scope="col">Question</th>
                  <th scope="col">Life Path Number</th>
                  <th scope="col">1320 Soul Blueprint</th>
                </tr>
              </thead>
              <tbody>
                {PAGE02_COMPARISON_TABLE.map((row) => (
                  <tr key={row.question}>
                    <th scope="row">{row.question}</th>
                    <td>{row.lifePath}</td>
                    <td>{row.soulBlueprint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="lpvsb-mobile-cards" aria-label="Comparison cards">
            {PAGE02_COMPARISON_TABLE.map((row) => (
              <li key={`card-${row.question}`} className="lpvsb-mobile-card">
                <p className="lpvsb-mobile-card-question">{row.question}</p>
                <p>
                  <strong>Life Path Number:</strong> {row.lifePath}
                </p>
                <p>
                  <strong>Soul Blueprint:</strong> {row.soulBlueprint}
                </p>
              </li>
            ))}
          </ul>

          {PAGE02_AT_A_GLANCE.closing.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section id={PAGE02_WHAT_IS_LIFE_PATH.id} className="guides-article-section">
          <h2>{PAGE02_WHAT_IS_LIFE_PATH.title}</h2>
          {PAGE02_WHAT_IS_LIFE_PATH.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <aside className="lpvsb-highlight">
            <p>{PAGE02_WHAT_IS_LIFE_PATH.highlight}</p>
          </aside>
        </section>

        <section id={PAGE02_CALCULATION.id} className="guides-article-section">
          <h2>{PAGE02_CALCULATION.title}</h2>
          {PAGE02_CALCULATION.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <div className="lpvsb-example">
            <h3>{PAGE02_CALCULATION.exampleTitle}</h3>
            <p>{PAGE02_CALCULATION.exampleDate}</p>
            <ul>
              {PAGE02_CALCULATION.exampleSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
          {PAGE02_CALCULATION.boundary.map((paragraph) => (
            <p key={paragraph} className="lpvsb-boundary">
              {paragraph}
            </p>
          ))}
        </section>

        <section id={PAGE02_CAN_SHOW.id} className="guides-article-section">
          <h2>{PAGE02_CAN_SHOW.title}</h2>
          {PAGE02_CAN_SHOW.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <ul>
            {PAGE02_CAN_SHOW.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {PAGE02_CAN_SHOW.governance.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <aside className="lpvsb-highlight">
            {PAGE02_CAN_SHOW.highlight.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </aside>
        </section>

        <section id={PAGE02_CANNOT.id} className="guides-article-section">
          <h2>{PAGE02_CANNOT.title}</h2>
          <p>{PAGE02_CANNOT.intro}</p>
          <ul>
            {PAGE02_CANNOT.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {PAGE02_CANNOT.closing.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section id={PAGE02_SOUL_BLUEPRINT.id} className="guides-article-section">
          <h2>{PAGE02_SOUL_BLUEPRINT.title}</h2>
          {PAGE02_SOUL_BLUEPRINT.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <p className="lpvsb-sequence">{PAGE02_SOUL_BLUEPRINT.sequence}</p>
          <ul className="lpvsb-foundation-list">
            {PAGE02_SOUL_BLUEPRINT.foundations.map((item) => (
              <li key={item.code}>
                <h3>
                  {item.code} · {item.title}
                </h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
          <p>{PAGE02_SOUL_BLUEPRINT.integratedTitle}</p>
          <ul>
            {PAGE02_SOUL_BLUEPRINT.integrated.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{PAGE02_SOUL_BLUEPRINT.fullIntro}</p>
          <ul>
            {PAGE02_SOUL_BLUEPRINT.fullLayers.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{PAGE02_SOUL_BLUEPRINT.closing}</p>
          <p>
            <Link href="/what-is-a-soul-blueprint">What a Soul Blueprint means</Link>
          </p>
        </section>

        <section id={PAGE02_ONE_VS_MULTI.id} className="guides-article-section">
          <h2>{PAGE02_ONE_VS_MULTI.title}</h2>
          {PAGE02_ONE_VS_MULTI.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <div className="lpvsb-flow-grid">
            <div>
              <h3>Life Path Number</h3>
              <ol className="lpvsb-process">
                {PAGE02_ONE_VS_MULTI.lifePathFlow.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
            <div>
              <h3>1320 Soul Blueprint</h3>
              <ol className="lpvsb-process">
                {PAGE02_ONE_VS_MULTI.blueprintFlow.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
          {PAGE02_ONE_VS_MULTI.distinction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section id={PAGE02_REPLACE.id} className="guides-article-section">
          <h2>{PAGE02_REPLACE.title}</h2>
          {PAGE02_REPLACE.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <aside className="lpvsb-highlight">
            {PAGE02_REPLACE.boundary.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </aside>
        </section>

        <section id={PAGE02_WHICH.id} className="guides-article-section">
          <h2>{PAGE02_WHICH.title}</h2>
          <p>{PAGE02_WHICH.lifePathIntro}</p>
          <ul>
            {PAGE02_WHICH.lifePathItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{PAGE02_WHICH.blueprintIntro}</p>
          <ul>
            {PAGE02_WHICH.blueprintItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {PAGE02_WHICH.closing.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section id={PAGE02_SHARED.id} className="guides-article-section">
          <h2>{PAGE02_SHARED.title}</h2>
          {PAGE02_SHARED.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <aside className="lpvsb-highlight">
            <p>{PAGE02_SHARED.highlight}</p>
          </aside>
        </section>

        <section id={PAGE02_RESPONSIBLE.id} className="guides-article-section">
          <h2>{PAGE02_RESPONSIBLE.title}</h2>
          <ol className="lpvsb-use-steps">
            {PAGE02_RESPONSIBLE.steps.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          {PAGE02_RESPONSIBLE.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <aside className="lpvsb-highlight">
            {PAGE02_RESPONSIBLE.boundary.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </aside>
        </section>

        <section id={PAGE02_GO_BEYOND.id} className="guides-article-section lpvsb-conversion">
          <h2>{article.endHeading}</h2>
          {(article.endSupporting ?? []).map((paragraph) => (
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
          {article.endSecondaryCta ? (
            <p>
              <SeoArticleCtaLink
                cta={article.endSecondaryCta}
                slug={article.slug}
                cluster={article.cluster}
                placement="related"
                primaryKeyword={article.primaryKeyword}
                className="blueprint-secondary-link"
              />
            </p>
          ) : null}
          {article.endBoundary ? <p className="lpvsb-boundary">{article.endBoundary}</p> : null}
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
                {item.href === "/full-report" || item.href.includes("full-report-v2") ? (
                  <SeoArticleCtaLink
                    cta={{
                      label: item.title,
                      href: item.href,
                      intent: item.href.includes("full-report-v2") ? "sample_report" : "full_report",
                    }}
                    slug={article.slug}
                    cluster={article.cluster}
                    placement="related"
                    primaryKeyword={article.primaryKeyword}
                  />
                ) : (
                  <Link href={item.href}>{item.title}</Link>
                )}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </InnerPageLayout>
  );
}
