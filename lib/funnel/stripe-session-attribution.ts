import type Stripe from "stripe";

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "ref",
  "landingPath",
  "source_page",
] as const;

export function attributionFromSessionMetadata(
  metadata: Stripe.Metadata | null | undefined,
): { source?: string; campaign?: string; meta: Record<string, string> } {
  if (!metadata) return { meta: {} };
  const meta: Record<string, string> = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = metadata[key]?.trim();
    if (value) meta[key] = value.slice(0, 120);
  }
  return {
    source: meta.utm_source,
    campaign: meta.utm_campaign,
    meta,
  };
}
