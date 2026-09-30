import type { Metadata } from "next";
import Link from "next/link";
import { GZH_TW_BRAND, GZH_TW_LANDING } from "@/lib/gzh/tw-content";
import { gzhHref } from "@/lib/gzh/locale";
import { GZH_MARKET_SEMANTIC_STATUS } from "@/lib/gzh/semantic-status";

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
  const status = GZH_MARKET_SEMANTIC_STATUS.tw;

  return (
    <article className="gzh-landing">
      <h1 className="gzh-hero-brand">{GZH_TW_BRAND.name}</h1>
      <p className="gzh-hero-lead">{GZH_TW_LANDING.heroLead}</p>
      <p className="gzh-boundary">{GZH_TW_LANDING.boundary}</p>

      <div className="gzh-cta-row">
        <Link className="gzh-btn" href={gzhHref("tw", "free-soul-blueprint")}>
          {GZH_TW_LANDING.ctaPrimary}
        </Link>
        <Link className="gzh-btn gzh-btn--ghost" href="/about-1320">
          {GZH_TW_LANDING.ctaSecondary}
        </Link>
      </div>

      <p className="gzh-trust">{GZH_TW_LANDING.trustLine}</p>
      <p className="gzh-report-note">{GZH_TW_LANDING.reportLanguageNote}</p>
      <p className="gzh-note" data-semantic-status={status}>
        {GZH_TW_LANDING.semanticNote} · gate={status}
      </p>

      <p className="gzh-principles">
        {GZH_TW_BRAND.principleSee}
        <br />
        {GZH_TW_BRAND.principleMirror}
      </p>
    </article>
  );
}
