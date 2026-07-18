"use client";

import Link from "next/link";
import {
  SAMPLE_FINAL,
  SAMPLE_NAV,
  SAMPLE_REPORT_INTRO,
} from "@/lib/sample-report-content";

export function SampleReportIntro() {
  return (
    <header className="sample-report-intro">
      <p className="sample-report-intro-eyebrow">{SAMPLE_REPORT_INTRO.eyebrow}</p>
      <h1 className="sample-report-intro-title">{SAMPLE_REPORT_INTRO.title}</h1>
      <p className="sample-report-intro-body">{SAMPLE_REPORT_INTRO.body}</p>
      <p className="sample-report-intro-note">{SAMPLE_REPORT_INTRO.note}</p>
      <p className="sample-report-intro-boundary">{SAMPLE_REPORT_INTRO.boundary}</p>
      <div className="sample-report-intro-actions">
        <Link href={SAMPLE_REPORT_INTRO.primaryHref} className="gold-button">
          {SAMPLE_REPORT_INTRO.primaryCta}
        </Link>
        <Link href={SAMPLE_REPORT_INTRO.secondaryHref} className="blueprint-secondary-link">
          {SAMPLE_REPORT_INTRO.secondaryCta}
        </Link>
      </div>
    </header>
  );
}

export function SampleReportReadingGuide() {
  return (
    <>
      <nav className="sample-report-side-nav" aria-label="Sample report reading guide">
        {SAMPLE_NAV.map((item) => (
          <a key={item.id} href={`#${item.id}`} className="sample-report-side-nav-link">
            {item.label}
          </a>
        ))}
      </nav>
      <nav className="sample-report-chip-nav" aria-label="Sample report sections">
        {SAMPLE_NAV.map((item) => (
          <a key={item.id} href={`#${item.id}`} className="sample-report-chip">
            {item.short}
          </a>
        ))}
      </nav>
    </>
  );
}

export function SampleReportFinalCta() {
  return (
    <section className="sample-report-final" aria-labelledby="sample-report-final-title">
      <h2 id="sample-report-final-title">{SAMPLE_FINAL.title}</h2>
      <p>{SAMPLE_FINAL.body}</p>
      <div className="sample-report-final-actions">
        <Link href={SAMPLE_FINAL.primaryHref} className="gold-button">
          {SAMPLE_FINAL.primaryCta}
        </Link>
        <Link href={SAMPLE_FINAL.secondaryHref} className="blueprint-secondary-link">
          {SAMPLE_FINAL.secondaryCta}
        </Link>
      </div>
    </section>
  );
}
