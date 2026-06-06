/**
 * Wisewave QA sample: 1977-11-12 → S1-24 / S3-04 / S2-23 / S0-09
 * Run: npm run smoke:result-1977
 */
import { calculate1320Code } from "../lib/calculate1320Code";
import { get1320Content } from "../lib/get1320Content";
import { buildReportViewModel } from "../lib/report/build-report-view-model";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error("FAIL:", message);
    process.exit(1);
  }
}

const code = calculate1320Code(1977, 11, 12);
assert(code.s1 === 24, `S1 expected 24, got ${code.s1}`);
assert(code.s3Raw === 132, `S3 raw expected 132, got ${code.s3Raw}`);
assert(code.s2 === 23, `S2 expected 23, got ${code.s2}`);
assert(code.s0 === 9, `S0 expected 9, got ${code.s0}`);
assert(code.s3Code === "S3-04", `S3 code expected S3-04, got ${code.s3Code}`);
assert(code.s3Title === "Awakener", `S3 title expected Awakener, got ${code.s3Title}`);
assert(
  code.codeString === "S1-24 / S3-04 / S2-23 / S0-09",
  `codeString mismatch: ${code.codeString}`,
);

const content = get1320Content(
  { s1: code.s1, s3: code.s3Raw, s2: code.s2, s0: code.s0, locale: "en" },
  { birthDate: "1977-11-12" },
);

assert(
  content.combinationSignature === "S1-24|S3-04|S2-23|S0-09",
  `signature mismatch: ${content.combinationSignature}`,
);
assert(content.integratedSoulBlueprint !== null, "integratedSoulBlueprint should be generated");
assert(
  content.integratedSoulBlueprint!.integratedSummary.includes("Radiant Soul"),
  "blueprint should mention Radiant Soul",
);
assert(
  content.integratedSoulBlueprint!.integratedSummary.includes("Overgiving"),
  "blueprint should mention Overgiving Mirror",
);
assert(
  !content.integratedSoulBlueprint!.integratedSummary.includes(
    "learns through depth, reflection, and conscious transformation",
  ),
  "generic fallback must not appear",
);

const reflections = content.segmentReflections;
assert(
  reflections.s1.en !== reflections.s3.en,
  "S1 and S3 reflection questions must differ",
);
assert(
  reflections.s2.en !== reflections.s0.en,
  "S2 and S0 reflection questions must differ",
);
assert(
  reflections.s1.en.includes("light"),
  `S1-24 reflection expected, got: ${reflections.s1.en}`,
);

const vm = buildReportViewModel(content, {
  mode: "full",
  variant: "result",
  birthDateLabel: "1977-11-12",
});

assert(!vm.codeString.includes("S3-132"), "code strip must not show S3-132");
assert(vm.modules.find((m) => m.segmentId === "s3")?.codeLabel === "S3-04", "S3 module code label");
const s1Traits = vm.modules.find((m) => m.segmentId === "s1")?.fields.find((f) => f.label === "Soul Traits");
assert(Boolean(s1Traits?.items?.length), "Soul Traits should render as list items");
assert(vm.practices[2]?.title === "Let Your Light Be Natural", "combination-specific practice #3");
const s2Trigger = vm.modules
  .find((m) => m.segmentId === "s2")
  ?.fields.find((f) => f.label === "Relationship Trigger Pattern");
assert(Boolean(s2Trigger?.value.includes("gives more")), "S2 Relationship Trigger Pattern");
const s0Mechanism = vm.modules
  .find((m) => m.segmentId === "s0")
  ?.fields.find((f) => f.label === "Core Illusion Mechanism");
assert(Boolean(s0Mechanism?.value.includes("judged")), "S0 Core Illusion Mechanism");

console.log("PASS: smoke-result-1977 — S1-24 / S3-04 / S2-23 / S0-09");
console.log("  signature:", content.combinationSignature);
console.log("  theme:", content.integratedSoulBlueprint?.integrationTheme);
