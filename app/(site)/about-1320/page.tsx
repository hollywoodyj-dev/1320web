import type { Metadata } from "next";
import { SAMPLE_REPORT_HREF } from "@/lib/site-nav";
import Link from "next/link";
import { FaqSection } from "@/components/conversion/faq-section";
import { InnerPageHero } from "@/components/inner-page-hero";
import { InnerPageLayout } from "@/components/inner-page-layout";
import { SectionCard } from "@/components/section-card";
import { SymbolPillarGrid } from "@/components/symbol-pillar-grid";
import {
  ABOUT_DISCLAIMER,
  ABOUT_FAQ,
  ABOUT_HERO,
  ABOUT_META,
  CO_CREATION,
  FOUNDER_BIO,
  FOUNDER_NOTE,
  ORIGIN_CTA,
  ORIGIN_STORY,
  PHILOSOPHY,
  WHAT_IS_1320,
  WHAT_IS_NOT,
  WHY_1320_EXISTS,
  WHY_GOVERNANCE,
} from "@/lib/about-1320-content";
import { GENERATE_CODE_CTA } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: ABOUT_META.title,
  description: ABOUT_META.description,
};

export default function About1320Page() {
  return (
    <InnerPageLayout className="conversion-page">
      <InnerPageHero eyebrow={ABOUT_HERO.eyebrow} title={ABOUT_HERO.title} lead={ABOUT_HERO.body}>
        <Link href={GENERATE_CODE_CTA.href} className="gold-button">
          {GENERATE_CODE_CTA.label}
        </Link>
        <Link href="/blueprint" className="blueprint-secondary-link">
          EXPLORE THE BLUEPRINT
        </Link>
        <Link href={SAMPLE_REPORT_HREF} className="blueprint-secondary-link">
          VIEW SAMPLE REPORT
        </Link>
      </InnerPageHero>

      <SectionCard title={WHAT_IS_1320.title}>
        <p>{WHAT_IS_1320.body}</p>
        <div className="mt-4">
          <SymbolPillarGrid blocks={WHAT_IS_1320.symbols} />
        </div>
      </SectionCard>

      <SectionCard title={WHY_1320_EXISTS.title}>
        {WHY_1320_EXISTS.body.map((paragraph) => (
          <p key={paragraph} className="mb-3 last:mb-0">
            {paragraph}
          </p>
        ))}
      </SectionCard>

      <SectionCard title={PHILOSOPHY.title}>
        <ul className="conversion-bullet-list">
          {PHILOSOPHY.principles.map((principle) => (
            <li key={principle}>{principle}</li>
          ))}
        </ul>
        <p className="mt-4">{PHILOSOPHY.body}</p>
      </SectionCard>

      <SectionCard title={ORIGIN_STORY.title} id={ORIGIN_STORY.id}>
        {ORIGIN_STORY.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mb-3 last:mb-0">
            {paragraph}
          </p>
        ))}
        <ol className="blueprint-steps-list mt-6">
          {ORIGIN_STORY.timeline.map((item, index) => (
            <li key={item.phase}>
              <span className="blueprint-step-num">{String(index + 1).padStart(2, "0")}</span>
              <strong className="block mb-1">{item.phase}</strong>
              {item.text}
            </li>
          ))}
        </ol>
      </SectionCard>

      <SectionCard title={CO_CREATION.title}>
        {CO_CREATION.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mb-3 last:mb-0">
            {paragraph}
          </p>
        ))}
      </SectionCard>

      <SectionCard title={FOUNDER_NOTE.title}>
        {FOUNDER_NOTE.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mb-3 last:mb-0">
            {paragraph}
          </p>
        ))}
        <p className="mt-6 text-sm opacity-90">
          — {FOUNDER_NOTE.signatureName}
          <br />
          {FOUNDER_NOTE.signatureTitle}
        </p>
      </SectionCard>

      <SectionCard title={FOUNDER_BIO.title}>
        <p>{FOUNDER_BIO.body}</p>
      </SectionCard>

      <SectionCard title={WHY_GOVERNANCE.title}>
        <p>{WHY_GOVERNANCE.body}</p>
      </SectionCard>

      <SectionCard title={WHAT_IS_NOT.title}>
        <ul className="conversion-bullet-list">
          {WHAT_IS_NOT.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 font-medium text-[#efc36f]">{WHAT_IS_NOT.mirror}</p>
      </SectionCard>

      <section className="inner-final-cta glass-card">
        <h2 className="inner-page-title text-gold-gradient">{ORIGIN_CTA.title}</h2>
        {ORIGIN_CTA.body.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <Link href={GENERATE_CODE_CTA.href} className="gold-button mt-4 inline-flex">
          {ORIGIN_CTA.primaryCta}
        </Link>
        <Link href={SAMPLE_REPORT_HREF} className="blueprint-secondary-link block mt-3">
          {ORIGIN_CTA.secondaryCta}
        </Link>
      </section>

      <FaqSection items={ABOUT_FAQ} />

      <p className="blueprint-disclaimer">{ABOUT_DISCLAIMER}</p>
    </InnerPageLayout>
  );
}
