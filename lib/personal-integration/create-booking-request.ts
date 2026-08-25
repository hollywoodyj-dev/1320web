/**
 * FS-006 — Personal Integration Session request + prep orchestration.
 */

import type { LeadPayload } from "@/lib/analytics";
import { ensureSoulReportForUserBirthDate } from "@/lib/db/ensure-soul-report";
import { insertLead } from "@/lib/db/leads";
import { createPlatformSession, mergePlatformSessionMeta } from "@/lib/db/platform-sessions";
import { createReflection } from "@/lib/db/reflections";
import { upsertUserByEmailDetectCreate } from "@/lib/db/users";
import { sendPrepLinkEmail } from "@/lib/email/send-prep-link";
import { getSiteUrl } from "@/lib/platform-config";
import { parseBirthDateString } from "@/lib/personal-integration/parse-birth-date";
import { recordAccountSignupIfCreated } from "@/lib/funnel/record-account-signup";
import {
  getSessionVariantLabel,
  sessionPricingSnapshot,
} from "@/lib/personal-integration/session-variants";
import type { PersonalIntegrationSessionVariant } from "@/lib/personal-integration/types";

export type PersonalIntegrationRequestInput = {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  readingType: PersonalIntegrationSessionVariant;
  timezone?: string;
  message: string;
  code?: string;
};

export type PersonalIntegrationRequestOptions = {
  requestSource?: string;
  paymentStatus?: "paid" | "pending";
  stripeCheckoutSessionId?: string;
};

export type PersonalIntegrationRequestResult = {
  userId: string;
  reportId: string;
  sessionId: string;
  prepAccessToken: string;
  prepUrl: string;
};

function truncateGrowthEdge(message: string, max = 280): string {
  const trimmed = message.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1)}…`;
}

export async function createPersonalIntegrationRequest(
  input: PersonalIntegrationRequestInput,
  options?: PersonalIntegrationRequestOptions,
): Promise<PersonalIntegrationRequestResult> {
  const birth = parseBirthDateString(input.birthDate);
  if (!birth) {
    throw new Error("Invalid birth date.");
  }

  const { user, created } = await upsertUserByEmailDetectCreate(input.email, input.firstName);
  await recordAccountSignupIfCreated({
    created,
    userId: user.id,
    path: "/booking",
    entry: "booking_request_upsert",
  });
  const report = await ensureSoulReportForUserBirthDate({
    userId: user.id,
    birthDate: birth.isoDate,
  });

  const growthEdge = truncateGrowthEdge(input.message);
  const pricing = sessionPricingSnapshot(input.readingType);
  const session = await createPlatformSession({
    userId: user.id,
    reportId: report.id,
    kind: "personal_integration",
    status: "scheduled",
    growthEdge,
    sessionVariant: pricing.session_type,
    sessionTitle: pricing.session_title,
    durationMinutes: pricing.duration_minutes,
    priceAmount: pricing.price_amount,
    currency: pricing.currency,
    pricingVersion: pricing.pricing_version,
    authorship: "system",
    meta: {
      timezone: input.timezone ?? null,
      clientName: `${input.firstName} ${input.lastName}`.trim(),
      codeProvided: input.code ?? null,
      requestSource: options?.requestSource ?? "booking_form",
      paymentStatus: options?.paymentStatus ?? null,
      stripeCheckoutSessionId: options?.stripeCheckoutSessionId ?? null,
      schedulingStatus: options?.paymentStatus === "paid" ? "awaiting_selection" : null,
      session_type: pricing.session_type,
      session_title: pricing.session_title,
      duration_minutes: pricing.duration_minutes,
      price_amount: pricing.price_amount,
      currency: pricing.currency,
      pricing_version: pricing.pricing_version,
    },
  });

  if (!session.prep_access_token) {
    throw new Error("Session prep token missing.");
  }

  await createReflection({
    userId: user.id,
    reportId: report.id,
    kind: "session_note",
    body: input.message.trim(),
    sourcePlatformSessionId: session.id,
    authorship: "user",
  });

  const leadPayload: LeadPayload = {
    type: "booking",
    source: "booking_form",
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
    birthDate: birth.isoDate,
    readingType: input.readingType,
    timezone: input.timezone,
    message: input.message,
    code: input.code,
    platformSessionId: session.id,
  };

  await insertLead({ ...leadPayload, receivedAt: new Date().toISOString() });

  const prepUrl = `${getSiteUrl()}/integration/prep/${session.id}?token=${session.prep_access_token}`;

  const variantLabel = getSessionVariantLabel(input.readingType);
  const { sent: prepEmailSent } = await sendPrepLinkEmail({
    email: input.email,
    clientName: `${input.firstName} ${input.lastName}`.trim(),
    prepUrl,
    sessionVariantLabel: variantLabel,
  });
  if (prepEmailSent) {
    await mergePlatformSessionMeta(session.id, { prepEmailSentAt: new Date().toISOString() });
  }

  return {
    userId: user.id,
    reportId: report.id,
    sessionId: session.id,
    prepAccessToken: session.prep_access_token,
    prepUrl,
  };
}
