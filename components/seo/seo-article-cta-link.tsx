"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { appendAttributionToHref } from "@/lib/funnel/attribution";
import { seoAttributionAnalyticsProps } from "@/lib/seo/attribution";
import type { SeoArticleCta } from "@/lib/seo/types";

export type SeoCtaPlacement = "hero" | "mid" | "mid_page" | "end" | "final" | "related";

type SeoArticleCtaLinkProps = {
  cta: SeoArticleCta;
  slug: string;
  cluster: string;
  className?: string;
  placement: SeoCtaPlacement;
  primaryKeyword?: string;
};

function normalizeCtaPosition(placement: SeoCtaPlacement): "hero" | "mid_page" | "final" | "related" {
  if (placement === "hero") return "hero";
  if (placement === "mid" || placement === "mid_page") return "mid_page";
  if (placement === "end" || placement === "final") return "final";
  return "related";
}

export function SeoArticleCtaLink({
  cta,
  slug,
  cluster,
  className,
  placement,
  primaryKeyword,
}: SeoArticleCtaLinkProps) {
  const href = cta.href.startsWith("#") ? cta.href : appendAttributionToHref(cta.href);
  const ctaPosition = normalizeCtaPosition(placement);

  const onClick = () => {
    const props = {
      ...seoAttributionAnalyticsProps({
        content_slug: slug,
        primary_cluster: cluster,
        ...(primaryKeyword ? { primary_keyword: primaryKeyword } : {}),
      }),
      cta_label: cta.label,
      cta_intent: cta.intent,
      cta_placement: placement,
      cta_position: ctaPosition,
    };
    trackEvent("seo_article_cta_click", props);
    if (cta.intent === "free_blueprint") trackEvent("seo_to_free_blueprint", props);
    if (cta.intent === "full_report") trackEvent("seo_to_full_report", props);
    if (cta.intent === "sample_report") trackEvent("seo_to_sample_report", props);
    if (cta.intent === "session") trackEvent("seo_to_session", props);
  };

  return (
    <Link href={href} className={className} onClick={onClick}>
      {cta.label}
    </Link>
  );
}
