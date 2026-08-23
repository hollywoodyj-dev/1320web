import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/components/conversion/faq-section";
import { FullReportPersonalFoundation } from "@/components/funnel/full-report-personal-foundation";
import { FullReportSalesTracker } from "@/components/funnel/full-report-sales-tracker";
import {
  FREE_VS_FULL,
  FULL_INCLUDES,
  FULL_REPORT_DISCLAIMER,
  FULL_REPORT_FINAL_CTA,
  FULL_REPORT_FAQ,
  FULL_REPORT_HERO,
  FULL_REPORT_META,
  LIVE_INTEGRATION,
  REPORT_PROMISE,
  UNLOCK_SECTION,
} from "@/lib/full-report-content";
import { SAMPLE_REPORT_HREF } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: FULL_REPORT_META.title,
  description: FULL_REPORT_META.description,
  alternates: { canonical: "/full-report" },
};

/** Sales page is static; personal foundation codes hydrate client-side when birth is known. */
export const dynamic = "force-static";

export default function FullReportPage() {
  return (
    <div className="conversion-page full-report-marketing full-report-marketing--refined full-report-marketing--invite">
      <FullReportSalesTracker />

      <header className="full-report-hero">
        <p className="blueprint-eyebrow">{FULL_REPORT_HERO.eyebrow}</p>
        <h1 className="blueprint-title">{FULL_REPORT_HERO.title}</h1>
        <p className="blueprint-lead">{FULL_REPORT_HERO.body}</p>
        <p className="conversion-boundary full-report-boundary">
          <span className="full-report-boundary-line">{FULL_REPORT_HERO.boundaryLine1}</span>
          <span className="full-report-boundary-line">{FULL_REPORT_HERO.boundaryLine2}</span>
        </p>
        <div className="blueprint-hero-actions">
          <Link href="/checkout" className="gold-button">
            {FULL_REPORT_HERO.primaryCta}
          </Link>
          <Link href={SAMPLE_REPORT_HREF} className="blueprint-secondary-link">
            {FULL_REPORT_HERO.secondaryCta}
          </Link>
        </div>
        <ul className="full-report-product-details">
          {FULL_REPORT_HERO.productDetails.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </header>

      <FullReportPersonalFoundation />

      <section className="full-report-invite-section">
        <h2 className="full-report-invite-title">{REPORT_PROMISE.title}</h2>
        <ul className="full-report-invite-list">
          {REPORT_PROMISE.body.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section className="full-report-invite-section">
        <h2 className="full-report-invite-title">{FREE_VS_FULL.title}</h2>
        <div className="full-report-invite-compare">
          <div>
            <h3>{FREE_VS_FULL.free.label}</h3>
            <p>{FREE_VS_FULL.free.lead}</p>
            <ul className="full-report-invite-list">
              {FREE_VS_FULL.free.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{FREE_VS_FULL.full.label}</h3>
            <p>{FREE_VS_FULL.full.lead}</p>
          </div>
        </div>
      </section>

      <section className="full-report-invite-section">
        <h2 className="full-report-invite-title">{FULL_INCLUDES.title}</h2>
        <p className="full-report-group-lead">{FULL_INCLUDES.advancedLead}</p>
        <div className="full-report-invite-layers">
          <div>
            <h3>{FULL_INCLUDES.foundationTitle}</h3>
            <ul className="full-report-invite-list">
              {FULL_INCLUDES.foundation.map((m) => (
                <li key={m.code}>
                  <strong>
                    {m.code} · {m.title}
                  </strong>
                  <span>{m.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{FULL_INCLUDES.advancedTitle}</h3>
            <ul className="full-report-invite-list">
              {FULL_INCLUDES.advanced.map((m) => (
                <li key={m.code}>
                  <strong>
                    {m.code} · {m.title}
                  </strong>
                  <span>{m.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{FULL_INCLUDES.integrationTitle}</h3>
            <ul className="full-report-invite-list">
              {FULL_INCLUDES.integration.map((m) => (
                <li key={m.code}>
                  <strong>{m.title}</strong>
                  <span>{m.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="full-report-invite-section full-report-purchase" id="checkout">
        <h2 className="full-report-invite-title">{UNLOCK_SECTION.title}</h2>
        <p className="full-report-prose">{UNLOCK_SECTION.body}</p>
        <p className="full-report-price">{UNLOCK_SECTION.priceDisplay}</p>
        <div className="full-report-cta-row">
          <Link href="/checkout" className="gold-button inline-flex">
            {UNLOCK_SECTION.primaryCta}
          </Link>
          <Link href="/login?next=/my-report" className="blueprint-secondary-link">
            {UNLOCK_SECTION.secondaryCta}
          </Link>
        </div>
      </section>

      <section className="full-report-live-path">
        <h2>{LIVE_INTEGRATION.title}</h2>
        <p>{LIVE_INTEGRATION.body}</p>
        <Link href="/booking" className="blueprint-secondary-link full-report-live-cta">
          {LIVE_INTEGRATION.primaryCta}
        </Link>
      </section>

      <FaqSection title="FAQ" items={FULL_REPORT_FAQ} />

      <section className="full-report-final">
        <h2>{FULL_REPORT_FINAL_CTA.title}</h2>
        <p>{FULL_REPORT_FINAL_CTA.body}</p>
        <Link href="/checkout" className="gold-button">
          {FULL_REPORT_FINAL_CTA.primaryCta}
        </Link>
        <Link href="/free-soul-blueprint" className="blueprint-secondary-link block mt-3">
          {FULL_REPORT_FINAL_CTA.secondaryCta}
        </Link>
      </section>

      <p className="blueprint-disclaimer">{FULL_REPORT_DISCLAIMER}</p>
    </div>
  );
}
