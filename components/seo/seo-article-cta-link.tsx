"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { appendAttributionToHref } from "@/lib/funnel/attribution";
import { seoAttributionAnalyticsProps } from "@/lib/seo/attribution";
import type { SeoArticleCta } from "@/lib/seo/types";

type SeoArticleCtaLinkProps = {
  cta: SeoArticleCta;
  slug: string;
  cluster: string;
  className?: string;
  placement: "mid" | "end" | "related";
};

export function SeoArticleCtaLink({
  cta,
  slug,
  cluster,
  className,
  placement,
}: SeoArticleCtaLinkProps) {
  const href = appendAttributionToHref(cta.href);

  const onClick = () => {
    const props = {
      ...seoAttributionAnalyticsProps({
        content_slug: slug,
        primary_cluster: cluster,
      }),
      cta_label: cta.label,
      cta_intent: cta.intent,
      cta_placement: placement,
    };
    trackEvent("seo_article_cta_click", props);
    if (cta.intent === "free_blueprint") trackEvent("seo_to_free_blueprint", props);
    if (cta.intent === "full_report") trackEvent("free_to_full_report", props);
    if (cta.intent === "session") trackEvent("seo_to_session", props);
  };

  return (
    <Link href={href} className={className} onClick={onClick}>
      {cta.label}
    </Link>
  );
}
