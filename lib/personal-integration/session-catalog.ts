/**
 * Personal Integration Session Pricing & Product Tier Update · Launch v1
 * Single source of truth for bookable Session products.
 */

export const SESSION_PRICING_VERSION = "launch-v1-usd" as const;
export const SESSION_CURRENCY = "USD" as const;
export const SESSION_CURRENCY_STRIPE = "usd" as const;

/** Canonical bookable Session types (Launch v1). */
export type PersonalIntegrationSessionVariant =
  | "blueprint_integration"
  | "focused_life_integration"
  | "deep_blueprint_integration";

/** Pre-launch IDs retained for historical Session rows. */
export type LegacySessionVariant = "intro" | "deep" | "integration" | "not-sure";

export type StoredSessionVariant = PersonalIntegrationSessionVariant | LegacySessionVariant;

export type SessionProduct = {
  id: PersonalIntegrationSessionVariant;
  title: string;
  durationMinutes: number;
  durationLabel: string;
  priceAmount: number;
  priceCents: number;
  currency: typeof SESSION_CURRENCY;
  pricingVersion: typeof SESSION_PRICING_VERSION;
  priceDisplay: string;
  positioning: string;
  includes: string[];
  mostRecommended: boolean;
  /** Card / form CTA — same across all three. */
  cta: string;
};

const CTA = "Pay & Book Session";

export const SESSION_CATALOG: Record<PersonalIntegrationSessionVariant, SessionProduct> = {
  blueprint_integration: {
    id: "blueprint_integration",
    title: "Blueprint Integration Session",
    durationMinutes: 45,
    durationLabel: "45 minutes",
    priceAmount: 119,
    priceCents: 11900,
    currency: SESSION_CURRENCY,
    pricingVersion: SESSION_PRICING_VERSION,
    priceDisplay: "USD 119",
    positioning:
      "A focused one-to-one session for exploring one clear question or understanding how a core Soul Blueprint pattern is showing up in the client’s current life.",
    includes: [
      "Pre-Session Intake",
      "Facilitator Blueprint review",
      "Foundation reflection using S1 → S3 → S2 → S0",
      "Up to one relevant advanced layer",
      "Personal Integration Summary",
      "One Reflection Question",
      "One light 7-Day Practice",
    ],
    mostRecommended: false,
    cta: CTA,
  },
  focused_life_integration: {
    id: "focused_life_integration",
    title: "Focused Life Integration Session",
    durationMinutes: 60,
    durationLabel: "60 minutes",
    priceAmount: 159,
    priceCents: 15900,
    currency: SESSION_CURRENCY,
    pricingVersion: SESSION_PRICING_VERSION,
    priceDisplay: "USD 159",
    positioning:
      "A complete guided exploration of one primary life theme, such as relationships, direction, value, boundaries, work, identity, or a current transition.",
    includes: [
      "Complete Pre-Session Intake review",
      "Facilitator Blueprint preparation",
      "Foundation Blueprint reflection",
      "Up to two relevant advanced layers",
      "Core Recognition",
      "Inner Tension",
      "Existing Resource",
      "Growth Edge",
      "Conscious Choice",
      "Full Personal Integration Summary",
      "Personalised 7-Day Integration Practice",
      "Follow-up Reflection Question",
    ],
    mostRecommended: true,
    cta: CTA,
  },
  deep_blueprint_integration: {
    id: "deep_blueprint_integration",
    title: "Deep Blueprint Integration Session",
    durationMinutes: 75,
    durationLabel: "75 minutes",
    priceAmount: 209,
    priceCents: 20900,
    currency: SESSION_CURRENCY,
    pricingVersion: SESSION_PRICING_VERSION,
    priceDisplay: "USD 209",
    positioning:
      "A deeper integration space for significant life transitions, recurring patterns, or situations involving several interconnected themes. The longer duration is additional space for expression, reflection, and integration — not a more deterministic or exhaustive reading.",
    includes: [
      "Extended Intake and Blueprint review",
      "Foundation reflection",
      "Up to two relevant advanced layers",
      "More time for lived-context exploration",
      "Pattern interaction mapping",
      "Protective Pattern and Growth Edge exploration",
      "Existing Resource",
      "Conscious Choice",
      "Full Personal Integration Summary",
      "Personalised 7-Day Integration Practice",
      "Follow-up direction",
    ],
    mostRecommended: false,
    cta: CTA,
  },
};

/** Required display order on the product page. */
export const SESSION_PRODUCT_ORDER: PersonalIntegrationSessionVariant[] = [
  "blueprint_integration",
  "focused_life_integration",
  "deep_blueprint_integration",
];

export const DEFAULT_SESSION_VARIANT: PersonalIntegrationSessionVariant = "focused_life_integration";

const LEGACY_TO_CANONICAL: Record<LegacySessionVariant, PersonalIntegrationSessionVariant> = {
  intro: "blueprint_integration",
  integration: "focused_life_integration",
  deep: "deep_blueprint_integration",
  "not-sure": "focused_life_integration",
};

export function isBookableSessionVariant(value: string): value is PersonalIntegrationSessionVariant {
  return value in SESSION_CATALOG;
}

export function isLegacySessionVariant(value: string): value is LegacySessionVariant {
  return value in LEGACY_TO_CANONICAL;
}

/** Accepts Launch v1 IDs and pre-launch aliases (for existing rows / in-flight checkouts). */
export function isPersonalIntegrationSessionVariant(
  value: string,
): value is StoredSessionVariant {
  return isBookableSessionVariant(value) || isLegacySessionVariant(value);
}

export function resolveSessionVariant(value: string | null | undefined): PersonalIntegrationSessionVariant | null {
  if (!value) return null;
  if (isBookableSessionVariant(value)) return value;
  if (isLegacySessionVariant(value)) return LEGACY_TO_CANONICAL[value];
  return null;
}

export function getSessionProduct(value: string | null | undefined): SessionProduct | null {
  const resolved = resolveSessionVariant(value);
  return resolved ? SESSION_CATALOG[resolved] : null;
}

/** Display title for UI / email — prefers stored canonical product title. */
export function getSessionVariantLabel(value: string | null | undefined): string {
  const product = getSessionProduct(value);
  if (product) return `${product.title} (${product.durationLabel})`;
  return "Personal Integration Session";
}

export function getSessionTitle(value: string | null | undefined): string {
  return getSessionProduct(value)?.title ?? "Personal Integration Session";
}

export function formatSessionPriceDisplay(product: SessionProduct): string {
  return product.priceDisplay;
}

export function sessionPricingSnapshot(variant: PersonalIntegrationSessionVariant) {
  const product = SESSION_CATALOG[variant];
  return {
    session_type: product.id,
    session_title: product.title,
    duration_minutes: product.durationMinutes,
    price_amount: product.priceAmount,
    currency: product.currency,
    pricing_version: product.pricingVersion,
  };
}

/** Labels map for call sites that still index by variant key (includes legacy aliases). */
export const SESSION_VARIANT_LABELS: Record<StoredSessionVariant, string> = {
  blueprint_integration: getSessionVariantLabel("blueprint_integration"),
  focused_life_integration: getSessionVariantLabel("focused_life_integration"),
  deep_blueprint_integration: getSessionVariantLabel("deep_blueprint_integration"),
  intro: getSessionVariantLabel("intro"),
  deep: getSessionVariantLabel("deep"),
  integration: getSessionVariantLabel("integration"),
  "not-sure": getSessionVariantLabel("not-sure"),
};
