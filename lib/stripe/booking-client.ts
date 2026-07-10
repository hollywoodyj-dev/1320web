import type Stripe from "stripe";
import { SESSION_VARIANT_LABELS } from "@/lib/personal-integration/session-variants";
import type { PersonalIntegrationSessionVariant } from "@/lib/personal-integration/types";

const DEFAULT_AMOUNTS_CENTS: Record<PersonalIntegrationSessionVariant, number> = {
  intro: 15000,
  deep: 25000,
  integration: 20000,
  "not-sure": 15000,
};

const AMOUNT_ENV_KEYS: Record<PersonalIntegrationSessionVariant, string> = {
  intro: "STRIPE_BOOKING_INTRO_AMOUNT_CENTS",
  deep: "STRIPE_BOOKING_DEEP_AMOUNT_CENTS",
  integration: "STRIPE_BOOKING_INTEGRATION_AMOUNT_CENTS",
  "not-sure": "STRIPE_BOOKING_DEFAULT_AMOUNT_CENTS",
};

const PRICE_ENV_KEYS: Record<PersonalIntegrationSessionVariant, string> = {
  intro: "STRIPE_BOOKING_INTRO_PRICE_ID",
  deep: "STRIPE_BOOKING_DEEP_PRICE_ID",
  integration: "STRIPE_BOOKING_INTEGRATION_PRICE_ID",
  "not-sure": "STRIPE_BOOKING_DEFAULT_PRICE_ID",
};

function parsePositiveCents(raw: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(raw ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function getBookingAmountCents(variant: PersonalIntegrationSessionVariant): number {
  const key = AMOUNT_ENV_KEYS[variant];
  return parsePositiveCents(process.env[key], DEFAULT_AMOUNTS_CENTS[variant]);
}

/** Stripe Checkout needs a Price ID (`price_...`), not a Product ID (`prod_...`). */
export function getBookingPriceId(variant: PersonalIntegrationSessionVariant): string | null {
  const raw = process.env[PRICE_ENV_KEYS[variant]]?.trim();
  if (!raw) return null;
  if (raw.startsWith("price_")) return raw;
  return null;
}

export function getBookingLineItems(
  variant: PersonalIntegrationSessionVariant,
): Stripe.Checkout.SessionCreateParams.LineItem[] {
  const priceId = getBookingPriceId(variant);
  if (priceId) {
    return [{ price: priceId, quantity: 1 }];
  }

  const label = SESSION_VARIANT_LABELS[variant];
  const amountCents = getBookingAmountCents(variant);

  return [
    {
      price_data: {
        currency: "usd",
        unit_amount: amountCents,
        product_data: {
          name: `1320 ${label}`,
          description:
            "Personal Integration Session — symbolic reflection and integration support (1:1).",
        },
      },
      quantity: 1,
    },
  ];
}
