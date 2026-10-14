import { containsCjk, pickLocalized } from "@/lib/getLocalized";
import { toTraditional } from "@/lib/gzh/to-traditional";
import type { CanonicalFullReport } from "@/lib/canonical-report/types";
import type { FullReportV2ModuleSlot } from "@/lib/full-report-v2/types";
import type {
  Get1320ContentResult,
  LocalizedText,
  SegmentContent,
} from "@/lib/types/1320-content";

function zhText(text?: LocalizedText): string {
  const raw = pickLocalized(text, "zh");
  if (!raw || !containsCjk(raw)) return "";
  return toTraditional(raw);
}

function zhLines(items?: LocalizedText[]): string {
  return (items ?? []).map((item) => zhText(item)).filter(Boolean).join("\n");
}

function zhPlain(text: string | undefined): string {
  const raw = text?.trim() ?? "";
  if (!raw || !containsCjk(raw)) return "";
  return toTraditional(raw);
}

/** Map reviewed Chinese segment copy onto the production report card slots. */
function commercialBlocksFromSegment(segment: SegmentContent): Record<string, string> {
  const blocks: Record<string, string> = {};
  const put = (key: string, value: string) => {
    if (value.trim()) blocks[key] = value.trim();
  };

  put("opening_essence", zhText(segment.fullEssence) || zhText(segment.freeEssence));
  put(
    "how_this_may_show_up",
    zhText(segment.expressionPattern) ||
      zhText(segment.vibrationTraits) ||
      zhText(segment.relationshipPattern) ||
      zhText(segment.voidChallenge),
  );
  put(
    "core_gift",
    zhLines(segment.coreGifts) || zhLines(segment.soulTraits) || zhText(segment.strengthSummary) || zhText(segment.voidPower),
  );
  put(
    "growth_edge",
    zhLines(segment.shadowPatterns) || zhText(segment.challenges) || zhText(segment.growthEdge) || zhText(segment.coreIllusion),
  );
  put(
    "integration_key",
    zhText(segment.integrationKey) || zhText(segment.integrationPrompt) || zhText(segment.awakeningPath),
  );
  put("one_week_practice", zhText(segment.practice));
  put("wisewave_reflection", zhText(segment.reflectionQuestion) || zhText(segment.guidance));
  put("what_this_may_reflect", zhText(segment.mirrorLesson));
  put("recurring_relational_loop", zhText(segment.karmicLoop));
  put("lesson_in_connection", zhText(segment.lesson));
  put("hidden_power", zhText(segment.voidPower));

  for (const section of segment.soulMissionSections ?? []) {
    const label = zhText(section.label);
    const body = zhText(section.body);
    if (label && body) blocks[label] = body;
  }

  return blocks;
}

function withChineseModule(
  slot: FullReportV2ModuleSlot,
  segment: SegmentContent | null | undefined,
): { slot: FullReportV2ModuleSlot; title: string } {
  if (!segment) return { slot, title: "" };
  const blocks = commercialBlocksFromSegment(segment);
  const title = zhText(segment.title);
  if (!title && Object.keys(blocks).length === 0) return { slot, title: "" };
  return {
    title,
    slot: {
      ...slot,
      ...(title ? { title } : {}),
      ...(zhText(segment.subtitle) ? { subtitle: zhText(segment.subtitle) } : {}),
      ...(Object.keys(blocks).length > 0 ? { preview_commercial_blocks: blocks } : {}),
    },
  };
}

/**
 * Keep the English production report structure, and replace S0–S6 bodies
 * with the reviewed Traditional Chinese copy. S7–S9 stay English.
 */
export function applyTraditionalChineseToCanonicalReport(
  report: CanonicalFullReport,
  content: Get1320ContentResult,
): CanonicalFullReport {
  const payload = structuredClone(report.payload);
  const modules = [
    ["s0", content.s0Content, "s0"],
    ["s1", content.s1Content, "s1"],
    ["s2", content.s2Content, "s2"],
    ["s3", content.s3Content, "s3"],
    ["s4", content.s4Content, null],
    ["s5", content.s5Content, null],
    ["s6", content.s6Content, null],
  ] as const;

  for (const [key, segment, calcKey] of modules) {
    const next = withChineseModule(payload.modules[key], segment);
    payload.modules[key] = next.slot;
    if (calcKey && next.title) {
      payload.calculation[calcKey].title = next.title;
    }
  }

  const blueprint = content.integratedSoulBlueprint;
  if (blueprint) {
    const core = zhPlain(blueprint.coreEssenceSummary);
    const energy = zhPlain(blueprint.energyExpressionSummary);
    const relationship = zhPlain(blueprint.relationshipMirrorSummary);
    const awakening = zhPlain(blueprint.awakeningPathSummary);
    payload.integrated_blueprint = {
      ...payload.integrated_blueprint,
      ...(core ? { core_essence: core } : {}),
      ...(energy ? { energy_expression: energy } : {}),
      ...(relationship ? { relationship_mirror: relationship } : {}),
      ...(awakening ? { awakening_path: awakening } : {}),
    };
  }

  payload.client.language = "zh";
  return { ...report, payload };
}
