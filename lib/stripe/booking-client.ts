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

  return bookingPriceDataLineItems(variant);
}

function bookingPriceDataLineItems(
  variant: PersonalIntegrationSessionVariant,
): Stripe.Checkout.SessionCreateParams.LineItem[] {
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

/**
 * Prefer configured Price IDs only when they match Launch v1 USD amounts.
 * Otherwise fall back to price_data so Checkout cannot silently charge AUD/other currencies.
 */
export async function resolveBookingLineItems(
  variant: PersonalIntegrationSessionVariant,
  stripe: Stripe,
): Promise<Stripe.Checkout.SessionCreateParams.LineItem[]> {
  const priceId = getBookingPriceId(variant);
  if (!priceId) return bookingPriceDataLineItems(variant);

  const expectedCents = getBookingAmountCents(variant);
  try {
    const price = await stripe.prices.retrieve(priceId);
    if (
      price.active !== false &&
      price.currency === SESSION_CURRENCY_STRIPE &&
      price.unit_amount === expectedCents
    ) {
      return [{ price: priceId, quantity: 1 }];
    }
    console.warn(
      `[booking] Price ${priceId} rejected for ${variant}: currency=${price.currency} unit_amount=${price.unit_amount} expected=${SESSION_CURRENCY_STRIPE}/${expectedCents}; using price_data`,
    );
  } catch (error) {
    console.warn(`[booking] Price ${priceId} retrieve failed for ${variant}; using price_data`, error);
  }

  return bookingPriceDataLineItems(variant);
}
