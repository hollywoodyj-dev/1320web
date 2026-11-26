import fs from "node:fs";
import {
  approvedContentProgress,
  approvedCustomerThreads,
  sampleFullDifference,
} from "../lib/gzh/tw-v2-blueprint";
import { claimProblems, claimSetProblems, claimsForSignature } from "../lib/gzh/tw-v2-claims";
import { isTwV2ReportEnabled } from "../lib/gzh/tw-v2-report-access";
import { buildTwV2Report, customerVisibleText, TW_V2_REVIEW_BIRTHDAYS } from "../lib/gzh/tw-v2-report";
import {
  releaseGateSummary,
  s1ApprovedCount,
  s1CandidateFor,
  s1CustomerPublishableCodes,
  s1EditorialCandidateCount,
  s1NamePatchFor,
  s1NeedsRevisionCount,
  s1PendingCount,
  s1ReviewMeta,
} from "../lib/gzh/tw-v2-s1-library";
import {
  s3ApprovedCount,
  s3CandidateFor,
  s3CustomerPublishableCodes,
  s3EditorialCandidateCount,
  s3PendingCount,
  s3UnreachableCodes,
} from "../lib/gzh/tw-v2-s3-library";
import {
  s2AllHaveRequiredSafetyBoundary,
  s2ApprovedCount,
  s2CandidateFor,
  s2CustomerPublishableCodes,
  s2EditorialCandidateCount,
  s2PendingCount,
  s2RequiredSafetyBoundary,
  s2UnreachableCodes,
} from "../lib/gzh/tw-v2-s2-library";
import {
  s0ApprovedCount,
  s0CandidateFor,
  s0CustomerPublishableCodes,
  s0EditorialCandidateCount,
  s0PendingCount,
} from "../lib/gzh/tw-v2-s0-library";
import {
  s4AllHaveRequiredSafetyBoundary,
  s4ApprovedCount,
  s4CandidateFor,
  s4CustomerPublishableCodes,
  s4EditorialCandidateCount,
  s4PendingCount,
  s4RequiredSafetyBoundary,
} from "../lib/gzh/tw-v2-s4-library";
import {
  s5ApprovedCount,
  s5CandidateFor,
  s5CustomerPublishableCodes,
  s5EditorialCandidateCount,
  s5PendingCount,
} from "../lib/gzh/tw-v2-s5-library";
import {
  s6ApprovedCount,
  s6CandidateFor,
  s6CustomerPublishableCodes,
  s6EditorialCandidateCount,
  s6PendingCount,
} from "../lib/gzh/tw-v2-s6-library";
import {
  s7ApprovedCount,
  s7CandidateFor,
  s7CustomerPublishableCodes,
  s7EditorialCandidateCount,
  s7PendingCount,
} from "../lib/gzh/tw-v2-s7-library";
import {
  s8ApprovedCount,
  s8CandidateFor,
  s8CustomerPublishableCodes,
  s8EditorialCandidateCount,
  s8PendingCount,
} from "../lib/gzh/tw-v2-s8-library";
import {
  s9ApprovedCount,
  s9CandidateFor,
  s9CustomerPublishableCodes,
  s9EditorialCandidateCount,
  s9PendingCount,
} from "../lib/gzh/tw-v2-s9-library";
import {
  definitionFirstExample,
  definitionFirstRequiredFields,
  definitionFirstStandardMeta,
} from "../lib/gzh/tw-v2-definition-first";
import {
  reportBlueprintRc1AllPending,
  reportBlueprintRc1DemoCodesForDate,
  reportBlueprintRc1ForDate,
  reportBlueprintRc1LockedSafety,
  reportBlueprintRc1Meta,
} from "../lib/gzh/tw-v2-report-blueprint-rc1";
import {
  twoReferenceSetsRc3AllPending,
  twoReferenceSetsRc3ForDate,
  twoReferenceSetsRc3LockedSafety,
  twoReferenceSetsRc3Meta,
} from "../lib/gzh/tw-v2-report-two-reference-rc3";

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
assert(overviewCards?.type === "cards" && overviewCards.items.length === 5, "overview keeps five calibration cards");
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
assert(
  chapter7Text.includes("情境二") && chapter7Text.includes("關係與生活安排"),
  "1980 Full ch07 adds a second life-domain scenario",
);
const chapter14 = chapterText("14");
assert(["S1", "S3", "S4", "S5", "S2", "S0", "S7", "S6", "S8", "S9"].every((moduleId) => chapter14.includes(moduleId)), "chapter 14 reaches the ten modules");

