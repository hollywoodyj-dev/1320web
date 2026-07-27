import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/components/conversion/faq-section";
import { SectionCard } from "@/components/section-card";
import {
  FREE_VS_FULL,
  FULL_INCLUDES,
  FULL_REPORT_DISCLAIMER,
  FULL_REPORT_FINAL_CTA,
  FULL_REPORT_FAQ,
  FULL_REPORT_HERO,
  FULL_REPORT_META,
  LIVE_INTEGRATION,
  REPORT_EXPERIENCE,
  REPORT_PROMISE,
  UNLOCK_SECTION,
  WHO_FOR,
  WHO_NOT_FOR,
} from "@/lib/full-report-content";
import { SAMPLE_REPORT_HREF } from "@/lib/site-nav";
import { FullReportSalesTracker } from "@/components/funnel/full-report-sales-tracker";

export const metadata: Metadata = {
  title: FULL_REPORT_META.title,
  description: FULL_REPORT_META.description,
};

const SEGMENT_BG_CODES = new Set(["S1", "S3", "S2", "S0", "S4", "S5", "S6", "S7", "S8", "S9"]);

function segmentBgClass(code: string): string {
  return SEGMENT_BG_CODES.has(code) ? ` segment-bg segment-bg--${code.toLowerCase()}` : "";
}

export default function FullReportPage() {
  return (
    <div className="conversion-page full-report-marketing full-report-marketing--refined space-y-5">
      <FullReportSalesTracker />
      <header className="blueprint-hero glass-card full-report-hero">
        <p className="blueprint-eyebrow">{FULL_REPORT_HERO.eyebrow}</p>
        <h1 className="blueprint-title">{FULL_REPORT_HERO.title}</h1>
        <p className="blueprint-lead">{FULL_REPORT_HERO.body}</p>
        <p className="conversion-boundary full-report-boundary">
          <span className="full-report-boundary-line">{FULL_REPORT_HERO.boundaryLine1}</span>
          <span className="full-report-boundary-line">{FULL_REPORT_HERO.boundaryLine2}</span>
        </p>
        <div className="blueprint-hero-actions">
          <Link href="/checkout" className="gold-button">
            {FULL_REPORT_HERO.primaryCta}
          </Link>
          <Link href={SAMPLE_REPORT_HREF} className="blueprint-secondary-link">
            {FULL_REPORT_HERO.secondaryCta}
          </Link>
        </div>
        <ul className="full-report-product-details">
          {FULL_REPORT_HERO.productDetails.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </header>

      <SectionCard title={REPORT_PROMISE.title}>
        <div className="full-report-prose">
          {REPORT_PROMISE.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </SectionCard>

      <SectionCard title={FREE_VS_FULL.title}>
        <div className="conversion-compare full-report-compare">
          <div className="conversion-compare-col glass-card">
            <h3>{FREE_VS_FULL.free.label}</h3>
            <p className="full-report-compare-lead">{FREE_VS_FULL.free.lead}</p>
            <ul className="conversion-bullet-list">
              {FREE_VS_FULL.free.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="conversion-compare-col glass-card conversion-compare-col-full">
            <h3>{FREE_VS_FULL.full.label}</h3>
            <p className="full-report-compare-lead">{FREE_VS_FULL.full.lead}</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title={FULL_INCLUDES.title}>
        <h3 className="full-report-group-title">{FULL_INCLUDES.foundationTitle}</h3>
        <div className="conversion-module-grid mb-6">
          {FULL_INCLUDES.foundation.map((module) => (
            <article
              key={module.code}
              className={`conversion-module-card full-report-module-card${segmentBgClass(module.code)}`}
            >
              <p className="conversion-module-code">{module.code}</p>
              <h3>{module.title}</h3>
              <p>{module.text}</p>
            </article>
          ))}
        </div>

        <h3 className="full-report-group-title">{FULL_INCLUDES.advancedTitle}</h3>
        <p className="full-report-group-lead">{FULL_INCLUDES.advancedLead}</p>
        <div className="conversion-module-grid conversion-module-grid--advanced mb-6">
          {FULL_INCLUDES.advanced.map((module) => (
            <article
              key={module.code}
              className={`conversion-module-card full-report-module-card full-report-module-card--compact${segmentBgClass(module.code)}`}
            >
              <p className="conversion-module-code">{module.code}</p>
              <h3>{module.title}</h3>
              <p>{module.text}</p>
            </article>
          ))}
        </div>

        <h3 className="full-report-group-title">{FULL_INCLUDES.integrationTitle}</h3>
        <div className="conversion-module-grid">
          {FULL_INCLUDES.integration.map((module) => (
            <article key={module.code} className="conversion-module-card full-report-module-card">
              <p className="conversion-module-code">{module.code}</p>
              <h3>{module.title}</h3>
              <p>{module.text}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title={REPORT_EXPERIENCE.title}>
        <div className="blueprint-path-grid full-report-experience-grid">
          {REPORT_EXPERIENCE.points.map((point) => (
            <article key={point.title} className="blueprint-path-step">
              <p className="blueprint-path-num">{point.title}</p>
              <p>{point.text}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title={UNLOCK_SECTION.title} id="checkout">
        <p className="full-report-prose mb-4">{UNLOCK_SECTION.body}</p>
        <div className="full-report-cta-row">
          <Link href="/checkout" className="gold-button inline-flex">
            {UNLOCK_SECTION.primaryCta}
          </Link>
          <Link href="/login?next=/my-report" className="blueprint-secondary-link">
            {UNLOCK_SECTION.secondaryCta}
          </Link>
        </div>
      </SectionCard>

      <section className="blueprint-final-cta glass-card full-report-live-path">
        <h2>{LIVE_INTEGRATION.title}</h2>
        <p>{LIVE_INTEGRATION.body}</p>
        <Link href="/booking" className="blueprint-secondary-link full-report-live-cta">
          {LIVE_INTEGRATION.primaryCta}
        </Link>
        <Link href={SAMPLE_REPORT_HREF} className="blueprint-secondary-link block mt-3">
          {LIVE_INTEGRATION.secondaryCta}
        </Link>
      </section>

      <div className="conversion-pair">
        <SectionCard title={WHO_FOR.title}>
          <p className="full-report-compare-lead">{WHO_FOR.lead}</p>
          <ul className="conversion-bullet-list">
            {WHO_FOR.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title={WHO_NOT_FOR.title}>
          <p className="full-report-compare-lead">{WHO_NOT_FOR.lead}</p>
          <ul className="conversion-bullet-list">
            {WHO_NOT_FOR.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <FaqSection title="FAQ" items={FULL_REPORT_FAQ} />
      <p className="full-report-faq-more">
        <Link href="/faq" className="blueprint-secondary-link">
          View Full FAQ
        </Link>
      </p>

      <section className="blueprint-final-cta glass-card">
        <h2>{FULL_REPORT_FINAL_CTA.title}</h2>
        <p>{FULL_REPORT_FINAL_CTA.body}</p>
        <Link href="/checkout" className="gold-button">
          {FULL_REPORT_FINAL_CTA.primaryCta}
        </Link>
        <Link href="/free-soul-blueprint" className="blueprint-secondary-link block mt-3">
          {FULL_REPORT_FINAL_CTA.secondaryCta}
        </Link>
      </section>

      <p className="blueprint-disclaimer">{FULL_REPORT_DISCLAIMER}</p>
    </div>
  );
}
