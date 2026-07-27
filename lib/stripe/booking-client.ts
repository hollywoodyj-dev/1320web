import type Stripe from "stripe";
import {
  SESSION_CATALOG,
  SESSION_CURRENCY_STRIPE,
  type PersonalIntegrationSessionVariant,
} from "@/lib/personal-integration/session-catalog";

const AMOUNT_ENV_KEYS: Record<PersonalIntegrationSessionVariant, string> = {
  blueprint_integration: "STRIPE_BOOKING_BLUEPRINT_INTEGRATION_AMOUNT_CENTS",
  focused_life_integration: "STRIPE_BOOKING_FOCUSED_LIFE_AMOUNT_CENTS",
  deep_blueprint_integration: "STRIPE_BOOKING_DEEP_BLUEPRINT_AMOUNT_CENTS",
};

/** Pre-launch env aliases (optional fallback). */
const LEGACY_AMOUNT_ENV_KEYS: Partial<Record<PersonalIntegrationSessionVariant, string[]>> = {
  blueprint_integration: ["STRIPE_BOOKING_INTRO_AMOUNT_CENTS"],
  focused_life_integration: ["STRIPE_BOOKING_INTEGRATION_AMOUNT_CENTS", "STRIPE_BOOKING_DEFAULT_AMOUNT_CENTS"],
  deep_blueprint_integration: ["STRIPE_BOOKING_DEEP_AMOUNT_CENTS"],
};

const PRICE_ENV_KEYS: Record<PersonalIntegrationSessionVariant, string> = {
  blueprint_integration: "STRIPE_BOOKING_BLUEPRINT_INTEGRATION_PRICE_ID",
  focused_life_integration: "STRIPE_BOOKING_FOCUSED_LIFE_PRICE_ID",
  deep_blueprint_integration: "STRIPE_BOOKING_DEEP_BLUEPRINT_PRICE_ID",
};

const LEGACY_PRICE_ENV_KEYS: Partial<Record<PersonalIntegrationSessionVariant, string[]>> = {
  blueprint_integration: ["STRIPE_BOOKING_INTRO_PRICE_ID"],
  focused_life_integration: ["STRIPE_BOOKING_INTEGRATION_PRICE_ID", "STRIPE_BOOKING_DEFAULT_PRICE_ID"],
  deep_blueprint_integration: ["STRIPE_BOOKING_DEEP_PRICE_ID"],
};

function parsePositiveCents(raw: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(raw ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function readEnvCents(keys: string[], fallback: number): number {
  for (const key of keys) {
    const raw = process.env[key]?.trim();
    if (raw) return parsePositiveCents(raw, fallback);
  }
  return fallback;
}

export function getBookingAmountCents(variant: PersonalIntegrationSessionVariant): number {
  const product = SESSION_CATALOG[variant];
  const keys = [AMOUNT_ENV_KEYS[variant], ...(LEGACY_AMOUNT_ENV_KEYS[variant] ?? [])];
  return readEnvCents(keys, product.priceCents);
}

/** Stripe Checkout needs a Price ID (`price_...`), not a Product ID (`prod_...`). */
export function getBookingPriceId(variant: PersonalIntegrationSessionVariant): string | null {
  const keys = [PRICE_ENV_KEYS[variant], ...(LEGACY_PRICE_ENV_KEYS[variant] ?? [])];
  for (const key of keys) {
    const raw = process.env[key]?.trim();
    if (raw?.startsWith("price_")) return raw;
  }
  return null;
}

export function getBookingLineItems(
  variant: PersonalIntegrationSessionVariant,
): Stripe.Checkout.SessionCreateParams.LineItem[] {
  const priceId = getBookingPriceId(variant);
  if (priceId) {
    return [{ price: priceId, quantity: 1 }];
  }

  const product = SESSION_CATALOG[variant];
  const amountCents = getBookingAmountCents(variant);

  return [
    {
      price_data: {
        currency: SESSION_CURRENCY_STRIPE,
        unit_amount: amountCents,
        product_data: {
          name: `1320 ${product.title}`,
          description:
            "Personal Integration Session — guided reflection and personal integration support (1:1). Non-diagnostic, non-predictive, not therapy.",
        },
      },
      quantity: 1,
    },
  ];
}
