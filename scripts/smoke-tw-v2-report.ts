import fs from "node:fs";
import {
  approvedContentProgress,
  approvedCustomerThreads,
  sampleFullDifference,
} from "../lib/gzh/tw-v2-blueprint";
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
assert(full.codeMap.length === 10 && full.codeMap[1]?.name === "探索振動", "ten-code map uses sample names");
assert(full.snapshot?.theme === "當改變、探索與完美要求相遇", "full snapshot belongs to this signature");
assert(full.approvedThreads.length === 0, "pending claims stay out of customer threads");
const overview = full.chapters.find((chapter) => chapter.id === "02");
const table = overview?.blocks.find((block) => block.type === "table");
assert(table?.type === "table" && table.rows.length === 10, "overview lists ten codes");
const journal = full.chapters.find((chapter) => chapter.id === "16");
assert(journal?.blocks.some((block) => block.type === "blank"), "journal keeps writing space");
const text = customerVisibleText(full);
assert(text.includes("靈魂震盪鏡像"), "uses the requested S2 name");
assert(text.includes("保護自身安全比尋找任何「靈魂意義」更重要"), "S2 safety line");
assert(text.includes("不是靈魂高低、成熟程度或人的優劣排名"), "S3 is not a rank");
assert(text.includes("也不是收入或成功的保證"), "S6 makes no income promise");
assert(text.includes("涉及人身安全、健康、法律或財務風險的事項"), "S4 names the professional boundary");
assert(text.includes("深度理解如何成為他人可以使用的價值"), "S6 states value without a wealth claim");
assert(overview?.title === "02｜你的專屬藍圖總覽", "overview chapter title stays once");
assert(text.includes("當改變、探索與完美要求相遇"), "overview leads with this combination");
assert(!overview?.blocks.some((block) => block.type === "h3" && block.text === "你的專屬藍圖總覽"), "overview body does not repeat the title");
assert(!text.includes("你原本只想解決工作裡的一個難題"), "S3 uses a hypothetical opening");
assert(!text.includes("你可能在同一個星期裡"), "chapter 14 does not narrate a real week");
const overviewCards = overview?.blocks.find((block) => block.type === "cards");
assert(overviewCards?.type === "cards" && overviewCards.items.length === 5, "overview has five claim-aligned cards");
const claimCodeSets = claimsForSignature(full.codes).map((claim) => claim.code_ids.map((code) => code.slice(0, 2)).join(" · "));
assert(
  overviewCards?.type === "cards" &&
    overviewCards.items.every((item) => claimCodeSets.includes(item.codes)),
  "overview cards use the same code sets as chapter 14 claims",
);
assert(!text.includes("神秘的財富能力"), "the withdrawn wealth phrase stays out");
assert(!text.includes("你原本只是想讓事情不要失控") && !text.includes("你也可能沒有問自己"), "S5 and S7 do not narrate a real history");
assert(text.includes("不是回到某個神秘的地方"), "S9 return stays ordinary");
assert(text.includes("不預測未來"), "ethics statement");
assert(!text.includes("天生具備"), "five-field ability claim stays out");
assert(!text.includes("source_field") && !text.includes("approval_id") && !text.includes("取模"), "no internal fields");
const chapterText = (id: string) =>
  full.chapters
    .find((chapter) => chapter.id === id)
    ?.blocks.map((block) => {
      if (block.type === "table") return block.rows.flat().join(" ");
      if (block.type === "cards") return block.items.map((item) => item.title).join(" ");
      if (block.type === "blank") return "";
      return block.text;
    })
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
assert(sample.snapshot === null, "sample has no full-only snapshot");
assert(sample.readerFocus === "工作與界限", "reader focus stays labeled and separate");
const sampleText = customerVisibleText(sample);
assert(!sampleText.includes("S4-14") && !sampleText.includes("完美循環") && !sampleText.includes("專屬藍圖總覽"), "sample overview drops extension rows");

