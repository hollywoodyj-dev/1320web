import overlayData from "@/data/1320-v2/commercial-report-blocks-overlay.json";
import type { SoulMissionSection } from "@/lib/types/s5-soul-mission";
import type { LocalizedText, SegmentContent } from "@/lib/types/1320-content";
import type { V2ModuleId } from "@/lib/types/1320-v2-content";
import {
  COMMERCIAL_EXTRA_BLOCK_SPECS,
  COMMERCIAL_LAYER_VERSION,
  COMMERCIAL_REPORT_BLOCK_KEYS,
  COMMERCIAL_REPORT_BLOCK_SPECS,
  type CommercialReportBlocks,
  type CommercialReportEntryOverlay,
  type ContentLayer,
} from "@/lib/types/commercial-report-blocks";
import type { V2Entry } from "@/lib/1320-v2/v2-index";

const OVERLAY_ENTRIES =
  overlayData.entries && typeof overlayData.entries === "object"
    ? (overlayData.entries as Record<string, CommercialReportEntryOverlay>)
    : {};

function bilingualField(en?: string, zh?: string): LocalizedText {
  return { en: en ?? "", zh: zh || undefined };
}

function str(entry: V2Entry, key: string): string | undefined {
  const value = entry[key];
  return typeof value === "string" ? value : undefined;
}

function parseBlocks(raw: unknown): CommercialReportBlocks | null {
  if (!raw || typeof raw !== "object") return null;
  const blocks: CommercialReportBlocks = {};
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === "string" && value.trim()) {
      blocks[key] = value.trim();
    }
  }
  return Object.keys(blocks).length ? blocks : null;
}

export function lookupCommercialOverlay(code: string): CommercialReportEntryOverlay | null {
  return OVERLAY_ENTRIES[code] ?? null;
}

export function getCommercialBlocksFromEntry(entry: V2Entry): CommercialReportBlocks | null {
  return parseBlocks(entry.commercial_report_blocks);
}

export function mergeCommercialOverlay(entry: V2Entry, code: string): V2Entry {
  const overlay = lookupCommercialOverlay(code);
  if (!overlay) return entry;

  const merged: V2Entry = { ...entry };
  if (overlay.display_name) merged.display_name = overlay.display_name;
  if (overlay.display_name_zh) merged.display_name_zh = overlay.display_name_zh;
  if (overlay.governance) merged.governance = overlay.governance;

  const entryBlocks = getCommercialBlocksFromEntry(entry) ?? {};
  const overlayBlocks = overlay.commercial_report_blocks ?? {};
  const combined = { ...entryBlocks, ...overlayBlocks };
  if (Object.keys(combined).length) {
    merged.commercial_report_blocks = combined;
  }

  return merged;
}

export function hasCommercialReportBlocks(entry: V2Entry): boolean {
  return getCommercialBlocksFromEntry(entry) !== null;
}

function blockSpecsForModule(module: V2ModuleId): Array<{ key: string; title: string; titleZh?: string }> {
  const extras = COMMERCIAL_EXTRA_BLOCK_SPECS[module] ?? [];
  const seen = new Set<string>();
  const specs = [...COMMERCIAL_REPORT_BLOCK_SPECS, ...extras].filter((spec) => {
    if (seen.has(spec.key)) return false;
    seen.add(spec.key);
    return true;
  });
  return specs;
}

export function buildCommercialReportSections(
  module: V2ModuleId,
  blocks: CommercialReportBlocks,
  prefix: string,
): SoulMissionSection[] {
  const specs = blockSpecsForModule(module);
  const rendered = new Set<string>();

  const sections = specs
    .map((spec) => {
      const body = blocks[spec.key];
      if (!body?.trim()) return null;
      rendered.add(spec.key);
      return {
        id: `${prefix}-commercial-${spec.key}`,
        label: bilingualField(spec.title, spec.titleZh),
        body: bilingualField(body),
      };
    })
    .filter((section): section is SoulMissionSection => Boolean(section));

  for (const key of Object.keys(blocks)) {
    if (rendered.has(key) || COMMERCIAL_REPORT_BLOCK_KEYS.includes(key as never)) continue;
    const body = blocks[key];
    if (!body?.trim()) continue;
    const label = key
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
    sections.push({
      id: `${prefix}-commercial-${key}`,
      label: bilingualField(label),
      body: bilingualField(body),
    });
  }

  return sections;
}

export function applyCommercialReportLayer(
  segment: SegmentContent,
  module: V2ModuleId,
  entry: V2Entry,
): SegmentContent {
  const blocks = getCommercialBlocksFromEntry(entry);
  if (!blocks) return segment;

  const displayName = str(entry, "display_name");
  const displayNameZh = str(entry, "display_name_zh");
  const sections = buildCommercialReportSections(module, blocks, module);

  const opening = blocks.opening_essence;
  const integration = blocks.integration_key;
  const practice = blocks.one_week_practice;
  const reflection = blocks.wisewave_reflection;
  const growth = blocks.growth_edge;

  const updated: SegmentContent = {
    ...segment,
    contentLayer: "commercial" as ContentLayer,
    commercialBlocksVersion: COMMERCIAL_LAYER_VERSION,
    title: displayName ? bilingualField(displayName, displayNameZh) : segment.title,
    freeEssence: opening ? bilingualField(opening) : segment.freeEssence,
    fullEssence: opening ? bilingualField(opening) : segment.fullEssence,
    soulMissionSections: sections.length ? sections : segment.soulMissionSections,
    integrationKey: integration ? bilingualField(integration) : segment.integrationKey,
    practice: practice ? bilingualField(practice) : segment.practice,
    guidance: reflection ? bilingualField(reflection) : segment.guidance,
    growthEdge: growth ? bilingualField(growth) : segment.growthEdge,
  };

  const safeNote = str(entry, "safe_language_note");
  if (safeNote?.trim()) {
    updated.lockedPreview = bilingualField(safeNote, str(entry, "safe_language_note_zh"));
  }

  if (module === "S1" && blocks.core_gift) {
    updated.coreGifts = [bilingualField(blocks.core_gift)];
  }
  if (module === "S1" && blocks.growth_edge) {
    updated.shadowPatterns = [bilingualField(blocks.growth_edge)];
  }
  if (module === "S2" && blocks.recurring_relational_loop) {
    updated.karmicLoop = bilingualField(blocks.recurring_relational_loop);
  }
  if (module === "S2" && blocks.lesson_in_connection) {
    updated.mirrorLesson = bilingualField(blocks.lesson_in_connection);
  }
  if (module === "S2" && blocks.what_this_may_reflect) {
    updated.relationshipPattern = bilingualField(blocks.what_this_may_reflect);
  }
  if (module === "S0" && blocks.hidden_power) {
    updated.voidPower = bilingualField(blocks.hidden_power);
  }
  if (module === "S4" && blocks.hidden_need) {
    updated.integrationPrompt = bilingualField(blocks.hidden_need);
  }

  return updated;
}
