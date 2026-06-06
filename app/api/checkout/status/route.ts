import { NextResponse } from "next/server";
import { fulfillCheckoutSession } from "@/lib/stripe/fulfill-checkout";
import { getPurchaseBySessionId } from "@/lib/db/purchases";
import { isDatabaseConfigured } from "@/lib/platform-config";
import { getStripe } from "@/lib/stripe/client";

export async function GET(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not configured." }, { status: 503 });
  }

  const sessionId = new URL(request.url).searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ ok: false, error: "session_id required" }, { status: 400 });
  }

  let purchase = await getPurchaseBySessionId(sessionId);

  if (!purchase || purchase.status !== "completed") {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      if (session.payment_status === "paid") {
        const fulfilled = await fulfillCheckoutSession(session);
        if (fulfilled) {
          purchase = await getPurchaseBySessionId(sessionId);
        }
      }
    } catch {
      // Stripe may be unavailable; fall through to current DB state.
    }
  }

  if (!purchase) {
    return NextResponse.json({ ok: false, status: "pending" });
  }

  return NextResponse.json({
    ok: purchase.status === "completed",
    status: purchase.status,
    reportId: purchase.report_id,
  });
}
