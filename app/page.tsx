import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FooterSubscribe } from "@/components/footer-subscribe";
import { HomeBirthdateEntry } from "@/components/home-birthdate-entry";
import { HomeTopbar } from "@/components/home-topbar";
import { SkipLink } from "@/components/skip-link";
import {
  HOMEPAGE_ABOUT_PREVIEW,
  HOMEPAGE_BLUEPRINT_INTRO,
  HOMEPAGE_CALCULATOR,
  HOMEPAGE_FINAL_CTA,
  HOMEPAGE_FOOTER_BRAND,
  HOMEPAGE_FULL_REPORT_PREVIEW,
  HOMEPAGE_HERO,
  HOMEPAGE_SECONDARY_LINKS,
  HOMEPAGE_HOW,
  HOMEPAGE_META,
  HOMEPAGE_MID_CTA,
  HOMEPAGE_PILLAR_NOTE,
  HOMEPAGE_PILLARS,
  HOMEPAGE_STATS,
} from "@/lib/homepage-content";
import { FOOTER_LEGAL_LINKS, HOMEPAGE_FOOTER_COLUMNS } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: { absolute: HOMEPAGE_META.title },
  description: HOMEPAGE_META.description,
};

export default function HomePage() {
  return (
    <main className="page-shell">
      <SkipLink />
      <div className="page-stars" aria-hidden="true" />
      <div className="page-glow page-glow-left" aria-hidden="true" />
      <div className="page-glow page-glow-right" aria-hidden="true" />

      <div className="page-frame">
        <HomeTopbar />

        <div id="main-content" tabIndex={-1}>
        <section className="hero-panel">
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
            <p className="eyebrow">{HOMEPAGE_HERO.eyebrow}</p>
            <h1>
              <span className="hero-title-line">{HOMEPAGE_HERO.titleLines[0]}</span>
              <span className="hero-title-line">{HOMEPAGE_HERO.titleLines[1]}</span>
            </h1>
            <div className="hero-detail">
              <p className="hero-text">{HOMEPAGE_HERO.subheadline}</p>
              <ul className="hero-mini-labels" aria-label="1320 dimensions">
                {HOMEPAGE_HERO.miniLabels.map((item) => (
                  <li key={item.digit}>
                    <span className="hero-mini-digit">{item.digit}</span>
                    <span className="hero-mini-label">{item.label}</span>
                  </li>
                ))}
              </ul>
              <p className="hero-grounded-note">{HOMEPAGE_HERO.groundedNote}</p>
              <div className="hero-actions hero-actions--primary-only">
                <Link href={HOMEPAGE_HERO.primaryHref} className="gold-button">
                  {HOMEPAGE_HERO.primaryCta}
                </Link>
                <p className="privacy-note">{HOMEPAGE_HERO.trustNote}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="entry-panel" id="entry-panel">
          <div className="entry-intro">
            <div className="entry-icon" aria-hidden="true">
              <div className="entry-icon-inner">
                <span className="entry-icon-top entry-icon-top-left" />
                <span className="entry-icon-top entry-icon-top-right" />
                <span className="entry-icon-bar" />
                <span className="entry-icon-dot entry-icon-dot-1" />
                <span className="entry-icon-dot entry-icon-dot-2" />
                <span className="entry-icon-dot entry-icon-dot-3" />
                <span className="entry-icon-dot entry-icon-dot-4" />
                <span className="entry-icon-dot entry-icon-dot-5" />
                <span className="entry-icon-dot entry-icon-dot-6" />
              </div>
            </div>
            <div className="entry-copy-block">
              <p className="entry-eyebrow">{HOMEPAGE_CALCULATOR.eyebrow}</p>
              <p className="entry-title">
                <span>{HOMEPAGE_CALCULATOR.titleLines[0]}</span>
                <span>{HOMEPAGE_CALCULATOR.titleLines[1]}</span>
              </p>
              <p className="entry-text">
                <span>{HOMEPAGE_CALCULATOR.body}</span>
              </p>
            </div>
          </div>

          <div className="entry-form-shell">
            <p className="entry-label">{HOMEPAGE_CALCULATOR.formLabel}</p>
            <HomeBirthdateEntry />
          </div>
        </section>

        <nav className="homepage-secondary-links" aria-label="Explore 1320">
          {HOMEPAGE_SECONDARY_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hero-secondary-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <section className="homepage-blueprint-intro">
          <p className="homepage-section-eyebrow">{HOMEPAGE_BLUEPRINT_INTRO.eyebrow}</p>
          <h2 className="homepage-section-title">{HOMEPAGE_BLUEPRINT_INTRO.title}</h2>
          <p className="homepage-section-body">{HOMEPAGE_BLUEPRINT_INTRO.body}</p>
          <p className="homepage-section-body-short">{HOMEPAGE_BLUEPRINT_INTRO.mobileShort}</p>
        </section>

        <section className="pillar-grid">
          {HOMEPAGE_PILLARS.map((pillar) => (
            <article key={pillar.code} className={`pillar-card pillar-${pillar.tone}`}>
              <p className="pillar-code">{pillar.code}</p>
              <div className="pillar-card-body">
                <h2>{pillar.title}</h2>
                <p className="pillar-headline">{pillar.headline}</p>
                <p>{pillar.text}</p>
                <Link href={pillar.learnMoreHref}>LEARN MORE</Link>
              </div>
            </article>
          ))}
        </section>
        <p className="homepage-pillar-note">{HOMEPAGE_PILLAR_NOTE}</p>

        <section className="how-section">
          <p className="homepage-section-eyebrow">{HOMEPAGE_HOW.eyebrow}</p>
          <h2>{HOMEPAGE_HOW.title}</h2>
          <p className="homepage-section-body how-section-lead">{HOMEPAGE_HOW.body}</p>
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
          <div className="homepage-mid-cta">
            <h3>
              {HOMEPAGE_MID_CTA.headline[0]}
              <br />
              {HOMEPAGE_MID_CTA.headline[1]}
            </h3>
            <p>{HOMEPAGE_MID_CTA.body}</p>
            <div className="homepage-mid-cta-actions">
              <Link href="/your-code" className="gold-button">
                {HOMEPAGE_MID_CTA.primaryCta}
              </Link>
              <Link href={HOMEPAGE_MID_CTA.secondaryHref} className="hero-secondary-link">
                {HOMEPAGE_MID_CTA.secondaryCta}
              </Link>
            </div>
          </div>
        </section>

        <section className="stats-band">
          {HOMEPAGE_STATS.items.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
          <p className="stats-supporting">{HOMEPAGE_STATS.supporting}</p>
        </section>

        <section className="homepage-preview-stack">
          <article className="homepage-preview-card">
            <p className="homepage-section-eyebrow">{HOMEPAGE_FULL_REPORT_PREVIEW.eyebrow}</p>
            <h2 className="homepage-section-title">{HOMEPAGE_FULL_REPORT_PREVIEW.title}</h2>
            <p className="homepage-section-body homepage-section-body--emphasis">
              {HOMEPAGE_FULL_REPORT_PREVIEW.transition}
            </p>
            <p className="homepage-section-body">{HOMEPAGE_FULL_REPORT_PREVIEW.body}</p>
            <ul className="homepage-preview-list">
              {HOMEPAGE_FULL_REPORT_PREVIEW.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="homepage-preview-actions homepage-preview-actions--secondary">
              <Link href={HOMEPAGE_FULL_REPORT_PREVIEW.waitlistHref} className="hero-secondary-link">
                {HOMEPAGE_FULL_REPORT_PREVIEW.waitlistCta}
              </Link>
              <Link href={HOMEPAGE_FULL_REPORT_PREVIEW.readingHref} className="hero-secondary-link">
                {HOMEPAGE_FULL_REPORT_PREVIEW.readingCta}
              </Link>
            </div>
          </article>

          <article className="homepage-preview-card">
            <p className="homepage-section-eyebrow">{HOMEPAGE_ABOUT_PREVIEW.eyebrow}</p>
            <h2 className="homepage-section-title">{HOMEPAGE_ABOUT_PREVIEW.title}</h2>
            {HOMEPAGE_ABOUT_PREVIEW.body.map((paragraph) => (
              <p key={paragraph} className="homepage-section-body">
                {paragraph}
              </p>
            ))}
            <Link href={HOMEPAGE_ABOUT_PREVIEW.href} className="hero-secondary-link homepage-preview-cta">
              {HOMEPAGE_ABOUT_PREVIEW.cta}
            </Link>
          </article>
        </section>

        <section className="homepage-final-cta">
          {HOMEPAGE_FINAL_CTA.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <Link href="/your-code" className="gold-button">
            {HOMEPAGE_FINAL_CTA.cta}
          </Link>
          <p className="privacy-note">{HOMEPAGE_FINAL_CTA.trustNote}</p>
        </section>
        </div>

        <footer className="site-footer">
          <div className="footer-brand">
            <div className="brand-lockup">
              <div className="brand-image-shell brand-image-shell-small">
                <Image
                  src="/1320-logo.jpeg"
                  alt="1320 logo"
                  width={72}
                  height={72}
                  className="brand-image brand-image-small"
                />
                <span className="brand-image-cover" aria-hidden="true" />
              </div>
              <div>
                <p className="brand-number">1320</p>
                <p className="brand-name">
                  <span>SOUL ORIGIN</span>
                  <span>CODE SYSTEM</span>
                </p>
              </div>
            </div>
            <p className="footer-copy">{HOMEPAGE_FOOTER_BRAND}</p>
            <nav className="footer-legal-nav" aria-label="Legal and support">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <p className="footer-meta">© 2026 1320 Soul Origin Code System. All Rights Reserved.</p>
          </div>

          {HOMEPAGE_FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="footer-column">
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}-${link.label}`}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <FooterSubscribe variant="homepage" />
        </footer>

        <p className="footer-mantra">{HOMEPAGE_FINAL_CTA.mantra}</p>
      </div>
    </main>
  );
}
