import type { Metadata } from "next";
import Link from "next/link";
import {
  TERMS_ACCEPTABLE_USE,
  TERMS_AGREEMENT,
  TERMS_CHANGES,
  TERMS_COMMERCE_GROUP,
  TERMS_CONTACT,
  TERMS_CTA,
  TERMS_GOVERNING,
  TERMS_HERO,
  TERMS_INDEMNITY,
  TERMS_IP,
  TERMS_LIABILITY,
  TERMS_META,
  TERMS_NO_ADVICE,
  TERMS_NO_GUARANTEES,
  TERMS_PROVIDES,
  TERMS_PROVIDES_CLOSING,
  TERMS_THIRD_PARTY,
  type TermsBlock,
} from "@/lib/terms-content";
import "@/styles/terms-density-v1.css";

export const metadata: Metadata = {
  title: TERMS_META.title,
  description: TERMS_META.description,
};

function TermsBlockCard({ block, closing }: { block: TermsBlock; closing?: string }) {
  return (
    <section id={block.id} className="terms-card">
      <p className="terms-subtitle">{block.title}</p>
      <div className="terms-copy">
        {block.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 56)}>{paragraph}</p>
        ))}
        {block.bullets?.length ? (
          <ul className="terms-bullet-list">
            {block.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        {closing ? <p>{closing}</p> : null}
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div className="conversion-page legal-page terms-page terms-page--refined">
      <header className="blueprint-hero glass-card terms-hero">
        <p className="blueprint-eyebrow">{TERMS_HERO.eyebrow}</p>
        <h1 className="blueprint-title">{TERMS_HERO.title}</h1>
        <p className="blueprint-lead">{TERMS_HERO.body}</p>
      </header>

      <div className="terms-stack">
        <TermsBlockCard block={TERMS_AGREEMENT} />
        <TermsBlockCard block={TERMS_PROVIDES} closing={TERMS_PROVIDES_CLOSING} />
        <TermsBlockCard block={TERMS_NO_ADVICE} />
        <TermsBlockCard block={TERMS_NO_GUARANTEES} />

        <section id={TERMS_COMMERCE_GROUP.id} className="terms-card">
          <p className="terms-subtitle">{TERMS_COMMERCE_GROUP.title}</p>
          <div className="terms-subsections">
            {TERMS_COMMERCE_GROUP.blocks.map((block) => (
              <div key={block.id} id={block.id} className="terms-subsection">
                <h3>{block.title}</h3>
                <div className="terms-copy">
                  {block.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 56)}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <TermsBlockCard block={TERMS_ACCEPTABLE_USE} />
        <TermsBlockCard block={TERMS_IP} />
        <TermsBlockCard block={TERMS_THIRD_PARTY} />
        <TermsBlockCard block={TERMS_LIABILITY} />
        <TermsBlockCard block={TERMS_INDEMNITY} />
        <TermsBlockCard block={TERMS_CHANGES} />
        <TermsBlockCard block={TERMS_GOVERNING} />
        <TermsBlockCard block={TERMS_CONTACT} />
      </div>

      <section className="terms-cta glass-card">
        <h2>{TERMS_CTA.title}</h2>
        <p>{TERMS_CTA.body}</p>
        <div className="terms-cta-actions">
          <Link href={TERMS_CTA.primaryHref} className="gold-button">
            {TERMS_CTA.primaryCta}
          </Link>
          <Link href={TERMS_CTA.secondaryHref} className="blueprint-secondary-link">
            {TERMS_CTA.secondaryCta}
          </Link>
        </div>
      </section>
    </div>
  );
}
