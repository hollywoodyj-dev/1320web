import type { Metadata } from "next";
import Link from "next/link";
import { BlueprintViewTracker } from "@/components/blueprint/blueprint-view-tracker";
import { BlueprintSegmentSection } from "@/components/blueprint/blueprint-segment-section";
import { InnerPageHero } from "@/components/inner-page-hero";
import { InnerPageLayout } from "@/components/inner-page-layout";
import {
  BLUEPRINT_DISCLAIMER,
  BLUEPRINT_FAQ_PREVIEW,
  BLUEPRINT_FINAL_CTA,
  BLUEPRINT_HERO,
  BLUEPRINT_META,
  BLUEPRINT_OVERVIEW,
  EXAMPLE_BLUEPRINT,
  FOUR_TOGETHER,
  MEANING_1320,
  SEGMENT_BLOCKS,
  VS_IDENTITY,
} from "@/lib/blueprint-content";

export const metadata: Metadata = {
  title: BLUEPRINT_META.title,
  description: BLUEPRINT_META.description,
};

export default function BlueprintPage() {
  const heroTitle = BLUEPRINT_HERO.title.includes("\n")
    ? BLUEPRINT_HERO.title.split("\n").map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))
    : BLUEPRINT_HERO.title;

  return (
    <InnerPageLayout className="blueprint-page blueprint-page--refined">
      <BlueprintViewTracker />
      <InnerPageHero eyebrow={BLUEPRINT_HERO.eyebrow} title={heroTitle} lead={BLUEPRINT_HERO.body}>
        <Link href={BLUEPRINT_HERO.primaryHref} className="gold-button">
          {BLUEPRINT_HERO.primaryCta}
        </Link>
        <Link href={BLUEPRINT_HERO.secondaryHref} className="blueprint-secondary-link">
          {BLUEPRINT_HERO.secondaryCta}
        </Link>
        {BLUEPRINT_HERO.tertiaryHref && BLUEPRINT_HERO.tertiaryCta ? (
          <Link href={BLUEPRINT_HERO.tertiaryHref} className="blueprint-secondary-link">
            {BLUEPRINT_HERO.tertiaryCta}
          </Link>
        ) : null}
      </InnerPageHero>

      <section className="blueprint-section">
        <div className="blueprint-block">
          <h2 className="blueprint-title">{BLUEPRINT_OVERVIEW.title}</h2>
          <p className="blueprint-copy">{BLUEPRINT_OVERVIEW.intro}</p>
          <ul className="blueprint-foundation-grid">
            {BLUEPRINT_OVERVIEW.layers.map((layer) => (
              <li key={layer.code} className="blueprint-foundation-card">
                <span className="blueprint-foundation-code">
                  {layer.code} · {layer.label}
                </span>
                <p>{layer.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="blueprint-section blueprint-section--compact">
        <div className="blueprint-block">
          <h2 className="blueprint-title">{MEANING_1320.title}</h2>
          <div className="blueprint-copy">
            {MEANING_1320.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="blueprint-meaning-grid">
            {MEANING_1320.blocks.map((block) => (
              <article key={block.digit} className="blueprint-meaning-card">
                <p className="blueprint-meaning-digit">{block.digit}</p>
                <h3>
                  {block.digit} · {block.name}
                </h3>
                <p className="blueprint-meaning-mystic">{block.mystic}</p>
                <p>{block.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="blueprint-segments-grid">
        {SEGMENT_BLOCKS.map((block) => (
          <BlueprintSegmentSection key={block.segmentId} block={block} />
        ))}
      </div>

      <section className="blueprint-section blueprint-section--compact">
        <div className="blueprint-block">
          <h2 className="blueprint-title">{FOUR_TOGETHER.title}</h2>
          <ul className="blueprint-together-list">
            {FOUR_TOGETHER.questions.map((item) => (
              <li key={item.code}>
                <strong>{item.code} asks:</strong> {item.q}
              </li>
            ))}
          </ul>
          <p className="blueprint-copy blueprint-copy--emphasis">{FOUR_TOGETHER.closing}</p>
        </div>
      </section>

      <section className="blueprint-section blueprint-section--compact">
        <div className="blueprint-block">
          <h2 className="blueprint-title">{EXAMPLE_BLUEPRINT.title}</h2>
          <p className="blueprint-copy">{EXAMPLE_BLUEPRINT.intro}</p>
          <ul className="blueprint-example-codes">
            {EXAMPLE_BLUEPRINT.codes.map((code) => (
              <li key={code}>{code}</li>
            ))}
          </ul>
          <p className="blueprint-copy">{EXAMPLE_BLUEPRINT.note}</p>
          <Link href={EXAMPLE_BLUEPRINT.href} className="blueprint-secondary-link about-prose-link">
            {EXAMPLE_BLUEPRINT.cta}
          </Link>
        </div>
      </section>

      <section className="blueprint-section blueprint-section--compact">
        <div className="blueprint-block">
          <h2 className="blueprint-title">{VS_IDENTITY.title}</h2>
          <div className="blueprint-copy">
            {VS_IDENTITY.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="blueprint-section">
        <div className="blueprint-block blueprint-block--cta">
          <h2 className="blueprint-title">{BLUEPRINT_FINAL_CTA.title}</h2>
          <p className="blueprint-copy">{BLUEPRINT_FINAL_CTA.body}</p>
          <div className="blueprint-cta-actions">
            <Link href={BLUEPRINT_FINAL_CTA.primaryHref} className="gold-button">
              {BLUEPRINT_FINAL_CTA.primaryCta}
            </Link>
            <Link href={BLUEPRINT_FINAL_CTA.secondaryHref} className="blueprint-secondary-link">
              {BLUEPRINT_FINAL_CTA.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="blueprint-section blueprint-section--compact">
        <div className="blueprint-block">
          <h2 className="blueprint-title">{BLUEPRINT_FAQ_PREVIEW.title}</h2>
          <ul className="blueprint-faq-preview">
            {BLUEPRINT_FAQ_PREVIEW.items.map((item) => (
              <li key={item.q}>
                <strong>{item.q}</strong>
                <span>{item.a}</span>
              </li>
            ))}
          </ul>
          <Link href={BLUEPRINT_FAQ_PREVIEW.href} className="blueprint-secondary-link about-prose-link">
            {BLUEPRINT_FAQ_PREVIEW.cta}
          </Link>
        </div>
      </section>

      <p className="blueprint-disclaimer">{BLUEPRINT_DISCLAIMER}</p>
    </InnerPageLayout>
  );
}
