import type { IntegratedSoulBlueprint } from "@/lib/types/integrated-soul-blueprint";
import type { LocalizedText } from "@/lib/types/1320-content";

/** Short free-result paragraph derived from structured synthesis — not from shadow patterns. */
export function deriveIntegratedFreeSummary(blueprint: IntegratedSoulBlueprint): LocalizedText {
  const short = [blueprint.coreEssenceSummary, blueprint.relationshipMirrorSummary]
    .filter(Boolean)
    .join("\n\n");

  return {
    en: short || blueprint.integratedSummary,
    zh: short || blueprint.integratedSummary,
  };
}
