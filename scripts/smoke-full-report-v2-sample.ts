/**
 * Smoke: Full Report v2 sample payload (canonical 1980-05-22).
 * Run: npm run smoke:full-report-v2-sample
 */
import {
  buildSampleFullReportV2Payload,
  CANONICAL_SAMPLE_BIRTH_DATE,
} from "../lib/full-report-v2/build-sample-payload";
import { resolveClosingPageContent } from "../lib/full-report-v2/resolve-closing-page-content";
import { resolveDisclaimerPageContent } from "../lib/full-report-v2/resolve-disclaimer-page-content";
import { resolveJournalPageContent } from "../lib/full-report-v2/resolve-journal-page-content";
import { resolvePracticePageContent } from "../lib/full-report-v2/resolve-practice-page-content";

const payload = buildSampleFullReportV2Payload({
  name: "Smoke Test",
  birth_date: CANONICAL_SAMPLE_BIRTH_DATE,
});

const expectedSig = "S1-18|S3-03|S2-27|S0-07";

if (payload.calculation.combination_signature !== expectedSig) {
  console.error(
    `FAIL: signature ${payload.calculation.combination_signature} !== ${expectedSig}`,
  );
  process.exit(1);
}

if (payload.calculation.s3.raw !== 110) {
  console.error(`FAIL: S3 raw ${payload.calculation.s3.raw} !== 110`);
  process.exit(1);
}

if (payload.calculation.s3.code !== "S3-03") {
  console.error(`FAIL: S3 code ${payload.calculation.s3.code} !== S3-03`);
  process.exit(1);
}

const moduleKeys = Object.keys(payload.modules);
if (moduleKeys.length !== 10) {
  console.error(`FAIL: expected 10 module slots, got ${moduleKeys.length}`);
  process.exit(1);
}

