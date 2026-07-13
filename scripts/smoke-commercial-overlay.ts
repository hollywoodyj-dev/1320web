/**
 * Wisewave commercial overlay smoke — Steps 2+3 (S0–S6).
 * Run: npm run smoke:commercial-overlay
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
  "This S6 pattern reflects",
];

const S6_LEGACY_PHRASES = [
  "Money Frequency",
  "old money-language",
  "金矿",
  "丰盛",
  "财富",
  "prosperity",
  "abundance",
];

const SAMPLE_DATES = [
  {
    label: "1980-05-22",
    s1: 18,
    s3: 110,
    s2: 27,
    s0: 7,
    birthDate: "1980-05-22",
    s4: "S4-14",
    s5: "S5-04",
    s6: "S6-28",
  },
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

console.log("=== commercial overlay inventory ===");
assert(countCommercialOverlayEntries() === 234, "overlay should contain 234 Step 2+3 entries");
assert(listCommercialOverlayCodes("S0").length === 20, "S0 overlay count");
assert(listCommercialOverlayCodes("S1").length === 44, "S1 overlay count");
assert(listCommercialOverlayCodes("S2").length === 50, "S2 overlay count");
assert(listCommercialOverlayCodes("S3").length === 12, "S3 overlay count");
assert(listCommercialOverlayCodes("S4").length === 20, "S4 overlay count");
assert(listCommercialOverlayCodes("S5").length === 44, "S5 overlay count");
assert(listCommercialOverlayCodes("S6").length === 44, "S6 overlay count");

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
    assert(seg.commercialBlocksVersion === "commercial-v3-step3", `${sample.label} ${id} version`);
    const text = segmentText(seg);
    for (const phrase of SOURCE_LAYER_PHRASES) {
      assert(!text.includes(phrase), `${sample.label} ${id} leaked source phrase: ${phrase}`);
    }
  }

  for (const [id, seg] of [
    ["s4", content.s4Content],
    ["s5", content.s5Content],
    ["s6", content.s6Content],
  ] as const) {
    if (!seg) {
      console.error("FAIL:", `${sample.label} ${id} content should be present`);
      process.exit(1);
    }
    assert(seg.contentLayer === "commercial", `${sample.label} ${id} should use commercial layer`);
    assert(seg.commercialBlocksVersion === "commercial-v3-step3", `${sample.label} ${id} version`);
    const text = segmentText(seg);
    for (const phrase of SOURCE_LAYER_PHRASES) {
      assert(!text.includes(phrase), `${sample.label} ${id} leaked source phrase: ${phrase}`);
    }
    if (id === "s6") {
      for (const phrase of S6_LEGACY_PHRASES) {
        assert(!text.includes(phrase), `${sample.label} S6 leaked legacy phrase: ${phrase}`);
      }
    }
    if (id === "s4") {
      assert(
        !/\bdisorder\b|\bpatholog/i.test(text) || /not a flaw/i.test(text),
        `${sample.label} S4 should avoid diagnostic framing`,
      );
    }
  }

  const s7 = content.s7Content;
  if (!s7) {
    console.error("FAIL:", `${sample.label} S7 content should be present`);
    process.exit(1);
  }
  assert(
    s7.contentLayer !== "commercial",
    `${sample.label} S7 should remain non-commercial until Step 4`,
  );
}

console.log("\nPASS: smoke-commercial-overlay — Wisewave S0–S6 overlay");
