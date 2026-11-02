/**
 * Preview-only Traditional Chinese full report wiring.
 * Run: npx tsx scripts/smoke-tw-full-report-preview.ts
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { buildTwFullReportPreview } from "../lib/gzh/build-tw-full-report-preview";
import { lockedEditorialFiles } from "../lib/gzh/locked-editorial";
import { isTwFullReportPreviewEnabled } from "../lib/gzh/tw-full-report-preview-access";

const SIMPLIFIED = "这来个对时样过还进问体学东车长门国发与会为从应当总结种类术经现实开关无电点云";
const ENGLISH_LEAKS = [
  "transformation",
  "go deeper",
  "embody light",
  "remembrance",
  "spiritual completion",
  "sovereignty frequency",
  "soul impact",
  "Return to Source",
  "Divine",
  "soul homecoming",
  "money frequency",
  "body as oracle",
  "spiritual maturity",
];

function assert(condition: unknown, label: string) {
  if (!condition) {
    console.error(`FAIL ${label}`);
    process.exitCode = 1;
    throw new Error(label);
  }
  console.log(`PASS ${label}`);
}

function visibleText(report: ReturnType<typeof buildTwFullReportPreview>): string {
  const chunks = [
    ...report.blocks.flatMap((block) => [block.moduleTitle, block.entryTitle, block.note ?? "", ...block.paragraphs]),
    ...report.s5.flatMap((block) => [block.moduleTitle, block.entryTitle, ...block.paragraphs]),
    ...report.days.flatMap((day) => [day.title, day.prompt, ...day.parts.flatMap((part) => part.lines.map((line) => line.text))]),
  ];
  return chunks.join("\n");
}

function main() {
  assert(isTwFullReportPreviewEnabled("localhost:3000") === true, "local preview opens");
  assert(isTwFullReportPreviewEnabled("www.1320soulcode.com") === false, "production host stays closed");
  const previous = process.env.VERCEL_ENV;
  process.env.VERCEL_ENV = "production";
  assert(isTwFullReportPreviewEnabled("preview.example.com") === false, "vercel production stays closed");
  assert(isTwFullReportPreviewEnabled("localhost:3022") === true, "localhost stays open for reading");
  process.env.VERCEL_ENV = previous;

  const report = buildTwFullReportPreview(1980, 5, 22);
  assert(report.foundationCodes.includes("S1-18"), "fixture s1");
  assert(report.foundationCodes.includes("S3-03"), "fixture s3");
  assert(report.foundationCodes.includes("S2-27"), "fixture s2");
  assert(report.foundationCodes.includes("S0-07"), "fixture s0");
  assert(report.missing.length === 0, `fixture has no missing locked entries: ${report.missing.join(", ")}`);
  assert(report.duplicateIndexes.length === 0, "locked files have no duplicate indexes");
  assert(report.blocks[0]?.imageUrl === "/S1-44/S18.webp", "fixture s1 totem");
  assert(report.blocks[1]?.imageUrl === "/S3-12/S03.webp", "fixture s3 totem");
  assert(report.blocks[2]?.imageUrl === "/S2-50/S2-27.webp", "fixture s2 totem");
  assert(report.blocks[3]?.imageUrl === "/S0-19/S0-07.webp", "fixture s0 totem");
  assert(report.blocks.slice(0, 4).every((block) => Boolean(block.imageUrl)), "foundation totems resolve");
  assert(report.s5.every((block) => Boolean(block.imageUrl)), "s5 blocks keep their layer totems");
  assert(report.s5.length === 4, "s5 keeps four blocks");
  assert(
    report.s5.map((block) => block.moduleTitle).join("|") === "本源|你的關係|你怎麼表現|你反覆回到的模式",
    "s5 block order",
  );
  assert(report.days.length === 7, "seven days");
  assert(report.days.every((day, index) => day.day === index + 1), "day numbers 1 through 7");
  assert(!report.days.some((day) => day.title.includes("你反覆回到的模式") && day.day !== 5), "s0 has no day");
  assert(!report.days[4].title.includes("四塊"), "day 5 does not reprint all four s5 blocks");
  assert(report.days[4].parts.length === 1, "day 5 reads one angle");
  assert(report.days[5].parts.length === 2, "day 6 keeps two sections apart");
  assert(report.days[6].parts.length === 2, "day 7 keeps two sections apart");
  const pageSource = readFileSync(path.join(process.cwd(), "app", "(site)", "tw-full-report", "page.tsx"), "utf8");
  assert(pageSource.includes("第 7 天不是完成"), "day 7 is explicitly not completion");
  assert(pageSource.includes("這七天沒有單獨的一天對應它"), "s0 is not given a day");
  assert(
    report.days.every((day) => day.parts.every((part) => part.lines.some((line) => line.label === "今天留意" && line.source === "fallback"))),
    "notice line uses the approved fallback",
  );

  const text = visibleText(report);
  const sevenDay = readFileSync(path.join(process.cwd(), "docs", "gzh", "1320_SEVEN_DAY_EDITORIAL_PASS_v0.1.md"), "utf8");
  for (const phrase of ["七日回看練習", "七天 · 每天一小部分 · 和生活放在一起看", "漏掉一天，也沒關係", NOTICE]) {
    assert(sevenDay.includes(phrase), `seven-day source contains ${phrase}`);
  }
  for (const phrase of ENGLISH_LEAKS) {
    assert(!text.toLowerCase().includes(phrase.toLowerCase()), `no english leak ${phrase}`);
  }
  const simplifiedHits = [...text].filter((char) => SIMPLIFIED.includes(char));
  assert(simplifiedHits.length === 0, `no simplified characters: ${simplifiedHits.join("")}`);
  assert(
    !lockedEditorialFiles().some((fileName) => fileName.includes("1320-v2-locale")),
    "locale zh is not a source file",
  );
  assert(
    !readFileSync(path.join(process.cwd(), "app", "(site)", "tw-full-report", "page.tsx"), "utf8").includes("1320-v2-locale"),
    "preview page does not read locale zh",
  );
  assert(
    !readFileSync(path.join(process.cwd(), "lib", "gzh", "build-tw-full-report-preview.ts"), "utf8").includes("one_week_practice"),
    "page 15 does not read stored one_week_practice",
  );

  if (process.exitCode) throw new Error("smoke failed");
  console.log("PASS traditional chinese full report preview");
}

const NOTICE = "今天只留意一件和這段內容有關的事。";

main();