for (const key of ["s0", "s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]) {
  const slot = payload.modules[key as keyof typeof payload.modules];
  if (!slot.code) {
    console.error(`FAIL: modules.${key} missing code`);
    process.exit(1);
  }
}

const s4Slot = payload.modules.s4;
if (!s4Slot.primary_icon_url || typeof s4Slot.primary_icon_url !== "string") {
  console.error("FAIL: modules.s4 missing primary_icon_url");
  process.exit(1);
}
if (!String(s4Slot.primary_icon_url).includes("/S4-20/")) {
  console.error(`FAIL: modules.s4 primary_icon_url unexpected — ${s4Slot.primary_icon_url}`);
  process.exit(1);
}
if (!s4Slot.emotional_trigger && !s4Slot.core_loop) {
  console.error("FAIL: modules.s4 missing S4 pattern content from v2 database");
  process.exit(1);
}

const s5Slot = payload.modules.s5;
if (!s5Slot.primary_icon_url || typeof s5Slot.primary_icon_url !== "string") {
  console.error(`FAIL: modules.s5 missing primary_icon_url`);
  process.exit(1);
}
if (!String(s5Slot.primary_icon_url).includes("/S5-44/")) {
  console.error(`FAIL: modules.s5 primary_icon_url unexpected — ${s5Slot.primary_icon_url}`);
  process.exit(1);
}
if (!s5Slot.mission_essence) {
  console.error("FAIL: modules.s5 missing mission_essence from v2 database");
  process.exit(1);
}

const s6Slot = payload.modules.s6;
if (!s6Slot.primary_icon_url || typeof s6Slot.primary_icon_url !== "string") {
  console.error(`FAIL: modules.s6 missing primary_icon_url`);
  process.exit(1);
}
if (!String(s6Slot.primary_icon_url).includes("/S6-44/")) {
  console.error(`FAIL: modules.s6 primary_icon_url unexpected — ${s6Slot.primary_icon_url}`);
  process.exit(1);
}
if (!s6Slot.value_essence) {
  console.error("FAIL: modules.s6 missing value_essence from v2 database");
  process.exit(1);
}

const s7Slot = payload.modules.s7;
if (!s7Slot.primary_icon_url || typeof s7Slot.primary_icon_url !== "string") {
  console.error(`FAIL: modules.s7 missing primary_icon_url`);
  process.exit(1);
}
if (!String(s7Slot.primary_icon_url).includes("/S7-07/")) {
  console.error(`FAIL: modules.s7 primary_icon_url unexpected — ${s7Slot.primary_icon_url}`);
  process.exit(1);
}
if (!s7Slot.sovereignty_essence) {
  console.error("FAIL: modules.s7 missing sovereignty_essence from v2 database");
  process.exit(1);
}

const s8Slot = payload.modules.s8;
if (!s8Slot.primary_icon_url || typeof s8Slot.primary_icon_url !== "string") {
  console.error(`FAIL: modules.s8 missing primary_icon_url`);
  process.exit(1);
}
if (!String(s8Slot.primary_icon_url).includes("/S8-08/")) {
  console.error(`FAIL: modules.s8 primary_icon_url unexpected — ${s8Slot.primary_icon_url}`);
  process.exit(1);
}
if (!s8Slot.contribution_essence) {
  console.error("FAIL: modules.s8 missing contribution_essence from v2 database");
  process.exit(1);
}

const s9Slot = payload.modules.s9;
if (!s9Slot.primary_icon_url || typeof s9Slot.primary_icon_url !== "string") {
  console.error(`FAIL: modules.s9 missing primary_icon_url`);
  process.exit(1);
}
if (!String(s9Slot.primary_icon_url).includes("/S9-09/")) {
  console.error(`FAIL: modules.s9 primary_icon_url unexpected — ${s9Slot.primary_icon_url}`);
  process.exit(1);
}
if (!s9Slot.return_essence) {
  console.error("FAIL: modules.s9 missing return_essence from v2 database");
  process.exit(1);
}

const practiceContent = resolvePracticePageContent(payload);
if (practiceContent.days.length !== 7) {
  console.error(`FAIL: practice page expected 7 days, got ${practiceContent.days.length}`);
  process.exit(1);
}
if (!practiceContent.days[0].focus || !practiceContent.days[0].practice) {
  console.error("FAIL: practice day 1 missing focus or practice");
  process.exit(1);
}

const journalContent = resolveJournalPageContent(payload);
if (journalContent.promptCards.length !== 9) {
  console.error(`FAIL: journal page expected 9 prompts, got ${journalContent.promptCards.length}`);
  process.exit(1);
}
if (!journalContent.promptCards[0].prompt || !journalContent.promptCards[8].prompt) {
  console.error("FAIL: journal prompts missing for S1 or S9");
  process.exit(1);
}
if (!journalContent.promptCards[0].iconUrl) {
  console.error("FAIL: journal S1 prompt missing card icon URL");
  process.exit(1);
}

const closingContent = resolveClosingPageContent(payload);
if (closingContent.statementLines.length !== 2) {
  console.error("FAIL: closing page expected 2 statement lines");
  process.exit(1);
}
if (!closingContent.sealNodes.length || closingContent.sealNodes.length !== 4) {
  console.error("FAIL: closing page expected 4 seal nodes");
  process.exit(1);
}
if (!closingContent.sealNodes[0].iconUrl?.includes("closing-integration-seal-circle-logo-remember")) {
  console.error("FAIL: closing seal missing remember logo URL");
  process.exit(1);
}
if (!closingContent.closingInsight) {
  console.error("FAIL: closing page missing closing insight");
  process.exit(1);
}

const disclaimerContent = resolveDisclaimerPageContent(payload);
if (disclaimerContent.interpretationItems.length !== 5) {
  console.error("FAIL: disclaimer page expected 5 interpretation items");
  process.exit(1);
}
if (disclaimerContent.professionalItems.length !== 5) {
  console.error("FAIL: disclaimer page expected 5 professional items");
  process.exit(1);
}
if (disclaimerContent.sealNodes.length !== 4) {
  console.error("FAIL: disclaimer page expected 4 seal labels");
  process.exit(1);
}
if (!disclaimerContent.sealNodes[0].iconUrl?.includes("right-way-report-circle-logo-reflect")) {
  console.error("FAIL: disclaimer seal missing reflect logo URL");
  process.exit(1);
}
if (!disclaimerContent.rightsCopy.includes("1320 Soul Code System")) {
  console.error("FAIL: disclaimer page missing copyright notice");
  process.exit(1);
}

console.log(
  `PASS: smoke-full-report-v2-sample — ${expectedSig}, modules=${moduleKeys.length}`,
);
