/**
 * Full report payload smoke — v2 content + S7–S9 screen mapping (Phase 4).
 * Run: npm run smoke:full-report-payload
 */
process.env.USE_1320_V2_CONTENT = "true";

import { buildFullReportPayload } from "../lib/full-report/build-full-report-payload";
import { get1320Content } from "../lib/get1320Content";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error("FAIL:", message);
    process.exit(1);
  }
}

const SAMPLE = { s1: 18, s3: 110, s2: 27, s0: 7 };

const full = get1320Content(
  { ...SAMPLE, locale: "en" },
  { birthDate: "1980-05-22", reportTier: "full" },
);

const fullPayload = buildFullReportPayload(full, { birthDate: "1980-05-22" });
const fullIds = fullPayload.map((p) => p.screen.id);

assert(fullIds.includes("s7-overview"), "full tier includes S7 overview screen");
assert(fullIds.includes("s7-integration"), "full tier includes S7 integration screen");
assert(!fullIds.includes("s8-overview"), "full tier gates S8 screens");
assert(!fullIds.includes("s9-overview"), "full tier gates S9 screens");

const dashboard = fullPayload.find((p) => p.screen.id === "dashboard");
const seal = dashboard?.blocks.find((b) => b.type === "dashboard");
assert(seal?.type === "dashboard" && seal.sealCode.includes("S7-00"), "dashboard seal includes S7");

const advanced = get1320Content(
  { ...SAMPLE, locale: "en" },
  { birthDate: "1980-05-22", reportTier: "advanced" },
);
const advancedPayload = buildFullReportPayload(advanced, { birthDate: "1980-05-22" });
const advancedIds = advancedPayload.map((p) => p.screen.id);

assert(advancedIds.includes("s8-overview"), "advanced tier includes S8");
assert(advancedIds.includes("s9-integration"), "advanced tier includes S9");
assert(advancedPayload.length > fullPayload.length, "advanced tier has more screens than full");

console.log(`PASS: smoke-full-report-payload — full=${fullPayload.length} screens, advanced=${advancedPayload.length}`);
