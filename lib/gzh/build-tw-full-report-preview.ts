import { getAdvancedModuleCardImageUrlFromCode } from "@/lib/advanced-module-card-asset";
import { calculate1320Code } from "@/lib/calculate1320Code";
import {
  duplicateLockedIndexes,
  findLockedEntry,
  loadLockedLibrary,
  type LockedEntry,
} from "@/lib/gzh/locked-editorial";
import type { ReportSegmentIconKey } from "@/lib/report-system/report-segment-card-image";
import { getSegmentCardImageUrl } from "@/lib/segment-card-asset";

const NOTICE_FALLBACK = "今天只留意一件和這段內容有關的事。";
const QUESTION_FALLBACK = "今天哪一件真實發生的事，讓你想到這一段？";

export type PreviewParagraphBlock = {
  code: string;
  moduleTitle: string;
  entryTitle: string;
  paragraphs: string[];
  sourceFile: string;
  missing: boolean;
  note?: string;
  segmentKey: ReportSegmentIconKey;
  imageUrl?: string;
};

export type PracticeLine = {
  label: "今天回看" | "今天留意" | "今天一問";
  text: string;
  source: "locked" | "fallback";
};

export type PracticePart = {
  heading: string;
  lines: PracticeLine[];
};

export type PracticeDayView = {
  day: number;
  title: string;
  prompt: string;
  parts: PracticePart[];
};

export type TwFullReportPreview = {
  birthDateDisplay: string;
  foundationCodes: string;
  blocks: PreviewParagraphBlock[];
  s5: PreviewParagraphBlock[];
  days: PracticeDayView[];
  missing: string[];
  duplicateIndexes: string[];
  englishCodesNotUsedForCopy: {
    s4: string;
    s5: string;
    s6: string;
  };
};

function blockFromEntry(
  code: string,
  moduleTitle: string,
  entry: LockedEntry | null,
  segmentKey: ReportSegmentIconKey,
  imageUrl: string | undefined,
  note?: string,
): PreviewParagraphBlock {
  if (!entry || entry.paragraphs.length === 0) {
    return {
      code,
      moduleTitle,
      entryTitle: "",
      paragraphs: [],
      sourceFile: entry?.sourceFile ?? "",
      missing: true,
      note,
      segmentKey,
      imageUrl,
    };
  }
  return {
    code,
    moduleTitle,
    entryTitle: entry.title,
    paragraphs: entry.paragraphs,
    sourceFile: entry.sourceFile,
    missing: false,
    note,
    segmentKey,
    imageUrl,
  };
}

function focusLine(entry: LockedEntry | null): string {
  return entry?.paragraphs[0] ?? "";
}

function questionLine(entry: LockedEntry | null): { text: string; source: "locked" | "fallback" } {
  const questions = (entry?.paragraphs ?? []).filter((paragraph) => paragraph.includes("？"));
  const last = questions[questions.length - 1];
  if (!last) return { text: QUESTION_FALLBACK, source: "fallback" };
  return { text: last, source: "locked" };
}

function practicePart(heading: string, entry: LockedEntry | null): PracticePart {
  const focus = focusLine(entry);
  const question = questionLine(entry);
  return {
    heading,
    lines: [
      { label: "今天回看", text: focus || QUESTION_FALLBACK, source: focus ? "locked" : "fallback" },
      { label: "今天留意", text: NOTICE_FALLBACK, source: "fallback" },
      { label: "今天一問", text: question.text, source: question.source },
    ],
  };
}

