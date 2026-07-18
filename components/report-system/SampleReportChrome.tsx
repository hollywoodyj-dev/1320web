"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  SAMPLE_FINAL,
  SAMPLE_LOCKED_ITEMS,
  SAMPLE_LOCKED_SECTION,
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
  const [activeId, setActiveId] = useState<string>(SAMPLE_NAV[0].id);

  useEffect(() => {
    const ids = SAMPLE_NAV.map((item) => item.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-28% 0px -55% 0px",
        threshold: [0.12, 0.35, 0.6],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="report-viewer-nav" aria-label="Sample report sections">
      {SAMPLE_NAV.map((item) => {
        const current = activeId === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="report-viewer-nav-link"
            aria-current={current ? "true" : undefined}
          >
            <span className="report-viewer-nav-label">{item.label}</span>
            <span className="report-viewer-nav-short">{item.short}</span>
          </a>
        );
      })}
    </nav>
  );
}

export function SampleReportChapterLabel({ label }: { label: string }) {
  return <p className="report-chapter-label">{label}</p>;
}

export function SampleLockedPreviewSection() {
  return (
    <section
      id="locked"
      className="report-chapter sample-locked-preview"
      aria-labelledby="sample-locked-title"
    >
      <p className="sample-locked-eyebrow">{SAMPLE_LOCKED_SECTION.eyebrow}</p>
      <h2 id="sample-locked-title" className="sample-locked-title">
        {SAMPLE_LOCKED_SECTION.title}
      </h2>
      <p className="sample-locked-body">{SAMPLE_LOCKED_SECTION.body}</p>
      <ul className="sample-locked-grid">
        {SAMPLE_LOCKED_ITEMS.map((item) => (
          <li key={item.title} className="sample-locked-item">
            <span className="sample-locked-item-badge">Locked</span>
            <span className="sample-locked-item-title">{item.title}</span>
          </li>
        ))}
      </ul>
      <div className="sample-locked-actions">
        <Link href={SAMPLE_LOCKED_SECTION.href} className="gold-button">
          {SAMPLE_LOCKED_SECTION.cta}
        </Link>
      </div>
    </section>
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
