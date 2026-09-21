/**
 * Phase 1A · 玄微锁定七字段 — write canonical keys, read with legacy fallback.
 * Baselines were computed under old metadata keys; never drop read fallbacks.
 */
import type { FunnelAttribution } from "@/lib/funnel/attribution";

export const CAMPAIGN_ATTRIBUTION_READ_KEYS = {
  first_touch_source: ["first_touch_source", "utm_source", "source"],
  first_touch_medium: ["first_touch_medium", "utm_medium", "medium"],
  first_touch_campaign: ["first_touch_campaign", "utm_campaign", "campaign"],
  first_touch_content: ["first_touch_content", "utm_content", "content"],
  landing_path: ["landing_path", "landingPath", "landing_page"],
  gclid: ["gclid"],
} as const;

export type CampaignAttributionField = keyof typeof CAMPAIGN_ATTRIBUTION_READ_KEYS;

export function readMetadataAttributionField(
  metadata: Record<string, unknown> | null | undefined,
  field: CampaignAttributionField,
): string | null {
  if (!metadata) return null;
  for (const key of CAMPAIGN_ATTRIBUTION_READ_KEYS[field]) {
    const value = metadata[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

/** Persisted event metadata: canonical keys + legacy mirrors for Stripe / GA continuity. */
export function writeCampaignAttributionMetadata(
  attr: FunnelAttribution | null | undefined,
  sessionId?: string | null,
): Record<string, string> {
  const out: Record<string, string> = {};
  if (sessionId?.trim()) out.session_id = sessionId.trim();

  if (!attr) return out;

  if (attr.utm_source) {
    out.first_touch_source = attr.utm_source;
    out.utm_source = attr.utm_source;
    out.source = attr.utm_source;
  }
  if (attr.utm_medium) {
    out.first_touch_medium = attr.utm_medium;
    out.utm_medium = attr.utm_medium;
    out.medium = attr.utm_medium;
  }
  if (attr.utm_campaign) {
    out.first_touch_campaign = attr.utm_campaign;
    out.utm_campaign = attr.utm_campaign;
    out.campaign = attr.utm_campaign;
  }
  if (attr.utm_content) {
    out.first_touch_content = attr.utm_content;
    out.utm_content = attr.utm_content;
    out.content = attr.utm_content;
  }
  if (attr.landingPath) {
    out.landing_path = attr.landingPath;
    out.landingPath = attr.landingPath;
  }
  if (attr.gclid) out.gclid = attr.gclid.slice(0, 200);

  if (attr.utm_term) out.utm_term = attr.utm_term;
  if (attr.ref) out.ref = attr.ref;
  if (attr.language) out.language = attr.language;

  return out;
}

/** Server rows from Stripe session.metadata — read legacy, emit canonical. */
export function writeCampaignAttributionFromFlatMetadata(
  meta: Record<string, string | undefined | null>,
  sessionId?: string | null,
): Record<string, string> {
  const asRecord: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(meta)) {
    if (value != null && value !== "") asRecord[key] = value;
  }

  const out: Record<string, string> = {};
  if (sessionId?.trim()) out.session_id = sessionId.trim();

  const source = readMetadataAttributionField(asRecord, "first_touch_source");
  const medium = readMetadataAttributionField(asRecord, "first_touch_medium");
  const campaign = readMetadataAttributionField(asRecord, "first_touch_campaign");
  const content = readMetadataAttributionField(asRecord, "first_touch_content");
  const landingPath = readMetadataAttributionField(asRecord, "landing_path");
  const gclid = readMetadataAttributionField(asRecord, "gclid");

  if (source) {
    out.first_touch_source = source;
    out.utm_source = source;
    out.source = source;
  }
  if (medium) {
    out.first_touch_medium = medium;
    out.utm_medium = medium;
    out.medium = medium;
  }
  if (campaign) {
    out.first_touch_campaign = campaign;
    out.utm_campaign = campaign;
    out.campaign = campaign;
  }
  if (content) {
    out.first_touch_content = content;
    out.utm_content = content;
    out.content = content;
  }
  if (landingPath) {
    out.landing_path = landingPath;
    out.landingPath = landingPath;
  }
  if (gclid) out.gclid = gclid.slice(0, 200);

  return out;
}
