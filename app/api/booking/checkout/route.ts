import { NextResponse } from "next/server";
import { getAccountContext } from "@/lib/auth/account-context";
import { ensureSoulReportForUserBirthDate } from "@/lib/db/ensure-soul-report";
import { createPendingPurchase } from "@/lib/db/purchases";
import { upsertUserByEmailDetectCreate } from "@/lib/db/users";
import { parseBirthDateString } from "@/lib/personal-integration/parse-birth-date";
import {
  isBookableSessionVariant,
  resolveSessionVariant,
  sessionPricingSnapshot,
  SESSION_CURRENCY_STRIPE,
} from "@/lib/personal-integration/session-variants";
import {
  BOOKING_PRODUCT,
  getSiteUrl,
  isBookingCheckoutConfigured,
} from "@/lib/platform-config";
import { getBookingAmountCents, resolveBookingLineItems } from "@/lib/stripe/booking-client";
import { getStripe } from "@/lib/stripe/client";
import { recordAccountSignupIfCreated } from "@/lib/funnel/record-account-signup";

type BookingCheckoutBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  birthDate?: string;
  code?: string;
  readingType?: string;
  timezone?: string;
  message?: string;
};

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function truncateMetadata(value: string, max = 500): string {
  const trimmed = value.trim();
  if (trimmed.length <= max) return trimmed;
  return trimmed.slice(0, max);
}

/** Model B — pay first via Stripe, then schedule on success page. */
export async function POST(request: Request) {
  if (!isBookingCheckoutConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error: "Booking checkout is not configured yet. Set POSTGRES_URL and Stripe env vars.",
      },
      { status: 503 },
    );
  }

  let body: BookingCheckoutBody;
  try {
    body = (await request.json()) as BookingCheckoutBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const account = await getAccountContext();
  const firstName = account?.user.first_name?.trim() || body.firstName?.trim();
  const lastName = account?.user.last_name?.trim() || body.lastName?.trim();
  const email = account?.user.email || body.email?.trim();
  const birthDate = account?.birthDate || body.birthDate?.trim();
  const readingType = body.readingType?.trim();
  const message = body.message?.trim();

  if (!firstName || !lastName || !isValidEmail(email) || !birthDate || !readingType || !message) {
    return NextResponse.json(
      {
        ok: false,
        error: account
          ? "Complete your session details below."
          : "Sign in or complete all profile fields to book.",
      },
      { status: 400 },
    );
  }

  const sessionVariant = resolveSessionVariant(readingType);
  if (!sessionVariant || !isBookableSessionVariant(sessionVariant)) {
    return NextResponse.json({ ok: false, error: "Invalid session type." }, { status: 400 });
  }

  const birth = parseBirthDateString(birthDate);
  if (!birth) {
    return NextResponse.json({ ok: false, error: "Invalid birth date." }, { status: 400 });
  }

  try {
    const { user, created } = await upsertUserByEmailDetectCreate(email, firstName);
    await recordAccountSignupIfCreated({
      created,
      userId: user.id,
      path: "/booking",
      entry: "booking_checkout_upsert",
    });
    const report = await ensureSoulReportForUserBirthDate({
      userId: user.id,
      birthDate: birth.isoDate,
    });

    const stripe = getStripe();
    const siteUrl = getSiteUrl();
    const pricing = sessionPricingSnapshot(sessionVariant);
    const amountCents = getBookingAmountCents(sessionVariant);
    const code = body.code?.trim() || account?.codeString || "";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: await resolveBookingLineItems(sessionVariant, stripe),
      allow_promotion_codes: true,
      success_url: `${siteUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/booking?cancelled=1`,
      metadata: {
        product: BOOKING_PRODUCT,
        userId: user.id,
        reportId: report.id,
        firstName,
        lastName,
        email,
        birthDate: birth.isoDate,
        readingType: sessionVariant,
        session_type: pricing.session_type,
        session_title: pricing.session_title,
        duration_minutes: String(pricing.duration_minutes),
        price_amount: String(pricing.price_amount),
        currency: pricing.currency,
        pricing_version: pricing.pricing_version,
        timezone: body.timezone?.trim() || "",
        message: truncateMetadata(message),
        code: truncateMetadata(code, 120),
      },
    });

    if (!session.url) {
      return NextResponse.json({ ok: false, error: "Stripe session missing URL." }, { status: 502 });
    }

    await createPendingPurchase({
      userId: user.id,
      reportId: report.id,
      stripeCheckoutSessionId: session.id,
      amountCents,
      currency: SESSION_CURRENCY_STRIPE,
      product: BOOKING_PRODUCT,
    });

    return NextResponse.json({ ok: true, url: session.url, sessionId: session.id });
  } catch (error) {
    const messageText =
      error instanceof Error ? error.message : "Booking checkout could not be started. Please try again.";
    console.error("POST /api/booking/checkout failed:", error);
    return NextResponse.json({ ok: false, error: messageText }, { status: 500 });
  }
}