export function buildTwFullReportPreview(year: number, month: number, day: number): TwFullReportPreview {
  const code = calculate1320Code(year, month, day);
  const library = loadLockedLibrary();
  const duplicateIndexes = Object.entries(library)
    .flatMap(([fileName, entries]) => duplicateLockedIndexes(entries).map((index) => `${fileName}#${index}`));

  const s0 = findLockedEntry(library["1320_S0_EDITORIAL_PASS_v0.1.md"], code.s0);
  const s1 = findLockedEntry(library["1320_S1_EDITORIAL_PASS_v0.1.md"], code.s1);
  const s2 = findLockedEntry(library["1320_S2_EDITORIAL_PASS_v0.1.md"], code.s2);
  const s3 = findLockedEntry(library["1320_S3_EDITORIAL_PASS_v0.1.md"], code.s3Raw);
  const s4 = findLockedEntry(library["1320_S4_EDITORIAL_PASS_v0.1.md"], code.s1);
  const s6 = findLockedEntry(library["1320_S6_EDITORIAL_PASS_v0.1.md"], code.s1);
  const s7 = findLockedEntry(library["1320_S7_EDITORIAL_PASS_v0.1.md"], code.s7);
  const s8 = findLockedEntry(library["1320_S8_EDITORIAL_PASS_v0.1.md"], code.s8);
  const s9 = findLockedEntry(library["1320_S9_EDITORIAL_PASS_v0.1.md"], code.s9);

  const s5Origin = findLockedEntry(library["1320_S5_EDITORIAL_PASS_v0.1.md"], code.s1);
  const s5Relationship = findLockedEntry(library["1320_S5_RELATIONSHIP_EDITORIAL_PASS_v0.1.md"], code.s2);
  const s5Expression = findLockedEntry(library["1320_S5_EXPRESSION_EDITORIAL_PASS_v0.1.md"], code.s3);
  const s5Pattern = findLockedEntry(library["1320_S5_PATTERN_EDITORIAL_PASS_v0.1.md"], code.s0);

  const s4Code = `S4-${String(code.s1).padStart(2, "0")}`;
  const s6Code = `S6-${String(code.s1).padStart(2, "0")}`;
  const s1Image = getSegmentCardImageUrl("s1", code.s1);
  const s3Image = getSegmentCardImageUrl("s3", code.s3Raw);
  const s2Image = getSegmentCardImageUrl("s2", code.s2);
  const s0Image = getSegmentCardImageUrl("s0", code.s0);

  const blocks: PreviewParagraphBlock[] = [
    blockFromEntry(code.s1Code, "本源", s1, "s1", s1Image),
    blockFromEntry(code.s3Code, "你怎麼表現", s3, "s3", s3Image),
    blockFromEntry(code.s2Code, "你的關係", s2, "s2", s2Image),
    blockFromEntry(code.s0Code, "你反覆回到的模式", s0, "s0", s0Image),
    blockFromEntry(
      s4Code,
      "陰影模式",
      s4,
      "s4",
      getAdvancedModuleCardImageUrlFromCode(s4Code),
      "鎖定稿的編號與本源相同。英文正式報告的 S4 計算編號沒有用來選這段文字。",
    ),
    blockFromEntry(
      s6Code,
      "價值與接收",
      s6,
      "s6",
      getAdvancedModuleCardImageUrlFromCode(s6Code),
      "鎖定稿的編號與本源相同。英文正式報告的 S6 計算編號沒有用來選這段文字。",
    ),
    blockFromEntry(code.s7Code, "內在主權", s7, "s7", getAdvancedModuleCardImageUrlFromCode(code.s7Code)),
    blockFromEntry(code.s8Code, "你帶來的貢獻", s8, "s8", getAdvancedModuleCardImageUrlFromCode(code.s8Code)),
    blockFromEntry(code.s9Code, "回到生活", s9, "s9", getAdvancedModuleCardImageUrlFromCode(code.s9Code)),
  ];

  const s5: PreviewParagraphBlock[] = [
    blockFromEntry(code.s1Code, "本源", s5Origin, "s1", s1Image),
    blockFromEntry(code.s2Code, "你的關係", s5Relationship, "s2", s2Image),
    blockFromEntry(code.s3Code, "你怎麼表現", s5Expression, "s3", s3Image),
    blockFromEntry(code.s0Code, "你反覆回到的模式", s5Pattern, "s0", s0Image),
  ];

  const days: PracticeDayView[] = [
    { day: 1, title: "第 1 天｜本源", prompt: "我從哪裡出發？", parts: [practicePart("本源", s1)] },
    { day: 2, title: "第 2 天｜你的關係", prompt: "關係裡，我看見了什麼？", parts: [practicePart("你的關係", s2)] },
    {
      day: 3,
      title: "第 3 天｜你怎麼表現",
      prompt: "這個模式出現時，我通常怎麼做？",
      parts: [practicePart("你怎麼表現", s3)],
    },
    {
      day: 4,
      title: "第 4 天｜陰影模式",
      prompt: "同一個長處用得太滿時，哪裡開始失衡？",
      parts: [practicePart("陰影模式", s4)],
    },
    {
      day: 5,
      title: "第 5 天｜生命方向",
      prompt: "今天從生命方向裡回看一個角度。",
      parts: [practicePart("本源", s5Origin)],
    },
    {
      day: 6,
      title: "第 6 天｜價值與接收 × 內在主權",
      prompt: "當交換與選擇同時出現時，我真正同意的是什麼？這個決定又是怎麼作出的？",
      parts: [practicePart("價值與接收", s6), practicePart("內在主權", s7)],
    },
    {
      day: 7,
      title: "第 7 天｜你帶來的貢獻 × 回到生活",
      prompt: "我參與其中時帶來了什麼？事情把我拉散之後，我怎麼回到生活？",
      parts: [practicePart("你帶來的貢獻", s8), practicePart("回到生活", s9)],
    },
  ];

  const missing = [...blocks, ...s5].filter((item) => item.missing).map((item) => `${item.moduleTitle} ${item.code}`);

  return {
    birthDateDisplay: `${year}年${month}月${day}日`,
    foundationCodes: code.codeString,
    blocks,
    s5,
    days,
    missing,
    duplicateIndexes,
    englishCodesNotUsedForCopy: {
      s4: code.s4Code,
      s5: code.s5Code,
      s6: code.s6Code,
    },
  };
}
