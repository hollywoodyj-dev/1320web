import { getSql } from "@/lib/db/client";
import type { PurchaseRow } from "@/lib/db/types";

export async function createPendingPurchase(input: {
  userId: string;
  reportId: string;
  stripeCheckoutSessionId: string;
  amountCents: number;
  currency?: string;
}): Promise<PurchaseRow> {
  const db = getSql();
  const rows = await db<PurchaseRow[]>`
    INSERT INTO purchases (
      user_id,
      report_id,
      stripe_checkout_session_id,
      amount_cents,
      currency,
      status
    )
    VALUES (
      ${input.userId},
      ${input.reportId},
      ${input.stripeCheckoutSessionId},
      ${input.amountCents},
      ${input.currency ?? "usd"},
      'pending'
    )
    RETURNING id, user_id, report_id, stripe_checkout_session_id, status
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
    RETURNING id, user_id, report_id, stripe_checkout_session_id, status
  `;
  return rows[0] ?? null;
}

export async function getPurchaseBySessionId(sessionId: string): Promise<PurchaseRow | null> {
  const db = getSql();
  const rows = await db<PurchaseRow[]>`
    SELECT id, user_id, report_id, stripe_checkout_session_id, status
    FROM purchases
    WHERE stripe_checkout_session_id = ${sessionId}
    LIMIT 1
  `;
  return rows[0] ?? null;
}