const sample = buildTwV2Report(1980, 5, 22, "SAMPLE", "工作與界限");
assert(sample.status === "REFERENCE_SAMPLE", "sample product still uses the same narrative");
if (sample.status !== "REFERENCE_SAMPLE") throw new Error("sample status");
assert(
  sample.chapters.map((chapter) => chapter.id).join(",") === "map,01,02,03,04,05,06,07",
  "sample uses gold Free Sample chapter order",
);
assert(sample.chapters.every((chapter) => !["08", "14", "15"].includes(chapter.id)), "sample hides extension chapters");
assert(sample.days === null, "sample has no seven-day map");
assert(sample.snapshot === null, "sample has no full-only snapshot");
assert(sample.readerFocus === "工作與界限", "reader focus stays labeled and separate");
const sampleText = customerVisibleText(sample);
assert(sampleText.includes("這個原型是什麼？"), "sample renders full per-code definition heading");
assert(sampleText.includes("日常生活對照"), "sample renders daily-life example section");
assert(
  sampleText.includes("如果關係裡存在威脅、操控或傷害，保護自身安全比尋找任何『靈魂意義』更重要。"),
  "sample keeps locked S2 safety sentence",
);
assert(sampleText.length >= 5500, "sample longform is not a short essence excerpt");
assert(!sampleText.includes("S4-14") && !sampleText.includes("完美循環"), "sample omits Full-only S4 extension");

const sample1983 = buildTwV2Report(1983, 3, 8, "SAMPLE");
assert(sample1983.status === "EDITORIAL_CANDIDATE", "1983 Free Sample gold is available");
assert(
  sample1983.codes.join("|") === "S1-21|S3-01|S2-11|S0-12",
  "1983 sample shows foundation four codes",
);
assert(customerVisibleText(sample1983).includes("整合者"), "1983 sample keeps its own archetypes");
assert(buildTwV2Report(1983, 3, 8, "FULL").status === "BLOCKED_NO_APPROVED_SOURCE", "1983 Full remains unavailable");

const blocked = buildTwV2Report(1991, 7, 15);
assert(blocked.status === "BLOCKED_NO_APPROVED_SOURCE", "another date stays closed");
assert(!customerVisibleText(blocked).includes("如果我不再需要透過受苦來證明成長"), "closed date does not reuse the sample");
assert(blocked.codes.length === 10 && blocked.codes.join("|") !== full.codes.join("|"), "closed date still has its own codes");
assert(blocked.codeMap.every((node) => node.name === ""), "blocked date does not invent archetype names");
assert(blocked.snapshot === null, "blocked date has no snapshot");

const other = buildTwV2Report(1990, 1, 1);
assert(other.status === "BLOCKED_NO_APPROVED_SOURCE", "a third date also stays closed");
assert(other.codes.join("|") !== blocked.codes.join("|"), "different birthdays keep different code maps");

const second = buildTwV2Report(1982, 2, 3, "FULL");
assert(second.status === "EDITORIAL_CANDIDATE", "1982 is a preview candidate, not approved");
assert(
  second.codes.join(" / ") === "S1-20 / S3-01 / S2-05 / S0-05 / S4-10 / S5-26 / S6-26 / S7-01 / S8-05 / S9-04",
  "1982 fixture codes",
);
assert(second.customerRender === "BLOCKED", "1982 stays blocked for customer delivery");
const secondText = customerVisibleText(second);
assert(secondText.includes("心覺者") && secondText.includes("種子振動"), "1982 keeps its own archetypes");
assert(!secondText.includes("當改變、探索與完美要求相遇"), "1982 does not reuse the 1980 overview");
assert(!secondText.includes("轉化者"), "1982 is not a renamed 1980 template");
const secondCh7 =
  second.chapters
    .find((chapter) => chapter.id === "07")
    ?.blocks.map((block) => ("text" in block ? block.text : ""))
    .join("\n") ?? "";
assert(
  secondCh7.includes("情境二") && secondCh7.includes("陌生環境"),
  "1982 Full ch07 adds unfamiliar-environment incremental value",
);
assert(secondText.includes("威脅") || secondText.includes("操控") || secondText.includes("傷害"), "1982 keeps S2 safety");
assert(secondText.includes("人身安全") || secondText.includes("專業標準"), "1982 keeps S4 professional boundary");

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
assert(second.codes.join("|") !== full.codes.join("|") && second.codes.join("|") !== third.codes.join("|"), "three fixtures stay distinct");

const fourth = buildTwV2Report(2013, 6, 12, "FULL");
assert(fourth.status === "EDITORIAL_CANDIDATE", "2013 is a preview candidate, not approved");
assert(
  fourth.codes.join(" / ") === "S1-06 / S3-02 / S2-18 / S0-15 / S4-13 / S5-26 / S6-23 / S7-02 / S8-03 / S9-08",
  "2013 fixture codes",
);
assert(fourth.customerRender === "BLOCKED", "2013 stays blocked for customer delivery");
assert(Boolean(fourth.ageGate), "2013 keeps the under-18 internal gate");
const fourthText = customerVisibleText(fourth);
assert(fourthText.includes("愈合者") && fourthText.includes("成就鏡像") && fourthText.includes("孤獨幻象"), "2013 keeps its own archetypes");
assert(!fourthText.includes("當改變、探索與完美要求相遇"), "2013 does not reuse the 1980 overview");
assert(!fourthText.includes("心覺者") && !fourthText.includes("轉化者"), "2013 is not a renamed earlier template");
assert(fourthText.includes("威脅") || fourthText.includes("欺凌") || fourthText.includes("傷害"), "2013 keeps S2 safety");
assert(fourthText.includes("專業標準"), "2013 keeps S4 professional boundary");
assert(fourthText.includes("成就鏡像") && fourthText.includes("孤獨幻象"), "2013 keeps S2 and S0 distinct");
assert(
  [full, second, third, fourth].map((report) => report.codes.join("|")).every((sig, index, all) => all.indexOf(sig) === index),
  "four fixtures stay distinct",
);

