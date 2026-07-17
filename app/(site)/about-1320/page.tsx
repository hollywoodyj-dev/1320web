import type { Metadata } from "next";
import Link from "next/link";
import { InnerPageHero } from "@/components/inner-page-hero";
import { InnerPageLayout } from "@/components/inner-page-layout";
import {
  ABOUT_DISCLAIMER,
  ABOUT_FAQ_PREVIEW,
  ABOUT_HERO,
  ABOUT_META,
  CO_CREATION,
  FOUNDER_BIO,
  FOUNDER_NOTE,
  FOUR_MIRRORS,
  ORIGIN_CTA,
  ORIGIN_STORY,
  PHILOSOPHY,
  WHAT_IS_1320,
  WHAT_IS_NOT,
  WHY_1320_EXISTS,
  WHY_GOVERNANCE,
} from "@/lib/about-1320-content";

export const metadata: Metadata = {
  title: ABOUT_META.title,
  description: ABOUT_META.description,
};

export default function About1320Page() {
  return (
    <InnerPageLayout className="conversion-page about-page">
      <InnerPageHero eyebrow={ABOUT_HERO.eyebrow} title={ABOUT_HERO.title} lead={ABOUT_HERO.body}>
        <Link href={ABOUT_HERO.primaryHref} className="gold-button">
          {ABOUT_HERO.primaryCta}
        </Link>
        {ABOUT_HERO.secondaryLinks.map((link) => (
          <Link key={link.href} href={link.href} className="blueprint-secondary-link">
            {link.label}
          </Link>
        ))}
      </InnerPageHero>

      <section className="about-section">
        <div className="about-block">
          <h2 className="about-title">{WHAT_IS_1320.title}</h2>
          <div className="about-copy">
            {WHAT_IS_1320.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-section--compact">
        <div className="about-block about-block--wide">
          <h2 className="about-title">{FOUR_MIRRORS.title}</h2>
          <p className="about-copy">{FOUR_MIRRORS.intro}</p>
          <div className="about-mirror-grid">
            {FOUR_MIRRORS.cards.map((card) => (
              <article key={card.digit} className="about-mirror-card">
                <p className="about-mirror-digit">{card.digit}</p>
                <h3 className="about-mirror-title">
                  {card.digit} · {card.title}
                </h3>
                <p className="about-mirror-mystic">{card.mystic}</p>
                <p className="about-mirror-text">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-section--compact">
        <div className="about-block">
          <h2 className="about-title">{WHY_1320_EXISTS.title}</h2>
          <div className="about-copy">
            {WHY_1320_EXISTS.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-section--compact">
        <div className="about-block">
          <h2 className="about-title">{PHILOSOPHY.title}</h2>
          <ul className="about-principle-list">
            {PHILOSOPHY.principles.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>
          <p className="about-copy about-copy--emphasis">{PHILOSOPHY.closing}</p>
        </div>
      </section>

      <section className="about-section" id={ORIGIN_STORY.id}>
        <div className="about-block">
          <h2 className="about-title">{ORIGIN_STORY.title}</h2>
          <div className="about-copy">
            {ORIGIN_STORY.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-section--compact">
        <div className="about-block">
          <h2 className="about-title">{CO_CREATION.title}</h2>
          <div className="about-copy">
            {CO_CREATION.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-section--compact">
        <div className="about-block">
          <h2 className="about-title">{FOUNDER_NOTE.title}</h2>
          <div className="about-copy">
            {FOUNDER_NOTE.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="about-signature">
            — {FOUNDER_NOTE.signatureName}
            <br />
            {FOUNDER_NOTE.signatureTitle}
          </p>
        </div>
      </section>

      <section className="about-section about-section--compact">
        <div className="about-block">
          <h2 className="about-title">{FOUNDER_BIO.title}</h2>
          <p className="about-copy">{FOUNDER_BIO.body}</p>
        </div>
      </section>

      <section className="about-section about-section--compact">
        <div className="about-block">
          <h2 className="about-title">{WHY_GOVERNANCE.title}</h2>
          <div className="about-copy">
            {WHY_GOVERNANCE.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-section--compact">
        <div className="about-block">
          <h2 className="about-title">{WHAT_IS_NOT.title}</h2>
          <ul className="about-not-list">
            {WHAT_IS_NOT.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="about-copy about-copy--emphasis">{WHAT_IS_NOT.mirror}</p>
        </div>
      </section>

      <section className="about-section">
        <div className="about-block about-block--cta">
          <h2 className="about-title">{ORIGIN_CTA.title}</h2>
          <div className="about-copy">
            {ORIGIN_CTA.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="about-cta-actions">
            <Link href={ORIGIN_CTA.primaryHref} className="gold-button">
              {ORIGIN_CTA.primaryCta}
            </Link>
            <Link href={ORIGIN_CTA.secondaryHref} className="blueprint-secondary-link">
              {ORIGIN_CTA.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="about-section about-section--compact">
        <div className="about-block">
          <h2 className="about-title">{ABOUT_FAQ_PREVIEW.title}</h2>
          <ul className="about-faq-preview">
            {ABOUT_FAQ_PREVIEW.items.map((item) => (
              <li key={item.q}>
                <strong>{item.q}</strong>
                <span>{item.a}</span>
              </li>
            ))}
          </ul>
          <Link href={ABOUT_FAQ_PREVIEW.href} className="blueprint-secondary-link about-prose-link">
            {ABOUT_FAQ_PREVIEW.cta}
          </Link>
        </div>
      </section>

      <p className="blueprint-disclaimer">{ABOUT_DISCLAIMER}</p>
    </InnerPageLayout>
  );
}
