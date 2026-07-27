import { getPlatformSessionById } from "@/lib/db/platform-sessions";
import {
  completePurchaseBySessionId,
  getPurchaseBySessionId,
  setPurchasePlatformSessionId,
} from "@/lib/db/purchases";
import { getBookingScheduleUrl } from "@/lib/booking/scheduling-urls";
import { createPersonalIntegrationRequest } from "@/lib/personal-integration/create-booking-request";
import {
  isPersonalIntegrationSessionVariant,
  resolveSessionVariant,
} from "@/lib/personal-integration/session-variants";
import { BOOKING_PRODUCT } from "@/lib/platform-config";
import { getSiteUrl } from "@/lib/platform-config";
import type Stripe from "stripe";

export type BookingFulfillmentResult = {
  userId: string;
  reportId: string;
  sessionId: string;
  prepUrl: string;
  scheduleUrl: string | null;
};

async function buildBookingResult(
  userId: string,
  reportId: string,
  platformSessionId: string,
  readingType: string,
): Promise<BookingFulfillmentResult | null> {
  const session = await getPlatformSessionById(platformSessionId);
  if (!session?.prep_access_token) return null;

  const prepUrl = `${getSiteUrl()}/integration/prep/${session.id}?token=${session.prep_access_token}`;
  const scheduleUrl = getBookingScheduleUrl(
    isPersonalIntegrationSessionVariant(readingType) ? readingType : "focused_life_integration",
  );

  return {
    userId,
    reportId,
    sessionId: session.id,
    prepUrl,
    scheduleUrl,
  };
}

export async function getBookingFulfillmentForCheckoutSession(
  checkoutSessionId: string,
): Promise<BookingFulfillmentResult | null> {
  const purchase = await getPurchaseBySessionId(checkoutSessionId);
  if (!purchase?.platform_session_id || !purchase.report_id) return null;

  let readingType = "focused_life_integration";
  try {
    const { getStripe } = await import("@/lib/stripe/client");
    const session = await getStripe().checkout.sessions.retrieve(checkoutSessionId);
    readingType = session.metadata?.readingType ?? readingType;
  } catch {
    // Fall back to default schedule URL when Stripe retrieve fails.
  }

  return buildBookingResult(
    purchase.user_id,
    purchase.report_id,
    purchase.platform_session_id,
    readingType,
  );
}

export async function fulfillBookingCheckoutSession(
  session: Stripe.Checkout.Session,
): Promise<BookingFulfillmentResult | null> {
  const checkoutSessionId = session.id;
  const meta = session.metadata ?? {};

  if (meta.product !== BOOKING_PRODUCT) return null;

  let purchase = await getPurchaseBySessionId(checkoutSessionId);
  if (!purchase) return null;

  if (purchase.platform_session_id && purchase.report_id) {
    const readingType = meta.readingType ?? "focused_life_integration";
    return buildBookingResult(purchase.user_id, purchase.report_id, purchase.platform_session_id, readingType);
  }

  if (purchase.status !== "completed") {
    const completed = await completePurchaseBySessionId(
      checkoutSessionId,
      typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id,
    );
    if (!completed) return null;
    purchase = completed;
  }

  if (purchase.platform_session_id && purchase.report_id) {
    const readingType = meta.readingType ?? "focused_life_integration";
    return buildBookingResult(purchase.user_id, purchase.report_id, purchase.platform_session_id, readingType);
  }

  const firstName = meta.firstName?.trim();
  const lastName = meta.lastName?.trim();
  const email = meta.email?.trim();
  const birthDate = meta.birthDate?.trim();
  const readingType = meta.readingType?.trim();
  const message = meta.message?.trim();

  const sessionVariant = readingType ? resolveSessionVariant(readingType) : null;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !birthDate ||
    !sessionVariant ||
    !message ||
    !isPersonalIntegrationSessionVariant(readingType ?? "") ||
    !purchase.report_id
  ) {
    console.error("[fulfillBookingCheckoutSession] missing metadata or report", {
      checkoutSessionId,
      hasReport: Boolean(purchase.report_id),
    });
    return null;
  }

  const result = await createPersonalIntegrationRequest(
    {
      firstName,
      lastName,
      email,
      birthDate,
      readingType: sessionVariant,
      timezone: meta.timezone?.trim() || undefined,
      message,
      code: meta.code?.trim() || undefined,
    },
    {
      requestSource: "booking_checkout",
      paymentStatus: "paid",
      stripeCheckoutSessionId: checkoutSessionId,
    },
  );

  await setPurchasePlatformSessionId(purchase.id, result.sessionId);

  return {
    userId: result.userId,
    reportId: result.reportId,
    sessionId: result.sessionId,
    prepUrl: result.prepUrl,
    scheduleUrl: getBookingScheduleUrl(sessionVariant),
  };
}
