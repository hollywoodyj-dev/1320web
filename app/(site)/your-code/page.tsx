import type { Metadata } from "next";
import Link from "next/link";
import { BirthDateForm } from "@/components/birthdate-form";
import { InnerPageHero } from "@/components/inner-page-hero";
import { InnerPageLayout } from "@/components/inner-page-layout";
import { ReceivePillarGrid } from "@/components/receive-pillar-grid";
import { SectionCard } from "@/components/section-card";
import {
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
};

export default function YourCodePage() {
  return (
    <InnerPageLayout className="your-code-page">
      <InnerPageHero
        eyebrow={YOUR_CODE_HERO.eyebrow}
        title={YOUR_CODE_HERO.title}
        lead={YOUR_CODE_HERO.body}
      >
        <a href="#birth-date-form" className="blueprint-secondary-link">
          {YOUR_CODE_HERO.anchorLabel}
        </a>
      </InnerPageHero>

      <SectionCard title="Generate Your Code" subtitle="Enter your birth date">
        <div id="birth-date-form">
          <BirthDateForm />
        </div>
      </SectionCard>

      <SectionCard title={WHAT_YOU_RECEIVE.title}>
        <ReceivePillarGrid items={WHAT_YOU_RECEIVE.items} />
      </SectionCard>

      <SectionCard title={WHY_BIRTH_DATE.title}>
        <p>{WHY_BIRTH_DATE.body}</p>
      </SectionCard>

      <p className="blueprint-disclaimer">{YOUR_CODE_DISCLAIMER}</p>

      <SectionCard title="Frequently Asked Questions">
        <div className="blueprint-faq">
          {YOUR_CODE_FAQ.map((item) => (
            <details key={item.q} className="blueprint-faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </SectionCard>

      <section className="inner-final-cta glass-card">
        <h2 className="inner-page-title text-gold-gradient">{FINAL_CTA.title}</h2>
        <p>{FINAL_CTA.body}</p>
        <a href="#birth-date-form" className="gold-button inline-flex">
          {FINAL_CTA.button}
        </a>
        <Link href="/blueprint" className="blueprint-secondary-link block mt-3">
          EXPLORE THE BLUEPRINT
        </Link>
      </section>
    </InnerPageLayout>
  );
}
