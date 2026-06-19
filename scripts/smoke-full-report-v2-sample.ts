/**
 * Smoke: Full Report v2 sample payload (canonical 1980-05-22).
 * Run: npm run smoke:full-report-v2-sample
 */
import {
  buildSampleFullReportV2Payload,
  CANONICAL_SAMPLE_BIRTH_DATE,
} from "../lib/full-report-v2/build-sample-payload";

const payload = buildSampleFullReportV2Payload({
  name: "Smoke Test",
  birth_date: CANONICAL_SAMPLE_BIRTH_DATE,
});

const expectedSig = "S1-18|S3-03|S2-27|S0-07";

if (payload.calculation.combination_signature !== expectedSig) {
  console.error(
    `FAIL: signature ${payload.calculation.combination_signature} !== ${expectedSig}`,
  );
  process.exit(1);
}

if (payload.calculation.s3.raw !== 110) {
  console.error(`FAIL: S3 raw ${payload.calculation.s3.raw} !== 110`);
  process.exit(1);
}

if (payload.calculation.s3.code !== "S3-03") {
  console.error(`FAIL: S3 code ${payload.calculation.s3.code} !== S3-03`);
  process.exit(1);
}

const moduleKeys = Object.keys(payload.modules);
if (moduleKeys.length !== 10) {
  console.error(`FAIL: expected 10 module slots, got ${moduleKeys.length}`);
  process.exit(1);
}

for (const key of ["s0", "s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]) {
  const slot = payload.modules[key as keyof typeof payload.modules];
  if (!slot.code) {
    console.error(`FAIL: modules.${key} missing code`);
    process.exit(1);
  }
}

console.log(
  `PASS: smoke-full-report-v2-sample — ${expectedSig}, modules=${moduleKeys.length}`,
);
