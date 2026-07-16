/**
 * Wisewave commercial overlay smoke — Steps 2–4 (S0–S9).
 * Run: npm run smoke:commercial-overlay
 */
process.env.USE_1320_V2_CONTENT = "true";

import { get1320Content } from "../lib/get1320Content";
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
  "This S6 pattern reflects",
];

const S6_LEGACY_PHRASES = ["Money Frequency", "金矿", "丰盛", "财富", "prosperity", "abundance"];

const S7_GOVERNANCE = [/\b\d+\s*%/, /\bscore\b/i, /spiritual rank/i, /entitlement/i];
const S8_GOVERNANCE = [/public success/i, /social status/i, /usefulness/i];
const S9_GOVERNANCE = [/enlightenment status/i, /spiritual level/i, /superiority/i, /final attainment/i];

const SAMPLE_DATES = [
  { label: "1980-05-22", s1: 18, s3: 110, s2: 27, s0: 7, birthDate: "1980-05-22" },
  { label: "1982-02-03", s1: 20, s3: 6, s2: 5, s0: 5, birthDate: "1982-02-03" },
  { label: "1977-11-12", s1: 12, s3: 84, s2: 23, s0: 12, birthDate: "1977-11-12" },
  { label: "1988-07-14", s1: 26, s3: 98, s2: 21, s0: 18, birthDate: "1988-07-14" },
  { label: "1990-03-09", s1: 9, s3: 27, s2: 12, s0: 3, birthDate: "1990-03-09" },
];

function segmentText(seg: {
  freeEssence?: { en?: string; zh?: string };
  soulMissionSections?: Array<{ body: { en?: string } }>;
}): string {
  const parts = [seg.freeEssence?.en ?? ""];
  for (const section of seg.soulMissionSections ?? []) {
    parts.push(section.body.en ?? "");
  }
  return parts.join("\n");
}

function checkGovernance(label: string, module: string, text: string, patterns: RegExp[]) {
  for (const pattern of patterns) {
    assert(!pattern.test(text), `${label} ${module} governance hit: ${pattern}`);
  }
}

console.log("=== commercial overlay inventory ===");
assert(countCommercialOverlayEntries() === 258, "overlay should contain 258 Step 2–4 entries");
assert(listCommercialOverlayCodes("S0").length === 20, "S0 overlay count");
assert(listCommercialOverlayCodes("S1").length === 44, "S1 overlay count");
assert(listCommercialOverlayCodes("S2").length === 50, "S2 overlay count");
assert(listCommercialOverlayCodes("S3").length === 12, "S3 overlay count");
assert(listCommercialOverlayCodes("S4").length === 20, "S4 overlay count");
assert(listCommercialOverlayCodes("S5").length === 44, "S5 overlay count");
assert(listCommercialOverlayCodes("S6").length === 44, "S6 overlay count");
assert(listCommercialOverlayCodes("S7").length === 7, "S7 overlay count");
assert(listCommercialOverlayCodes("S8").length === 8, "S8 overlay count");
assert(listCommercialOverlayCodes("S9").length === 9, "S9 overlay count");

for (const sample of SAMPLE_DATES) {
  console.log(`=== commercial layer — ${sample.label} ===`);
  const content = get1320Content(
    { s1: sample.s1, s3: sample.s3, s2: sample.s2, s0: sample.s0, locale: "en" },
    { birthDate: sample.birthDate, reportTier: "advanced" },
  );

  for (const [id, seg] of [
    ["s1", content.s1Content],
    ["s3", content.s3Content],
    ["s2", content.s2Content],
    ["s0", content.s0Content],
    ["s4", content.s4Content],
    ["s5", content.s5Content],
    ["s6", content.s6Content],
    ["s7", content.s7Content],
    ["s8", content.s8Content],
    ["s9", content.s9Content],
  ] as const) {
    if (!seg) {
      console.error("FAIL:", `${sample.label} ${id} content should be present`);
      process.exit(1);
    }
    assert(seg.contentLayer === "commercial", `${sample.label} ${id} should use commercial layer`);
    assert(seg.commercialBlocksVersion === "commercial-v3-final", `${sample.label} ${id} version`);
    const text = segmentText(seg);
    for (const phrase of SOURCE_LAYER_PHRASES) {
      assert(!text.includes(phrase), `${sample.label} ${id} leaked source phrase: ${phrase}`);
    }
    if (id === "s6") {
      for (const phrase of S6_LEGACY_PHRASES) {
        assert(!text.includes(phrase), `${sample.label} S6 leaked legacy phrase: ${phrase}`);
      }
    }
    if (id === "s7") checkGovernance(sample.label, "S7", text, S7_GOVERNANCE);
    if (id === "s8") checkGovernance(sample.label, "S8", text, S8_GOVERNANCE);
    if (id === "s9") checkGovernance(sample.label, "S9", text, S9_GOVERNANCE);
  }
}

console.log("\nPASS: smoke-commercial-overlay — Wisewave S0–S9 overlay");
