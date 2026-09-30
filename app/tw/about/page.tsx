import type { Metadata } from "next";
import Link from "next/link";
import { GzhComprehensionCheck } from "@/components/gzh/gzh-comprehension-check";
import { GzhTwExplainSections } from "@/components/gzh/gzh-tw-explain-sections";
import { GZH_TW_ABOUT, GZH_TW_FREE } from "@/lib/gzh/tw-content";
import { gzhHref } from "@/lib/gzh/locale";

export const metadata: Metadata = {
  title: GZH_TW_ABOUT.metaTitle,
  description: GZH_TW_ABOUT.metaDescription,
  alternates: {
    canonical: "/tw/about",
    languages: {
      "zh-TW": "/tw/about",
      "x-default": "/about-1320",
    },
  },
};

export default function TwAboutPage() {
  return (
    <article className="gzh-about">
      <h1 className="gzh-hero-brand">{GZH_TW_ABOUT.title}</h1>
      <p className="gzh-hero-lead">{GZH_TW_ABOUT.lead}</p>

      <section className="gzh-section" aria-labelledby="gzh-is-title">
        <h2 id="gzh-is-title" className="gzh-section-title">
          {GZH_TW_ABOUT.whatItIsTitle}
        </h2>
        <ul className="gzh-list">
          {GZH_TW_ABOUT.whatItIs.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="gzh-section" aria-labelledby="gzh-not-title">
        <h2 id="gzh-not-title" className="gzh-section-title">
          {GZH_TW_ABOUT.whatItIsNotTitle}
        </h2>
        <ul className="gzh-list gzh-list--not">
          {GZH_TW_ABOUT.whatItIsNot.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <GzhTwExplainSections />

      <div className="gzh-cta-row">
        <Link className="gzh-btn" href={gzhHref("tw", "free-soul-blueprint")}>
          {GZH_TW_ABOUT.ctaFree}
        </Link>
        <Link className="gzh-btn gzh-btn--ghost" href={gzhHref("tw")}>
          {GZH_TW_ABOUT.backHome}
        </Link>
      </div>

      <p className="gzh-note">{GZH_TW_FREE.comprehensionHint}</p>
      <GzhComprehensionCheck market="tw" />
    </article>
  );
}
