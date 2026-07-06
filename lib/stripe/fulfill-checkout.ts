import { grantEntitlement } from "@/lib/db/entitlements";
import { completePurchaseBySessionId } from "@/lib/db/purchases";
import { getUserById } from "@/lib/db/users";
import { sendPurchaseAccessEmail } from "@/lib/email/send-purchase-access-email";
import { getSiteUrl } from "@/lib/platform-config";
import type Stripe from "stripe";

export async function fulfillCheckoutSession(session: Stripe.Checkout.Session): Promise<{
  userId: string;
  reportId: string;
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

  const siteUrl = getSiteUrl();
  const reportPath = `/my-report/${purchase.report_id}`;
  await sendPurchaseAccessEmail({
    email: user.email,
    reportId: purchase.report_id,
    loginUrl: `${siteUrl}/login?next=${encodeURIComponent(reportPath)}`,
    signupUrl: `${siteUrl}/signup?next=${encodeURIComponent(reportPath)}`,
  });

  return {
    userId: user.id,
    reportId: purchase.report_id,
  };
}
