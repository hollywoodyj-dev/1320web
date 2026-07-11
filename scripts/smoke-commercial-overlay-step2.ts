/**
 * Wisewave Step 2 — commercial overlay S0–S3 smoke.
 * Run: npm run smoke:commercial-overlay-step2
 */
process.env.USE_1320_V2_CONTENT = "true";

import { get1320Content, t } from "../lib/get1320Content";
import {
  countCommercialOverlayEntries,
  listCommercialOverlayCodes,
} from "../lib/1320-v2/commercial-report-layer";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error("FAIL:", message);
    process.exit(1);
  }
}

const SOURCE_LAYER_PHRASES = [
  "This Soul Origin reflects",
  "It invites the user",
  "This vibration tier reflects",
  "Commercial report output layer",
];

const SAMPLE_DATES = [
  { label: "1980-05-22", s1: 18, s3: 110, s2: 27, s0: 7, birthDate: "1980-05-22" },
  { label: "1982-02-03", s1: 20, s3: 6, s2: 5, s0: 5, birthDate: "1982-02-03" },
  { label: "1977-11-12", s1: 12, s3: 84, s2: 23, s0: 12, birthDate: "1977-11-12" },
  { label: "1988-07-14", s1: 26, s3: 98, s2: 21, s0: 18, birthDate: "1988-07-14" },
  { label: "1990-03-09", s1: 9, s3: 27, s2: 12, s0: 3, birthDate: "1990-03-09" },
];

console.log("=== commercial overlay inventory ===");
assert(countCommercialOverlayEntries() === 126, "overlay should contain 126 Step 2 entries");
assert(listCommercialOverlayCodes("S0").length === 20, "S0 overlay count");
assert(listCommercialOverlayCodes("S1").length === 44, "S1 overlay count");
assert(listCommercialOverlayCodes("S2").length === 50, "S2 overlay count");
assert(listCommercialOverlayCodes("S3").length === 12, "S3 overlay count");

for (const sample of SAMPLE_DATES) {
  console.log(`=== commercial layer — ${sample.label} ===`);
  const content = get1320Content(
    { s1: sample.s1, s3: sample.s3, s2: sample.s2, s0: sample.s0, locale: "en" },
    { birthDate: sample.birthDate, reportTier: "full" },
  );

  for (const [id, seg] of [
    ["s1", content.s1Content],
    ["s3", content.s3Content],
    ["s2", content.s2Content],
    ["s0", content.s0Content],
  ] as const) {
    assert(seg.contentLayer === "commercial", `${sample.label} ${id} should use commercial layer`);
    assert(seg.commercialBlocksVersion === "commercial-v3-step2", `${sample.label} ${id} version`);
    const essence = t(seg.freeEssence, "en");
    for (const phrase of SOURCE_LAYER_PHRASES) {
      assert(!essence.includes(phrase), `${sample.label} ${id} leaked source phrase: ${phrase}`);
    }
  }

  // S4 should fall back to symbolic/steward layer (not in Step 2 overlay).
  assert(
    content.s4Content.contentLayer !== "commercial",
    `${sample.label} S4 should remain non-commercial until Step 3`,
  );
}

console.log("\nPASS: smoke-commercial-overlay-step2 — Wisewave S0–S3 overlay");
