/**
 * Marketing / LP conversion tracking catalog (ME Spec v1).
 * Persist allowlist + GA4 measurement helper.
 */

export type ConversionEventTier = "required" | "recommended" | "funnel";

export type ConversionEventCatalogEntry = {
  name: string;
  label: string;
  tier: ConversionEventTier;
  description: string;
};

/** Primary KPI for admin dashboard v1 (free value delivered). */
export const PRIMARY_KPI_EVENT = "generate_code_completed" as const;

export const CONVERSION_EVENT_CATALOG: ConversionEventCatalogEntry[] = [
  {
    name: "page_view",
    label: "Page view",
    tier: "funnel",
    description: "Marketing / site page load (path in event).",
  },
  {
    name: "homepage_view",
    label: "Homepage view",
    tier: "funnel",
    description: "View of / homepage.",
  },
  {
    name: "paid_landing_view",
    label: "Paid landing view",
    tier: "funnel",
    description: "View of /lp/* with lp / ad_group context.",
  },
  {
    name: "web_cta_click",
    label: "Web CTA click",
    tier: "recommended",
    description: "Generic primary CTA toward Generate / Report.",
  },
  {
    name: "homepage_primary_cta_click",
    label: "Homepage primary CTA",
    tier: "funnel",
    description: "Homepage Generate My Code (or equivalent) click.",
  },
  {
    name: "homepage_secondary_cta_click",
    label: "Homepage secondary CTA",
    tier: "funnel",
    description: "Sample report / learn more from homepage.",
  },
  {
    name: "paid_landing_primary_cta_click",
    label: "Paid LP primary CTA",
    tier: "funnel",
    description: "Primary CTA on a paid landing page.",
  },
  {
    name: "paid_landing_secondary_cta_click",
    label: "Paid LP secondary CTA",
    tier: "funnel",
    description: "Secondary CTA on a paid landing page.",
  },
  {
    name: "generate_code_started",
    label: "Generate code started",
    tier: "recommended",
    description: "User submits birth date / starts generation.",
  },
  {
    name: "generate_code_completed",
    label: "Generate code completed",
    tier: "required",
    description: "Free foundation Soul Code result shown (primary KPI v1).",
  },
  {
    name: "sample_report_view",
    label: "Sample report view",
    tier: "funnel",
    description: "Sample report opened.",
  },
  {
    name: "full_report_cta_click",
    label: "Full report CTA",
    tier: "recommended",
    description: "Upsell toward Full Soul Origin Report.",
  },
  {
    name: "checkout_started",
    label: "Checkout started",
    tier: "recommended",
    description: "User entered paid checkout.",
  },
  {
    name: "payment_button_clicked",
    label: "Payment button clicked",
    tier: "funnel",
    description: "Payment attempt started.",
  },
  {
    name: "purchase_completed",
    label: "Purchase completed",
    tier: "required",
    description: "Paid conversion (Full Report or equivalent).",
  },
  {
    name: "subscription_completed",
    label: "Subscription completed",
    tier: "required",
    description: "Paid subscription activation (if/when applicable).",
  },
  {
    name: "signup_completed",
    label: "Signup completed",
    tier: "recommended",
    description:
      "New users row inserted (checkout implicit account, /signup, booking, or reflect). Footer newsletter currently also fires this name — treat counts as mixed until that collision is split.",
  },
];

export const PERSISTED_CONVERSION_EVENT_NAMES = new Set(
  CONVERSION_EVENT_CATALOG.map((e) => e.name),
);

export type RecordConversionEventInput = {
  eventName: string;
  userId?: string | null;
  sessionId?: string | null;
  source?: string | null;
  lp?: string | null;
  adGroup?: string | null;
  platform?: string | null;
  path?: string | null;
  metadata?: Record<string, string | number | boolean | null | undefined>;
};

export function getGa4MeasurementId(): string | null {
  const id =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ||
    process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim();
  return id || null;
}

/** Client beacon: off when explicitly set to "0". Default on. */
export function isMarketingBeaconEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_MARKETING_BEACON !== "0";
}
