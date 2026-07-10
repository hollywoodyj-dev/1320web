import { getSql } from "@/lib/db/client";
import type { PurchaseRow } from "@/lib/db/types";
import { BOOKING_PRODUCT, FULL_REPORT_PRODUCT } from "@/lib/platform-config";

const PURCHASE_COLUMNS = "id, user_id, report_id, stripe_checkout_session_id, product, platform_session_id, status";

export async function createPendingPurchase(input: {
  userId: string;
  reportId: string;
  stripeCheckoutSessionId: string;
  amountCents: number;
  currency?: string;
  product?: typeof FULL_REPORT_PRODUCT | typeof BOOKING_PRODUCT;
}): Promise<PurchaseRow> {
  const db = getSql();
  const rows = await db<PurchaseRow[]>`
    INSERT INTO purchases (
      user_id,
      report_id,
      stripe_checkout_session_id,
      amount_cents,
      currency,
      product,
      status
    )
    VALUES (
      ${input.userId},
      ${input.reportId},
      ${input.stripeCheckoutSessionId},
      ${input.amountCents},
      ${input.currency ?? "usd"},
      ${input.product ?? FULL_REPORT_PRODUCT},
      'pending'
    )
    RETURNING ${db.unsafe(PURCHASE_COLUMNS)}
  `;
  return rows[0];
}

export async function completePurchaseBySessionId(
  sessionId: string,
  paymentIntentId?: string | null,
): Promise<PurchaseRow | null> {
  const db = getSql();
  const rows = await db<PurchaseRow[]>`
    UPDATE purchases
    SET
      status = 'completed',
      stripe_payment_intent_id = COALESCE(${paymentIntentId ?? null}, stripe_payment_intent_id),
      completed_at = NOW()
    WHERE stripe_checkout_session_id = ${sessionId}
    RETURNING ${db.unsafe(PURCHASE_COLUMNS)}
  `;
  return rows[0] ?? null;
}

export async function setPurchasePlatformSessionId(
  purchaseId: string,
  platformSessionId: string,
): Promise<PurchaseRow | null> {
  const db = getSql();
  const rows = await db<PurchaseRow[]>`
    UPDATE purchases
    SET platform_session_id = ${platformSessionId}
    WHERE id = ${purchaseId}
    RETURNING ${db.unsafe(PURCHASE_COLUMNS)}
  `;
  return rows[0] ?? null;
}

export async function getPurchaseBySessionId(sessionId: string): Promise<PurchaseRow | null> {
  const db = getSql();
  const rows = await db<PurchaseRow[]>`
    SELECT ${db.unsafe(PURCHASE_COLUMNS)}
    FROM purchases
    WHERE stripe_checkout_session_id = ${sessionId}
    LIMIT 1
  `;
  return rows[0] ?? null;
}
