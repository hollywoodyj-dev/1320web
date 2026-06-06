/**
 * S5 deterministic assembly — canonical: 1977-11-12 → S1-24|S3-04|S2-23|S0-09
 * Run: npm run smoke:s5-assembly
 */
import { calculate1320Code } from "../lib/calculate1320Code";
import { get1320Content } from "../lib/get1320Content";
import { pickLocalized } from "../lib/getLocalized";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error("FAIL:", message);
    process.exit(1);
  }
}

const code = calculate1320Code(1977, 11, 12);
const content = get1320Content(
  { s1: code.s1, s3: code.s3Raw, s2: code.s2, s0: code.s0, locale: "en" },
  { birthDate: "1977-11-12" },
);

assert(content.s5Content !== null, "s5Content should be assembled");
assert(
  content.s5Content?.assemblySignature === "S1-24|S3-04|S2-23|S0-09",
  `signature mismatch: ${content.s5Content?.assemblySignature}`,
);
assert(
  content.s5Content?.id === "S1-24|S3-04|S2-23|S0-09",
  `S5 id must use combination signature, got: ${content.s5Content?.id}`,
);
assert(
  (content.s5Content?.soulMissionSections?.length ?? 0) >= 8,
  "S5 should have multiple assembled sections",
);

const primary = content.s5Content?.soulMissionSections?.find((s) => s.id === "S5-1");
assert(Boolean(primary), "S5-1 Primary Mission section required");
assert(
  pickLocalized(primary!.body, "en").includes("Radiant Soul"),
  "S1-24 primary mission seed should mention Radiant Soul",
);
assert(
  !pickLocalized(primary!.body, "en").toLowerCase().includes("destined"),
  "S5 must not invent destiny language",
);

const mirror = content.s5Content?.soulMissionSections?.find((s) => s.id === "S5-2");
assert(
  pickLocalized(mirror!.body, "en").toLowerCase().includes("gives more"),
  "S2-23 mirror task seed expected",
);

console.log("PASS: smoke-s5-assembly — S1-24|S3-04|S2-23|S0-09");
console.log("  sections:", content.s5Content?.soulMissionSections?.length);
console.log("  seedVersion:", content.s5Content?.s5SeedVersion);
