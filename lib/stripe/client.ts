import Stripe from "stripe";
import { isStripeConfigured } from "@/lib/platform-config";

let stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!isStripeConfigured()) {
    throw new Error("Stripe is not configured.");
  }
  if (!stripe) {
    const key = process.env.STRIPE_SECRET_KEY?.trim();
    if (!key) throw new Error("STRIPE_SECRET_KEY missing.");
    stripe = new Stripe(key);
  }
  return stripe;
}

export function getFullReportAmountCents(): number {
  const fromEnv = Number.parseInt(process.env.STRIPE_FULL_REPORT_AMOUNT_CENTS ?? "4900", 10);
  return Number.isFinite(fromEnv) && fromEnv > 0 ? fromEnv : 4900;
}

/** Stripe Checkout needs a Price ID (`price_...`), not a Product ID (`prod_...`). */
export function getFullReportPriceId(): string | null {
  const raw = process.env.STRIPE_FULL_REPORT_PRICE_ID?.trim();
  if (!raw) return null;
  if (raw.startsWith("price_")) return raw;
  return null;
}

export function getFullReportLineItems(): Stripe.Checkout.SessionCreateParams.LineItem[] {
  const priceId = getFullReportPriceId();
  if (priceId) {
    return [{ price: priceId, quantity: 1 }];
  }

  const amountCents = getFullReportAmountCents();
  return [
    {
      price_data: {
        currency: "usd",
        unit_amount: amountCents,
        product_data: {
          name: "1320 Full Soul Origin Report",
          description: "One-time unlock — in-browser Full Report with return access via magic link.",
        },
      },
      quantity: 1,
    },
  ];
}

