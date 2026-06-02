import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/components/conversion/faq-section";
import { InnerPageHero } from "@/components/inner-page-hero";
import { InnerPageLayout } from "@/components/inner-page-layout";
import {
  FAQ_DISCLAIMER,
  FAQ_HERO,
  FAQ_META,
  FAQ_SECTIONS,
} from "@/lib/faq-content";
import { GENERATE_CODE_CTA } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: FAQ_META.title,
  description: FAQ_META.description,
};

export default function FaqPage() {
  return (
    <InnerPageLayout className="conversion-page">
      <InnerPageHero eyebrow={FAQ_HERO.eyebrow} title={FAQ_HERO.title} lead={FAQ_HERO.body}>
        <Link href={GENERATE_CODE_CTA.href} className="gold-button">
          {GENERATE_CODE_CTA.label}
        </Link>
        <Link href="/blueprint" className="blueprint-secondary-link">
          EXPLORE THE BLUEPRINT
        </Link>
      </InnerPageHero>

      {FAQ_SECTIONS.map((section) => (
        <FaqSection key={section.id} title={section.title} items={section.items} />
      ))}

      <section className="inner-final-cta glass-card">
        <h2 className="inner-page-title text-gold-gradient">Still have questions?</h2>
        <p>Generate your code and read your free result — or review our legal pages for data and boundaries.</p>
        <Link href={GENERATE_CODE_CTA.href} className="gold-button">
          {GENERATE_CODE_CTA.label}
        </Link>
        <Link href="/privacy" className="blueprint-secondary-link block mt-3">
          PRIVACY POLICY
        </Link>
      </section>

      <p className="blueprint-disclaimer">{FAQ_DISCLAIMER}</p>
    </InnerPageLayout>
  );
}
