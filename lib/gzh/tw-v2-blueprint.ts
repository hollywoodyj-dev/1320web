import contentStatus from "@/data/1320-tw-v2/approved-content-status.json";
import { claimsForSignature, type IntegrationClaim } from "@/lib/gzh/tw-v2-claims";
import type { V2Block, V2Chapter, V2Product } from "@/lib/gzh/tw-v2-report";

export type CodeNode = {
  code: string;
  module: string;
  name: string;
  mirror: string;
  layer: "foundation" | "extension";
};

export type BlueprintSnapshot = {
  title: string;
  theme: string;
  lead: string;
  questionLead: string;
  question: string;
  readingQuestion: string;
  cards: Array<{ label: string; title: string; codes: string }>;
};

const FOUNDATION = new Set(["S0", "S1", "S2", "S3"]);

export function moduleOf(code: string): string {
  return code.slice(0, 2);
}

export function approvedContentProgress(): {
  expected: number;
  approved: number;
  status: string;
} {
  const modules = Object.values(contentStatus.modules);
  return {
    expected: modules.reduce((sum, item) => sum + item.expected, 0),
    approved: modules.reduce((sum, item) => sum + item.approved, 0),
    status: contentStatus.status,
  };
}

export function codeMapFromCodes(codes: string[], namedRows?: string[][]): CodeNode[] {
  const byCode = new Map<string, { name: string; mirror: string }>();
  for (const row of namedRows ?? []) {
    const codeCell = row[0] ?? "";
    const code = codeCell.split("｜")[0]?.trim() ?? "";
    if (!code) continue;
    byCode.set(code, {
      name: row[1]?.trim() ?? "",
      mirror: row[2]?.trim() ?? "",
    });
  }
  return codes.map((code) => {
    const moduleId = moduleOf(code);
    const named = byCode.get(code);
    return {
      code,
      module: moduleId,
      name: named?.name ?? "",
      mirror: named?.mirror ?? "",
      layer: FOUNDATION.has(moduleId) ? "foundation" : "extension",
    };
  });
}

export function overviewTableRows(chapters: V2Chapter[]): string[][] {
  const overview = chapters.find((chapter) => chapter.id === "02");
  const table = overview?.blocks.find((block) => block.type === "table");
  return table?.type === "table" ? table.rows : [];
}

export function snapshotFromChapter(chapter: V2Chapter | undefined): BlueprintSnapshot | null {
  if (!chapter) return null;
  const cards = chapter.blocks.find((block) => block.type === "cards");
  if (!cards || cards.type !== "cards") return null;
  const paragraphs = chapter.blocks.filter((block) => block.type === "p").map((block) => block.text);
  return {
    title: "你的專屬藍圖總覽",
    theme: paragraphs[0] ?? "",
    lead: paragraphs[1] ?? "",
    questionLead: paragraphs[2] ?? "",
    question: paragraphs[3] ?? "",
    readingQuestion: paragraphs.find((text) => text.includes("最希望重新理解")) ?? "",
    cards: cards.items,
  };
}

/** Keep chapter 02 cards aligned with the same claim set used by chapter 14. */
export function overviewCardsFromClaims(
  claims: Array<{ code_ids: string[]; customer_text_zh_tw: string }>,
): Array<{ label: string; title: string; codes: string }> {
  const labels = ["第一條線索", "第二條線索", "第三條線索", "第四條線索", "第五條線索"];
  return claims.slice(0, 5).map((claim, index) => ({
    label: labels[index] ?? `線索 ${index + 1}`,
    title: claim.customer_text_zh_tw.slice(0, 18).replace(/[？?].*$/, "") || claim.code_ids.join(" × "),
    codes: claim.code_ids.map((code) => code.slice(0, 2)).join(" · "),
  }));
}

/** Customer-facing threads only when every claim for this signature is APPROVED. */
export function approvedCustomerThreads(codes: string[]): Array<{
  codes: string[];
  relation: IntegrationClaim["relation_type"];
  text: string;
}> {
  const claims = claimsForSignature(codes);
  if (!claims.length || claims.some((claim) => claim.editorial_status !== "APPROVED")) {
    return [];
  }
  return claims.map((claim) => ({
    codes: claim.code_ids,
    relation: claim.relation_type,
    text: claim.customer_text_zh_tw,
  }));
}

export function withJournalBlanks(chapters: V2Chapter[], product: V2Product): V2Chapter[] {
  if (product !== "FULL") return chapters;
  return chapters.map((chapter) => {
    if (chapter.id !== "16") return chapter;
    const blocks: V2Block[] = [];
    for (const block of chapter.blocks) {
      blocks.push(block);
      if (block.type !== "p") continue;
      if (block.text.includes("？")) {
        blocks.push({ type: "blank", lines: 3 });
      } else if (/^我(最有共鳴|暫時沒有共鳴|真正試過|想繼續保留)/.test(block.text)) {
        blocks.push({ type: "blank", lines: 1 });
      }
    }
    return { ...chapter, blocks };
  });
}

export function sampleFullDifference() {
  return [
    {
      label: "四大基礎編碼 S1／S3／S2／S0",
      sample: "完整閱讀",
      full: "完整保留",
    },
    {
      label: "四碼整合（第 07 章）",
      sample: "基礎體驗，與完整版一致",
      full: "保留",
    },
    {
      label: "S4–S9 六個延伸編碼",
      sample: "不包含",
      full: "完整敘事",
    },
    {
      label: "十碼個人藍圖總覽",
      sample: "不包含",
      full: "依實際十碼生成的專屬總覽",
    },
    {
      label: "第 14 章深度整合",
      sample: "不包含",
      full: "4–5 條有依據的組合分析",
    },
    {
      label: "七日練習與反思日記",
      sample: "不含正式完整版",
      full: "完整七日與書寫空間",
    },
    {
      label: "交付方式",
      sample: "網頁試讀",
      full: "在線閱讀、可列印摘要、一頁摘要圖卡",
    },
  ];
}
