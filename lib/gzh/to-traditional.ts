import OpenCC from "opencc-js";

/**
 * Simplified readings already in the content database, shown as Taiwan Traditional.
 * OpenCC turns 疗愈 into 療愈; Taiwan writes 療癒. Phrase fixes below run after that conversion.
 * 本來 → 原本 matches the reviewed public wording.
 */
const toTw = OpenCC.ConverterFactory(
  OpenCC.Locale.from.cn,
  OpenCC.Locale.to.tw,
  [
    [
      ["本來", "原本"],
      ["“", "「"],
      ["”", "」"],
      ["‘", "『"],
      ["’", "』"],
    ],
  ],
);

/**
 * Applied after OpenCC, longest phrase first.
 * These are the reviewed P0/P1 lines for the Taiwan free report.
 */
const TW_FREE_REPORT_GLOSSARY: readonly (readonly [string, string])[] = [
  ["頻率讀懂能力", "讀取頻率的能力"],
  ["他人的眼光比自己的真實", "他人的眼光比自己的感受"],
  ["情緒等於真相", "把情緒當成真相"],
  ["靈魂幼化", "靈魂初始階段"],
  ["看破幻相", "看穿幻象"],
  ["能量邏輯", "能量的運作邏輯"],
  ["高維感知", "高層次感知"],
  ["具未來感", "帶有未來感"],
  ["依戀風格", "依附風格"],
  ["激活他人", "喚醒他人"],
  ["必須防禦", "必須防備"],
  ["量域者", "跨域者"],
  ["療愈", "療癒"],
  ["激活", "喚醒"],
  ["評判", "批判"],
];

export function toTraditional(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";
  let converted = toTw(trimmed);
  for (const [from, to] of TW_FREE_REPORT_GLOSSARY) {
    if (converted.includes(from)) converted = converted.replaceAll(from, to);
  }
  return converted;
}

/** Split a Chinese reading into short lines for the free report. */
export function traditionalLines(text: string): string[] {
  const converted = toTraditional(text);
  if (!converted) return [];
  const parts = converted
    .split(/(?<=[。！？])/)
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.length > 0 ? parts : [converted];
}
