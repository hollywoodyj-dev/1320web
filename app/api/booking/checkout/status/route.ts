import { NextResponse } from "next/server";
import { setUserSession } from "@/lib/auth/session";
import { getPurchaseBySessionId } from "@/lib/db/purchases";
import { isDatabaseConfigured } from "@/lib/platform-config";
import { getBookingFulfillmentForCheckoutSession } from "@/lib/stripe/fulfill-booking-checkout";
import type { BookingFulfillmentResult } from "@/lib/stripe/fulfill-booking-checkout";
import { fulfillPaidCheckout } from "@/lib/stripe/fulfill-paid-checkout";
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
  let fulfillment = await getBookingFulfillmentForCheckoutSession(sessionId);

  if (!fulfillment) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      if (session.payment_status === "paid") {
        const result = await fulfillPaidCheckout(session);
        if (result && "prepUrl" in result && "sessionId" in result) {
          fulfillment = result as BookingFulfillmentResult;
          await setUserSession(result.userId);
          purchase = await getPurchaseBySessionId(sessionId);
        }
      }
    } catch (error) {
      console.error("GET /api/booking/checkout/status fulfillment failed:", error);
    }
  }

  if (!purchase) {
    return NextResponse.json({ ok: false, status: "pending" });
  }

  if (purchase.status === "completed") {
    await setUserSession(purchase.user_id);
  }

  if (fulfillment) {
    return NextResponse.json({
      ok: true,
      status: purchase.status,
      sessionId: fulfillment.sessionId,
      prepUrl: fulfillment.prepUrl,
      scheduleUrl: fulfillment.scheduleUrl,
    });
  }

  return NextResponse.json({
    ok: false,
    status: purchase.status === "completed" ? "fulfilling" : "pending",
  });
}