const claims = claimsForSignature(full.codes);
assert(claims.length === 6, "BCA pack has six pending claims for 1980");
assert(claims.every((claim) => claimProblems(claim, full.codes).length === 0), "each claim matches the contract");
assert(claimSetProblems(claims).length === 0, "the claim set covers a real cross-code reading");
assert(claims.every((claim) => claim.editorial_status === "PENDING_REVIEW"), "claims are not approved for sale");
assert(
  claims.every((claim) => claim.anchors.every((anchor) => anchor.approval_id === "PENDING_NO_APPROVAL")),
  "PENDING_NO_APPROVAL stays a non-approval placeholder",
);
assert(approvedCustomerThreads(full.codes).length === 0, "customer threads wait for APPROVED");
assert(claimsForSignature(blocked.codes).length === 0, "another signature gets no claims");
const claims1982 = claimsForSignature(second.codes);
assert(claims1982.length === 5 && claims1982.every((claim) => claim.editorial_status === "PENDING_REVIEW"), "1982 claims stay pending");
assert(approvedCustomerThreads(second.codes).length === 0, "1982 pending claims stay out of customer threads");
const claims2008 = claimsForSignature(third.codes);
assert(claims2008.length === 5 && claims2008.every((claim) => claim.editorial_status === "PENDING_REVIEW"), "2008 claims stay pending");
assert(approvedCustomerThreads(third.codes).length === 0, "2008 pending claims stay out of customer threads");
const claims2013 = claimsForSignature(fourth.codes);
assert(claims2013.length === 5 && claims2013.every((claim) => claim.editorial_status === "PENDING_REVIEW"), "2013 claims stay pending");
assert(claims2013.every((claim) => claimProblems(claim, fourth.codes).length === 0), "2013 claims match the contract");
assert(approvedCustomerThreads(fourth.codes).length === 0, "2013 pending claims stay out of customer threads");

