/**
 * Smoke: Canonical Full Report object (Priority 1 foundation).
 * Run: npm run smoke:report-canonical
 */
import {
  assertCanonicalReportComplete,
  buildCanonicalReport,
  buildCanonicalSampleReport,
  CANONICAL_SAMPLE_BIRTH_DATE,
  CANONICAL_REPORT_SCHEMA_VERSION,
} from "../lib/canonical-report";

const report = buildCanonicalSampleReport();
const failures = assertCanonicalReportComplete(report);

if (report.schemaVersion !== CANONICAL_REPORT_SCHEMA_VERSION) {
  console.error(`FAIL: schema version ${report.schemaVersion}`);
  process.exit(1);
}

if (failures.length > 0) {
  console.error("FAIL: canonical report incomplete");
  for (const failure of failures) {
    console.error(`  - ${failure}`);
  }
  process.exit(1);
}

const lumenDate = buildCanonicalReport({
  name: "Parity Baseline",
  birth_date: "1982-02-03",
  birth_date_display: "February 3, 1982",
});

if (lumenDate.payload.calculation.combination_signature !== "S1-20|S3-01|S2-05|S0-05") {
  console.error(
    `FAIL: Lumen baseline signature ${lumenDate.payload.calculation.combination_signature}`,
  );
  process.exit(1);
}

const incompleteSections = report.sections.filter((section) => !section.complete);
if (incompleteSections.length > 0) {
  console.error("FAIL: sections missing required payload fields");
  for (const section of incompleteSections) {
    console.error(`  - ${section.id}: ${section.missingRequired.join(", ")}`);
  }
  process.exit(1);
}

console.log(
  `PASS: smoke-report-canonical — ${CANONICAL_SAMPLE_BIRTH_DATE}, sections=${report.sections.length}, schema=${report.schemaVersion}`,
);
