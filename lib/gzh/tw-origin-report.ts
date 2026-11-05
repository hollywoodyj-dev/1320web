import s0 from "@/data/1320-zh-tw-origin/s0.json";
import s1 from "@/data/1320-zh-tw-origin/s1.json";
import s2 from "@/data/1320-zh-tw-origin/s2.json";
import s3 from "@/data/1320-zh-tw-origin/s3.json";
import s4 from "@/data/1320-zh-tw-origin/s4.json";
import s5 from "@/data/1320-zh-tw-origin/s5.json";
import s6 from "@/data/1320-zh-tw-origin/s6.json";
import s7 from "@/data/1320-zh-tw-origin/s7.json";
import s8 from "@/data/1320-zh-tw-origin/s8.json";
import s9 from "@/data/1320-zh-tw-origin/s9.json";
import { calculate1320Code } from "@/lib/calculate1320Code";

export const ORIGIN_FIELDS = [
  "象徵核心",
  "可探索的力量",
  "需要留意的張力",
  "整合方向",
  "開放式提問",
] as const;

export type OriginField = (typeof ORIGIN_FIELDS)[number];

type OriginPack = {
  module: string;
  module_name_zh_tw: string;
  entries: Array<{
    code: string;
    name_zh_tw: string;
    editorial_brief_zh_tw: Record<OriginField, string>;
  }>;
};

const PACKS: OriginPack[] = [s1, s3, s2, s0, s4, s5, s6, s7, s8, s9] as OriginPack[];

const DAYS = [
  { day: "第 1 天", module: "S1" },
  { day: "第 2 天", module: "S2" },
  { day: "第 3 天", module: "S3" },
  { day: "第 4 天", module: "S4" },
  { day: "第 5 天", module: "S5" },
  { day: "第 6 天", module: "S6、S7" },
  { day: "第 7 天", module: "S8、S9" },
] as const;

export type OriginSection = {
  module: string;
  moduleName: string;
  code: string;
  name: string;
  fields: Array<{ label: OriginField; text: string; items: string[] }>;
};

export type OriginReport = {
  dateLabel: string;
  codes: string[];
  sections: OriginSection[];
  days: Array<{ day: string; module: string; moduleName: string }>;
};

function indexPack(pack: OriginPack): Map<string, OriginPack["entries"][number]> {
  return new Map(pack.entries.map((entry) => [entry.code, entry]));
}

const INDEXES = new Map(PACKS.map((pack) => [pack.module, { pack, index: indexPack(pack) }]));

export function splitField(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  if (trimmed.includes("\n")) {
    return trimmed
      .split(/\n+/)
      .map((line) => line.replace(/^\s*-\s*/, "").trim())
      .filter(Boolean);
  }
  if (trimmed.startsWith("- ") || trimmed.includes(" - ")) {
    return trimmed
      .split(/\s+-\s+/)
      .map((line) => line.replace(/^-\s*/, "").trim())
      .filter(Boolean);
  }
  return [trimmed];
}

function sectionFor(moduleId: string, code: string): OriginSection {
  const found = INDEXES.get(moduleId);
  const entry = found?.index.get(code);
  return {
    module: moduleId,
    moduleName: found?.pack.module_name_zh_tw ?? moduleId,
    code,
    name: entry?.name_zh_tw ?? "",
    fields: ORIGIN_FIELDS.map((label) => {
      const text = entry?.editorial_brief_zh_tw[label]?.trim() ?? "";
      const items = splitField(text);
      return { label, text, items };
    }),
  };
}

export function isRealCalendarDate(year: number, month: number, day: number): boolean {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) return false;
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

export function buildTwOriginReport(year: number, month: number, day: number): OriginReport {
  const code = calculate1320Code(year, month, day);
  const pairs: Array<[string, string]> = [
    ["S1", code.s1Code],
    ["S3", code.s3Code],
    ["S2", code.s2Code],
    ["S0", code.s0Code],
    ["S4", code.s4Code],
    ["S5", code.s5Code],
    ["S6", code.s6Code],
    ["S7", code.s7Code],
    ["S8", code.s8Code],
    ["S9", code.s9Code],
  ];
  const sections = pairs.map(([moduleId, segmentCode]) => sectionFor(moduleId, segmentCode));
  const names = new Map(sections.map((section) => [section.module, section.moduleName]));
  return {
    dateLabel: `${year}年${month}月${day}日`,
    codes: pairs.map(([, segmentCode]) => segmentCode),
    sections,
    days: DAYS.map((item) => ({
      day: item.day,
      module: item.module,
      moduleName: item.module
        .split("、")
        .map((id) => names.get(id) ?? id)
        .join("、"),
    })),
  };
}