const progress = approvedContentProgress();
assert(progress.expected === 258 && progress.approved === 0 && progress.status === "BLOCKED", "258-code content stays unapproved");
assert(s1EditorialCandidateCount() === 44 && s1ApprovedCount() === 0, "S1 has 44 candidates and zero approvals");
assert(s1PendingCount() === 44 && s1NeedsRevisionCount() === 0, "S1 RC3.2 marks all 44 as PENDING_REVIEW");
assert(s1CustomerPublishableCodes().length === 0, "S1 candidates stay out of customer publish");
assert(s1CandidateFor("S1-18")?.editorial_status === "PENDING_REVIEW" && !s1CandidateFor("S1-18")?.reviewer, "S1 lookup stays unapproved");
assert(s1CandidateFor("S1-18")?.name_zh_tw_candidate === "轉化者", "S1-18 calibration name present");
const s101 = s1CandidateFor("S1-01");
const shortDraft = s101?.content_zh_tw_candidate?.customer_narrative_short_draft ?? "";
assert(shortDraft.length > 40 && !shortDraft.startsWith(s101?.content_zh_tw_candidate?.symbolic_core ?? "___"), "S1 master narrative stays independent of symbolic core");
assert((s101?.customer_narrative_candidate?.paragraphs?.length ?? 0) === 3, "S1 RC3.2 keeps three narrative paragraphs");
assert(s1CandidateFor("S1-04")?.name_zh_tw_candidate === "基石者" && s1NamePatchFor("S1-04")?.old_zh_tw === "穩定者", "S1-04 name patch pending");
assert(s1CandidateFor("S1-11")?.name_zh_tw_candidate === "擘畫者", "S1-11 name patch pending");
assert(s1CandidateFor("S1-26")?.name_zh_tw_candidate === "前瞻者", "S1-26 name patch pending");
assert(s1CandidateFor("S1-39")?.name_zh_tw_candidate === "定錨者", "S1-39 name patch pending");
assert(s1CandidateFor("S9-01") === null, "S1 library does not invent other modules");
const review = s1ReviewMeta();
assert(review.formalApprovedCount === 0 && review.decisions.NEEDS_REVISION === 44, "prior RC2 review meta stays historical and unapproved");
const gate = releaseGateSummary();
assert(gate.publicReleaseEnabled === false && gate.customerState === "HOLD" && gate.approvedZhTwCount === 0, "release gate stays closed");
assert(gate.s1NeedsRevision === 0 && gate.s1Candidates === 44, "content status tracks S1 RC3.2 pending candidates");
assert(s3EditorialCandidateCount() === 12 && s3PendingCount() === 12 && s3ApprovedCount() === 0, "S3 has 12 pending candidates");
assert(s3CustomerPublishableCodes().length === 0, "S3 candidates stay out of customer publish");
assert(s3CandidateFor("S3-03")?.name_zh_tw_candidate === "探索振動" && !s3CandidateFor("S3-03")?.reviewer, "S3-03 calibration name stays unapproved");
assert(s3CandidateFor("S3-01")?.name_zh_tw_candidate === "種子振動", "S3-01 seed name present");
assert(s3CandidateFor("S3-02")?.name_zh_tw_candidate === "火花振動", "S3-02 spark name present");
assert(s3UnreachableCodes().join(",") === "S3-10,S3-11,S3-12", "S3-10 to S3-12 stay unreachable by formula");
assert(s3CandidateFor("S1-01") === null, "S3 library does not invent S1 codes");
assert(s2EditorialCandidateCount() === 50 && s2PendingCount() === 50 && s2ApprovedCount() === 0, "S2 has 50 pending candidates");
assert(s2CustomerPublishableCodes().length === 0, "S2 candidates stay out of customer publish");
assert(s2CandidateFor("S2-27")?.name_zh_tw_candidate === "靈魂震盪鏡像" && !s2CandidateFor("S2-27")?.reviewer, "S2-27 calibration name stays unapproved");
assert(s2CandidateFor("S2-05")?.name_zh_tw_candidate === "投射鏡像", "S2-05 projection name present");
assert(s2CandidateFor("S2-20")?.name_zh_tw_candidate === "依戀模式鏡像", "S2-20 attachment name present");
assert(s2CandidateFor("S2-18")?.name_zh_tw_candidate === "成就鏡像", "S2-18 achievement name present");
assert(s2UnreachableCodes().join(",") === "S2-01,S2-44,S2-45,S2-46,S2-47,S2-48,S2-49,S2-50", "S2 unreachable codes stay source-only");
assert(s2AllHaveRequiredSafetyBoundary(), "S2 keeps the required relationship safety sentence");
assert(
  s2RequiredSafetyBoundary() === "如果關係裡存在威脅、操控或傷害，保護自身安全比尋找任何『靈魂意義』更重要。",
  "S2 safety sentence matches the locked wording",
);
assert(s2CandidateFor("S1-01") === null, "S2 library does not invent S1 codes");
assert(s0EditorialCandidateCount() === 20 && s0PendingCount() === 20 && s0ApprovedCount() === 0, "S0 has 20 pending candidates");
assert(s0CustomerPublishableCodes().length === 0, "S0 candidates stay out of customer publish");
assert(s0CandidateFor("S0-07")?.name_zh_tw_candidate === "自我價值幻象" && !s0CandidateFor("S0-07")?.reviewer, "S0-07 calibration name stays unapproved");
assert(s0CandidateFor("S0-05")?.name_zh_tw_candidate === "情緒幻象", "S0-05 emotion name present");
assert(s0CandidateFor("S0-01")?.name_zh_tw_candidate === "存在幻象", "S0-01 existence name present");
assert(s0CandidateFor("S0-15")?.name_zh_tw_candidate === "孤獨幻象", "S0-15 loneliness name present");
assert(s0CandidateFor("S1-01") === null, "S0 library does not invent S1 codes");
assert(s4EditorialCandidateCount() === 20 && s4PendingCount() === 20 && s4ApprovedCount() === 0, "S4 has 20 pending candidates");
assert(s4CustomerPublishableCodes().length === 0, "S4 candidates stay out of customer publish");
assert(s4CandidateFor("S4-14")?.name_zh_tw_candidate === "完美循環" && !s4CandidateFor("S4-14")?.reviewer, "S4-14 calibration name stays unapproved");
assert(s4CandidateFor("S4-10")?.name_zh_tw_candidate === "防禦循環", "S4-10 defense name present");
assert(s4CandidateFor("S4-01")?.name_zh_tw_candidate === "證明循環", "S4-01 proof name present");
assert(s4CandidateFor("S4-13")?.name_zh_tw_candidate === "抗拒循環", "S4-13 resistance name present");
assert(s4AllHaveRequiredSafetyBoundary(), "S4 keeps the required professional safety sentence");
assert(
  s4RequiredSafetyBoundary() === "涉及人身安全、健康、法律或財務風險的事項，仍應遵守必要的專業標準。",
  "S4 safety sentence matches the locked wording",
);
assert(s4CandidateFor("S1-01") === null, "S4 library does not invent S1 codes");
assert(s5EditorialCandidateCount() === 44 && s5PendingCount() === 44 && s5ApprovedCount() === 0, "S5 has 44 pending candidates");
assert(s5CustomerPublishableCodes().length === 0, "S5 candidates stay out of customer publish");
assert(s5CandidateFor("S5-04")?.name_zh_tw_candidate === "結構使命" && !s5CandidateFor("S5-04")?.reviewer, "S5-04 calibration name stays unapproved");
assert(s5CandidateFor("S5-26")?.name_zh_tw_candidate === "可能性使命", "S5-26 possibility name present");
assert(s5CandidateFor("S5-33")?.name_zh_tw_candidate === "慈悲領導使命", "S5-33 compassion name present");
assert(s5CandidateFor("S5-01")?.code === "S5-01" && s5CandidateFor("S5-44")?.code === "S5-44", "S5 spans 01 to 44");
assert(s5CandidateFor("S1-01") === null, "S5 library does not invent S1 codes");
assert(s6EditorialCandidateCount() === 44 && s6PendingCount() === 44 && s6ApprovedCount() === 0, "S6 has 44 pending candidates");
assert(s6CustomerPublishableCodes().length === 0, "S6 candidates stay out of customer publish");
assert(s6CandidateFor("S6-28")?.name_zh_tw_candidate === "深度轉化者" && !s6CandidateFor("S6-28")?.reviewer, "S6-28 calibration name stays unapproved");
assert(s6CandidateFor("S6-26")?.name_zh_tw_candidate === "策略行動者", "S6-26 strategy name present");
assert(s6CandidateFor("S6-14")?.name_zh_tw_candidate === "結構流動者", "S6-14 structure name present");
assert(s6CandidateFor("S6-23")?.name_zh_tw_candidate === "可靠貢獻者", "S6-23 contribution name present");
assert(s6CandidateFor("S6-01")?.code === "S6-01" && s6CandidateFor("S6-44")?.code === "S6-44", "S6 spans 01 to 44");
assert(s6CandidateFor("S1-01") === null, "S6 library does not invent S1 codes");
assert(s7EditorialCandidateCount() === 7 && s7PendingCount() === 7 && s7ApprovedCount() === 0, "S7 has 7 pending candidates");
assert(s7CustomerPublishableCodes().length === 0, "S7 candidates stay out of customer publish");
assert(s7CandidateFor("S7-00")?.name_zh_tw_candidate === "回到自身者" && !s7CandidateFor("S7-00")?.reviewer, "S7-00 calibration name stays unapproved");
assert(s7CandidateFor("S7-01")?.name_zh_tw_candidate === "自我信任者", "S7-01 trust name present");
assert(s7CandidateFor("S7-02")?.name_zh_tw_candidate === "邊界選擇者", "S7-02 boundary name present");
assert(s7CandidateFor("S7-06")?.code === "S7-06", "S7 spans 00 to 06");
assert((s7CandidateFor("S7-00")?.content_zh_tw_candidate?.everyday_examples?.length ?? 0) >= 2, "S7 definition-first keeps at least two examples");
assert(s7CandidateFor("S1-01") === null, "S7 library does not invent S1 codes");
const defMeta = definitionFirstStandardMeta();
assert(defMeta.officialApprovedCount === 0 && defMeta.customerPublishable === false, "definition-first standard stays unapproved");
assert(defMeta.exampleCode === "S1-18" && definitionFirstRequiredFields().length >= 13, "definition-first keeps S1-18 example and required fields");
const defExample = definitionFirstExample();
assert(defExample.editorial_status === "PENDING_REVIEW" && !defExample.reviewer && defExample.customer_publishable === false, "S1-18 definition-first example stays pending");
assert(defExample.one_sentence_definition.includes("轉化者"), "S1-18 definition-first keeps transformer wording");
assert(s1CandidateFor("S1-18")?.name_zh_tw_candidate === "轉化者" && s1CandidateFor("S1-18")?.editorial_status === "PENDING_REVIEW", "S1 RC3.2 pack is not overwritten by definition-first example");
assert(s8EditorialCandidateCount() === 8 && s8PendingCount() === 8 && s8ApprovedCount() === 0, "S8 has 8 pending candidates");
assert(s8CustomerPublishableCodes().length === 0, "S8 candidates stay out of customer publish");
assert(s8CandidateFor("S8-00")?.name_zh_tw_candidate === "臨在貢獻者" && !s8CandidateFor("S8-00")?.reviewer, "S8-00 calibration name stays unapproved");
assert(s8CandidateFor("S8-05")?.name_zh_tw_candidate === "轉化貢獻者", "S8-05 transformation name present");
assert(s8CandidateFor("S8-07")?.name_zh_tw_candidate === "整體願景貢獻者", "S8-07 vision name present");
assert(s8CandidateFor("S8-03")?.name_zh_tw_candidate === "洞察貢獻者", "S8-03 insight name present");
assert(s8CandidateFor("S8-00")?.code === "S8-00" && s8CandidateFor("S8-07")?.code === "S8-07", "S8 spans 00 to 07");
assert(s8CandidateFor("S8-08") === null, "S8 does not invent S8-08");
assert((s8CandidateFor("S8-00")?.content_zh_tw_candidate?.everyday_examples?.length ?? 0) >= 2, "S8 definition-first keeps at least two examples");
assert(s8CandidateFor("S1-01") === null, "S8 library does not invent S1 codes");
assert(s9EditorialCandidateCount() === 9 && s9PendingCount() === 9 && s9ApprovedCount() === 0, "S9 has 9 pending candidates");
assert(s9CustomerPublishableCodes().length === 0, "S9 candidates stay out of customer publish");
assert(s9CandidateFor("S9-07")?.name_zh_tw_candidate === "臨在回源者" && !s9CandidateFor("S9-07")?.reviewer, "S9-07 calibration name stays unapproved");
assert(s9CandidateFor("S9-04")?.name_zh_tw_candidate === "真相回源者", "S9-04 truth name present");
assert(s9CandidateFor("S9-00")?.name_zh_tw_candidate === "靜默回源者", "S9-00 silence name present");
assert(s9CandidateFor("S9-08")?.name_zh_tw_candidate === "完整回源者", "S9-08 wholeness name present");
assert(s9CandidateFor("S9-00")?.code === "S9-00" && s9CandidateFor("S9-08")?.code === "S9-08", "S9 spans 00 to 08");
assert((s9CandidateFor("S9-07")?.content_zh_tw_candidate?.everyday_examples?.length ?? 0) >= 2, "S9 definition-first keeps at least two examples");
assert(s9CandidateFor("S1-01") === null, "S9 library does not invent S1 codes");
assert(
  s0EditorialCandidateCount() +
    s1EditorialCandidateCount() +
    s2EditorialCandidateCount() +
    s3EditorialCandidateCount() +
    s4EditorialCandidateCount() +
    s5EditorialCandidateCount() +
    s6EditorialCandidateCount() +
    s7EditorialCandidateCount() +
    s8EditorialCandidateCount() +
    s9EditorialCandidateCount() ===
    258,
  "all 258 codes now have pending Chinese candidates",
);
assert(
  s0ApprovedCount() +
    s1ApprovedCount() +
    s2ApprovedCount() +
    s3ApprovedCount() +
    s4ApprovedCount() +
    s5ApprovedCount() +
    s6ApprovedCount() +
    s7ApprovedCount() +
    s8ApprovedCount() +
    s9ApprovedCount() ===
    0,
  "formal approvals remain zero across S0-S9",
);
assert(sampleFullDifference().length >= 6, "sample and full difference table exists");

