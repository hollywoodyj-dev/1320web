import type { RelationshipMemoryKind } from "@/lib/platform-domain";
import type { MemoryLayer } from "@/lib/living-blueprint/types";

/** Map v1 relationship memory kinds → governance four memory layers (Doc 9). */
export function memoryLayerForKind(kind: RelationshipMemoryKind): MemoryLayer {
  switch (kind) {
    case "theme":
    case "practice":
      return "journey";
    case "question":
    case "insight":
      return "reflection";
    default:
      return "reflection";
  }
}

export const MEMORY_LAYER_LABELS: Record<MemoryLayer, string> = {
  blueprint: "Blueprint Memory",
  reflection: "Reflection Memory",
  expression: "Expression Memory",
  journey: "Journey Memory",
};
