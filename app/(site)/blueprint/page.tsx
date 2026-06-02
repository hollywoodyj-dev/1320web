import type { Metadata } from "next";
import Link from "next/link";
import { BlueprintViewTracker } from "@/components/blueprint/blueprint-view-tracker";
import { BlueprintSegmentSection } from "@/components/blueprint/blueprint-segment-section";
import { InnerPageHero } from "@/components/inner-page-hero";
import { InnerPageLayout } from "@/components/inner-page-layout";
import { SectionCard } from "@/components/section-card";
import { SymbolPillarGrid } from "@/components/symbol-pillar-grid";
import {
  BLUEPRINT_DISCLAIMER,
  BLUEPRINT_FAQ,
  BLUEPRINT_HERO,
  BLUEPRINT_META,
  BLUEPRINT_OVERVIEW,
  BLUEPRINT_PATH,
  EXAMPLE_BLUEPRINT,
  FOUR_TOGETHER,
  HOW_TO_READ,
  MEANING_1320,
  SEGMENT_BLOCKS,
  VS_IDENTITY,
  WHY_MATTERS,
} from "@/lib/blueprint-content";
import { GENERATE_CODE_CTA } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: BLUEPRINT_META.title,
  description: BLUEPRINT_META.description,
};

export default function BlueprintPage() {
  return (
    <InnerPageLayout className="blueprint-page">
      <BlueprintViewTracker />
      <InnerPageHero
        eyebrow={BLUEPRINT_HERO.eyebrow}
        title={BLUEPRINT_HERO.title}
        lead={BLUEPRINT_HERO.body}
      >
        <Link href={GENERATE_CODE_CTA.href} className="gold-button">
          {GENERATE_CODE_CTA.label}
        </Link>
        <Link href="/sample-report" className="blueprint-secondary-link">
          VIEW SAMPLE REPORT
        </Link>
      </InnerPageHero>

      <SectionCard title={BLUEPRINT_OVERVIEW.title}>
        <p>{BLUEPRINT_OVERVIEW.intro}</p>
        <ul className="blueprint-layer-grid mt-4">
          {BLUEPRINT_OVERVIEW.layers.map((layer) => (
            <li key={layer.code} className="blueprint-layer-item">
              <span className="blueprint-layer-code">{layer.code}</span>
              <span className="blueprint-layer-label">{layer.label}</span>
              <p>{layer.text}</p>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title={MEANING_1320.title}>
        <SymbolPillarGrid blocks={MEANING_1320.blocks} />
      </SectionCard>

      <div className="blueprint-segments-grid">
        {SEGMENT_BLOCKS.map((block) => (
          <BlueprintSegmentSection key={block.segmentId} block={block} />
        ))}
      </div>

      <SectionCard title={FOUR_TOGETHER.title}>
        <ul className="blueprint-together-list">
          {FOUR_TOGETHER.questions.map((item) => (
            <li key={item.code}>
              <strong>{item.code}</strong> — {item.q}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title={EXAMPLE_BLUEPRINT.title} subtitle={EXAMPLE_BLUEPRINT.code}>
        <p>{EXAMPLE_BLUEPRINT.note}</p>
        <Link href="/sample-report" className="gold-button mt-4 inline-flex">
          VIEW SAMPLE REPORT
        </Link>
      </SectionCard>

      <SectionCard title={WHY_MATTERS.title}>
        <p>{WHY_MATTERS.body}</p>
      </SectionCard>

      <SectionCard title={VS_IDENTITY.title}>
        <p>{VS_IDENTITY.body}</p>
      </SectionCard>

      <SectionCard title={HOW_TO_READ.title}>
        <ol className="blueprint-steps-list">
          {HOW_TO_READ.steps.map((step, index) => (
            <li key={step}>
              <span className="blueprint-step-num">{String(index + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>
      </SectionCard>

      <SectionCard title={BLUEPRINT_PATH.title}>
        <div className="blueprint-path-grid">
          {BLUEPRINT_PATH.steps.map((step) => (
            <article key={step.number} className="blueprint-path-step">
              <p className="blueprint-path-num">{step.number}</p>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <section className="inner-final-cta glass-card">
        <h2 className="inner-page-title text-gold-gradient">Ready to see your blueprint?</h2>
        <p>Enter your birth date to generate your personal four-part code.</p>
        <Link href={GENERATE_CODE_CTA.href} className="gold-button">
          {GENERATE_CODE_CTA.label}
        </Link>
        <Link href="/full-report" className="blueprint-secondary-link block mt-3">
          EXPLORE FULL REPORT WAITLIST
        </Link>
      </section>

      <SectionCard title="Frequently Asked Questions">
        <div className="blueprint-faq">
          {BLUEPRINT_FAQ.map((item) => (
            <details key={item.q} className="blueprint-faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </SectionCard>

      <p className="blueprint-disclaimer">{BLUEPRINT_DISCLAIMER}</p>
    </InnerPageLayout>
  );
}
