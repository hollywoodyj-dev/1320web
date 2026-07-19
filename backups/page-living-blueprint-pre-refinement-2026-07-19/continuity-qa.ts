import type { LivingBlueprintSnapshot } from "@/lib/living-blueprint/types";

const SURVEILLANCE_PATTERNS = [
  /\balways\b/i,
  /\bnever changes\b/i,
  /\bfixed personality\b/i,
  /\bwe know you\b/i,
];

export function validateContinuityPresentation(snapshot: LivingBlueprintSnapshot): {
  passed: boolean;
  flags: string[];
} {
  const flags: string[] = [];
  const text = [
    snapshot.continuityNote,
    ...snapshot.recentReflections.map((r) => r.body),
    ...Object.values(snapshot.memoriesByLayer).flat().map((m) => m.content),
  ].join(" ");

  for (const pattern of SURVEILLANCE_PATTERNS) {
    if (pattern.test(text)) flags.push("surveillance_or_fixed_identity_language");
  }

  if (!snapshot.continuityNote.includes("immutable") && !snapshot.continuityNote.includes("read-only")) {
    flags.push("missing_blueprint_immutability_note");
  }

  return { passed: flags.length === 0, flags };
}

export function buildContinuityNote(snapshot: Pick<LivingBlueprintSnapshot, "expressionState" | "lastReviewAt">): string {
  const review = snapshot.lastReviewAt
    ? `Last Living Blueprint review: ${new Date(snapshot.lastReviewAt).toLocaleDateString()}. `
    : "";
  return `${review}Your Soul Blueprint structure is read-only and immutable. Expression (${snapshot.expressionState}) tracks how you are living it now — movement matters more than position.`;
}
