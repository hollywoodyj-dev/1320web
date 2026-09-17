/**
 * T32 / N0.4 — QA & operator traffic excluded at read time (never deleted).
 *
 * RAW     = all production rows
 * CLEAN   = NOT qaTagged
 *
 * Keep admin SQL in sync with isQaTaggedConversionEvent().
 */
export const QA_CAMPAIGN_PREFIX = "haze_";
export const QA_UTM_SOURCE = "operator";
export const PURCHASE_CONTEXT_INTERNAL_QA = "internal_qa" as const;

/** Legacy rows before purchase_context tagging (N0.4 backfill at read time). */
export const LEGACY_QA_CAMPAIGNS = ["closure_2026-08-23"] as const;
export const LEGACY_QA_SOURCES = ["haze_t6b"] as const;

function normalizedCampaign(meta: Record<string, unknown>): string {
  const campaign =
    (typeof meta.utm_campaign === "string" && meta.utm_campaign) ||
    (typeof meta.campaign === "string" && meta.campaign) ||
    "";
  return campaign.trim();
}

function normalizedUtmSource(meta: Record<string, unknown>, source?: string | null): string {
  const fromMeta = typeof meta.utm_source === "string" ? meta.utm_source : "";
  return (fromMeta || source || "").trim().toLowerCase();
}

/** True when this event row is QA-tagged (JS mirror of admin SQL — probes / tests). */
export function isQaTaggedConversionEvent(input: {
  source?: string | null;
  metadata?: Record<string, unknown> | null;
}): boolean {
  const meta = input.metadata ?? {};

  if (meta.purchase_context === PURCHASE_CONTEXT_INTERNAL_QA) return true;

  const campaign = normalizedCampaign(meta);
  if (campaign.startsWith(QA_CAMPAIGN_PREFIX)) return true;
  if (LEGACY_QA_CAMPAIGNS.includes(campaign as (typeof LEGACY_QA_CAMPAIGNS)[number])) {
    return true;
  }

  const utmSource = normalizedUtmSource(meta, input.source);
  if (utmSource === QA_UTM_SOURCE) return true;
  if (LEGACY_QA_SOURCES.includes(utmSource as (typeof LEGACY_QA_SOURCES)[number])) {
    return true;
  }

  return false;
}

/** Tag new checkout / payment events at source when attribution is QA. */
export function resolvePurchaseContext(input: {
  source?: string | null;
  metadata?: Record<string, string | undefined | null>;
}): typeof PURCHASE_CONTEXT_INTERNAL_QA | undefined {
  const meta: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input.metadata ?? {})) {
    if (value != null && value !== "") meta[key] = value;
  }
  return isQaTaggedConversionEvent({ source: input.source, metadata: meta })
    ? PURCHASE_CONTEXT_INTERNAL_QA
    : undefined;
}

/** SQL fragment for CLEAN reads — must match isQaTaggedConversionEvent(). */
export const QA_EXCLUSION_SQL = `
  COALESCE(metadata->>'purchase_context', '') = 'internal_qa'
  OR COALESCE(metadata->>'utm_campaign', metadata->>'campaign', '') LIKE 'haze_%'
  OR COALESCE(metadata->>'utm_campaign', metadata->>'campaign', '') = 'closure_2026-08-23'
  OR LOWER(COALESCE(metadata->>'utm_source', source, '')) IN ('operator', 'haze_t6b')
`.trim();
