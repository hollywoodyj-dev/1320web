/**
 * v2 content database lookup smoke — canonical birth dates.
 * Run: npm run smoke:v2-content
 */
import { get1320V2Content } from "../lib/get1320V2Content";
import { listV2Codes, lookupV2Entry } from "../lib/1320-v2/v2-index";
import { pickLocalized } from "../lib/getLocalized";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error("FAIL:", message);
    process.exit(1);
  }
}

console.log("=== v2 database index coverage ===");
for (const module of ["S0", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9"] as const) {
  const count = listV2Codes(module).length;
  assert(count > 0, `${module} index empty`);
  console.log(`  ${module}: ${count} entries`);
}

console.log("\n=== 1980-05-22 (Case A) ===");
const caseA = get1320V2Content({ year: 1980, month: 5, day: 22 });
assert(caseA.missingCodes.length === 0, `missing: ${caseA.missingCodes.join(", ")}`);
assert(caseA.codes.s4Code === "S4-14", `S4 expected S4-14, got ${caseA.codes.s4Code}`);
assert(caseA.codes.s5Code === "S5-04", `S5 expected S5-04, got ${caseA.codes.s5Code}`);
assert(caseA.codes.s7Code === "S7-00", `S7 expected S7-00, got ${caseA.codes.s7Code}`);
assert(
  pickLocalized(caseA.s1Content.title, "en") === "The Transformer",
  `S1 title expected The Transformer, got ${pickLocalized(caseA.s1Content.title, "en")}`,
);
assert(
  pickLocalized(caseA.s4Content.title, "en") === "The Loop of Perfection",
  `S4 title expected The Loop of Perfection, got ${pickLocalized(caseA.s4Content.title, "en")}`,
);
assert(
  pickLocalized(caseA.s5Content.title, "en") === "The Mission of Structure",
  `S5 title expected The Mission of Structure`,
);
assert((caseA.s5Content.soulMissionSections?.length ?? 0) >= 7, "S5 should have 7 output blocks");
assert(Boolean(lookupV2Entry("S5", "S5-04")?.output_blocks), "S5-04 output_blocks must exist in DB");

console.log("  codes:", caseA.codes.fullCodeString);

console.log("\n=== 1988-07-14 (sample) ===");
const sample = get1320V2Content({ year: 1988, month: 7, day: 14 });
assert(sample.missingCodes.length === 0, `missing: ${sample.missingCodes.join(", ")}`);
assert(sample.codes.s7Code === "S7-02", `S7 expected S7-02, got ${sample.codes.s7Code}`);
assert((sample.s7Content.soulMissionSections?.length ?? 0) >= 5, "S7 should have rendering blocks");
console.log("  S7 archetype:", pickLocalized(sample.s7Content.title, "en"));

console.log("\n=== 1977-11-12 (W1) ===");
const w1 = get1320V2Content({ year: 1977, month: 11, day: 12 });
assert(w1.missingCodes.length === 0, `missing: ${w1.missingCodes.join(", ")}`);
assert(w1.codes.s3Code === "S3-04", `S3 expected S3-04, got ${w1.codes.s3Code}`);
assert(w1.codes.s6Code === "S6-37", `S6 expected S6-37, got ${w1.codes.s6Code}`);
console.log("  codes S4–S9:", w1.codes.s4Code, w1.codes.s5Code, w1.codes.s6Code, w1.codes.s7Code);

console.log("\nPASS: smoke-v2-content — all v2 databases resolve for canonical dates");
