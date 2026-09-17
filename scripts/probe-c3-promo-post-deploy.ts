/**
 * C-3 post-deploy — observed allow_promotion_codes on Stripe Checkout sessions.
 * Creates a throwaway session via the same switch as production routes, retrieves it,
 * and logs the boolean (not inferable from the hosted Stripe page).
 *
 * Run: npx tsx --env-file=.env.local scripts/probe-c3-promo-post-deploy.ts
 */
import Stripe from "stripe";
import { stripeAllowPromotionCodes } from "../lib/stripe/client";

const TEST012_COMPLETED_SESSION = "cs_live_b1YkgV5X8a7vnu9xc6DrzWzlB9xPQATX1ezqJsszorUNVWk1DbqxSgWxHv";

function resolveStripeKey(): string {
  return (
    process.env.STRIPE_SECRET_KEY_live?.trim() ||
    process.env.STRIPE_SECRET_KEY?.trim() ||
    ""
  );
}

async function main() {
  const key = resolveStripeKey();
  if (!key) {
    console.error("STRIPE_SECRET_KEY missing");
    process.exit(1);
  }

  const envRaw = process.env.STRIPE_ALLOW_PROMOTION_CODES?.trim() ?? "(unset)";
  const switchValue = stripeAllowPromotionCodes();
  const stripe = new Stripe(key);
  const stripeMode = key.startsWith("sk_live") ? "live" : key.startsWith("sk_test") ? "test" : "unknown";

  console.log("=== C-3 promo switch (declared) ===");
  console.log(
    JSON.stringify({
      stripe_mode: stripeMode,
      STRIPE_ALLOW_PROMOTION_CODES: envRaw,
      stripeAllowPromotionCodes: switchValue,
      production_expectation: "false on Vercel Production (restored 2026-09-17 after QA)",
    }),
  );

  const probe = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: 100,
          product_data: { name: "C-3 probe (discard)" },
        },
        quantity: 1,
      },
    ],
    allow_promotion_codes: stripeAllowPromotionCodes(),
    success_url: "https://www.1320soulcode.com/booking?probe=c3",
    cancel_url: "https://www.1320soulcode.com/booking?probe=c3_cancel",
    metadata: { probe: "c3_promo_post_deploy", product: "probe" },
  });

  const retrieved = await stripe.checkout.sessions.retrieve(probe.id);
  const observed = retrieved.allow_promotion_codes === true;

  console.log("\n=== C-3 observed (new probe session) ===");
  console.log(
    JSON.stringify({
      session_id: `${probe.id.slice(0, 18)}…`,
      allow_promotion_codes: retrieved.allow_promotion_codes,
      observed_promo_enabled: observed,
      pass: observed === switchValue && switchValue === false,
    }),
  );

  if (stripeMode === "live") {
    try {
      const eyewitness = await stripe.checkout.sessions.retrieve(TEST012_COMPLETED_SESSION);
      console.log("\n=== C-3 contrast (test012 eyewitness, QA window) ===");
      console.log(
        JSON.stringify({
          session_id: `${TEST012_COMPLETED_SESSION.slice(0, 18)}…`,
          allow_promotion_codes: eyewitness.allow_promotion_codes,
          amount_total: eyewitness.amount_total,
          note: "Created when STRIPE_ALLOW_PROMOTION_CODES was temporarily true for Holly QA",
        }),
      );
    } catch (error) {
      console.log("\n=== C-3 contrast (test012) ===");
      console.log(
        JSON.stringify({
          skipped: true,
          reason: error instanceof Error ? error.message : String(error),
        }),
      );
    }
  }

  if (stripeMode === "live") {
    const list = await stripe.checkout.sessions.list({ limit: 5 });
    console.log("\n=== C-3 observed (latest live checkout sessions) ===");
    for (const session of list.data) {
      console.log(
        JSON.stringify({
          created: new Date((session.created ?? 0) * 1000).toISOString(),
          session_id: `${session.id.slice(0, 18)}…`,
          product: session.metadata?.product ?? null,
          allow_promotion_codes: session.allow_promotion_codes,
          amount_total: session.amount_total,
        }),
      );
    }
  }

  if (probe.status !== "expired") {
    await stripe.checkout.sessions.expire(probe.id);
    console.log("\nProbe session expired (no charge).");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
