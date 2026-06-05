/**
 * Batch 0 smoke test — canonical sample: 1980-05-22 → S1-18 / S3-110 / S2-27 / S0-07
 * Run: npm run smoke:content
 */
import { containsCjk } from "../lib/getLocalized";
import { get1320Content, getS3TierRecord, t } from "../lib/get1320Content";
import { buildReportViewModel } from "../lib/report/build-report-view-model";
import { getSegmentCardImageUrl } from "../lib/segment-card-asset";

const SAMPLE = { s1: 18, s3: 110, s2: 27, s0: 7 };

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error("FAIL:", message);
    process.exit(1);
  }
}

function assertEnglish(text: string, label: string) {
  assert(text.length > 0, `${label} should not be empty`);
  assert(!containsCjk(text), `${label} should be English-only, got: ${text}`);
}

const s3Tier = getS3TierRecord(SAMPLE.s3);
assert(s3Tier.tierMatched === true, "S3 tier 110 should match a range tier");
assert(String(s3Tier.record?.id) === "S3-T03", "S3 tier 110 should resolve to S3-T03 (Explorer)");

const content = get1320Content({ ...SAMPLE, locale: "en" });

assert(content.codes.codeString === "S1-18 / S3-110 / S2-27 / S0-07", "codeString mismatch");
assertEnglish(t(content.s1Content.title, "en"), "S1 title");
assert(t(content.s1Content.title, "en") === "The Transformer", "S1 title should be The Transformer");
assertEnglish(t(content.s1Content.freeEssence, "en"), "S1 freeEssence");
assert(t(content.s3Content.title, "en") === "Explorer", "S3 tier title mismatch");
assertEnglish(t(content.s3Content.freeEssence, "en"), "S3 freeEssence");
assert(t(content.s2Content.title, "en") === "The Soul Shock Mirror", "S2 title mismatch");
assertEnglish(t(content.s2Content.title, "en"), "S2 title");
assertEnglish(t(content.s2Content.freeEssence, "en"), "S2 freeEssence");
assert(t(content.s0Content.title, "en") === "Self-Worth Illusion", "S0 title mismatch");
assertEnglish(t(content.s0Content.title, "en"), "S0 title");
assertEnglish(t(content.s0Content.freeEssence, "en"), "S0 freeEssence");
assert(
  t(content.s0Content.practice!, "en") === "Practice gratitude and allowing.",
  "S0 practice mismatch",
);
assertEnglish(t(content.s0Content.practice!, "en"), "S0 practice");
assertEnglish(t(content.integratedFreeSummary, "en"), "integrated summary");
assert(t(content.integratedFreeSummary, "en").includes("Transformer"), "integrated summary should reference Transformer");
assertEnglish(t(content.reflectionQuestion, "en"), "reflection question");
assert(content.s1Content.missing !== true, "S1 should not be missing");
assert(content.s3Content.missing !== true, "S3 should not be missing");

const s1Overview = t(content.s1Content.freeEssence, "en");
assertEnglish(t(content.s1Content.lesson!, "en"), "S1 lesson");
assert(t(content.s1Content.lesson!, "en") !== s1Overview, "S1 lesson must not duplicate overview");
assertEnglish(t(content.s1Content.color!, "en"), "S1 color");
assert(t(content.s1Content.color!, "en") !== "The Transformer", "S1 color must not echo archetype title");
assertEnglish(t(content.s1Content.totem!, "en"), "S1 totem");
assertEnglish(t(content.s1Content.guidance!, "en"), "S1 guidance");
assertEnglish(t(content.s3Content.guidance!, "en"), "S3 guidance");

const sampleReport = buildReportViewModel(content, { mode: "full", variant: "sample" });
assert(getSegmentCardImageUrl("s1", SAMPLE.s1) === "/S1-44/S18.webp", "S1 card image path");
assert(getSegmentCardImageUrl("s3", SAMPLE.s3) === "/S3-12/S03.webp", "S3 card image path (tier T03)");
assert(getSegmentCardImageUrl("s2", SAMPLE.s2) === "/S2-50/S2-27.webp", "S2 card image path");
assert(getSegmentCardImageUrl("s0", SAMPLE.s0) === "/S0-19/S0-07.webp", "S0 card image path");

const s1Module = sampleReport.modules.find((m) => m.segmentId === "s1");
const s3Module = sampleReport.modules.find((m) => m.segmentId === "s3");
const s2Module = sampleReport.modules.find((m) => m.segmentId === "s2");
const s0Module = sampleReport.modules.find((m) => m.segmentId === "s0");
assert(Boolean(s1Module), "sample report should include S1 module");
assert(s3Module?.cardImageUrl === "/S3-12/S03.webp", "S3 module should include tier card art");
assert(s2Module?.cardImageUrl === "/S2-50/S2-27.webp", "S2 module should include mirror card art");
assert(s0Module?.cardImageUrl === "/S0-19/S0-07.webp", "S0 module should include void gate card art");
assert(s1Module!.fields.length >= 8, "S1 full module should expose distinct premium fields");
const s1Values = s1Module!.fields.map((f) => f.value.trim());
assert(new Set(s1Values).size === s1Values.length, "S1 module field values must be unique");
assert(
  !s1Values.some((v) => v.toLowerCase().includes("full report expands your relational mirror")),
  "S1 module must not contain S2 generic locked teaser",
);

const random = get1320Content({ s1: 7, s3: 45, s2: 12, s0: 3, locale: "en" });
assertEnglish(t(random.s2Content.title, "en"), "random S2 title");
assertEnglish(t(random.s2Content.freeEssence, "en"), "random S2 freeEssence");
assertEnglish(t(random.s0Content.title, "en"), "random S0 title");
assertEnglish(t(random.s0Content.practice!, "en"), "random S0 practice");

console.log("PASS: Batch 0 smoke — S1-18 / S3-110 / S2-27 / S0-07");
console.log("  codes:", content.codes.codeString);
console.log("  s1:", t(content.s1Content.title, "en"));
console.log("  s2:", t(content.s2Content.title, "en"));
console.log("  s0:", t(content.s0Content.title, "en"), "| practice:", t(content.s0Content.practice!, "en"));
console.log("  random s2/s0: English-only verified");
