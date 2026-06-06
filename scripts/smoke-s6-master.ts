/**
 * S6 Money Frequency — bilingual master lookup + S1→S6 mapping.
 * Canonical: 1980-05-22 → S1-18 → S6-18 (Personal Power Wealth)
 *
 * Run: npm run smoke:s6-master
 */
import s6Data from "../data/1320/s6-money-frequency.json";
import { containsCjk } from "../lib/getLocalized";
import { get1320Content, t } from "../lib/get1320Content";
import { lookupRecord, lookupS6Record } from "../lib/lookup-segment-record";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error("FAIL:", message);
    process.exit(1);
  }
}

function assertEnglish(text: string, label: string) {
  assert(text.length > 0, `${label} should not be empty`);
  assert(!containsCjk(text), `${label} should be English-only, got: ${text.slice(0, 80)}`);
}

const SAMPLE = { s1: 18, s3: 110, s2: 27, s0: 7 };

console.log("=== S6 lookup keys (code only, not bare numbers) ===");
assert(Boolean(lookupRecord(s6Data as Record<string, unknown>, "S6-18")), "S6-18 must exist");
assert(Boolean(lookupRecord(s6Data as Record<string, unknown>, "S6-01")), "S6-01 must exist");
assert(Boolean(lookupRecord(s6Data as Record<string, unknown>, "S6-44")), "S6-44 must exist");
assert(!lookupRecord(s6Data as Record<string, unknown>, "Personal Power Wealth"), "must not lookup by title");

console.log("\n=== S1 → S6 mapping ===");
const s6FromS1 = lookupS6Record(s6Data as Record<string, unknown>, SAMPLE.s1);
assert(s6FromS1?.code === "S6-18", `S1-18 should map to S6-18, got ${s6FromS1?.code}`);
assert(s6FromS1?.baseSource === "S1-18", "S6-18 should reference S1-18 base source");

console.log("\n=== Bilingual content resolution ===");
const content = get1320Content({ ...SAMPLE, locale: "en" });
assert(content.s6Content !== null, "s6Content should resolve for S1-18");
assert(content.s6Content?.segmentCode === "S6-18", "s6Content segmentCode should be S6-18");
assertEnglish(t(content.s6Content!.title, "en"), "S6 title");
assert(t(content.s6Content!.title, "en") === "Personal Power Wealth", "S6-18 title mismatch");
assertEnglish(t(content.s6Content!.freeEssence, "en"), "S6 money core frequency");
assertEnglish(t(content.s6Content!.guidance!, "en"), "S6 wisewave guidance");
assert(
  t(content.s6Content!.lockedPreview, "en").toLowerCase().includes("not financial advice"),
  "S6 safety disclaimer should be present",
);

const contentZh = get1320Content({ ...SAMPLE, locale: "zh" });
assert(t(contentZh.s6Content!.title, "zh") === "个人力量之财", "S6-18 Chinese title mismatch");
assert(containsCjk(t(contentZh.s6Content!.freeEssence, "zh")), "S6 ZH essence should contain CJK");

console.log("\nPASS: smoke-s6-master — S6-18 from S1-18");
