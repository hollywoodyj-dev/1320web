import type { Metadata } from "next";
import Link from "next/link";
import { BirthDateForm } from "@/components/birthdate-form";
import { InnerPageHero } from "@/components/inner-page-hero";
import { InnerPageLayout } from "@/components/inner-page-layout";
import { ReceivePillarGrid } from "@/components/receive-pillar-grid";
import {
  BIRTH_FORM,
  FINAL_CTA,
  WHAT_YOU_RECEIVE,
  WHY_BIRTH_DATE,
  YOUR_CODE_DISCLAIMER,
  YOUR_CODE_FAQ,
  YOUR_CODE_HERO,
  YOUR_CODE_META,
} from "@/lib/your-code-content";

export const metadata: Metadata = {
  title: YOUR_CODE_META.title,
  description: YOUR_CODE_META.description,
  alternates: { canonical: "/your-code" },
};

export default function YourCodePage() {
  return (
    <InnerPageLayout className="your-code-page your-code-page--refined">
      <InnerPageHero
        eyebrow={YOUR_CODE_HERO.eyebrow}
        title={YOUR_CODE_HERO.title}
        lead={
          <>
            {YOUR_CODE_HERO.body}
            <span className="block mt-3 opacity-90">{YOUR_CODE_HERO.birthNote}</span>
          </>
        }
      >
        <a href="#birth-date-form" className="gold-button">
          {YOUR_CODE_HERO.anchorLabel}
        </a>
      </InnerPageHero>

      <section className="your-code-section" id="birth-date-form">
        <div className="your-code-block your-code-block--form">
          <h2 className="your-code-title">{BIRTH_FORM.title}</h2>
          <p className="your-code-copy">{BIRTH_FORM.helper}</p>
          <div className="your-code-form-shell">
            <BirthDateForm />
          </div>
        </div>
      </section>

      <section className="your-code-section your-code-section--compact">
        <div className="your-code-block">
          <h2 className="your-code-title">{WHAT_YOU_RECEIVE.title}</h2>
          <p className="your-code-copy">{WHAT_YOU_RECEIVE.intro}</p>
          <ReceivePillarGrid items={WHAT_YOU_RECEIVE.items} />
        </div>
      </section>

      <section className="your-code-section your-code-section--compact">
        <div className="your-code-block">
          <h2 className="your-code-title">{WHY_BIRTH_DATE.title}</h2>
          <div className="your-code-copy">
            {WHY_BIRTH_DATE.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <p className="blueprint-disclaimer your-code-boundary">{YOUR_CODE_DISCLAIMER}</p>

      <section className="your-code-section your-code-section--compact">
        <div className="your-code-block">
          <h2 className="your-code-title">FAQ</h2>
          <ul className="your-code-faq-preview">
            {YOUR_CODE_FAQ.map((item) => (
              <li key={item.q}>
                <strong>{item.q}</strong>
                <span>{item.a}</span>
              </li>
            ))}
          </ul>
          <Link href="/faq" className="blueprint-secondary-link your-code-prose-link">
            View Full FAQ
          </Link>
        </div>
      </section>

      <section className="your-code-section">
        <div className="your-code-block your-code-block--cta">
          <h2 className="your-code-title">{FINAL_CTA.title}</h2>
          <p className="your-code-copy">{FINAL_CTA.body}</p>
          <div className="your-code-cta-actions">
            <a href="#birth-date-form" className="gold-button">
              {FINAL_CTA.button}
            </a>
            <Link href={FINAL_CTA.secondaryHref} className="blueprint-secondary-link">
              {FINAL_CTA.secondaryCta}
            </Link>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
