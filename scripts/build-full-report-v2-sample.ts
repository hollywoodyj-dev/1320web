/**
 * Writes sample JSON payloads for Full Report v2 Phase 1.
 * Run: npm run build:full-report-v2-sample
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildCalculationOutput } from "../lib/full-report-v2/build-calculation-output";
import {
  buildSampleFullReportV2Payload,
  CANONICAL_SAMPLE_BIRTH_DATE,
} from "../lib/full-report-v2/build-sample-payload";
import { calculate1320Code } from "../lib/calculate1320Code";

const outDir = join(process.cwd(), "data", "full-report-v2", "sample");
mkdirSync(outDir, { recursive: true });

const payload = buildSampleFullReportV2Payload({
  name: "Example",
  birth_date: CANONICAL_SAMPLE_BIRTH_DATE,
  birth_date_display: "May 22, 1980",
});

const codes = calculate1320Code(1980, 5, 22);
const calculationOutput = buildCalculationOutput(codes, {
  s1: payload.calculation.s1.title,
  s2: payload.calculation.s2.title,
  s3: payload.calculation.s3.title,
  s0: payload.calculation.s0.title,
});

const inputClient = {
  client: payload.client,
  report: { report_mode: "paid_full" },
};

const contentPayload = {
  modules: payload.modules,
  integrated_blueprint: payload.integrated_blueprint,
  integration_practice: payload.integration_practice,
};

writeFileSync(join(outDir, "input-client.json"), JSON.stringify(inputClient, null, 2));
writeFileSync(join(outDir, "calculation-output.json"), JSON.stringify(calculationOutput, null, 2));
writeFileSync(join(outDir, "content-payload.json"), JSON.stringify(contentPayload, null, 2));
writeFileSync(join(outDir, "final-report-payload.json"), JSON.stringify(payload, null, 2));

console.log(`Wrote sample payloads to ${outDir}`);
