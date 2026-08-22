import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { FreeSoulBlueprintBirthForm } from "@/components/funnel/free-soul-blueprint-birth-form";
import {
  FREE_SOUL_BLUEPRINT_COMPARE,
  FREE_SOUL_BLUEPRINT_FINAL,
  FREE_SOUL_BLUEPRINT_FOUNDATIONS,
  FREE_SOUL_BLUEPRINT_HERO,
  FREE_SOUL_BLUEPRINT_INCLUDES,
  FREE_SOUL_BLUEPRINT_META,
  FREE_SOUL_BLUEPRINT_SAMPLE,
  FREE_SOUL_BLUEPRINT_TRUST,
  FREE_SOUL_BLUEPRINT_WHY,
} from "@/lib/free-soul-blueprint-content";

export const metadata: Metadata = {
  title: FREE_SOUL_BLUEPRINT_META.title,
  description: FREE_SOUL_BLUEPRINT_META.description,
  openGraph: {
    title: FREE_SOUL_BLUEPRINT_META.title,
    description: FREE_SOUL_BLUEPRINT_META.description,
  },
  alternates: {
    canonical: "/free-soul-blueprint",
  },
};

export const dynamic = "force-static";

function FsbSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="fsb-section scroll-mt-28">
      <h2 className="fsb-section-title">{title}</h2>
      <div className="fsb-section-body">{children}</div>
    </section>
  );
}

