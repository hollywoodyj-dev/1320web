import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/components/conversion/faq-section";
import { InnerPageHero } from "@/components/inner-page-hero";
import { InnerPageLayout } from "@/components/inner-page-layout";
import { SectionCard } from "@/components/section-card";
import { SymbolPillarGrid } from "@/components/symbol-pillar-grid";
import {
  ABOUT_DISCLAIMER,
  ABOUT_FINAL,
  ABOUT_FAQ,
  ABOUT_HERO,
  ABOUT_META,
  ABOUT_PATH,
  ABOUT_WHO_FOR,
  ABOUT_WHO_NOT,
  FOUR_CODES,
  HOW_IT_WORKS,
  PHILOSOPHY,
  WHAT_DIFFERENT,
  WHAT_IS_1320,
  WHAT_IS_NOT,
  WHY_BIRTH_DATE,
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
        <Link href="/sample-report" className="blueprint-secondary-link">
          VIEW SAMPLE REPORT
        </Link>
      </InnerPageHero>

      <SectionCard title={WHAT_IS_1320.title}>
        <p>{WHAT_IS_1320.body}</p>
        <div className="mt-4">
          <SymbolPillarGrid blocks={WHAT_IS_1320.symbols} />
        </div>
      </SectionCard>

      <SectionCard title={WHAT_IS_NOT.title}>
        <ul className="conversion-bullet-list">
          {WHAT_IS_NOT.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 font-medium text-[#efc36f]">{WHAT_IS_NOT.mirror}</p>
      </SectionCard>

      <SectionCard title={WHY_BIRTH_DATE.title}>
        <p>{WHY_BIRTH_DATE.body}</p>
        <ul className="blueprint-layer-grid mt-4">
          {WHY_BIRTH_DATE.mapping.map((row) => (
            <li key={row.code} className="blueprint-layer-item">
              <span className="blueprint-layer-code">{row.code}</span>
              <span className="blueprint-layer-label">{row.label}</span>
              <p>{row.text}</p>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title={FOUR_CODES.title}>
        <div className="conversion-module-grid">
          {FOUR_CODES.segments.map((seg) => (
            <article key={seg.code} className="conversion-module-card">
              <p className="conversion-module-code">{seg.code}</p>
              <h3>{seg.title}</h3>
              <p>{seg.text}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title={HOW_IT_WORKS.title}>
        <div className="blueprint-path-grid">
          {HOW_IT_WORKS.steps.map((step) => (
            <article key={step.number} className="blueprint-path-step">
              <p className="blueprint-path-num">{step.number}</p>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title={PHILOSOPHY.title}>
        <p>{PHILOSOPHY.body}</p>
        <blockquote className="conversion-quote mt-4">{PHILOSOPHY.quote}</blockquote>
      </SectionCard>

      <SectionCard title={WHAT_DIFFERENT.title}>
        <div className="blueprint-path-grid">
          {WHAT_DIFFERENT.points.map((point) => (
            <article key={point.title} className="blueprint-path-step">
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title={ABOUT_WHO_FOR.title}>
        <ul className="conversion-bullet-list">
          {ABOUT_WHO_FOR.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title={ABOUT_WHO_NOT.title}>
        <p>{ABOUT_WHO_NOT.body}</p>
      </SectionCard>

      <section className="inner-final-cta glass-card">
        <h2 className="inner-page-title text-gold-gradient">{ABOUT_PATH.title}</h2>
        <p>{ABOUT_PATH.body}</p>
        <Link href={GENERATE_CODE_CTA.href} className="gold-button">
          {ABOUT_PATH.cta}
        </Link>
      </section>

      <FaqSection items={ABOUT_FAQ} />

      <section className="inner-final-cta glass-card">
        <h2 className="inner-page-title text-gold-gradient">{ABOUT_FINAL.title}</h2>
        <p>{ABOUT_FINAL.body}</p>
        <Link href={GENERATE_CODE_CTA.href} className="gold-button">
          {GENERATE_CODE_CTA.label}
        </Link>
        <Link href="/sample-report" className="blueprint-secondary-link block mt-3">
          VIEW SAMPLE REPORT
        </Link>
      </section>

      <p className="blueprint-disclaimer">{ABOUT_DISCLAIMER}</p>
    </InnerPageLayout>
  );
}
