import { ensureSoulReportForUserBirthDate } from "@/lib/db/ensure-soul-report";
import { ensureExpressionProfile } from "@/lib/db/expression-profiles";
import { createPlatformSession, mergePlatformSessionMeta } from "@/lib/db/platform-sessions";
import { getSoulReportById } from "@/lib/db/reports";
import { upsertUserByEmail } from "@/lib/db/users";
import { getSiteUrl } from "@/lib/platform-config";
import { parseBirthDateString } from "@/lib/personal-integration/parse-birth-date";

export type CreateWisewaveSessionInput = {
  email: string;
  firstName?: string;
  birthDate: string;
  openingMessage?: string;
};

export type CreateWisewaveSessionResult = {
  sessionId: string;
  accessToken: string;
  chatUrl: string;
  reportId: string;
};

export async function createWisewaveSession(
  input: CreateWisewaveSessionInput,
): Promise<CreateWisewaveSessionResult> {
  const birth = parseBirthDateString(input.birthDate);
  if (!birth) throw new Error("Invalid birth date.");

  const user = await upsertUserByEmail(input.email, input.firstName?.trim());
  const report = await ensureSoulReportForUserBirthDate({
    userId: user.id,
    birthDate: birth.isoDate,
  });

  await ensureExpressionProfile({ userId: user.id, reportId: report.id });

  const clientName = input.firstName?.trim() || user.first_name || "Friend";
  const session = await createPlatformSession({
    userId: user.id,
    reportId: report.id,
    kind: "wisewave",
    status: "active",
    growthEdge: input.openingMessage?.trim() || null,
    authorship: "system",
    meta: {
      clientName,
      requestSource: "reflect_entry",
    },
  });

  if (!session.prep_access_token) {
    throw new Error("Wisewave session access token missing.");
  }

  if (input.openingMessage?.trim()) {
    await mergePlatformSessionMeta(session.id, {
      openingMessage: input.openingMessage.trim(),
    });
  }

  const chatUrl = `${getSiteUrl()}/reflect/${session.id}?token=${session.prep_access_token}`;

  return {
    sessionId: session.id,
    accessToken: session.prep_access_token,
    chatUrl,
    reportId: report.id,
  };
}

export async function createWisewaveSessionForUser(input: {
  userId: string;
  reportId: string;
  clientName: string;
  openingMessage: string;
}): Promise<CreateWisewaveSessionResult> {
  const report = await getSoulReportById(input.reportId);
  if (!report || report.user_id !== input.userId) {
    throw new Error("Report not found for user.");
  }

  await ensureExpressionProfile({ userId: input.userId, reportId: input.reportId });

  const session = await createPlatformSession({
    userId: input.userId,
    reportId: input.reportId,
    kind: "wisewave",
    status: "active",
    growthEdge: input.openingMessage.trim() || null,
    authorship: "system",
    meta: {
      clientName: input.clientName,
      requestSource: "account_reflect",
    },
  });

  if (!session.prep_access_token) {
    throw new Error("Wisewave session access token missing.");
  }

  await mergePlatformSessionMeta(session.id, {
    openingMessage: input.openingMessage.trim(),
  });

  const chatUrl = `${getSiteUrl()}/reflect/${session.id}?token=${session.prep_access_token}`;

  return {
    sessionId: session.id,
    accessToken: session.prep_access_token,
    chatUrl,
    reportId: input.reportId,
  };
}

export function buildWisewaveClientName(
  meta: Record<string, unknown> | null | undefined,
  fallback: string | null,
): string {
  if (typeof meta?.clientName === "string" && meta.clientName.trim()) return meta.clientName;
  return fallback?.trim() || "Friend";
}

export function buildWisewaveCodesFromReport(report: {
  s1_code: string;
  s3_code: string;
  s2_code: string;
  s0_code: string;
}) {
  return {
    s1: report.s1_code,
    s3: report.s3_code,
    s2: report.s2_code,
    s0: report.s0_code,
  };
}