const blueprintMeta = reportBlueprintRc1Meta();
assert(
  blueprintMeta.packageId === "1320-report-blueprint-2026-11-19-rc1" &&
    blueprintMeta.status === "PENDING_REVIEW" &&
    blueprintMeta.customerPublishable === false &&
    blueprintMeta.officialApprovedCount === 0,
  "report blueprint RC1 stays pending and unpublished",
);
assert(
  blueprintMeta.demoRecordCount === 20 &&
    blueprintMeta.reportCount === 2 &&
    blueprintMeta.fullChapterCount === 17 &&
    blueprintMeta.sampleModuleOrder.join(",") === "S1,S3,S2,S0",
  "report blueprint keeps Sample S1→S3→S2→S0 and Full 17 chapters",
);
assert(
  blueprintMeta.v1Locked &&
    blueprintMeta.pricesLocked &&
    blueprintMeta.checkoutLocked &&
    blueprintMeta.customerRelease === "HOLD",
  "report blueprint keeps v1/price/checkout locked and customer HOLD",
);
assert(reportBlueprintRc1AllPending(), "all blueprint demo records and projections stay pending");
assert(
  reportBlueprintRc1DemoCodesForDate("1980-05-22").join(",") ===
    "S1-18,S3-03,S2-27,S0-07,S4-14,S5-04,S6-28,S7-00,S8-00,S9-07",
  "1980 blueprint demo codes match calibration signature",
);
assert(
  reportBlueprintRc1DemoCodesForDate("1982-02-03").join(",") ===
    "S1-20,S3-01,S2-05,S0-05,S4-10,S5-26,S6-26,S7-01,S8-05,S9-04",
  "1982 blueprint demo codes stay independent of 1980",
);
const bp1980 = reportBlueprintRc1ForDate("1980-05-22");
const bp1982 = reportBlueprintRc1ForDate("1982-02-03");
assert(bp1980?.codes?.[0]?.code === "S1-18" && bp1982?.codes?.[0]?.code === "S1-20", "blueprint projections keep distinct birthdays");
assert(
  bp1980?.codes?.[0]?.narrative?.def !== bp1982?.codes?.[0]?.narrative?.def,
  "1980 and 1982 blueprint narratives are independently written",
);
const bpSafety = reportBlueprintRc1LockedSafety();
assert(
  bpSafety.S2 === "如果關係裡存在威脅、操控或傷害，保護自身安全比尋找任何『靈魂意義』更重要。" &&
    bpSafety.S4 === "涉及人身安全、健康、法律或財務風險的事項，仍應遵守必要的專業標準。",
  "report blueprint locks S2 and S4 safety strings",
);
const blueprintArchive = fs.readFileSync(
  new URL("../docs/gzh/v2-report-blueprint-2026-11-19/FULL_19800522_17_CHAPTERS_RC1.md", import.meta.url),
  "utf8",
);
assert(
  blueprintArchive.includes(bpSafety.S2) && blueprintArchive.includes(bpSafety.S4),
  "full 1980 blueprint demo retains locked safety sentences",
);
assert(
  !fs
    .readFileSync(new URL("../data/1320-tw-v2/report-blueprint-demo-candidates-rc1.json", import.meta.url), "utf8")
    .includes("source_text_internal"),
  "blueprint runtime demos strip source_text_internal",
);
assert(full.snapshot?.theme === "當改變、探索與完美要求相遇", "existing 1980 fixture narrative is not replaced by blueprint RC1");

