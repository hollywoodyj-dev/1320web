export {
  SESSION_VARIANT_LABELS,
  isPersonalIntegrationSessionVariant,
  isBookableSessionVariant,
  resolveSessionVariant,
  getSessionVariantLabel,
  getSessionTitle,
  getSessionProduct,
  SESSION_CATALOG,
  SESSION_PRODUCT_ORDER,
  DEFAULT_SESSION_VARIANT,
  SESSION_PRICING_VERSION,
  SESSION_CURRENCY,
  SESSION_CURRENCY_STRIPE,
  sessionPricingSnapshot,
} from "@/lib/personal-integration/session-catalog";

export type {
  PersonalIntegrationSessionVariant,
  LegacySessionVariant,
  StoredSessionVariant,
  SessionProduct,
} from "@/lib/personal-integration/session-catalog";
