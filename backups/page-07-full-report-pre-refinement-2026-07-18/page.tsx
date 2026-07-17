import type { Metadata } from "next";
import { SAMPLE_REPORT_HREF } from "@/lib/site-nav";
import Link from "next/link";
import { ModuleSymbol } from "@/components/conversion/module-symbol";
import { FaqSection } from "@/components/conversion/faq-section";
import { SectionCard } from "@/components/section-card";
import {
  ADVANCED_MODULES,
  FREE_VS_FULL,
  FULL_INCLUDES,
  FULL_REPORT_DISCLAIMER,
  FULL_REPORT_FINAL_CTA,
  FULL_REPORT_FAQ,
  FULL_REPORT_HERO,
  FULL_REPORT_META,
  REPORT_EXPERIENCE,
  REPORT_PROMISE,
  WHO_FOR,
  WHO_NOT_FOR,
} from "@/lib/full-report-content";
import { GENERATE_CODE_CTA } from "@/lib/site-nav";

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
    <div className="conversion-page space-y-5">
      <header className="blueprint-hero glass-card">
        <p className="blueprint-eyebrow">{FULL_REPORT_HERO.eyebrow}</p>
        <h1 className="blueprint-title">{FULL_REPORT_HERO.title}</h1>
        <p className="blueprint-lead">{FULL_REPORT_HERO.body}</p>
        <p className="conversion-boundary">{FULL_REPORT_HERO.boundary}</p>
        <p className="conversion-trust">{FULL_REPORT_HERO.trust}</p>
        <div className="blueprint-hero-actions">
          <Link href="/checkout" className="gold-button">
            UNLOCK MY FULL BLUEPRINT
          </Link>
          <Link href="/booking" className="blueprint-secondary-link">
            BOOK PERSONAL INTEGRATION SESSION
          </Link>
          <Link href={SAMPLE_REPORT_HREF} className="blueprint-secondary-link">
            VIEW SAMPLE REPORT
          </Link>
        </div>
      </header>

      <SectionCard title={REPORT_PROMISE.title}>
        <p>{REPORT_PROMISE.body}</p>
      </SectionCard>

      <SectionCard title={FREE_VS_FULL.title}>
        <div className="conversion-compare">
          <div className="conversion-compare-col glass-card">
            <h3>{FREE_VS_FULL.free.label}</h3>
            <ul className="conversion-bullet-list">
              {FREE_VS_FULL.free.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="conversion-compare-col glass-card conversion-compare-col-full">
            <h3>{FREE_VS_FULL.full.label}</h3>
            <ul className="conversion-bullet-list">
              {FREE_VS_FULL.full.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </SectionCard>

      <SectionCard title={FULL_INCLUDES.title}>
        <h3 className="text-sm font-medium mb-3">{FULL_INCLUDES.foundationTitle}</h3>
        <div className="conversion-module-grid mb-6">
          {FULL_INCLUDES.foundation.map((module) => (
            <article
              key={module.code}
              className={`conversion-module-card${segmentBgClass(module.code)}`}
            >
              <p className="conversion-module-code">{module.code}</p>
              <h3>{module.title}</h3>
              <p>{module.text}</p>
            </article>
          ))}
        </div>
        <h3 className="text-sm font-medium mb-3">{FULL_INCLUDES.advancedTitle}</h3>
        <div className="conversion-module-grid mb-6">
          {FULL_INCLUDES.advanced.map((module) => (
            <article
              key={module.code}
              className={`conversion-module-card${segmentBgClass(module.code)}`}
            >
              <p className="conversion-module-code">{module.code}</p>
              <h3>{module.title}</h3>
              <p>{module.text}</p>
            </article>
          ))}
        </div>
        <h3 className="text-sm font-medium mb-3">{FULL_INCLUDES.integrationTitle}</h3>
        <div className="conversion-module-grid">
          {FULL_INCLUDES.integration.map((module) => (
            <article key={module.code} className="conversion-module-card">
              <p className="conversion-module-code">{module.code}</p>
              <h3>{module.title}</h3>
              <p>{module.text}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title={ADVANCED_MODULES.title}>
        <div className="conversion-module-grid">
          {ADVANCED_MODULES.items.map((item) => (
            <article key={item.code} className="conversion-module-card conversion-module-card--advanced">
              <ModuleSymbol id={item.symbol} className="conversion-module-symbol" />
              <p className="conversion-module-code">{item.code}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <p className="conversion-s6-note mt-4">{ADVANCED_MODULES.s6Disclaimer}</p>
      </SectionCard>

      <SectionCard title={REPORT_EXPERIENCE.title}>
        <div className="blueprint-path-grid">
          {REPORT_EXPERIENCE.points.map((point) => (
            <article key={point.title} className="blueprint-path-step">
              <p className="blueprint-path-num">{point.title}</p>
              <p>{point.text}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Unlock Your Full Report" id="checkout">
        <p className="mb-4">
          The Full Report is available now. One-time purchase — after checkout, sign in with your
          account to return to your complete S0–S9 Soul Blueprint anytime.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/checkout" className="gold-button inline-flex">
            GO TO CHECKOUT
          </Link>
          <Link href="/login?next=/my-report" className="blueprint-secondary-link">
            ALREADY PURCHASED? SIGN IN
          </Link>
        </div>
      </SectionCard>

      <section className="blueprint-final-cta glass-card">
        <h2>Prefer Live Integration?</h2>
        <p>Book a Personal Integration Session to apply your Soul Blueprint in real-life conversation.</p>
        <Link href="/booking" className="gold-button">
          BOOK PERSONAL INTEGRATION SESSION
        </Link>
        <Link href={SAMPLE_REPORT_HREF} className="blueprint-secondary-link block mt-3">
          VIEW SAMPLE REPORT
        </Link>
      </section>

      <div className="conversion-pair">
        <SectionCard title={WHO_FOR.title}>
          <ul className="conversion-bullet-list">
            {WHO_FOR.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title={WHO_NOT_FOR.title}>
          <p>{WHO_NOT_FOR.body}</p>
        </SectionCard>
      </div>

      <FaqSection items={FULL_REPORT_FAQ} />

      <section className="blueprint-final-cta glass-card">
        <h2>{FULL_REPORT_FINAL_CTA.title}</h2>
        <p>{FULL_REPORT_FINAL_CTA.body}</p>
        <Link href="/checkout" className="gold-button">
          UNLOCK FULL REPORT
        </Link>
        <Link href={GENERATE_CODE_CTA.href} className="blueprint-secondary-link block mt-3">
          {GENERATE_CODE_CTA.label}
        </Link>
      </section>

      <p className="blueprint-disclaimer">{FULL_REPORT_DISCLAIMER}</p>
    </div>
  );
}
