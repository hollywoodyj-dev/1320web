import { NextResponse } from "next/server";
import { calculate1320Code } from "@/lib/calculate1320Code";
import { createPendingPurchase } from "@/lib/db/purchases";
import { createSoulReport } from "@/lib/db/reports";
import { upsertUserByEmailDetectCreate } from "@/lib/db/users";
import { get1320Content } from "@/lib/get1320Content";
import { getSiteUrl, isDatabaseConfigured, isStripeConfigured } from "@/lib/platform-config";
import { attributionToCheckoutMetadata } from "@/lib/funnel/attribution";
import { recordAccountSignupIfCreated } from "@/lib/funnel/record-account-signup";
import { getFullReportAmountCents, getFullReportLineItems, getStripe } from "@/lib/stripe/client";
import { isValidBirthDate } from "@/lib/validateBirthDate";

type CheckoutBody = {
  email?: string;
  firstName?: string;
  year?: number;
  month?: number;
  day?: number;
  attribution?: Record<string, string>;
};

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured() || !isStripeConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Checkout is not configured yet. Set POSTGRES_URL and Stripe env vars." },
      { status: 503 },
    );
  }

  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const email = body.email?.trim();
  const year = Number(body.year);
  const month = Number(body.month);
  const day = Number(body.day);

  if (!isValidEmail(email) || !isValidBirthDate(year, month, day)) {
    return NextResponse.json(
      { ok: false, error: "Valid email and birth date are required." },
      { status: 400 },
    );
  }

  try {
    const code = calculate1320Code(year, month, day);
    const birthDateLabel = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const content = get1320Content(
      { s1: code.s1, s3: code.s3Raw, s2: code.s2, s0: code.s0, locale: "en" },
      { birthDate: birthDateLabel, reportTier: "full" },
    );

    const { user, created } = await upsertUserByEmailDetectCreate(email, body.firstName?.trim());
    const report = await createSoulReport({
      userId: user.id,
      birthYear: year,
      birthMonth: month,
      birthDay: day,
      code,
      combinationSignature: content.combinationSignature,
    });

    const stripe = getStripe();
    const siteUrl = getSiteUrl();
    const amountCents = getFullReportAmountCents();
    const attribution = attributionToCheckoutMetadata(body.attribution);
    await recordAccountSignupIfCreated({
      created,
      userId: user.id,
      path: "/checkout",
      entry: "checkout_upsert",
      source: attribution.utm_source ?? null,
      metadata: {
        utm_source: attribution.utm_source,
        utm_medium: attribution.utm_medium,
        utm_campaign: attribution.utm_campaign,
        landingPath: attribution.landingPath,
      },
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: getFullReportLineItems(),
      allow_promotion_codes: true,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout?cancelled=1`,
      metadata: {
        userId: user.id,
        reportId: report.id,
        combinationSignature: content.combinationSignature,
        birthDate: birthDateLabel,
        product: "full_report",
        pricing_version: "full-report-v1",
        ...attribution,
      },
      payment_intent_data: Object.keys(attribution).length
        ? { metadata: attribution }
        : undefined,
    });

    if (!session.url) {
      return NextResponse.json({ ok: false, error: "Stripe session missing URL." }, { status: 502 });
    }

    await createPendingPurchase({
      userId: user.id,
      reportId: report.id,
      stripeCheckoutSessionId: session.id,
      amountCents,
    });

    return NextResponse.json({ ok: true, url: session.url, sessionId: session.id });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Checkout could not be started. Please try again.";
    console.error("POST /api/checkout failed:", error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
