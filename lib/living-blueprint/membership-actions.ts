import { createPlatformSession } from "@/lib/db/platform-sessions";
import { recordLivingBlueprintReview } from "@/lib/db/journeys";
import { createReflection } from "@/lib/db/reflections";
import { updateExpressionState } from "@/lib/db/expression-profiles";
import type { ExpressionState } from "@/lib/platform-domain";

export async function createMembershipCheckIn(input: {
  userId: string;
  reportId: string;
  checkInNote: string;
  clientName?: string;
}) {
  const session = await createPlatformSession({
    userId: input.userId,
    reportId: input.reportId,
    kind: "membership_checkin",
    status: "completed",
    growthEdge: input.checkInNote.slice(0, 280),
    authorship: "user",
    meta: {
      clientName: input.clientName ?? null,
      checkInAt: new Date().toISOString(),
    },
  });

  await createReflection({
    userId: input.userId,
    reportId: input.reportId,
    kind: "journal",
    body: input.checkInNote.trim(),
    sourcePlatformSessionId: session.id,
    authorship: "user",
  });

  await recordLivingBlueprintReview({
    userId: input.userId,
    reportId: input.reportId,
    note: input.checkInNote.slice(0, 280),
  });

  return session;
}

export async function updateMemberExpression(input: {
  userId: string;
  reportId: string;
  state: ExpressionState;
}) {
  return updateExpressionState({
    userId: input.userId,
    reportId: input.reportId,
    state: input.state,
    authorship: "user",
  });
}
