/**
 * T32 extension — QA / operator test traffic excluded at read time (never deleted).
 *
 * Purchase and funnel KPIs: exclude when
 *   - metadata utm_campaign OR metadata campaign matches `haze_%`, OR
 *   - metadata utm_source OR column source equals `operator`
 *
 * Do NOT exclude on source = pinterest / pinterest_b — real Pinterest traffic uses those.
 * Campaign prefix is the clean discriminator for historical haze_t8 / haze_t9_cta runs.
 */
export const QA_CAMPAIGN_PREFIX = "haze_";
export const QA_UTM_SOURCE = "operator";

/** True when this event row is QA-tagged (JS mirror of SQL rule — probes / tests). */
export function isQaTaggedConversionEvent(input: {
  source?: string | null;
  metadata?: Record<string, unknown> | null;
}): boolean {
  const meta = input.metadata ?? {};
  const campaign =
    (typeof meta.utm_campaign === "string" && meta.utm_campaign) ||
    (typeof meta.campaign === "string" && meta.campaign) ||
    "";
  if (campaign.startsWith(QA_CAMPAIGN_PREFIX)) return true;

  const utmSource =
    (typeof meta.utm_source === "string" && meta.utm_source) ||
    input.source ||
    "";
  return utmSource.trim().toLowerCase() === QA_UTM_SOURCE;
}
