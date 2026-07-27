import type { Metadata } from "next";
import Link from "next/link";
import {
  PRIVACY_AUDIENCE,
  PRIVACY_CHANGES_CONTACT,
  PRIVACY_CHOICES,
  PRIVACY_COLLECT,
  PRIVACY_CTA,
  PRIVACY_DO_NOT,
  PRIVACY_HERO,
  PRIVACY_META,
  PRIVACY_OVERVIEW,
  PRIVACY_STORAGE,
  PRIVACY_SUMMARY,
  PRIVACY_USE,
} from "@/lib/privacy-content";
import "@/styles/privacy-density-v1.css";

export const metadata: Metadata = {
  title: PRIVACY_META.title,
  description: PRIVACY_META.description,
};

function PrivacyBlockCard({
  id,
  title,
  paragraphs,
}: {
  id: string;
  title: string;
  paragraphs: string[];
}) {
  return (
    <section id={id} className="privacy-card">
      <h2 className="privacy-subtitle">{title}</h2>
      <div className="privacy-copy">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 56)}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="conversion-page legal-page privacy-page privacy-page--refined">
      <header className="blueprint-hero glass-card privacy-hero">
        <p className="blueprint-eyebrow">{PRIVACY_HERO.eyebrow}</p>
        <h1 className="blueprint-title">{PRIVACY_HERO.title}</h1>
        <p className="blueprint-lead">{PRIVACY_HERO.body}</p>
        <p className="privacy-hero-subline">{PRIVACY_HERO.subline}</p>
      </header>

      <div className="privacy-stack">
        <PrivacyBlockCard {...PRIVACY_OVERVIEW} />

        <section id={PRIVACY_SUMMARY.id} className="privacy-card privacy-summary-card">
          <h2 className="privacy-subtitle">{PRIVACY_SUMMARY.title}</h2>
          <ul className="privacy-summary-list">
            {PRIVACY_SUMMARY.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section id="data" className="privacy-card">
          <h2 className="privacy-subtitle">Data Collection & Use</h2>
          <div className="privacy-subsections">
            <div className="privacy-subsection">
              <h3>{PRIVACY_COLLECT.title}</h3>
              <ul className="privacy-collect-list">
                {PRIVACY_COLLECT.items.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="privacy-subsection">
              <h3>{PRIVACY_USE.title}</h3>
              <div className="privacy-copy">
                {PRIVACY_USE.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="privacy-subsection">
              <h3>{PRIVACY_DO_NOT.title}</h3>
              <div className="privacy-copy">
                {PRIVACY_DO_NOT.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <PrivacyBlockCard {...PRIVACY_STORAGE} />

        <section id="rights" className="privacy-card">
          <h2 className="privacy-subtitle">Choices & Audience</h2>
          <div className="privacy-subsections">
            <div className="privacy-subsection">
              <h3>{PRIVACY_CHOICES.title}</h3>
              <div className="privacy-copy">
                {PRIVACY_CHOICES.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </div>
            {PRIVACY_AUDIENCE.subsections.map((sub) => (
              <div key={sub.title} className="privacy-subsection">
                <h3>{sub.title}</h3>
                <div className="privacy-copy">
                  {sub.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id={PRIVACY_CHANGES_CONTACT.id} className="privacy-card">
          <h2 className="privacy-subtitle">{PRIVACY_CHANGES_CONTACT.title}</h2>
          <div className="privacy-subsections">
            {PRIVACY_CHANGES_CONTACT.subsections.map((sub) => (
              <div key={sub.title} className="privacy-subsection">
                <h3>{sub.title}</h3>
                <div className="privacy-copy">
                  {sub.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="privacy-cta glass-card">
        <h2>{PRIVACY_CTA.title}</h2>
        <p>{PRIVACY_CTA.body}</p>
        <div className="privacy-cta-actions">
          <Link href={PRIVACY_CTA.primaryHref} className="gold-button">
            {PRIVACY_CTA.primaryCta}
          </Link>
          <Link href={PRIVACY_CTA.secondaryHref} className="blueprint-secondary-link">
            {PRIVACY_CTA.secondaryCta}
          </Link>
        </div>
      </section>
    </div>
  );
}
