/**
 * Creates (then expires) Stripe Checkout Sessions for each Launch v1 product.
 * Verifies currency AUD and unit amounts — does not complete payment.
 * Run: npx tsx scripts/verify-booking-checkout-pricing.ts
 */
import fs from "node:fs";
import path from "node:path";
import {
  SESSION_CATALOG,
  SESSION_PRODUCT_ORDER,
} from "../lib/personal-integration/session-catalog";
import { getBookingLineItems, getBookingAmountCents } from "../lib/stripe/booking-client";
import { getStripe } from "../lib/stripe/client";

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx <= 0) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

async function main() {
  loadEnvLocal();
  const stripe = getStripe();
  const key = process.env.STRIPE_SECRET_KEY?.trim() ?? "";
  if (!key.startsWith("sk_test_")) {
    console.error("Refusing to run: STRIPE_SECRET_KEY is not sk_test_");
    process.exit(1);
  }

  for (const id of SESSION_PRODUCT_ORDER) {
    const product = SESSION_CATALOG[id];
    const amountCents = getBookingAmountCents(id);
    const lineItems = getBookingLineItems(id);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: "pricing-verify@example.com",
      line_items: lineItems,
      success_url: "http://localhost:3000/booking/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/booking?cancelled=1",
      metadata: {
        product: "personal_integration",
        readingType: id,
        pricing_version: product.pricingVersion,
        verify_only: "1",
      },
    });

    const line = session.amount_total;
    console.log(
      `${id}: checkout=${session.id} amount_total=${line} expected=${amountCents} currency=${session.currency} url=${Boolean(session.url)}`,
    );

    if (session.currency !== "aud") {
      throw new Error(`${id}: expected currency aud, got ${session.currency}`);
    }
    if (line !== amountCents) {
      throw new Error(`${id}: expected amount ${amountCents}, got ${line}`);
    }

    await stripe.checkout.sessions.expire(session.id);
  }

  console.log("Checkout pricing verification PASS (sessions expired).");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
