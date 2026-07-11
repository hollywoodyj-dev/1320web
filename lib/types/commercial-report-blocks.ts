import type { V2BlockSpec } from "@/lib/types/1320-v2-content";

/** Canonical commercial output block keys (Wisewave v1). */
export const COMMERCIAL_REPORT_BLOCK_KEYS = [
  "opening_essence",
  "how_this_may_show_up",
  "core_gift",
  "growth_edge",
  "integration_key",
  "one_week_practice",
  "wisewave_reflection",
] as const;

export type CommercialReportBlockKey = (typeof COMMERCIAL_REPORT_BLOCK_KEYS)[number];

export type CommercialReportBlocks = Partial<
  Record<CommercialReportBlockKey, string> & Record<string, string>
>;

export type CommercialReportGovernance = {
  non_predictive?: boolean;
  non_diagnostic?: boolean;
  non_ranking?: boolean;
  user_agency_required?: boolean;
};

export type CommercialReportEntryOverlay = {
  display_name?: string;
  display_name_zh?: string;
  commercial_report_blocks?: CommercialReportBlocks;
  governance?: CommercialReportGovernance;
};

export const COMMERCIAL_REPORT_BLOCK_SPECS: V2BlockSpec[] = [
  { key: "opening_essence", title: "Opening Essence", titleZh: "开篇本质" },
  { key: "how_this_may_show_up", title: "How This May Show Up", titleZh: "这可能如何显现" },
  { key: "core_gift", title: "Core Gift", titleZh: "核心天赋" },
  { key: "growth_edge", title: "Growth Edge", titleZh: "成长边缘" },
  { key: "integration_key", title: "Integration Key", titleZh: "整合关键" },
  { key: "one_week_practice", title: "One-Week Practice", titleZh: "一周练习" },
  { key: "wisewave_reflection", title: "Wisewave Reflection", titleZh: "玄微反思" },
];

/** Module-specific extra keys beyond the canonical seven. */
export const COMMERCIAL_EXTRA_BLOCK_SPECS: Record<string, V2BlockSpec[]> = {
  S2: [
    { key: "what_this_may_reflect", title: "What This May Reflect", titleZh: "这可能映照什么" },
    { key: "recurring_relational_loop", title: "Recurring Relational Loop", titleZh: "重复的关系循环" },
    { key: "lesson_in_connection", title: "Lesson in Connection", titleZh: "关系中的课题" },
  ],
  S0: [{ key: "hidden_power", title: "Hidden Power", titleZh: "隐藏力量" }],
  S4: [{ key: "hidden_need", title: "Hidden Need", titleZh: "隐藏需求" }],
  S6: [
    { key: "how_value_wants_to_flow", title: "How Value Wants to Flow", titleZh: "价值如何流动" },
    { key: "receiving_edge", title: "Receiving Edge", titleZh: "接收边缘" },
    {
      key: "mature_receiving_expression",
      title: "Mature Receiving Expression",
      titleZh: "成熟接收表达",
    },
  ],
};

export const COMMERCIAL_LAYER_VERSION = "commercial-v3-step2" as const;

export type ContentLayer = "symbolic" | "commercial";
