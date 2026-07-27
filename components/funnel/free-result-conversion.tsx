"use client";

import Link from "next/link";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import {
  appendAttributionToHref,
  attributionToAnalyticsProps,
} from "@/lib/funnel/attribution";
import {
  FREE_RESULT_FULL_OFFER,
  FREE_RESULT_MISSING_MAP,
} from "@/lib/free-soul-blueprint-content";
import { SAMPLE_REPORT_HREF } from "@/lib/site-nav";

type FreeResultConversionProps = {
  checkoutHref?: string;
  /** Server-resolved display price, e.g. "USD 49". */
  priceDisplay?: string;
};

export function FreeResultConversionBlock({
  checkoutHref = "/checkout",
  priceDisplay = "USD 49",
}: FreeResultConversionProps) {
  const checkoutWithAttr = appendAttributionToHref(checkoutHref);
  const sampleWithAttr = appendAttributionToHref(SAMPLE_REPORT_HREF);
  const salesWithAttr = appendAttributionToHref("/full-report");

  useEffect(() => {
    trackEvent("full_report_offer_viewed", attributionToAnalyticsProps());
  }, []);

  return (
    <div className="fsb-result-conversion space-y-5">
      <section className="glass-card fsb-missing-map" id="missing-map" aria-labelledby="missing-map-title">
        <h2 id="missing-map-title" className="report-section-title">
          {FREE_RESULT_MISSING_MAP.title}
        </h2>
        <p className="fsb-section-lead">{FREE_RESULT_MISSING_MAP.body}</p>
        <div className="fsb-map-columns">
          <div className="fsb-map-col">
            <p className="fsb-map-label">{FREE_RESULT_MISSING_MAP.freeLabel}</p>
            <ul>
              {FREE_RESULT_MISSING_MAP.freeLayers.map((layer) => (
                <li key={layer.code}>
                  <span>{layer.code}</span> · {layer.title}
                </li>
              ))}
            </ul>
          </div>
          <p className="fsb-map-arrow" aria-hidden="true">
            ↓
          </p>
          <div className="fsb-map-col">
            <p className="fsb-map-label">{FREE_RESULT_MISSING_MAP.fullLabel}</p>
            <ul>
              {FREE_RESULT_MISSING_MAP.fullLayers.map((layer) => (
                <li key={layer.code}>
                  <span>{layer.code}</span> · {layer.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="glass-card report-full-upsell report-full-upsell--refined" id="go-deeper">
        <h2 className="report-section-title">{FREE_RESULT_FULL_OFFER.title}</h2>
        <p className="report-full-upsell-lead">{FREE_RESULT_FULL_OFFER.doorway}</p>
        <ul className="fsb-offer-pillars">
          {FREE_RESULT_FULL_OFFER.pillars.map((pillar) => (
            <li key={pillar.title}>
              <strong>{pillar.title}</strong>
              <span>{pillar.text}</span>
            </li>
          ))}
        </ul>
        <ul className="report-full-upsell-list">
          {FREE_RESULT_FULL_OFFER.summaryItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="fsb-offer-price">{priceDisplay}</p>
        <div className="report-full-upsell-actions">
          <Link
            href={checkoutWithAttr}
            className="gold-button"
            onClick={() => trackEvent("full_report_cta_clicked", attributionToAnalyticsProps())}
          >
            {FREE_RESULT_FULL_OFFER.primaryCta}
          </Link>
          <Link
            href={sampleWithAttr}
            className="blueprint-secondary-link"
            onClick={() => trackEvent("full_report_sample_clicked", attributionToAnalyticsProps())}
          >
            {FREE_RESULT_FULL_OFFER.secondaryCta}
          </Link>
          <Link href={salesWithAttr} className="blueprint-secondary-link">
            Learn about the Full Report
          </Link>
        </div>
      </section>
    </div>
  );
}
