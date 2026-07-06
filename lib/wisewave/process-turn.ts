import { getPlatformSessionByPrepToken, updatePlatformSessionGrowthEdge } from "@/lib/db/platform-sessions";
import { ensureExpressionProfile, getExpressionProfile } from "@/lib/db/expression-profiles";
import { createRelationshipMemory, listRelationshipMemories } from "@/lib/db/relationship-memories";
import { getSoulReportById } from "@/lib/db/reports";
import { createWisewaveTurn, listWisewaveTurns } from "@/lib/db/wisewave-turns";
import type { ExpressionState } from "@/lib/platform-domain";
import {
  buildWisewaveClientName,
  buildWisewaveCodesFromReport,
} from "@/lib/wisewave/create-session";
import { runReasoningPipeline } from "@/lib/wisewave/run-reasoning-pipeline";
import type { WisewaveSessionContext, WisewaveTurnResult } from "@/lib/wisewave/types";

export async function getWisewaveSessionContext(
  sessionId: string,
  accessToken: string,
): Promise<WisewaveSessionContext | null> {
  const session = await getPlatformSessionByPrepToken(sessionId, accessToken);
  if (!session || session.kind !== "wisewave") return null;

  const report = await getSoulReportById(session.report_id);
  if (!report) return null;

  const expression = await getExpressionProfile(session.user_id, session.report_id);
  const turns = await listWisewaveTurns(session.id);

  return {
    sessionId: session.id,
    accessToken,
    reportId: report.id,
    clientName: buildWisewaveClientName(session.meta, null),
    codes: buildWisewaveCodesFromReport(report),
    expressionState: expression?.state ?? "dormant",
    turns: turns.map((turn) => ({
      role: turn.role as "user" | "wisewave",
      content: turn.content,
      createdAt: turn.created_at.toISOString(),
    })),
  };
}

export async function processWisewaveTurn(input: {
  sessionId: string;
  accessToken: string;
  message: string;
}): Promise<WisewaveTurnResult | null> {
  const session = await getPlatformSessionByPrepToken(input.sessionId, input.accessToken);
  if (!session || session.kind !== "wisewave") return null;

  const report = await getSoulReportById(session.report_id);
  if (!report) return null;

  const trimmed = input.message.trim();
  if (!trimmed) return null;

  await createWisewaveTurn({
    platformSessionId: session.id,
    userId: session.user_id,
    reportId: session.report_id,
    role: "user",
    content: trimmed,
    authorship: "user",
  });

  const expressionProfile = await ensureExpressionProfile({
    userId: session.user_id,
    reportId: session.report_id,
  });
  const expressionState = (expressionProfile.state ?? "dormant") as ExpressionState;
  const memories = await listRelationshipMemories({
    userId: session.user_id,
    reportId: session.report_id,
    limit: 5,
  });
  const priorTurns = await listWisewaveTurns(session.id);

  const { response, reasoning, qa } = await runReasoningPipeline({
    userMessage: trimmed,
    clientName: buildWisewaveClientName(session.meta, null),
    codes: buildWisewaveCodesFromReport(report),
    expressionState,
    memories,
    priorTurns,
  });

  await createWisewaveTurn({
    platformSessionId: session.id,
    userId: session.user_id,
    reportId: session.report_id,
    role: "wisewave",
    content: response,
    reasoningAudit: reasoning,
    authorship: "wisewave",
  });

  if (reasoning.growthEdge) {
    await updatePlatformSessionGrowthEdge({
      sessionId: session.id,
      growthEdge: reasoning.growthEdge,
      authorship: "wisewave",
    });
  }

  if (reasoning.intent === "reflection" || reasoning.intent === "integration") {
    await createRelationshipMemory({
      userId: session.user_id,
      reportId: session.report_id,
      kind: reasoning.intent === "integration" ? "practice" : "insight",
      content: trimmed.slice(0, 280),
      sourcePlatformSessionId: session.id,
      authorship: "wisewave",
      userRetained: true,
    });
  }

  return {
    sessionId: session.id,
    userMessage: trimmed,
    response,
    reasoning,
    qa,
  };
}
