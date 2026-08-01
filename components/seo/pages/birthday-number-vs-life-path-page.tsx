import Image from "next/image";
import Link from "next/link";
import { FaqSection } from "@/components/conversion/faq-section";
import { InnerPageLayout } from "@/components/inner-page-layout";
import { SeoArticleAnalytics } from "@/components/seo/seo-article-analytics";
import { SeoArticleCtaLink } from "@/components/seo/seo-article-cta-link";
import { seoArticlePath } from "@/lib/seo/articles";
import {
  PAGE05_AT_A_GLANCE,
  PAGE05_CAN_MATCH,
  PAGE05_CANNOT,
  PAGE05_COMPARISON_TABLE,
  PAGE05_EXPLORE_BEYOND,
  PAGE05_HOW_CALCULATE,
  PAGE05_LIFE_PATH,
  PAGE05_MEANINGS,
  PAGE05_SOUL_BLUEPRINT,
  PAGE05_THREE_LENSES,
  PAGE05_TWO_RESULTS,
  PAGE05_WHAT_IS_BIRTHDAY,
  PAGE05_WHERE_BEGIN,
  PAGE05_WHICH_IMPORTANT,
} from "@/lib/seo/content/birthday-number-vs-life-path-vs-soul-blueprint-body";
import { BIRTHDAY_NUMBER_VS_LIFE_PATH_VS_SOUL_BLUEPRINT_ARTICLE } from "@/lib/seo/content/birthday-number-vs-life-path-vs-soul-blueprint";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import "@/styles/guides-density-v1.css";
import "@/styles/birthday-number-vs-life-path-v1.css";

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function BirthdayNumberVsLifePathVsSoulBlueprintPage() {
  const article = BIRTHDAY_NUMBER_VS_LIFE_PATH_VS_SOUL_BLUEPRINT_ARTICLE;
  const path = seoArticlePath(article.slug);
  const articleLd = buildArticleJsonLd(article);
  const breadcrumbLd = buildBreadcrumbJsonLd(article);
  const answerParagraphs = splitParagraphs(article.directAnswer);
  const supportingParagraphs = splitParagraphs(article.heroSupporting ?? "");

  return (
    <InnerPageLayout className="conversion-page guides-page guides-article-page bnvs-page">
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

      <header className="inner-page-hero bnvs-hero">
        <p className="blueprint-eyebrow">{article.eyebrow}</p>
        <h1 className="inner-page-title text-gold-gradient">{article.headline}</h1>

        <div className="bnvs-hero-support">
          {supportingParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <div className="bnvs-direct-answer">
          {answerParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="blueprint-lead">
              {paragraph}
            </p>
          ))}
        </div>

        {article.boundaryLine ? <p className="bnvs-boundary">{article.boundaryLine}</p> : null}

        <div className="blueprint-hero-actions bnvs-hero-actions">
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
        <p className="bnvs-quiet-anchor">
          <a href={`#${PAGE05_HOW_CALCULATE.id}`}>How to Find My Birthday Number</a>
        </p>

        <figure className="bnvs-hero-figure">
          <Image
            src={
              article.ogImage ??
              "/seo/birthday-number-vs-life-path-number-vs-soul-blueprint-1320.webp"
            }
            alt="Comparison of Birthday Number 14/5, Life Path Number 3 and the 1320 Soul Blueprint Foundation Mirrors S1, S3, S2 and S0"
            width={1200}
            height={630}
            className="bnvs-hero-image"
            priority
          />
        </figure>
      </header>

      <article className="guides-article glass-card bnvs-article">
        <section id={PAGE05_AT_A_GLANCE.id} className="guides-article-section">
          <h2>{PAGE05_AT_A_GLANCE.title}</h2>
          {PAGE05_AT_A_GLANCE.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}

          <div
            className="bnvs-table-wrap"
            role="region"
            aria-label="Birthday Number, Life Path Number and Soul Blueprint comparison"
          >
            <table className="bnvs-comparison-table">
              <thead>
                <tr>
                  <th scope="col">Question</th>
                  <th scope="col">Birthday Number</th>
                  <th scope="col">Life Path Number</th>
                  <th scope="col">1320 Soul Blueprint</th>
                </tr>
              </thead>
              <tbody>
                {PAGE05_COMPARISON_TABLE.map((row) => (
                  <tr key={row.question}>
                    <th scope="row">{row.question}</th>
                    <td>{row.birthdayNumber}</td>
                    <td>{row.lifePath}</td>
                    <td>{row.soulBlueprint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="bnvs-mobile-cards" aria-label="Comparison cards">
            {PAGE05_COMPARISON_TABLE.map((row) => (
              <li key={row.question} className="bnvs-mobile-card">
                <p className="bnvs-mobile-card-question">{row.question}</p>
                <p>
                  <strong>Birthday Number:</strong> {row.birthdayNumber}
                </p>
                <p>
                  <strong>Life Path:</strong> {row.lifePath}
                </p>
                <p>
                  <strong>Soul Blueprint:</strong> {row.soulBlueprint}
                </p>
              </li>
            ))}
          </ul>

          {PAGE05_AT_A_GLANCE.closing.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section id={PAGE05_WHAT_IS_BIRTHDAY.id} className="guides-article-section">
          <h2>{PAGE05_WHAT_IS_BIRTHDAY.title}</h2>
          {PAGE05_WHAT_IS_BIRTHDAY.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          {PAGE05_WHAT_IS_BIRTHDAY.terminology.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <aside className="bnvs-highlight">
            {PAGE05_WHAT_IS_BIRTHDAY.highlight.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </aside>
        </section>

        <section id={PAGE05_HOW_CALCULATE.id} className="guides-article-section">
          <h2>{PAGE05_HOW_CALCULATE.title}</h2>
          <ol className="bnvs-use-steps">
            {PAGE05_HOW_CALCULATE.steps.map((step) => (
              <li key={step}>
                <p>{step}</p>
              </li>
            ))}
          </ol>
          <div className="bnvs-calc-strip" aria-label="Birthday Number examples">
            {PAGE05_HOW_CALCULATE.strip.map((item) => (
              <span key={item} className="bnvs-calc-chip">
                {item}
              </span>
            ))}
          </div>
          <ul>
            {PAGE05_HOW_CALCULATE.examples.map((item) => (
              <li key={item.label}>
                <strong>{item.label}:</strong> {item.detail}
              </li>
            ))}
          </ul>
          <p className="bnvs-boundary">{PAGE05_HOW_CALCULATE.boundary}</p>
        </section>

        <section id={PAGE05_MEANINGS.id} className="guides-article-section">
          <h2>{PAGE05_MEANINGS.title}</h2>
          {PAGE05_MEANINGS.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <ul>
            {PAGE05_MEANINGS.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {PAGE05_MEANINGS.governance.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <table className="bnvs-meaning-table">
            <thead>
              <tr>
                <th scope="col">Reduced Number</th>
                <th scope="col">Common symbolic themes</th>
              </tr>
            </thead>
            <tbody>
              {PAGE05_MEANINGS.table.map((row) => (
                <tr key={row.number}>
                  <th scope="row">{row.number}</th>
                  <td>{row.themes}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <ul className="bnvs-meaning-cards" aria-label="Birthday Number meaning guide">
            {PAGE05_MEANINGS.table.map((row) => (
              <li key={row.number} className="bnvs-meaning-card">
                <strong>{row.number}</strong>
                <p>{row.themes}</p>
              </li>
            ))}
          </ul>

          {PAGE05_MEANINGS.boundary.map((paragraph) => (
            <p key={paragraph} className="bnvs-boundary">
              {paragraph}
            </p>
          ))}
        </section>

        <section id={PAGE05_LIFE_PATH.id} className="guides-article-section">
          <h2>{PAGE05_LIFE_PATH.title}</h2>
          {PAGE05_LIFE_PATH.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <p>{PAGE05_LIFE_PATH.exploresIntro}</p>
          <ul>
            {PAGE05_LIFE_PATH.explores.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {PAGE05_LIFE_PATH.boundary.map((paragraph) => (
            <p key={paragraph} className="bnvs-boundary">
              {paragraph}
            </p>
          ))}
          <p>
            <SeoArticleCtaLink
              cta={{
                label: PAGE05_LIFE_PATH.linkLabel,
                href: PAGE05_LIFE_PATH.linkHref,
                intent: "life_path_calculation",
              }}
              slug={article.slug}
              cluster={article.cluster}
              placement="related"
              primaryKeyword={article.primaryKeyword}
              className="blueprint-secondary-link"
            />
          </p>
        </section>

        <section id={PAGE05_TWO_RESULTS.id} className="guides-article-section">
          <h2>{PAGE05_TWO_RESULTS.title}</h2>
          <p>
            <strong>Example:</strong> {PAGE05_TWO_RESULTS.exampleDate}
          </p>
          <div className="bnvs-flow-grid">
            <div>
              <h3>Birthday Number</h3>
              <ul>
                {PAGE05_TWO_RESULTS.birthdaySteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Life Path Number</h3>
              <ul>
                {PAGE05_TWO_RESULTS.lifePathSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
          {PAGE05_TWO_RESULTS.interpretation.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <aside className="bnvs-highlight">
            {PAGE05_TWO_RESULTS.required.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </aside>
        </section>

        <section id={PAGE05_CAN_MATCH.id} className="guides-article-section">
          <h2>{PAGE05_CAN_MATCH.title}</h2>
          {PAGE05_CAN_MATCH.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <aside className="bnvs-highlight">
            {PAGE05_CAN_MATCH.boundary.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </aside>
        </section>

        <section id={PAGE05_WHICH_IMPORTANT.id} className="guides-article-section">
          <h2>{PAGE05_WHICH_IMPORTANT.title}</h2>
          {PAGE05_WHICH_IMPORTANT.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <aside className="bnvs-highlight">
            {PAGE05_WHICH_IMPORTANT.highlight.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </aside>
        </section>

        <section id={PAGE05_SOUL_BLUEPRINT.id} className="guides-article-section">
          <h2>{PAGE05_SOUL_BLUEPRINT.title}</h2>
          {PAGE05_SOUL_BLUEPRINT.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <p className="bnvs-sequence">{PAGE05_SOUL_BLUEPRINT.sequence}</p>
          <ul className="bnvs-foundation-list">
            {PAGE05_SOUL_BLUEPRINT.foundations.map((item) => (
              <li key={item.code}>
                <h3>
                  {item.code} · {item.title}
                </h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
          <p>{PAGE05_SOUL_BLUEPRINT.fullIntro}</p>
          <ul>
            {PAGE05_SOUL_BLUEPRINT.fullLayers.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <aside className="bnvs-highlight">
            {PAGE05_SOUL_BLUEPRINT.distinction.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </aside>
          <p>
            <Link href="/what-is-a-soul-blueprint">what a Soul Blueprint means</Link>
          </p>
        </section>

        <section id={PAGE05_THREE_LENSES.id} className="guides-article-section">
          <h2>{PAGE05_THREE_LENSES.title}</h2>
          <div className="bnvs-flow-grid-3">
            <div>
              <h3>Birthday Number</h3>
              <ol className="bnvs-process">
                {PAGE05_THREE_LENSES.birthdayFlow.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
            <div>
              <h3>Life Path Number</h3>
              <ol className="bnvs-process">
                {PAGE05_THREE_LENSES.lifePathFlow.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
            <div>
              <h3>1320 Soul Blueprint</h3>
              <ol className="bnvs-process">
                {PAGE05_THREE_LENSES.blueprintFlow.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
          <aside className="bnvs-highlight">
            {PAGE05_THREE_LENSES.core.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </aside>
        </section>

        <section id={PAGE05_CANNOT.id} className="guides-article-section">
          <h2>{PAGE05_CANNOT.title}</h2>
          <p>{PAGE05_CANNOT.intro}</p>
          <ul>
            {PAGE05_CANNOT.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {PAGE05_CANNOT.supporting.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <aside className="bnvs-highlight">
            <p>{PAGE05_CANNOT.safety}</p>
          </aside>
        </section>

        <section id={PAGE05_WHERE_BEGIN.id} className="guides-article-section">
          <h2>{PAGE05_WHERE_BEGIN.title}</h2>
          <p>{PAGE05_WHERE_BEGIN.birthdayIntro}</p>
          <ul>
            {PAGE05_WHERE_BEGIN.birthdayItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{PAGE05_WHERE_BEGIN.lifePathIntro}</p>
          <ul>
            {PAGE05_WHERE_BEGIN.lifePathItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{PAGE05_WHERE_BEGIN.blueprintIntro}</p>
          <ul>
            {PAGE05_WHERE_BEGIN.blueprintItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {PAGE05_WHERE_BEGIN.closing.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section id={PAGE05_EXPLORE_BEYOND.id} className="guides-article-section bnvs-conversion">
          <h2>{PAGE05_EXPLORE_BEYOND.title}</h2>
          {PAGE05_EXPLORE_BEYOND.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <p className="bnvs-sequence">{PAGE05_EXPLORE_BEYOND.sequence}</p>
          <p>{PAGE05_EXPLORE_BEYOND.supporting}</p>
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
                label: PAGE05_EXPLORE_BEYOND.secondaryLabel,
                href: PAGE05_EXPLORE_BEYOND.secondaryHref,
                intent: "life_path_calculation",
              }}
              slug={article.slug}
              cluster={article.cluster}
              placement="mid_page"
              primaryKeyword={article.primaryKeyword}
              className="blueprint-secondary-link"
            />
          </p>
          <p className="bnvs-boundary">{PAGE05_EXPLORE_BEYOND.boundary}</p>
        </section>

        <section className="guides-article-section bnvs-conversion">
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
          {article.endBoundary ? <p className="bnvs-boundary">{article.endBoundary}</p> : null}
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
                {item.href === "/numerology-by-date-of-birth-vs-soul-blueprint" ? (
                  <SeoArticleCtaLink
                    cta={{
                      label: item.title,
                      href: item.href,
                      intent: "birth_date_numerology",
                    }}
                    slug={article.slug}
                    cluster={article.cluster}
                    placement="related"
                    primaryKeyword={article.primaryKeyword}
                    className="blueprint-secondary-link"
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
