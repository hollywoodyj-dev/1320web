import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HomeBirthdateEntry } from "@/components/home-birthdate-entry";
import { HomeTopbar } from "@/components/home-topbar";
import { SiteFooter } from "@/components/site-footer";
import { SkipLink } from "@/components/skip-link";
import {
  HOMEPAGE_BLUEPRINT_INTRO,
  HOMEPAGE_BOUNDARY_INLINE,
  HOMEPAGE_BOUNDARY_LINK,
  HOMEPAGE_CALCULATOR,
  HOMEPAGE_FINAL_CTA,
  HOMEPAGE_FULL_REPORT_PREVIEW,
  HOMEPAGE_HERO,
  HOMEPAGE_HOW,
  HOMEPAGE_META,
  HOMEPAGE_PILLARS,
  HOMEPAGE_REFLECTION_INLINE,
  HOMEPAGE_WHAT_IS,
} from "@/lib/homepage-content";

export const metadata: Metadata = {
  title: { absolute: HOMEPAGE_META.title },
  description: HOMEPAGE_META.description,
  alternates: { canonical: "/" },
};

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main className="page-shell homepage-hierarchy-v2">
      <SkipLink />
      <div className="page-stars" aria-hidden="true" />
      <div className="page-glow page-glow-left" aria-hidden="true" />
      <div className="page-glow page-glow-right" aria-hidden="true" />

      <div className="page-frame">
        <HomeTopbar />

        <div id="main-content" tabIndex={-1}>
          <section className="hero-panel home-section home-section--hero">
            <div className="hero-banner" aria-hidden="true">
              <Image
                src="/hero-banner-desktop-v1.webp"
                alt=""
                fill
                priority
                sizes="(max-width: 860px) 0px, 1240px"
                className="hero-banner-image hero-banner-image-desktop"
              />
              <Image
                src="/hero-banner-v5.webp"
                alt=""
                fill
                priority
                sizes="(max-width: 860px) 100vw, 0px"
                className="hero-banner-image hero-banner-image-mobile"
              />
            </div>

            <div className="hero-copy">
              <p className="hero-eyebrow">{HOMEPAGE_HERO.eyebrow}</p>
              <h1 className="hero-title">
                <span className="hero-title-line">{HOMEPAGE_HERO.titleLines[0]}</span>
                <span className="hero-title-line">{HOMEPAGE_HERO.titleLines[1]}</span>
              </h1>
              <div className="hero-detail">
                <p className="hero-text section-copy">{HOMEPAGE_HERO.subheadline}</p>
                <p className="hero-trust-micro hero-mirror-lines">
                  {HOMEPAGE_HERO.mirrorLines.map((line) => (
                    <span key={line} className="hero-mirror-line">
                      {line}
                    </span>
                  ))}
                </p>
                <div className="hero-actions">
                  <Link href={HOMEPAGE_HERO.primaryHref} className="gold-button">
                    {HOMEPAGE_HERO.primaryCta}
                  </Link>
                  <Link href="/free-soul-blueprint" className="hero-secondary-link">
                    Discover Your Free Soul Blueprint
                  </Link>
                  <Link href={HOMEPAGE_HERO.secondaryHref} className="hero-secondary-link">
                    {HOMEPAGE_HERO.secondaryCta}
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="home-section entry-panel entry-panel--refined" id="entry-panel">
            <div className="home-section-inner">
              <div className="homepage-block homepage-block--elevated">
                <h2 className="homepage-section-title">{HOMEPAGE_CALCULATOR.title}</h2>
                <p className="homepage-prose-copy">{HOMEPAGE_CALCULATOR.body}</p>
                <div className="homepage-block-form">
                  <p className="entry-label">{HOMEPAGE_CALCULATOR.formLabel}</p>
                  <HomeBirthdateEntry />
                </div>
              </div>
            </div>
          </section>

          <section className="home-section home-section--prose homepage-what-is">
            <div className="home-section-inner homepage-prose-surface">
              <p className="homepage-section-eyebrow">{HOMEPAGE_WHAT_IS.eyebrow}</p>
              <h2 className="homepage-section-title">{HOMEPAGE_WHAT_IS.title}</h2>
              <div className="homepage-prose-copy">
                {HOMEPAGE_WHAT_IS.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="homepage-what-is-links">
                <Link
                  href={HOMEPAGE_WHAT_IS.definitionLink.href}
                  className="hero-secondary-link homepage-prose-link"
                >
                  {HOMEPAGE_WHAT_IS.definitionLink.label}
                </Link>
                <Link
                  href={HOMEPAGE_WHAT_IS.guidesLink.href}
                  className="homepage-guides-link"
                >
                  {HOMEPAGE_WHAT_IS.guidesLink.label}
                </Link>
              </div>
              <div className="homepage-explore-links">
                {HOMEPAGE_WHAT_IS.exploreLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="homepage-prose-link">
                    {link.label}
                  </Link>
                ))}
              </div>
              <p className="homepage-inline-note">
                {HOMEPAGE_BOUNDARY_INLINE}{" "}
                <Link href={HOMEPAGE_BOUNDARY_LINK.href}>{HOMEPAGE_BOUNDARY_LINK.label}</Link>
              </p>
            </div>
          </section>

          <section className="home-section home-section--foundations">
            <div className="home-section-inner">
              <div className="homepage-block homepage-block--elevated homepage-foundations-block">
                <p className="homepage-section-eyebrow">{HOMEPAGE_BLUEPRINT_INTRO.eyebrow}</p>
                <h2 className="homepage-section-title">{HOMEPAGE_BLUEPRINT_INTRO.title}</h2>
                <p className="homepage-prose-copy">{HOMEPAGE_BLUEPRINT_INTRO.body}</p>
                <div className="pillar-grid">
                  {HOMEPAGE_PILLARS.map((pillar) => (
                    <article
                      key={pillar.code}
                      className={`pillar-card pillar-${pillar.tone} pillar-card--refined`}
                    >
                      <p className="pillar-code">{pillar.code}</p>
                      <div className="pillar-card-body">
                        <h3 className="pillar-card-title">{pillar.title}</h3>
                        <p className="pillar-headline">{pillar.headline}</p>
                        <p className="pillar-card-copy">{pillar.text}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="home-section homepage-path-report">
            <div className="home-section-inner homepage-prose-surface homepage-path-report-intro">
              <p className="homepage-section-eyebrow">{HOMEPAGE_HOW.eyebrow}</p>
              <h2 className="homepage-section-title">{HOMEPAGE_HOW.title}</h2>
              <p className="homepage-prose-copy how-section-lead">{HOMEPAGE_HOW.body}</p>
              <div className="steps-grid">
                {HOMEPAGE_HOW.steps.map((step) => (
                  <article key={step.number} className={`step-card step-${step.tone}`}>
                    <div className={`step-icon-wrap ${step.frameClass}`.trim()}>
                      <div className={`step-icon-stage ${step.sizeClass}`.trim()}>
                        <Image
                          src={step.image}
                          alt=""
                          width={260}
                          height={260}
                          className={`step-icon-image ${step.imageClass}`.trim()}
                        />
                      </div>
                    </div>
                    <p className="step-number">{step.number}</p>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="home-section-inner homepage-path-report-preview">
              <div className="homepage-block homepage-block--elevated">
                <p className="homepage-section-eyebrow">{HOMEPAGE_FULL_REPORT_PREVIEW.eyebrow}</p>
                <h2 className="homepage-section-title">{HOMEPAGE_FULL_REPORT_PREVIEW.title}</h2>
                <p className="homepage-prose-copy">{HOMEPAGE_FULL_REPORT_PREVIEW.body}</p>
                <div className="homepage-module-groups">
                  {HOMEPAGE_FULL_REPORT_PREVIEW.moduleGroups.map((group) => (
                    <div key={group.label} className="homepage-module-group">
                      <span className="homepage-module-group-label">{group.label}</span>
                      <span className="homepage-module-group-codes">{group.codes}</span>
                    </div>
                  ))}
                </div>
                <ul className="homepage-preview-list homepage-preview-list--compact">
                  {HOMEPAGE_FULL_REPORT_PREVIEW.advancedLayers.map((item) => (
                    <li key={item.code}>
                      <strong>
                        {item.code} · {item.title}
                      </strong>
                      <span>{item.detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="homepage-preview-actions">
                  <Link href={HOMEPAGE_FULL_REPORT_PREVIEW.checkoutHref} className="gold-button">
                    {HOMEPAGE_FULL_REPORT_PREVIEW.checkoutCta}
                  </Link>
                  <Link href={HOMEPAGE_FULL_REPORT_PREVIEW.sampleHref} className="hero-secondary-link">
                    {HOMEPAGE_FULL_REPORT_PREVIEW.sampleCta}
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="home-section home-section--closing">
            <div className="home-section-inner">
              <div className="homepage-closing-panel">
                <p className="homepage-inline-note homepage-inline-note--quiet">
                  {HOMEPAGE_REFLECTION_INLINE}
                </p>
                <div className="homepage-closing-divider" aria-hidden="true" />
                <div className="homepage-closing-action">
                  <h2 className="homepage-closing-title">{HOMEPAGE_FINAL_CTA.headline}</h2>
                  <p className="homepage-closing-lead">{HOMEPAGE_FINAL_CTA.body}</p>
                  <Link href="#entry-panel" className="gold-button homepage-closing-button">
                    {HOMEPAGE_FINAL_CTA.cta}
                  </Link>
                  <p className="homepage-closing-note">{HOMEPAGE_FINAL_CTA.trustNote}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <SiteFooter compact />
      </div>
    </main>
  );
}
