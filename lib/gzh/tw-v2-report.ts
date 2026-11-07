import narrative from "@/data/1320-tw-v2/1980-05-22.json";
import { calculate1320Code } from "@/lib/calculate1320Code";

export const DAY_MAP = [
  { day: "Day 1", modules: "S1" },
  { day: "Day 2", modules: "S2" },
  { day: "Day 3", modules: "S3" },
  { day: "Day 4", modules: "S4" },
  { day: "Day 5", modules: "S5" },
  { day: "Day 6", modules: "S6 + S7" },
  { day: "Day 7", modules: "S8 + S9" },
] as const;

const SAMPLE_CHAPTERS = new Set(["01", "02", "03", "04", "05", "06", "07", "ethics"]);
const EXTENSION_ROW = /^S[4-9]-/;

export type V2Product = "FULL" | "SAMPLE";

export type V2Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "table"; headers: string[]; rows: string[][] };

export type V2Chapter = {
  id: string;
  title: string;
  blocks: V2Block[];
};

type ReadyReport = {
  status: "REFERENCE_SAMPLE";
  version: "2.0";
  product: V2Product;
  dateLabel: string;
  codes: string[];
  readerFocus: string | null;
  preamble: string[];
  chapters: V2Chapter[];
  days: typeof DAY_MAP | null;
};

type BlockedReport = {
  status: "BLOCKED_NO_APPROVED_SOURCE";
  version: "2.0";
  product: V2Product;
  dateLabel: string;
  codes: string[];
  readerFocus: string | null;
  days: typeof DAY_MAP | null;
};

export type TwV2Report = ReadyReport | BlockedReport;

export function isRealCalendarDate(year: number, month: number, day: number): boolean {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) return false;
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

export function officialCodes(year: number, month: number, day: number): string[] {
  const code = calculate1320Code(year, month, day);
  return [
    code.s1Code,
    code.s3Code,
    code.s2Code,
    code.s0Code,
    code.s4Code,
    code.s5Code,
    code.s6Code,
    code.s7Code,
    code.s8Code,
    code.s9Code,
  ];
}

function dateLabel(year: number, month: number, day: number): string {
  return `${year} 年 ${month} 月 ${day} 日`;
}

function focusOf(value: string | null | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return null;
  return trimmed.slice(0, 80);
}

function forProduct(chapters: V2Chapter[], product: V2Product): V2Chapter[] {
  if (product === "FULL") return chapters;
  return chapters
    .filter((chapter) => SAMPLE_CHAPTERS.has(chapter.id))
    .map((chapter) => {
      if (chapter.id !== "02") return chapter;
      return {
        ...chapter,
        blocks: chapter.blocks.flatMap((block) => {
          if (block.type === "p" && block.text.includes("六個延伸編碼")) return [];
          if (block.type !== "table") return [block];
          return [
            {
              ...block,
              rows: block.rows.filter((row) => !EXTENSION_ROW.test(row[0] ?? "")),
            },
          ];
        }),
      };
    });
}

export function buildTwV2Report(
  year: number,
  month: number,
  day: number,
  product: V2Product = "FULL",
  readerFocus?: string | null,
): TwV2Report {
  const codes = officialCodes(year, month, day);
  const shownCodes = product === "SAMPLE" ? codes.slice(0, 4) : codes;
  const focus = focusOf(readerFocus);
  const base = {
    version: "2.0" as const,
    product,
    dateLabel: dateLabel(year, month, day),
    codes: shownCodes,
    readerFocus: focus,
  };
  const sameSignature = codes.join("|") === narrative.codes.join("|");
  if (!sameSignature) {
    return {
      ...base,
      status: "BLOCKED_NO_APPROVED_SOURCE",
      days: product === "FULL" ? DAY_MAP : null,
    };
  }
  const preamble =
    product === "SAMPLE" ? narrative.preamble.filter((paragraph) => !/S[4-9]-/.test(paragraph)) : narrative.preamble;
  return {
    ...base,
    status: "REFERENCE_SAMPLE",
    preamble,
    chapters: forProduct(narrative.chapters as V2Chapter[], product),
    days: product === "FULL" ? DAY_MAP : null,
  };
}

export function customerVisibleText(report: TwV2Report): string {
  if (report.status !== "REFERENCE_SAMPLE") {
    return [report.dateLabel, ...report.codes, report.readerFocus ?? ""].join("\n");
  }
  const blocks = report.chapters.flatMap((chapter) =>
    chapter.blocks.map((block) => {
      if (block.type === "table") {
        return [...block.headers, ...block.rows.flat()].join(" ");
      }
      return block.text;
    }),
  );
  return [report.dateLabel, ...report.codes, report.readerFocus ?? "", ...report.preamble, ...blocks].join("\n");
}
