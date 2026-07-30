/**
 * SEO → funnel attribution helpers.
 * Extends first-party funnel attribution without storing birth dates or report content.
 */

import {
  attributionToAnalyticsProps,
  loadFunnelAttribution,
  mergeAttribution,
  saveFunnelAttribution,
  type FunnelAttribution,
} from "@/lib/funnel/attribution";
import type { SeoCluster } from "@/lib/seo/types";

export type SeoAttributionFields = {
  landing_page?: string;
  content_slug?: string;
  primary_cluster?: SeoCluster | string;
};

const SEO_STORAGE_KEYS = ["landing_page", "content_slug", "primary_cluster"] as const;

export function captureSeoAttribution(input: {
  landingPath: string;
  contentSlug?: string;
  primaryCluster?: SeoCluster | string;
  searchParams?: URLSearchParams;
  referrer?: string;
  language?: string;
}): void {
  if (typeof window === "undefined") return;

  const incoming: FunnelAttribution & SeoAttributionFields = {};
  if (input.searchParams) {
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"] as const) {
      const value = input.searchParams.get(key)?.trim();
      if (value) incoming[key] = value.slice(0, 120);
    }
  }
  if (input.referrer) incoming.ref = incoming.ref ?? input.referrer.slice(0, 200);
  if (input.language) incoming.language = input.language.slice(0, 32);

  incoming.landingPath = input.landingPath.slice(0, 200);
  incoming.landing_page = input.landingPath.slice(0, 200);
  if (input.contentSlug) incoming.content_slug = input.contentSlug.slice(0, 120);
  if (input.primaryCluster) incoming.primary_cluster = String(input.primaryCluster).slice(0, 80);

  const existing = loadFunnelAttribution() as (FunnelAttribution & SeoAttributionFields) | null;
  const merged = mergeAttribution(existing, incoming) as FunnelAttribution & SeoAttributionFields;
  for (const key of SEO_STORAGE_KEYS) {
    if (incoming[key] && !merged[key]) merged[key] = incoming[key];
    if (incoming[key] && key === "landing_page" && !merged.landing_page) {
      merged.landing_page = incoming.landing_page;
    }
  }
  // Prefer first-touch SEO content identity when already set.
  if (incoming.content_slug && !existing?.content_slug) merged.content_slug = incoming.content_slug;
  if (incoming.primary_cluster && !existing?.primary_cluster) {
    merged.primary_cluster = incoming.primary_cluster;
  }
  if (incoming.landing_page && !existing?.landing_page) merged.landing_page = incoming.landing_page;

  saveFunnelAttribution(merged);
  try {
    sessionStorage.setItem(
      "1320_seo_attribution_v1",
      JSON.stringify({
        landing_page: merged.landing_page ?? merged.landingPath,
        content_slug: merged.content_slug,
        primary_cluster: merged.primary_cluster,
      }),
    );
  } catch {
    /* ignore */
  }
}

export function seoAttributionAnalyticsProps(
  extra?: SeoAttributionFields,
): Record<string, string> {
  const base = attributionToAnalyticsProps(loadFunnelAttribution());
  const props: Record<string, string> = { ...base };
  let seo: SeoAttributionFields = { ...(extra ?? {}) };
  try {
    const raw = sessionStorage.getItem("1320_seo_attribution_v1");
    if (raw) seo = { ...(JSON.parse(raw) as SeoAttributionFields), ...seo };
  } catch {
    /* ignore */
  }
  const funnel = loadFunnelAttribution() as (FunnelAttribution & SeoAttributionFields) | null;
  if (funnel?.landing_page || funnel?.landingPath) {
    props.landing_page = (funnel.landing_page ?? funnel.landingPath)!.slice(0, 200);
  }
  if (funnel?.content_slug) props.content_slug = funnel.content_slug.slice(0, 120);
  if (funnel?.primary_cluster) props.primary_cluster = String(funnel.primary_cluster).slice(0, 80);
  if (seo.landing_page) props.landing_page = seo.landing_page.slice(0, 200);
  if (seo.content_slug) props.content_slug = seo.content_slug.slice(0, 120);
  if (seo.primary_cluster) props.primary_cluster = String(seo.primary_cluster).slice(0, 80);
  return props;
}
