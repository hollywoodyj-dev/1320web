import type { Metadata } from "next";
import Link from "next/link";
import { GzhTwBrandHero } from "@/components/gzh/gzh-tw-brand-hero";
import { GzhTwExplainSections } from "@/components/gzh/gzh-tw-explain-sections";
import { GZH_TW_BRAND, GZH_TW_LANDING } from "@/lib/gzh/tw-content";
import { GZH_TW_BRAND_UI_RC2 } from "@/lib/gzh/tw-brand-ui-rc2";
import { gzhHref } from "@/lib/gzh/locale";

export const metadata: Metadata = {
  title: GZH_TW_LANDING.metaTitle,
  description: GZH_TW_LANDING.metaDescription,
  alternates: {
    canonical: "/tw",
    languages: {
      "zh-TW": "/tw",
      "x-default": "/",
    },
  },
};

export default function TwLandingPage() {
  const ui = GZH_TW_BRAND_UI_RC2;

  return (
    <article className="gzh-landing">
      <GzhTwBrandHero market="tw" />

      <section className="gzh-band gzh-band--intro" id="about">
        <div className="gzh-band-grid">
          <div>
            <p className="gzh-eyebrow">{ui.aboutEyebrow}</p>
            <h2 className="gzh-band-title">{ui.aboutTitle}</h2>
            {ui.aboutBody.map((p) => (
              <p key={p.slice(0, 24)} className="gzh-band-copy">
                {p}
              </p>
            ))}
            <Link className="gzh-btn gzh-btn--outline-dark" href="#foundation">
              {ui.ctaSecondary}
            </Link>
          </div>
          <aside className="gzh-quote">
            <p className="gzh-eyebrow">{ui.philosophyEyebrow}</p>
            <p className="gzh-quote-text">{ui.philosophyQuote}</p>
            <small>{ui.philosophyEn}</small>
          </aside>
        </div>
      </section>

      <section className="gzh-band gzh-band--foundation" id="foundation">
        <div className="gzh-section-intro">
          <p className="gzh-eyebrow">{ui.foundationEyebrow}</p>
          <h2 className="gzh-band-title">{ui.foundationTitle}</h2>
          <p className="gzh-band-copy">{ui.foundationIntro}</p>
        </div>
        <div className="gzh-four-grid">
          {ui.mirrors.map((m) => (
            <article key={m.code} className="gzh-mirror">
              <div className="gzh-mirror-code">{m.code}</div>
              <div className="gzh-mirror-en">{m.en}</div>
              <h3>{m.title}</h3>
              <p>{m.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="gzh-band gzh-band--path" id="path">
        <div className="gzh-section-intro">
          <p className="gzh-eyebrow gzh-eyebrow--gold">{ui.pathEyebrow}</p>
          <h2 className="gzh-band-title">{ui.pathTitle}</h2>
          <p className="gzh-band-copy">{ui.pathIntro}</p>
        </div>
        <div className="gzh-path-grid">
          {ui.pathSteps.map((step) => (
            <div key={step.n} className="gzh-path-step">
              <div className="gzh-path-n">{step.n}</div>
              <h3>{step.title}</h3>
              <em>{step.en}</em>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gzh-band gzh-band--paper" id="experience">
        <div className="gzh-section-intro">
          <p className="gzh-eyebrow">YOUR CODE</p>
          <h2 className="gzh-band-title">{GZH_TW_BRAND.name}</h2>
          <p className="gzh-band-copy">{GZH_TW_LANDING.heroLead}</p>
          <p className="gzh-boundary">{GZH_TW_LANDING.boundary}</p>
        </div>

        <div className="gzh-cta-row">
          <Link className="gzh-btn gzh-btn--navy" href={gzhHref("tw", "free-soul-blueprint")}>
            {GZH_TW_LANDING.ctaPrimary}
          </Link>
          <Link className="gzh-btn gzh-btn--outline-dark" href={gzhHref("tw", "review-samples")}>
            {GZH_TW_BRAND_UI_RC2.nav.samples}
          </Link>
          <Link className="gzh-btn gzh-btn--outline-dark" href={gzhHref("tw", "about")}>
            {GZH_TW_LANDING.ctaSecondary}
          </Link>
        </div>

        <p className="gzh-trust">{GZH_TW_LANDING.trustLine}</p>
        <p className="gzh-report-note">{GZH_TW_LANDING.reportLanguageNote}</p>

        <GzhTwExplainSections />

        <p className="gzh-principles">
          {GZH_TW_BRAND.principleSee}
          <br />
          {GZH_TW_BRAND.principleMirror}
        </p>
      </section>
    </article>
  );
}
