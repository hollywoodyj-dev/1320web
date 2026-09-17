import { recordConversionEvent } from "@/lib/record-conversion-event";
import {
  isPersonalIntegrationSessionVariant,
  SESSION_CATALOG,
} from "@/lib/personal-integration/session-variants";
import { attributionFromSessionMetadata } from "@/lib/funnel/stripe-session-attribution";
import type { ReportPurchaseStatus } from "@/lib/funnel/resolve-report-purchase-status";
import type Stripe from "stripe";

function bookingMetadataFromSession(
  session: Stripe.Checkout.Session,
  reportPurchaseStatus: ReportPurchaseStatus,
): Record<string, string | number | boolean | undefined> {
  const meta = session.metadata ?? {};
  const readingType = meta.readingType?.trim() ?? "";
  const catalog = isPersonalIntegrationSessionVariant(readingType)
    ? SESSION_CATALOG[readingType as keyof typeof SESSION_CATALOG]
    : null;
  const attr = attributionFromSessionMetadata(meta);

  return {
    session_type: meta.session_type ?? readingType,
    duration: meta.duration_minutes ?? catalog?.durationMinutes,
    amount: meta.price_amount ? Number(meta.price_amount) : catalog?.priceAmount,
    currency: (meta.currency ?? catalog?.currency ?? "USD").toUpperCase(),
    source_page: meta.source_page ?? undefined,
    referrer_into_booking: meta.referrer_into_booking ?? undefined,
    first_touch_source: attr.source,
    first_touch_campaign: attr.campaign,
    report_purchase_status: reportPurchaseStatus,
    product: meta.product,
    stripe_checkout_session_id: session.id,
    ...attr.meta,
  };
}

export async function recordBookingStartedEvent(input: {
  session: Stripe.Checkout.Session;
  userId: string;
  reportPurchaseStatus: ReportPurchaseStatus;
}): Promise<void> {
  const attr = attributionFromSessionMetadata(input.session.metadata);
  await recordConversionEvent({
    eventName: "booking_started",
    userId: input.userId,
    sessionId: input.session.id,
    source: attr.source ?? null,
    platform: "stripe",
    path: "/booking",
    metadata: {
      funnel_step: 3,
      ...bookingMetadataFromSession(input.session, input.reportPurchaseStatus),
    },
  });
}

export async function recordBookingCompletedEvent(input: {
  session: Stripe.Checkout.Session;
  userId: string;
  reportPurchaseStatus: ReportPurchaseStatus;
}): Promise<void> {
  const amountTotal = input.session.amount_total;
  const attr = attributionFromSessionMetadata(input.session.metadata);
  const base = bookingMetadataFromSession(input.session, input.reportPurchaseStatus);

  await recordConversionEvent({
    eventName: "booking_completed",
    userId: input.userId,
    sessionId: input.session.id,
    source: attr.source ?? null,
    platform: "stripe",
    path: "/booking/success",
    metadata: {
      funnel_step: 4,
      ...base,
      amount: amountTotal != null ? amountTotal / 100 : base.amount,
      amount_cents: amountTotal ?? undefined,
    },
  });
}
