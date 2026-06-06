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
