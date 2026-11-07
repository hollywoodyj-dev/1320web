import fs from "node:fs";
import { claimProblems, claimSetProblems, claimsForSignature } from "../lib/gzh/tw-v2-claims";
import { isTwV2ReportEnabled } from "../lib/gzh/tw-v2-report-access";
import { buildTwV2Report, customerVisibleText } from "../lib/gzh/tw-v2-report";

function assert(condition: unknown, label: string) {
  if (!condition) {
    console.error(`FAIL ${label}`);
    process.exitCode = 1;
    throw new Error(label);
  }
  console.log(`PASS ${label}`);
}

const full = buildTwV2Report(1980, 5, 22, "FULL");
assert(full.status === "REFERENCE_SAMPLE", "fixture has the reference sample");
assert(
  full.codes.join(" / ") === "S1-18 / S3-03 / S2-27 / S0-07 / S4-14 / S5-04 / S6-28 / S7-00 / S8-00 / S9-07",
  "fixture codes",
);
if (full.status !== "REFERENCE_SAMPLE") throw new Error("status");
assert(full.chapters.map((chapter) => chapter.id).join(",") === "01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,ethics", "full chapter order");
assert(full.days?.[4]?.modules === "S5", "day 5 is the whole S5");
assert(full.days?.[5]?.modules === "S6 + S7" && full.days?.[6]?.modules === "S8 + S9", "day 6 and day 7");
const overview = full.chapters.find((chapter) => chapter.id === "02");
const table = overview?.blocks.find((block) => block.type === "table");
assert(table?.type === "table" && table.rows.length === 10, "overview lists ten codes");
const text = customerVisibleText(full);
assert(text.includes("靈魂震盪鏡像"), "uses the requested S2 name");
assert(text.includes("保護自身安全比尋找任何「靈魂意義」更重要"), "S2 safety line");
assert(text.includes("不是靈魂高低、成熟程度或人的優劣排名"), "S3 is not a rank");
assert(text.includes("也不是收入或成功的保證"), "S6 makes no income promise");
assert(text.includes("不是回到某個神秘的地方"), "S9 return stays ordinary");
assert(text.includes("不預測未來"), "ethics statement");
assert(!text.includes("天生具備"), "five-field ability claim stays out");
assert(!text.includes("source_field") && !text.includes("approval_id") && !text.includes("取模"), "no internal fields");
const chapterText = (id: string) =>
  full.chapters
    .find((chapter) => chapter.id === id)
    ?.blocks.map((block) => (block.type === "table" ? block.rows.flat().join(" ") : block.text))
    .join("\n") ?? "";
const chapter7Text = chapterText("07");
assert(/S1/.test(chapter7Text) && /S0/.test(chapter7Text) && !/S4/.test(chapter7Text) && !/S9/.test(chapter7Text), "chapter 7 stays with the four codes");
const chapter14 = chapterText("14");
assert(["S1", "S3", "S4", "S5", "S2", "S0", "S7", "S6", "S8", "S9"].every((moduleId) => chapter14.includes(moduleId)), "chapter 14 reaches the ten modules");

const sample = buildTwV2Report(1980, 5, 22, "SAMPLE", "工作與界限");
assert(sample.status === "REFERENCE_SAMPLE", "sample product still uses the same narrative");
if (sample.status !== "REFERENCE_SAMPLE") throw new Error("sample status");
assert(sample.chapters.every((chapter) => !["08", "14", "15"].includes(chapter.id)), "sample hides extension chapters");
assert(sample.days === null, "sample has no seven-day map");
assert(sample.readerFocus === "工作與界限", "reader focus stays labeled and separate");
const sampleText = customerVisibleText(sample);
assert(!sampleText.includes("S4-14") && !sampleText.includes("完美循環"), "sample overview drops extension rows");

const blocked = buildTwV2Report(1991, 7, 15);
assert(blocked.status === "BLOCKED_NO_APPROVED_SOURCE", "another date stays closed");
assert(!customerVisibleText(blocked).includes("如果我不再需要透過受苦來證明成長"), "closed date does not reuse the sample");
assert(blocked.codes.length === 10 && blocked.codes.join("|") !== full.codes.join("|"), "closed date still has its own codes");

const claims = claimsForSignature(full.codes);
assert(claims.length === 5, "five internal claims for this signature");
assert(claims.every((claim) => claimProblems(claim, full.codes).length === 0), "each claim matches the contract");
assert(claimSetProblems(claims).length === 0, "the claim set covers a real cross-code reading");
assert(claims.every((claim) => claim.editorial_status === "PENDING_REVIEW"), "claims are not approved for sale");
assert(claimsForSignature(blocked.codes).length === 0, "another signature gets no claims");

const page = fs.readFileSync(new URL("../app/(site)/tw-v2-report/page.tsx", import.meta.url), "utf8");
assert(!page.includes("1980-05-22.claims"), "the page does not render internal claims");
assert(isTwV2ReportEnabled("www.1320soulcode.com") === false, "production host closed");
assert(isTwV2ReportEnabled("localhost:3026") === true, "local reading open");
console.log("PASS tw v2 report");