const goldMeta = twoReferenceSetsRc3Meta();
assert(
  goldMeta.packageId === "1320-report-two-reference-sets-zhTW-2026-11-20-rc3" &&
    goldMeta.status === "PENDING_REVIEW" &&
    goldMeta.customerPublishable === false &&
    goldMeta.officialApprovedCount === 0 &&
    goldMeta.narrativeRecordCount === 20,
  "two-reference RC3 gold pack stays pending with 20 narrative records",
);
assert(twoReferenceSetsRc3AllPending(), "all two-reference RC3 narratives stay pending");
assert(
  twoReferenceSetsRc3ForDate("1980-05-22").map((r) => r.code_id).join(",") ===
    "S1-18,S3-03,S2-27,S0-07,S4-14,S5-04,S6-28,S7-00,S8-00,S9-07",
  "1980 gold reference codes match calibration",
);
assert(
  twoReferenceSetsRc3ForDate("1982-02-03").map((r) => r.code_id).join(",") ===
    "S1-20,S3-01,S2-05,S0-05,S4-10,S5-26,S6-26,S7-01,S8-05,S9-04",
  "1982 gold reference codes stay independent",
);
const goldSafety = twoReferenceSetsRc3LockedSafety();
assert(
  goldSafety.S2 === "如果關係裡存在威脅、操控或傷害，保護自身安全比尋找任何『靈魂意義』更重要。" &&
    goldSafety.S4 === "涉及人身安全、健康、法律或財務風險的事項，仍應遵守必要的專業標準。",
  "two-reference RC3 locks S2 and S4 safety strings",
);
const goldSample1980 = fs.readFileSync(
  new URL("../docs/gzh/v2-two-reference-sets-rc3-2026-11-20/FREE_SAMPLE_1980-05-22_RC3.md", import.meta.url),
  "utf8",
);
const styleLocked = fs.readFileSync(
  new URL("../docs/gzh/v2-rc3.1-phase1-pilot-2026-11-20/SAMPLE_19800522_RC3_STYLE_LOCKED.md", import.meta.url),
  "utf8",
);
assert(goldSample1980 === styleLocked, "1980 Free Sample RC3 matches the style-locked gold bytes");
assert(
  fs
    .readFileSync(new URL("../docs/gzh/v2-two-reference-sets-rc3-2026-11-20/FULL_REPORT_1980-05-22_RC3.md", import.meta.url), "utf8")
    .includes(goldSafety.S2) &&
    fs
      .readFileSync(new URL("../docs/gzh/v2-two-reference-sets-rc3-2026-11-20/FULL_REPORT_1980-05-22_RC3.md", import.meta.url), "utf8")
      .includes(goldSafety.S4),
  "1980 Full RC3 retains locked safety sentences",
);
assert(
  !fs
    .readFileSync(new URL("../data/1320-tw-v2/report-two-reference-sets-rc3.json", import.meta.url), "utf8")
    .includes("source_text_internal"),
  "two-reference RC3 runtime strips source_text_internal",
);
assert(full.snapshot?.theme === "當改變、探索與完美要求相遇", "existing 1980 fixture narrative is not replaced by two-reference RC3");

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

