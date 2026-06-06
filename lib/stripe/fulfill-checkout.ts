import { issueMagicLink } from "@/lib/auth/magic-link";
import { grantEntitlement } from "@/lib/db/entitlements";
import { completePurchaseBySessionId } from "@/lib/db/purchases";
import { getUserById } from "@/lib/db/users";
import type Stripe from "stripe";

export async function fulfillCheckoutSession(session: Stripe.Checkout.Session): Promise<{
  userId: string;
  reportId: string;
  magicLinkUrl: string;
} | null> {
  const sessionId = session.id;
  const purchase = await completePurchaseBySessionId(
    sessionId,
    typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id,
  );

  if (!purchase?.report_id) return null;

  await grantEntitlement({
    userId: purchase.user_id,
    reportId: purchase.report_id,
  });

  const user = await getUserById(purchase.user_id);
  if (!user) return null;

  const magic = await issueMagicLink({
    userId: user.id,
    email: user.email,
    reportId: purchase.report_id,
    purpose: "post_purchase",
  });

  return {
    userId: user.id,
    reportId: purchase.report_id,
    magicLinkUrl: magic.url,
  };
}
