/**
 * One-shot: report Stripe Price currency for Session products (no charge).
 * Run: npx tsx scripts/report-booking-stripe-price-currency.ts
 */
import fs from "node:fs";
import path from "node:path";
import { SESSION_PRODUCT_ORDER } from "../lib/personal-integration/session-catalog";
import { getBookingPriceId, getBookingAmountCents } from "../lib/stripe/booking-client";
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
  for (const id of SESSION_PRODUCT_ORDER) {
    const priceId = getBookingPriceId(id);
    const expected = getBookingAmountCents(id);
    if (!priceId) {
      console.log(`${id}: price_data path · expected_cents=${expected} · currency=usd`);
      continue;
    }
    const price = await stripe.prices.retrieve(priceId);
    console.log(
      `${id}: price=${priceId} unit_amount=${price.unit_amount} currency=${price.currency} expected_cents=${expected}`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