const blocked = buildTwV2Report(1991, 7, 15);
assert(blocked.status === "BLOCKED_NO_APPROVED_SOURCE", "another date stays closed");
assert(!customerVisibleText(blocked).includes("如果我不再需要透過受苦來證明成長"), "closed date does not reuse the sample");
assert(blocked.codes.length === 10 && blocked.codes.join("|") !== full.codes.join("|"), "closed date still has its own codes");
assert(blocked.codeMap.every((node) => node.name === ""), "blocked date does not invent archetype names");
assert(blocked.snapshot === null, "blocked date has no snapshot");

const other = buildTwV2Report(1990, 1, 1);
assert(other.status === "BLOCKED_NO_APPROVED_SOURCE", "a third date also stays closed");
assert(other.codes.join("|") !== blocked.codes.join("|"), "different birthdays keep different code maps");

const third = buildTwV2Report(2008, 12, 8, "FULL");
assert(third.status === "EDITORIAL_CANDIDATE", "2008 is a preview candidate, not approved");
assert(
  third.codes.join(" / ") === "S1-10 / S3-03 / S2-20 / S0-01 / S4-01 / S5-33 / S6-14 / S7-00 / S8-07 / S9-00",
  "2008 fixture codes",
);
assert(third.customerRender === "BLOCKED", "2008 stays blocked for customer delivery");
assert(Boolean(third.ageGate), "2008 keeps the under-18 internal gate");
assert(customerVisibleText(third).includes("守護者"), "2008 candidate keeps its own narrative");
assert(!customerVisibleText(third).includes("當改變、探索與完美要求相遇"), "2008 does not reuse the 1980 overview");
assert(customerVisibleText(third).includes("保護安全比為這些互動尋找任何「靈魂意義」更重要") || customerVisibleText(third).includes("保護安全"), "2008 keeps S2 safety");

const claims = claimsForSignature(full.codes);
assert(claims.length === 5, "five internal claims for this signature");
assert(claims.every((claim) => claimProblems(claim, full.codes).length === 0), "each claim matches the contract");
assert(claimSetProblems(claims).length === 0, "the claim set covers a real cross-code reading");
assert(claims.every((claim) => claim.editorial_status === "PENDING_REVIEW"), "claims are not approved for sale");
assert(approvedCustomerThreads(full.codes).length === 0, "customer threads wait for APPROVED");
assert(claimsForSignature(blocked.codes).length === 0, "another signature gets no claims");
const claims2008 = claimsForSignature(third.codes);
assert(claims2008.length === 5 && claims2008.every((claim) => claim.editorial_status === "PENDING_REVIEW"), "2008 claims stay pending");
assert(approvedCustomerThreads(third.codes).length === 0, "2008 pending claims stay out of customer threads");

const progress = approvedContentProgress();
assert(progress.expected === 258 && progress.approved === 0 && progress.status === "BLOCKED", "258-code content stays unapproved");
assert(sampleFullDifference().length >= 6, "sample and full difference table exists");

const page = fs.readFileSync(new URL("../app/(site)/tw-v2-report/page.tsx", import.meta.url), "utf8");
assert(!page.includes("1980-05-22.claims"), "the page does not render internal claims");
assert(!page.includes("v1.0") && !page.includes("七日對應"), "the page leaves internal labels out");
assert(page.includes("CodeMap") && page.includes("ReportToolbar"), "reading tools are on the page");
assert(page.includes("編碼已產生，敘事尚未核准") || page.includes("內部候選敘事"), "page keeps the release guard wording");
const summary = fs.readFileSync(new URL("../app/(site)/tw-v2-report/summary/page.tsx", import.meta.url), "utf8");
assert(summary.includes("隱藏出生日期") || summary.includes("hideBirthday"), "summary can hide the birthday");
const difference = fs.readFileSync(new URL("../app/(site)/tw-v2-report/difference/page.tsx", import.meta.url), "utf8");
assert(difference.includes("價格與結帳流程不在這裡改動"), "difference page does not change checkout");
assert(isTwV2ReportEnabled("www.1320soulcode.com") === false, "production host closed");
assert(isTwV2ReportEnabled("localhost:3026") === true, "local reading open");
console.log("PASS tw v2 report");
