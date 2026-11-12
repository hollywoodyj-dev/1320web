import narrative1980 from "@/data/1320-tw-v2/1980-05-22.json";
import narrative1982 from "@/data/1320-tw-v2/1982-02-03.json";
import narrative2008 from "@/data/1320-tw-v2/2008-12-08.json";
import narrative2013 from "@/data/1320-tw-v2/2013-06-12.json";
import { calculate1320Code } from "@/lib/calculate1320Code";
import {
  approvedCustomerThreads,
  codeMapFromCodes,
  overviewTableRows,
  snapshotFromChapter,
  withJournalBlanks,
  type BlueprintSnapshot,
  type CodeNode,
} from "@/lib/gzh/tw-v2-blueprint";

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

type StoredNarrative = {
  status: "REFERENCE_SAMPLE" | "EDITORIAL_CANDIDATE";
  birth: string;
  codes: string[];
  preamble: string[];
  chapters: V2Chapter[];
  age_gate?: string;
  approval?: string;
  customer_render?: string;
  note?: string;
};

const NARRATIVES: StoredNarrative[] = [
  narrative1980 as StoredNarrative,
  narrative1982 as StoredNarrative,
  narrative2008 as StoredNarrative,
  narrative2013 as StoredNarrative,
];

export type V2Product = "FULL" | "SAMPLE";

export type V2Block =
  | { type: "p"; text: string; scope?: "full" }
  | { type: "h3"; text: string; scope?: "full" }
  | { type: "table"; headers: string[]; rows: string[][]; scope?: "full" }
  | { type: "cards"; scope?: "full"; items: Array<{ label: string; title: string; codes: string }> }
  | { type: "blank"; lines: number };

export type V2Chapter = {
  id: string;
  title: string;
  blocks: V2Block[];
};

type ReportBase = {
  version: "2.0";
  product: V2Product;
  dateLabel: string;
  year: number;
  month: number;
  day: number;
  codes: string[];
  allCodes: string[];
  readerFocus: string | null;
  codeMap: CodeNode[];
  days: typeof DAY_MAP | null;
};

type ReadyReport = ReportBase & {
  status: "REFERENCE_SAMPLE" | "EDITORIAL_CANDIDATE";
  preamble: string[];
  chapters: V2Chapter[];
  snapshot: BlueprintSnapshot | null;
  coverTheme: string | null;
  approvedThreads: ReturnType<typeof approvedCustomerThreads>;
  ageGate: string | null;
  customerRender: "BLOCKED" | "PREVIEW_ONLY";
  note: string | null;
};

type BlockedReport = ReportBase & {
  status: "BLOCKED_NO_APPROVED_SOURCE";
  snapshot: null;
  coverTheme: null;
  approvedThreads: [];
  ageGate: null;
  customerRender: "BLOCKED";
  note: null;
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

function narrativeFor(codes: string[]): StoredNarrative | null {
  const signature = codes.join("|");
  return NARRATIVES.find((item) => item.codes.join("|") === signature) ?? null;
}

function coverThemeFrom(overview: V2Chapter | undefined, snapshot: BlueprintSnapshot | null): string | null {
  if (snapshot?.theme) return snapshot.theme;
  const heading = overview?.blocks.find((block) => block.type === "h3");
  return heading && heading.type === "h3" ? heading.text : null;
}

function forProduct(chapters: V2Chapter[], product: V2Product): V2Chapter[] {
  if (product === "FULL") return chapters;
  return chapters
    .filter((chapter) => SAMPLE_CHAPTERS.has(chapter.id))
    .map((chapter) => {
      if (chapter.id !== "02") return chapter;
      const blocks: V2Block[] = [];
      for (const block of chapter.blocks) {
        if ("scope" in block && block.scope === "full") continue;
        if (block.type === "p" && block.text.includes("六個延伸編碼")) continue;
        if (block.type === "table") {
          blocks.push({
            type: "table",
            headers: block.headers,
            rows: block.rows.filter((row) => !EXTENSION_ROW.test(row[0] ?? "") && !/^S[4-9]\b/.test(row[0] ?? "")),
          });
          continue;
        }
        blocks.push(block);
      }
      return { ...chapter, blocks };
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
  const days = product === "FULL" ? DAY_MAP : null;
  const base = {
    version: "2.0" as const,
    product,
    dateLabel: dateLabel(year, month, day),
    year,
    month,
    day,
    codes: shownCodes,
    allCodes: codes,
    readerFocus: focus,
    days,
  };
  const narrative = narrativeFor(codes);
  if (!narrative) {
    return {
      ...base,
      status: "BLOCKED_NO_APPROVED_SOURCE",
      codeMap: codeMapFromCodes(shownCodes),
      snapshot: null,
      coverTheme: null,
      approvedThreads: [],
      ageGate: null,
      customerRender: "BLOCKED",
      note: null,
    };
  }
  const chapters = withJournalBlanks(forProduct(narrative.chapters as V2Chapter[], product), product);
  const namedRows = overviewTableRows(chapters);
  const overview = chapters.find((chapter) => chapter.id === "02");
  const snapshot = product === "FULL" ? snapshotFromChapter(overview) : null;
  const preamble =
    product === "SAMPLE" ? narrative.preamble.filter((paragraph) => !/S[4-9]-/.test(paragraph)) : narrative.preamble;
  return {
    ...base,
    status: narrative.status,
    preamble,
    chapters,
    codeMap: codeMapFromCodes(shownCodes, namedRows),
    snapshot,
    coverTheme: coverThemeFrom(overview, snapshot),
    approvedThreads: approvedCustomerThreads(codes),
    ageGate: narrative.age_gate ?? null,
    customerRender: narrative.customer_render === "BLOCKED" ? "BLOCKED" : "PREVIEW_ONLY",
    note: narrative.note ?? null,
  };
}

export function customerVisibleText(report: TwV2Report): string {
  if (report.status === "BLOCKED_NO_APPROVED_SOURCE") {
    return [report.dateLabel, ...report.codes, report.readerFocus ?? ""].join("\n");
  }
  const blocks = report.chapters.flatMap((chapter) =>
    chapter.blocks.map((block) => {
      if (block.type === "table") {
        return [...block.headers, ...block.rows.flat()].join(" ");
      }
      if (block.type === "cards") {
        return block.items.map((item) => `${item.label} ${item.title} ${item.codes}`).join(" ");
      }
      if (block.type === "blank") return "";
      return block.text;
    }),
  );
  return [report.dateLabel, ...report.codes, report.readerFocus ?? "", ...report.preamble, ...blocks].join("\n");
}
