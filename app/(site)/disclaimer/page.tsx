import type { Metadata } from "next";
import Link from "next/link";
import {
  DISCLAIMER_AUTHORITY,
  DISCLAIMER_CONTACT,
  DISCLAIMER_CORE,
  DISCLAIMER_CTA,
  DISCLAIMER_HEALTH,
  DISCLAIMER_HERO,
  DISCLAIMER_META,
  DISCLAIMER_REPORTS_GROUP,
  DISCLAIMER_SCORES,
  DISCLAIMER_SEGMENTS,
} from "@/lib/disclaimer-content";
import "@/styles/disclaimer-density-v1.css";

export const metadata: Metadata = {
  title: DISCLAIMER_META.title,
  description: DISCLAIMER_META.description,
};

function DisclaimerBlockCard({
  id,
  title,
  paragraphs,
}: {
  id: string;
  title: string;
  paragraphs: string[];
}) {
  return (
    <section id={id} className="disclaimer-card">
      <h2 className="disclaimer-subtitle">{title}</h2>
      <div className="disclaimer-copy">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

export default function DisclaimerPage() {
  return (
    <div className="conversion-page legal-page disclaimer-page disclaimer-page--refined">
      <header className="blueprint-hero glass-card disclaimer-hero">
        <p className="blueprint-eyebrow">{DISCLAIMER_HERO.eyebrow}</p>
        <h1 className="blueprint-title">{DISCLAIMER_HERO.title}</h1>
        <p className="blueprint-lead">{DISCLAIMER_HERO.body}</p>
        <p className="disclaimer-hero-subline">{DISCLAIMER_HERO.subline}</p>
      </header>

      <div className="disclaimer-stack">
        <DisclaimerBlockCard {...DISCLAIMER_CORE} />
        <DisclaimerBlockCard {...DISCLAIMER_AUTHORITY} />

        <section id={DISCLAIMER_SEGMENTS.id} className="disclaimer-card">
          <h2 className="disclaimer-subtitle">{DISCLAIMER_SEGMENTS.title}</h2>
          <ul className="disclaimer-segment-grid">
            {DISCLAIMER_SEGMENTS.items.map((item) => (
              <li key={item.code} className="disclaimer-segment-item">
                <h3>
                  {item.code} · {item.title}
                </h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <DisclaimerBlockCard {...DISCLAIMER_SCORES} />
        <DisclaimerBlockCard {...DISCLAIMER_HEALTH} />

        <section id={DISCLAIMER_REPORTS_GROUP.id} className="disclaimer-card">
          <h2 className="disclaimer-subtitle">{DISCLAIMER_REPORTS_GROUP.title}</h2>
          <div className="disclaimer-subsections">
            {DISCLAIMER_REPORTS_GROUP.subsections.map((sub) => (
              <div key={sub.title} className="disclaimer-subsection">
                <h3>{sub.title}</h3>
                <div className="disclaimer-copy">
                  {sub.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <DisclaimerBlockCard {...DISCLAIMER_CONTACT} />
      </div>

      <section className="disclaimer-cta glass-card">
        <h2>{DISCLAIMER_CTA.title}</h2>
        <p>{DISCLAIMER_CTA.body}</p>
        <div className="disclaimer-cta-actions">
          <Link href={DISCLAIMER_CTA.primaryHref} className="gold-button">
            {DISCLAIMER_CTA.primaryCta}
          </Link>
          <Link href={DISCLAIMER_CTA.secondaryHref} className="blueprint-secondary-link">
            {DISCLAIMER_CTA.secondaryCta}
          </Link>
        </div>
      </section>
    </div>
  );
}
