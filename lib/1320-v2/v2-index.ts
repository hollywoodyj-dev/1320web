import { V2_DATABASE_FILES, type V2DatabaseFile } from "@/lib/1320-v2/v2-databases";
import type { V2BlockSpec, V2ModuleId } from "@/lib/types/1320-v2-content";

export type V2Entry = Record<string, unknown>;

function extractEntries(file: V2DatabaseFile): V2Entry[] {
  const content = file.content;
  if (Array.isArray(content)) return content as V2Entry[];
  const entries = file.entries;
  if (Array.isArray(entries)) return entries as V2Entry[];
  return [];
}

function buildIndex(file: V2DatabaseFile): Map<string, V2Entry> {
  const map = new Map<string, V2Entry>();
  for (const entry of extractEntries(file)) {
    const code = entry.code;
    if (typeof code === "string") map.set(code, entry);
  }
  return map;
}

const INDEXES: Record<V2ModuleId, Map<string, V2Entry>> = {
  S0: buildIndex(V2_DATABASE_FILES.S0),
  S1: buildIndex(V2_DATABASE_FILES.S1),
  S2: buildIndex(V2_DATABASE_FILES.S2),
  S3: buildIndex(V2_DATABASE_FILES.S3),
  S4: buildIndex(V2_DATABASE_FILES.S4),
  S5: buildIndex(V2_DATABASE_FILES.S5),
  S6: buildIndex(V2_DATABASE_FILES.S6),
  S7: buildIndex(V2_DATABASE_FILES.S7),
  S8: buildIndex(V2_DATABASE_FILES.S8),
  S9: buildIndex(V2_DATABASE_FILES.S9),
};

export function lookupV2Entry(module: V2ModuleId, code: string): V2Entry | null {
  return INDEXES[module].get(code) ?? null;
}

export function listV2Codes(module: V2ModuleId): string[] {
  return [...INDEXES[module].keys()];
}

export function getV2BlockSpecs(module: V2ModuleId): V2BlockSpec[] {
  const file = V2_DATABASE_FILES[module];
  const blocks = file.rendering_blocks;
  if (Array.isArray(blocks)) {
    const specs: V2BlockSpec[] = [];
    for (const block of blocks) {
      if (!block || typeof block !== "object") continue;
      const row = block as Record<string, unknown>;
      const key = typeof row.key === "string" ? row.key : null;
      const title = typeof row.title === "string" ? row.title : null;
      if (!key || !title) continue;
      const titleZh = typeof row.title_zh === "string" ? row.title_zh : undefined;
      specs.push({ key, title, titleZh });
    }
    return specs;
  }
  return MODULE_BLOCK_SPECS[module] ?? [];
}

const S5_OUTPUT_BLOCK_SPECS: V2BlockSpec[] = [
  { key: "mission_essence", title: "Mission Essence", titleZh: "使命本质" },
  { key: "what_your_soul_is_learning_to_express", title: "What Your Soul Is Learning to Express", titleZh: "灵魂正在学习表达什么" },
  { key: "how_your_patterns_become_mission", title: "How Your Patterns Become Mission", titleZh: "你的模式如何转化为使命" },
  { key: "natural_mission_fields", title: "Natural Mission Fields", titleZh: "自然使命场域" },
  { key: "shadow_distortion_of_this_mission", title: "Shadow Distortion of This Mission", titleZh: "使命的阴影扭曲" },
  { key: "mature_expression", title: "Mature Expression", titleZh: "成熟表达方式" },
  { key: "wisewave_reflection", title: "Wisewave Reflection", titleZh: "玄微引导语" },
];

const S6_BLOCK_SPECS: V2BlockSpec[] = [
  { key: "value_essence", title: "Value Essence", titleZh: "价值本质" },
  { key: "what_your_soul_is_learning_to_receive", title: "What Your Soul Is Learning to Receive", titleZh: "灵魂正在学习接收什么" },
  { key: "how_value_wants_to_flow", title: "How Value Wants to Flow", titleZh: "价值如何流动" },
  { key: "natural_value_fields", title: "Natural Value Fields", titleZh: "自然价值场域" },
  { key: "shadow_distortion_of_receiving", title: "Shadow Distortion of Receiving", titleZh: "接收的阴影扭曲" },
  { key: "mature_receiving_expression", title: "Mature Receiving Expression", titleZh: "成熟接收方式" },
  { key: "wisewave_reflection", title: "Wisewave Reflection", titleZh: "玄微引导语" },
];

const S4_FIELD_SPECS: V2BlockSpec[] = [
  { key: "core_loop", title: "Core Loop", titleZh: "核心循环" },
  { key: "reflective_summary", title: "Reflective Summary", titleZh: "反思摘要" },
  { key: "emotional_trigger", title: "Emotional Trigger", titleZh: "情绪触发" },
  { key: "defense_pattern", title: "Defense Pattern", titleZh: "防御模式" },
  { key: "hidden_need", title: "Hidden Need", titleZh: "隐藏需求" },
  { key: "relationship_pattern", title: "Relationship Pattern", titleZh: "关系模式" },
  { key: "work_life_pattern", title: "Work & Life Pattern", titleZh: "工作生活模式" },
  { key: "integration_key", title: "Integration Key", titleZh: "整合关键" },
  { key: "one_week_practice", title: "One-Week Practice", titleZh: "一周练习" },
  { key: "wisewave_guidance", title: "Wisewave Guidance", titleZh: "玄微引导" },
];

const MODULE_BLOCK_SPECS: Partial<Record<V2ModuleId, V2BlockSpec[]>> = {
  S4: S4_FIELD_SPECS,
  S5: S5_OUTPUT_BLOCK_SPECS,
  S6: S6_BLOCK_SPECS,
};
