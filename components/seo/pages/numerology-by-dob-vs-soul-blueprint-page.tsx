import Image from "next/image";
import Link from "next/link";
import { FaqSection } from "@/components/conversion/faq-section";
import { InnerPageLayout } from "@/components/inner-page-layout";
import { SeoArticleAnalytics } from "@/components/seo/seo-article-analytics";
import { SeoArticleCtaLink } from "@/components/seo/seo-article-cta-link";
import { seoArticlePath } from "@/lib/seo/articles";
import {
  PAGE04_ARCHITECTURE,
  PAGE04_AT_A_GLANCE,
  PAGE04_BIRTHDAY_NUMBER,
  PAGE04_CAN_HELP,
  PAGE04_CANNOT,
  PAGE04_COMPARISON_TABLE,
  PAGE04_EXPLORE_MORE,
  PAGE04_IS_NUMEROLOGY,
  PAGE04_LIFE_PATH,
  PAGE04_MORE_NUMBERS,
  PAGE04_RESPONSIBLE,
  PAGE04_SOUL_BLUEPRINT,
  PAGE04_WHAT_IS_BIRTH_DATE_NUMEROLOGY,
  PAGE04_WHICH,
} from "@/lib/seo/content/numerology-by-date-of-birth-vs-soul-blueprint-body";
import { NUMEROLOGY_BY_DOB_VS_SOUL_BLUEPRINT_ARTICLE } from "@/lib/seo/content/numerology-by-date-of-birth-vs-soul-blueprint";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import "@/styles/guides-density-v1.css";
import "@/styles/numerology-by-dob-vs-soul-blueprint-v1.css";

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function NumerologyByDobVsSoulBlueprintPage() {
  const article = NUMEROLOGY_BY_DOB_VS_SOUL_BLUEPRINT_ARTICLE;
  const path = seoArticlePath(article.slug);
  const articleLd = buildArticleJsonLd(article);
  const breadcrumbLd = buildBreadcrumbJsonLd(article);
  const answerParagraphs = splitParagraphs(article.directAnswer);
  const supportingParagraphs = splitParagraphs(article.heroSupporting ?? "");

  return (
    <InnerPageLayout className="conversion-page guides-page guides-article-page ndob-page">
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

      <header className="inner-page-hero ndob-hero">
        <p className="blueprint-eyebrow">{article.eyebrow}</p>
        <h1 className="inner-page-title text-gold-gradient">{article.headline}</h1>

        <div className="ndob-hero-support">
          {supportingParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <div className="ndob-direct-answer">
          {answerParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="blueprint-lead">
              {paragraph}
            </p>
          ))}
        </div>

        {article.boundaryLine ? <p className="ndob-boundary">{article.boundaryLine}</p> : null}

        <div className="blueprint-hero-actions ndob-hero-actions">
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

        <figure className="ndob-hero-figure">
          <Image
            src={article.ogImage ?? "/seo/numerology-by-date-of-birth-vs-soul-blueprint-1320.webp"}
            alt="Comparison of birth-date numerology outputs such as Life Path and Birthday Number with the 1320 Soul Blueprint Foundation Mirrors S1, S3, S2 and S0"
            width={1200}
            height={630}
            className="ndob-hero-image"
            priority
          />
        </figure>
      </header>

      <article className="guides-article glass-card ndob-article">
        <section id={PAGE04_AT_A_GLANCE.id} className="guides-article-section">
          <h2>{PAGE04_AT_A_GLANCE.title}</h2>
          {PAGE04_AT_A_GLANCE.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}

          <div
            className="ndob-table-wrap"
            role="region"
            aria-label="Numerology by date of birth vs Soul Blueprint comparison"
          >
            <table className="ndob-comparison-table">
              <thead>
                <tr>
                  <th scope="col">Question</th>
                  <th scope="col">Numerology by Date of Birth</th>
                  <th scope="col">1320 Soul Blueprint</th>
                </tr>
              </thead>
              <tbody>
                {PAGE04_COMPARISON_TABLE.map((row) => (
                  <tr key={row.question}>
                    <th scope="row">{row.question}</th>
                    <td>{row.numerology}</td>
                    <td>{row.soulBlueprint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="ndob-mobile-cards" aria-label="Comparison cards">
            {PAGE04_COMPARISON_TABLE.map((row) => (
              <li key={row.question} className="ndob-mobile-card">
                <p className="ndob-mobile-card-question">{row.question}</p>
                <p>
                  <strong>Numerology:</strong> {row.numerology}
                </p>
                <p>
                  <strong>Soul Blueprint:</strong> {row.soulBlueprint}
                </p>
              </li>
            ))}
          </ul>

          {PAGE04_AT_A_GLANCE.closing.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section id={PAGE04_WHAT_IS_BIRTH_DATE_NUMEROLOGY.id} className="guides-article-section">
          <h2>{PAGE04_WHAT_IS_BIRTH_DATE_NUMEROLOGY.title}</h2>
          {PAGE04_WHAT_IS_BIRTH_DATE_NUMEROLOGY.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <ul>
            {PAGE04_WHAT_IS_BIRTH_DATE_NUMEROLOGY.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {PAGE04_WHAT_IS_BIRTH_DATE_NUMEROLOGY.governance.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <aside className="ndob-highlight">
            {PAGE04_WHAT_IS_BIRTH_DATE_NUMEROLOGY.highlight.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </aside>
        </section>

        <section id={PAGE04_LIFE_PATH.id} className="guides-article-section">
          <h2>{PAGE04_LIFE_PATH.title}</h2>
          {PAGE04_LIFE_PATH.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <p>{PAGE04_LIFE_PATH.exploresIntro}</p>
          <ul>
            {PAGE04_LIFE_PATH.explores.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {PAGE04_LIFE_PATH.boundary.map((paragraph) => (
            <p key={paragraph} className="ndob-boundary">
              {paragraph}
            </p>
          ))}
          <p>
            <SeoArticleCtaLink
              cta={{
                label: PAGE04_LIFE_PATH.linkLabel,
                href: PAGE04_LIFE_PATH.linkHref,
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

        <section id={PAGE04_BIRTHDAY_NUMBER.id} className="guides-article-section">
          <h2>{PAGE04_BIRTHDAY_NUMBER.title}</h2>
          {PAGE04_BIRTHDAY_NUMBER.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <p>{PAGE04_BIRTHDAY_NUMBER.exploresIntro}</p>
          <ul>
            {PAGE04_BIRTHDAY_NUMBER.explores.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {PAGE04_BIRTHDAY_NUMBER.boundary.map((paragraph) => (
            <p key={paragraph} className="ndob-boundary">
              {paragraph}
            </p>
          ))}
          {PAGE04_BIRTHDAY_NUMBER.linkHref ? (
            <p>
              <Link href={PAGE04_BIRTHDAY_NUMBER.linkHref}>{PAGE04_BIRTHDAY_NUMBER.linkLabel}</Link>
            </p>
          ) : null}
        </section>

        <section id={PAGE04_MORE_NUMBERS.id} className="guides-article-section">
          <h2>{PAGE04_MORE_NUMBERS.title}</h2>
          {PAGE04_MORE_NUMBERS.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          {PAGE04_MORE_NUMBERS.distinction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <aside className="ndob-highlight">
            {PAGE04_MORE_NUMBERS.honest.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </aside>
        </section>

        <section id={PAGE04_CAN_HELP.id} className="guides-article-section">
          <h2>{PAGE04_CAN_HELP.title}</h2>
          <p>{PAGE04_CAN_HELP.intro}</p>
          <ul>
            {PAGE04_CAN_HELP.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {PAGE04_CAN_HELP.governance.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <aside className="ndob-highlight">
            {PAGE04_CAN_HELP.highlight.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </aside>
        </section>

        <section id={PAGE04_CANNOT.id} className="guides-article-section">
          <h2>{PAGE04_CANNOT.title}</h2>
          <p>{PAGE04_CANNOT.intro}</p>
          <ul>
            {PAGE04_CANNOT.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {PAGE04_CANNOT.supporting.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <aside className="ndob-highlight">
            <p>{PAGE04_CANNOT.safety}</p>
          </aside>
        </section>

        <section id={PAGE04_SOUL_BLUEPRINT.id} className="guides-article-section">
          <h2>{PAGE04_SOUL_BLUEPRINT.title}</h2>
          {PAGE04_SOUL_BLUEPRINT.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <p className="ndob-sequence">{PAGE04_SOUL_BLUEPRINT.sequence}</p>
          <ul className="ndob-foundation-list">
            {PAGE04_SOUL_BLUEPRINT.foundations.map((item) => (
              <li key={item.code}>
                <h3>
                  {item.code} · {item.title}
                </h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
          <p>{PAGE04_SOUL_BLUEPRINT.integratedTitle}</p>
          <ul>
            {PAGE04_SOUL_BLUEPRINT.integrated.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{PAGE04_SOUL_BLUEPRINT.fullIntro}</p>
          <ul>
            {PAGE04_SOUL_BLUEPRINT.fullLayers.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            <Link href="/what-is-a-soul-blueprint">what a Soul Blueprint means</Link>
          </p>
        </section>

        <section id={PAGE04_ARCHITECTURE.id} className="guides-article-section">
          <h2>{PAGE04_ARCHITECTURE.title}</h2>
          <div className="ndob-flow-grid">
            <div>
              <h3>Numerology by Date of Birth</h3>
              <ol className="ndob-process">
                {PAGE04_ARCHITECTURE.numerologyFlow.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
            <div>
              <h3>1320 Soul Blueprint</h3>
              <ol className="ndob-process">
                {PAGE04_ARCHITECTURE.blueprintFlow.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
          {PAGE04_ARCHITECTURE.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <aside className="ndob-highlight">
            {PAGE04_ARCHITECTURE.distinction.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </aside>
        </section>

        <section id={PAGE04_IS_NUMEROLOGY.id} className="guides-article-section">
          <h2>{PAGE04_IS_NUMEROLOGY.title}</h2>
          {PAGE04_IS_NUMEROLOGY.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <aside className="ndob-highlight">
            {PAGE04_IS_NUMEROLOGY.boundary.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </aside>
        </section>

        <section id={PAGE04_WHICH.id} className="guides-article-section">
          <h2>{PAGE04_WHICH.title}</h2>
          <p>{PAGE04_WHICH.numerologyIntro}</p>
          <ul>
            {PAGE04_WHICH.numerologyItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{PAGE04_WHICH.blueprintIntro}</p>
          <ul>
            {PAGE04_WHICH.blueprintItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {PAGE04_WHICH.closing.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section id={PAGE04_RESPONSIBLE.id} className="guides-article-section">
          <h2>{PAGE04_RESPONSIBLE.title}</h2>
          <ol className="ndob-use-steps">
            {PAGE04_RESPONSIBLE.steps.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          {PAGE04_RESPONSIBLE.closing.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section id={PAGE04_EXPLORE_MORE.id} className="guides-article-section ndob-conversion">
          <h2>{PAGE04_EXPLORE_MORE.title}</h2>
          {PAGE04_EXPLORE_MORE.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 56)}>{paragraph}</p>
          ))}
          <p className="ndob-sequence">{PAGE04_EXPLORE_MORE.sequence}</p>
          <p>{PAGE04_EXPLORE_MORE.supporting}</p>
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
                label: PAGE04_EXPLORE_MORE.secondaryLabel,
                href: PAGE04_EXPLORE_MORE.secondaryHref,
                intent: "life_path_calculation",
              }}
              slug={article.slug}
              cluster={article.cluster}
              placement="mid_page"
              primaryKeyword={article.primaryKeyword}
              className="blueprint-secondary-link"
            />
          </p>
          <p className="ndob-boundary">{PAGE04_EXPLORE_MORE.boundary}</p>
        </section>

        <section className="guides-article-section ndob-conversion">
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
          {article.endBoundary ? <p className="ndob-boundary">{article.endBoundary}</p> : null}
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
      </article>
    </InnerPageLayout>
  );
}
