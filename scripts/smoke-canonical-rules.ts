/**
 * Canonical lookup + formula reachability rules for S0/S1/S2/S3.
 * Run: npm run smoke:canonical
 */
import s0Data from "../data/1320/s0-void-gate.json";
import s1Data from "../data/1320/s1-origin-frequency.json";
import s2Data from "../data/1320/s2-mirror-path.json";
import s3Data from "../data/1320/s3-vibration-tier.json";
import { calculate1320Code } from "../lib/calculate1320Code";
import { get1320Content, getS3TierRecord } from "../lib/get1320Content";
import { lookupRecord, lookupSegmentRecord } from "../lib/lookup-segment-record";
import { formatS0Code, formatS1Code, formatS2Code } from "../lib/segment-code";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error("FAIL:", message);
    process.exit(1);
  }
}

type NamedRecord = { nameEn?: string; formulaReachable?: boolean; reachableByCurrentFormula?: boolean };

console.log("=== Formula: 1980-05-22 ===");
const code = calculate1320Code(1980, 5, 22);
assert(code.s1 === 18, `S1 expected 18, got ${code.s1}`);
assert(code.s3Raw === 110, `S3 raw expected 110, got ${code.s3Raw}`);
assert(code.s2 === 27, `S2 expected 27, got ${code.s2}`);
assert(code.s0 === 7, `S0 expected 7, got ${code.s0}`);
assert(code.codeString === "S1-18 / S3-110 / S2-27 / S0-07", "codeString mismatch");

console.log("\n=== Lookup keys must be segment codes (not titles or bare numbers) ===");
assert(Boolean(lookupRecord(s0Data as Record<string, unknown>, "S0-07")), "S0-07 must exist as JSON key");
assert(Boolean(lookupRecord(s2Data as Record<string, unknown>, "S2-27")), "S2-27 must exist as JSON key");
assert(Boolean(lookupRecord(s1Data as Record<string, unknown>, "S1-18")), "S1-18 must exist as JSON key");
assert(!lookupRecord(s0Data as Record<string, unknown>, "Self-Worth Illusion"), "must not lookup S0 by title");
assert(!lookupRecord(s2Data as Record<string, unknown>, "The Soul Shock Mirror"), "must not lookup S2 by title");

console.log("\n=== S0-07 vs S1-07 (Warrior) — do not mix ===");
const s0Seven = lookupRecord(s0Data as Record<string, unknown>, "S0-07") as NamedRecord;
const s1Seven = lookupRecord(s1Data as Record<string, unknown>, "S1-07") as NamedRecord;
assert(s0Seven?.nameEn === "Self-Worth Illusion", `S0-07 title wrong: ${s0Seven?.nameEn}`);
assert(s1Seven?.nameEn === "The Warrior", `S1-07 title wrong: ${s1Seven?.nameEn}`);
assert(s0Seven?.nameEn !== s1Seven?.nameEn, "S0-07 and S1-07 must not share the same archetype title");

console.log("\n=== S2 formula reachability (month + day → 2..43) ===");
const s2One = lookupRecord(s2Data as Record<string, unknown>, "S2-01") as NamedRecord;
const s2Two = lookupRecord(s2Data as Record<string, unknown>, "S2-02") as NamedRecord;
const s2FortyFour = lookupRecord(s2Data as Record<string, unknown>, "S2-44") as NamedRecord;
assert(s2One?.formulaReachable === false, "S2-01 should not be formula-reachable");
assert(s2Two?.formulaReachable !== false, "S2-02 should be formula-reachable");
assert(s2FortyFour?.formulaReachable === false, "S2-44 should not be formula-reachable");

console.log("\n=== S3 tier reachability (month × day max = 372) ===");
const tiers = (s3Data as { tiers?: NamedRecord[] }).tiers ?? [];
const s3Ten = tiers.find((t) => (t as { code?: string }).code === "S3-10");
const s3Nine = tiers.find((t) => (t as { code?: string }).code === "S3-09");
assert(s3Ten?.reachableByCurrentFormula === false, "S3-10 should not be formula-reachable");
assert(s3Nine?.reachableByCurrentFormula !== false, "S3-09 should be formula-reachable");

const s3Match = getS3TierRecord(110);
assert(String(s3Match.record?.code) === "S3-03", "S3 raw 110 → S3-03 Explorer tier");

console.log("\n=== End-to-end content resolution ===");
const content = get1320Content({ s1: code.s1, s3: code.s3Raw, s2: code.s2, s0: code.s0, locale: "en" });
assert(content.s0Content.title.en === "Self-Worth Illusion", "resolved S0 title");
assert(content.s1Content.title.en === "The Transformer", "resolved S1 title");
assert(content.s2Content.title.en === "The Soul Shock Mirror", "resolved S2 title");
assert(content.s3Content.title.en === "Explorer", "resolved S3 tier title");

console.log("\n=== lookupSegmentRecord uses code keys ===");
assert(
  lookupSegmentRecord(s0Data as Record<string, unknown>, "S0", 7)?.nameEn === "Self-Worth Illusion",
  "lookupSegmentRecord S0-07",
);
assert(
  lookupSegmentRecord(s2Data as Record<string, unknown>, "S2", 27)?.nameEn === "The Soul Shock Mirror",
  "lookupSegmentRecord S2-27",
);

console.log("\nPASS: canonical rules —", formatS1Code(18), formatS2Code(27), formatS0Code(7));
