/**
 * get1320Content() v2 branch smoke — run with USE_1320_V2_CONTENT=true
 * Run: npm run smoke:v2-get-content
 */
process.env.USE_1320_V2_CONTENT = "true";

import { get1320Content, t } from "../lib/get1320Content";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error("FAIL:", message);
    process.exit(1);
  }
}

const SAMPLE = { s1: 18, s3: 110, s2: 27, s0: 7 };

console.log("=== v2 get1320Content — Case A 1980-05-22 (full tier) ===");
const full = get1320Content(
  { ...SAMPLE, locale: "en" },
  { birthDate: "1980-05-22", reportTier: "full" },
);

assert(full.contentPipeline === "v2", "contentPipeline should be v2");
assert(full.codes.s4Code === "S4-14", `S4 expected S4-14, got ${full.codes.s4Code}`);
assert(full.codes.s5Code === "S5-04", `S5 expected S5-04, got ${full.codes.s5Code}`);
assert(full.codes.s7Code === "S7-00", `S7 expected S7-00, got ${full.codes.s7Code}`);
assert(full.s4Content !== null, "S4 content required");
assert(full.s5Content !== null, "S5 content required for full tier");
assert(full.s6Content !== null, "S6 content required for full tier");
assert(full.s7Content !== null, "S7 content required for full tier");
assert(full.s8Content === null, "S8 should be tier-gated on full");
assert(full.s9Content === null, "S9 should be tier-gated on full");
assert(
  t(full.s5Content!.title, "en") === "The Mission of Structure",
  "S5 v4 direct lookup title",
);
assert(
  t(full.s6Content!.subtitle, "en") === "Value & Receiving",
  "S6 should use Value & Receiving label",
);
assert((full.s5Content!.soulMissionSections?.length ?? 0) >= 7, "S5 should have 7 blocks");
assert(full.s5AssemblyError === undefined, "v2 S5 should not use seed assembly");
assert(
  t(full.s4Content!.title, "en") === "The Loop of Perfection",
  "S4 v2 lookup by S4-14 not S1 shadow",
);
assert((full.s4Content!.soulMissionSections?.length ?? 0) >= 8, "S4 should have steward rendering fields");
assert((full.s6Content!.soulMissionSections?.length ?? 0) >= 5, "S6 should have rendering blocks");
assert((full.s7Content!.soulMissionSections?.length ?? 0) >= 5, "S7 should have rendering blocks");

console.log("=== v2 get1320Content — free tier (/result) ===");
const free = get1320Content(
  { ...SAMPLE, locale: "en" },
  { birthDate: "1980-05-22", reportTier: "free" },
);

assert(free.s4Content !== null, "free tier includes S4");
assert(free.s5Content === null, "free tier gates S5");
assert(free.s6Content === null, "free tier gates S6");
assert(free.s7Content === null, "free tier gates S7");

console.log("=== v2 get1320Content — advanced tier ===");
const advanced = get1320Content(
  { ...SAMPLE, locale: "en" },
  { birthDate: "1980-05-22", reportTier: "advanced" },
);

assert(advanced.s8Content !== null, "advanced tier includes S8");
assert(advanced.s9Content !== null, "advanced tier includes S9");
assert(advanced.codes.s9Code === "S9-07", `S9 expected S9-07, got ${advanced.codes.s9Code}`);
assert((advanced.s8Content!.soulMissionSections?.length ?? 0) >= 5, "S8 should have rendering blocks");
assert((advanced.s9Content!.soulMissionSections?.length ?? 0) >= 5, "S9 should have rendering blocks");

console.log("\nPASS: smoke-v2-get-content — USE_1320_V2_CONTENT branch");