assert(TW_V2_REVIEW_BIRTHDAYS.length === 5, "review queue lists five narrative birthdays");
assert(
  TW_V2_REVIEW_BIRTHDAYS.map((item) => item.birth).join("|") ===
    "1980-05-22|1982-02-03|1983-03-08|2008-12-08|2013-06-12",
  "review queue includes Free Sample gold birthdays",
);
assert(
  TW_V2_REVIEW_BIRTHDAYS.find((item) => item.birth === "1983-03-08")?.hasSample === true &&
    TW_V2_REVIEW_BIRTHDAYS.find((item) => item.birth === "1983-03-08")?.hasFull === false,
  "1983 is sample-only in the review queue",
);
const reviewUi = fs.readFileSync(new URL("../components/gzh/gzh-tw-review-birthdays.tsx", import.meta.url), "utf8");
assert(reviewUi.includes("TW_V2_REVIEW_BIRTHDAYS"), "review birthday UI is wired");
assert(
  fs
    .readFileSync(new URL("../app/(site)/tw-v2-report/page.tsx", import.meta.url), "utf8")
    .includes("GzhTwReviewBirthdays"),
  "Chinese full report page shows review birthday queue",
);

const brandUi = JSON.parse(
  fs.readFileSync(new URL("../data/1320-tw-v2/brand-aligned-tw-ui-rc2.json", import.meta.url), "utf8"),
) as {
  packId: string;
  status: string;
  customer_publishable: boolean;
  customer_release_state: string;
  brand_assets: { logo: string; hero_banner_desktop: string; hero_banner_mobile: string };
};
assert(brandUi.packId === "1320-brand-aligned-tw-ui-2026-11-26-rc2", "brand UI RC2 pack id");
assert(brandUi.status === "PENDING_REVIEW", "brand UI remains PENDING_REVIEW");
assert(brandUi.customer_publishable === false, "brand UI not customer-publishable");
assert(brandUi.customer_release_state === "HOLD", "brand UI customer HOLD");
assert(
  fs.existsSync(new URL("../public/1320-logo.jpeg", import.meta.url)),
  "official 1320 logo asset present",
);
assert(
  fs.existsSync(new URL("../public/hero-banner-desktop-v1.webp", import.meta.url)) &&
    fs.existsSync(new URL("../public/hero-banner-v5.webp", import.meta.url)),
  "EN hero banner assets present for TW",
);
const twShell = fs.readFileSync(new URL("../components/gzh/gzh-shell.tsx", import.meta.url), "utf8");
const twHero = fs.readFileSync(new URL("../components/gzh/gzh-tw-brand-hero.tsx", import.meta.url), "utf8");
const twPage = fs.readFileSync(new URL("../app/tw/page.tsx", import.meta.url), "utf8");
const twCss = fs.readFileSync(new URL("../styles/gzh-tw-v1.css", import.meta.url), "utf8");
assert(twShell.includes("1320-logo.jpeg") || twShell.includes("BRAND_LOGO_HEADER"), "TW shell uses official logo");
assert(twHero.includes("hero-banner-desktop") || twHero.includes("heroBannerDesktop"), "TW hero uses EN banner");
assert(
  !twHero.includes("gzh-hero-art") && !twHero.includes("BRAND_LOGO_HEADER"),
  "TW hero does not stack a second logo on the banner",
);
assert(twPage.includes("GzhTwBrandHero") && twPage.includes("foundation"), "TW landing has brand hero + foundation");
assert(twCss.includes("--gzh-navy") && twCss.includes("--gzh-gold"), "TW CSS uses navy/gold brand tokens");
assert(!twCss.includes("#2f4a3c"), "TW CSS no longer uses paper/teal accent as brand primary");
assert(!twCss.includes(".gzh-hero-art"), "TW CSS drops duplicate hero-art layer");
assert(
  fs.existsSync(
    new URL("../docs/gzh/v2-brand-aligned-tw-ui-rc2-2026-11-26/NOVA_BRAND_ALIGNMENT_SPEC_RC2.md", import.meta.url),
  ),
  "brand UI RC2 archive present",
);

