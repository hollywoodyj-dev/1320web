import { buildCanonicalReport } from "@/lib/canonical-report";
import { soulReportBirthDateDisplay, soulReportBirthDateIso } from "@/lib/db/normalize-soul-report-row";
import { ensureExpressionProfile, getExpressionProfile } from "@/lib/db/expression-profiles";
import { ensureJourney, getJourney } from "@/lib/db/journeys";
import { listRelationshipMemoriesByLayer } from "@/lib/db/relationship-memories";
import { getSoulReportById } from "@/lib/db/reports";
import { listReflectionsForReport } from "@/lib/db/reflections";
import { toSoulBlueprintRef } from "@/lib/platform-domain";
import { buildContinuityNote, validateContinuityPresentation } from "@/lib/living-blueprint/continuity-qa";
import { MEMORY_LAYER_LABELS } from "@/lib/living-blueprint/memory-layers";
import type { LivingBlueprintSnapshot, MemoryLayer } from "@/lib/living-blueprint/types";
import { LIVING_BLUEPRINT_VERSION } from "@/lib/living-blueprint/types";

const LAYERS: MemoryLayer[] = ["blueprint", "reflection", "expression", "journey"];

export async function buildLivingBlueprintSnapshot(input: {
  userId: string;
  reportId: string;
  clientName?: string;
  email?: string;
}): Promise<LivingBlueprintSnapshot | null> {
  const report = await getSoulReportById(input.reportId);
  if (!report || report.user_id !== input.userId) return null;

  const clientName = input.clientName ?? "Member";
  const canonical = buildCanonicalReport({
    name: clientName,
    birth_date: soulReportBirthDateIso(report),
    birth_date_display: soulReportBirthDateDisplay(report),
  });
  const blueprintRef = toSoulBlueprintRef(report, canonical);

  await ensureExpressionProfile({ userId: input.userId, reportId: input.reportId });
  await ensureJourney({ userId: input.userId, reportId: input.reportId });

  const expression = await getExpressionProfile(input.userId, input.reportId);
  const journey = await getJourney(input.userId, input.reportId);
  const reflections = await listReflectionsForReport({
    userId: input.userId,
    reportId: input.reportId,
    limit: 8,
  });

  const memoriesByLayer = {} as LivingBlueprintSnapshot["memoriesByLayer"];
  for (const layer of LAYERS) {
    const rows = await listRelationshipMemoriesByLayer({
      userId: input.userId,
      reportId: input.reportId,
      layer,
      limit: 6,
    });
    memoriesByLayer[layer] = rows.map((row) => ({
      id: row.id,
      content: row.content,
      kind: row.kind,
    }));
  }

  // Blueprint memory — symbolic anchor from immutable codes (not stored as mutable memory)
  if (memoriesByLayer.blueprint.length === 0) {
    memoriesByLayer.blueprint = [
      {
        id: "blueprint-anchor",
        content: `Core signature: ${blueprintRef.codes.s1} · ${blueprintRef.codes.s3} · ${blueprintRef.codes.s2} · ${blueprintRef.codes.s0}`,
        kind: "anchor",
      },
    ];
  }

  // Expression memory — state movement note
  if (memoriesByLayer.expression.length === 0 && expression) {
    memoriesByLayer.expression = [
      {
        id: "expression-state",
        content: `Current Expression Framework stage: ${expression.state}`,
        kind: "expression_state",
      },
    ];
  }

  const snapshot: LivingBlueprintSnapshot = {
    version: LIVING_BLUEPRINT_VERSION,
    reportId: report.id,
    clientName,
    email: input.email ?? null,
    birthDate: soulReportBirthDateIso(report),
    codes: blueprintRef.codes,
    expressionState: expression?.state ?? "dormant",
    journeyStatus: journey?.status ?? "active",
    membershipTier: journey?.membership_tier ?? "living_blueprint",
    lastReviewAt: journey?.last_review_at?.toISOString() ?? null,
    memoriesByLayer,
    recentReflections: reflections.map((row) => ({
      id: row.id,
      kind: row.kind,
      body: row.body,
      createdAt: row.created_at.toISOString(),
    })),
    continuityNote: "",
  };

  snapshot.continuityNote = buildContinuityNote(snapshot);
  return snapshot;
}

export function auditLivingBlueprintContinuity(snapshot: LivingBlueprintSnapshot) {
  return validateContinuityPresentation(snapshot);
}

export { MEMORY_LAYER_LABELS };