export default function FreeSoulBlueprintPage() {
  return (
    <div className="fsb-page conversion-page">
      <header className="fsb-hero" id="discover">
        <p className="blueprint-eyebrow">{FREE_SOUL_BLUEPRINT_HERO.eyebrow}</p>
        <h1 className="blueprint-title fsb-hero-title">{FREE_SOUL_BLUEPRINT_HERO.title}</h1>
        <p className="blueprint-lead fsb-hero-lead">{FREE_SOUL_BLUEPRINT_HERO.body}</p>
        <p className="conversion-boundary fsb-boundary">{FREE_SOUL_BLUEPRINT_HERO.boundary}</p>
        <div className="fsb-hero-form">
          <FreeSoulBlueprintBirthForm idPrefix="fsb-hero" />
          <p className="fsb-trust">{FREE_SOUL_BLUEPRINT_HERO.trustLine}</p>
          <p className="fsb-trust fsb-trust--secondary">{FREE_SOUL_BLUEPRINT_HERO.trustLine2}</p>
        </div>
      </header>

      <FsbSection title={FREE_SOUL_BLUEPRINT_FOUNDATIONS.title}>
        <p className="fsb-section-lead">{FREE_SOUL_BLUEPRINT_FOUNDATIONS.body}</p>
        <ul className="fsb-foundation-grid">
          {FREE_SOUL_BLUEPRINT_FOUNDATIONS.cards.map((card) => (
            <li key={card.code} className="fsb-foundation-card">
              <p className="fsb-foundation-title">{card.title}</p>
              <p className="fsb-foundation-code">{card.code}</p>
              <p>{card.text}</p>
            </li>
          ))}
        </ul>
      </FsbSection>

      <FsbSection title={FREE_SOUL_BLUEPRINT_WHY.title}>
        <div className="fsb-prose">
          {FREE_SOUL_BLUEPRINT_WHY.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="fsb-bridge">{FREE_SOUL_BLUEPRINT_WHY.bridge}</p>
          <p>
            <Link href={FREE_SOUL_BLUEPRINT_WHY.definitionLink.href} className="blueprint-secondary-link">
              {FREE_SOUL_BLUEPRINT_WHY.definitionLink.label}
            </Link>
          </p>
          <p>
            <Link href={FREE_SOUL_BLUEPRINT_WHY.comparisonLink.href} className="blueprint-secondary-link">
              {FREE_SOUL_BLUEPRINT_WHY.comparisonLink.label}
            </Link>
            <Link href={FREE_SOUL_BLUEPRINT_WHY.calculatorLink.href} className="blueprint-secondary-link">
              {FREE_SOUL_BLUEPRINT_WHY.calculatorLink.label}
            </Link>
            <Link href={FREE_SOUL_BLUEPRINT_WHY.birthDateNumerologyLink.href} className="blueprint-secondary-link">
              {FREE_SOUL_BLUEPRINT_WHY.birthDateNumerologyLink.label}
            </Link>
            <Link href={FREE_SOUL_BLUEPRINT_WHY.birthdayNumberLink.href} className="blueprint-secondary-link">
              {FREE_SOUL_BLUEPRINT_WHY.birthdayNumberLink.label}
            </Link>
            <Link href={FREE_SOUL_BLUEPRINT_WHY.birthdayMeaningLink.href} className="blueprint-secondary-link">
              {FREE_SOUL_BLUEPRINT_WHY.birthdayMeaningLink.label}
            </Link>
          </p>
          <a href="#discover" className="blueprint-secondary-link">
            {FREE_SOUL_BLUEPRINT_WHY.returnLink}
          </a>
        </div>
      </FsbSection>

      <FsbSection title={FREE_SOUL_BLUEPRINT_INCLUDES.title}>
        <ul className="fsb-include-list">
          {FREE_SOUL_BLUEPRINT_INCLUDES.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </FsbSection>

      <FsbSection title={FREE_SOUL_BLUEPRINT_SAMPLE.title}>
        <p className="fsb-sample-label">{FREE_SOUL_BLUEPRINT_SAMPLE.sampleLabel}</p>
        <p className="fsb-section-lead">{FREE_SOUL_BLUEPRINT_SAMPLE.sampleNote}</p>
        <div className="fsb-sample-list">
          <div>
            <h3>{FREE_SOUL_BLUEPRINT_SAMPLE.coverTitle}</h3>
            <p className="fsb-sample-cover">1320 Soul Blueprint</p>
          </div>
          <div>
            <h3>{FREE_SOUL_BLUEPRINT_SAMPLE.overviewTitle}</h3>
            <p>{FREE_SOUL_BLUEPRINT_SAMPLE.overviewCodes}</p>
          </div>
          <div>
            <h3>{FREE_SOUL_BLUEPRINT_SAMPLE.cardTitle}</h3>
            <p>{FREE_SOUL_BLUEPRINT_SAMPLE.cardBody}</p>
          </div>
          <div>
            <h3>{FREE_SOUL_BLUEPRINT_SAMPLE.questionLabel}</h3>
            <p>{FREE_SOUL_BLUEPRINT_SAMPLE.question}</p>
          </div>
        </div>
      </FsbSection>

      <FsbSection title={FREE_SOUL_BLUEPRINT_COMPARE.title}>
        <div className="fsb-compare">
          <div>
            <h3>{FREE_SOUL_BLUEPRINT_COMPARE.isTitle}</h3>
            <ul className="fsb-include-list">
              {FREE_SOUL_BLUEPRINT_COMPARE.isItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{FREE_SOUL_BLUEPRINT_COMPARE.isNotTitle}</h3>
            <ul className="fsb-include-list">
              {FREE_SOUL_BLUEPRINT_COMPARE.isNotItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </FsbSection>

      <FsbSection title={FREE_SOUL_BLUEPRINT_TRUST.title}>
        <div className="fsb-prose">
          {FREE_SOUL_BLUEPRINT_TRUST.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="fsb-legal-links">
            <Link href="/privacy" className="blueprint-secondary-link">
              Privacy Policy
            </Link>
            {" · "}
            <Link href="/disclaimer" className="blueprint-secondary-link">
              Disclaimer
            </Link>
            {" · "}
            <Link href="/terms" className="blueprint-secondary-link">
              Terms of Service
            </Link>
          </p>
        </div>
      </FsbSection>

      <section className="fsb-final" id="discover-again" aria-labelledby="fsb-final-title">
        <h2 id="fsb-final-title" className="fsb-section-title">
          {FREE_SOUL_BLUEPRINT_FINAL.title}
        </h2>
        <p className="fsb-section-lead">{FREE_SOUL_BLUEPRINT_FINAL.body}</p>
        <div className="fsb-hero-form">
          <FreeSoulBlueprintBirthForm idPrefix="fsb-final" />
        </div>
      </section>
    </div>
  );
}