const freeBirthForm = fs.readFileSync(
  new URL("../components/gzh/gzh-tw-free-birth-form.tsx", import.meta.url),
  "utf8",
);
assert(freeBirthForm.includes('messageLocale="zh-TW"'), "TW free form uses zh-TW validation locale");
assert(freeBirthForm.includes('fieldOrder: "ymd"'), "TW free form uses year-month-day order");
assert(
  fs.readFileSync(new URL("../lib/gzh/tw-content.ts", import.meta.url), "utf8").includes("西元年"),
  "TW free form copy includes 西元年 label",
);
const reviewSamplesPage = fs.readFileSync(
  new URL("../app/tw/review-samples/page.tsx", import.meta.url),
  "utf8",
);
assert(reviewSamplesPage.includes("isTwV2ReportEnabled"), "review samples page is preview-gated");
assert(reviewSamplesPage.includes("index: false"), "review samples page is noindex");
assert(twShell.includes("review-samples") && twPage.includes("review-samples"), "TW nav/home links to sample desk");
assert(
  fs.existsSync(
    new URL("../docs/gzh/v2-rc2-rc3-review-handoff-2026-11-27/NOVA_RESPONSE_2026-11-27.md", import.meta.url),
  ),
  "RC2/RC3 review handoff response archived",
);

console.log("PASS tw v2 report");
