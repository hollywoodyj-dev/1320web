import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/components/conversion/faq-section";
import { InnerPageHero } from "@/components/inner-page-hero";
import { InnerPageLayout } from "@/components/inner-page-layout";
import {
  FAQ_CATEGORY_CHIPS,
  FAQ_DISCLAIMER,
  FAQ_FINAL,
  FAQ_HERO,
  FAQ_META,
  FAQ_SECTIONS,
} from "@/lib/faq-content";
import "@/styles/faq-density-v1.css";

export const metadata: Metadata = {
  title: FAQ_META.title,
  description: FAQ_META.description,
};

export default function FaqPage() {
  return (
    <InnerPageLayout className="conversion-page faq-page faq-page--refined">
      <InnerPageHero eyebrow={FAQ_HERO.eyebrow} title={FAQ_HERO.title} lead={FAQ_HERO.body}>
        <Link href={FAQ_HERO.primaryHref} className="gold-button">
          {FAQ_HERO.primaryCta}
        </Link>
        <Link href={FAQ_HERO.secondaryHref} className="blueprint-secondary-link">
          {FAQ_HERO.secondaryCta}
        </Link>
      </InnerPageHero>

      <nav className="faq-category-chips" aria-label="FAQ categories">
        {FAQ_CATEGORY_CHIPS.map((chip) => (
          <a key={chip.id} href={`#${chip.id}`} className="faq-category-chip">
            {chip.label}
          </a>
        ))}
      </nav>

      {FAQ_SECTIONS.map((section) => (
        <FaqSection
          key={section.id}
          id={section.id}
          title={section.title}
          items={section.items}
        />
      ))}

      <section className="inner-final-cta faq-final glass-card">
        <h2 className="inner-page-title text-gold-gradient">{FAQ_FINAL.title}</h2>
        <p>{FAQ_FINAL.body}</p>
        <div className="faq-final-actions">
          <Link href={FAQ_FINAL.primaryHref} className="gold-button">
            {FAQ_FINAL.primaryCta}
          </Link>
          <Link href={FAQ_FINAL.secondaryHref} className="blueprint-secondary-link">
            {FAQ_FINAL.secondaryCta}
          </Link>
        </div>
        <p className="faq-final-sample">
          <Link href={FAQ_FINAL.sampleHref} className="blueprint-secondary-link">
            {FAQ_FINAL.sampleCta}
          </Link>
        </p>
      </section>

      <p className="blueprint-disclaimer">{FAQ_DISCLAIMER}</p>
    </InnerPageLayout>
  );
}
