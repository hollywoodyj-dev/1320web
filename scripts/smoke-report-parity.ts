/**
 * Smoke: Desktop/mobile resolver-level parity baseline (Wisewave 2/4).
 * Run: npm run smoke:report-parity
 *
 * Reports gaps by fix priority. Does not fail CI until parity work lands —
 * use `--enforce-priority=N` to fail on gaps at or below that band.
 */
import {
  CANONICAL_SAMPLE_BIRTH_DATE,
  compareReportParity,
  formatParityReport,
} from "../lib/canonical-report";
import type { ParityFixPriority } from "../lib/canonical-report";

const args = process.argv.slice(2);
const enforceArg = args.find((arg) => arg.startsWith("--enforce-priority="));
const enforcePriority = enforceArg
  ? (Number(enforceArg.split("=")[1]) as ParityFixPriority)
  : undefined;

const dates = [
  { birth_date: CANONICAL_SAMPLE_BIRTH_DATE, label: "canonical" },
  { birth_date: "1982-02-03", label: "lumen-baseline" },
  { birth_date: "1977-11-12", label: "wisewave-1977" },
];

let totalContentGaps = 0;
let totalExperienceGaps = 0;

for (const entry of dates) {
  const report = compareReportParity({
    name: "Parity Smoke",
    birth_date: entry.birth_date,
  });

  totalContentGaps += report.contentParityGaps.length;
  totalExperienceGaps += report.experienceParityGaps.length;

  console.log(`\n=== ${entry.label} (${entry.birth_date}) ===`);
  console.log(formatParityReport(report));
}

console.log(
  `\nSUMMARY: content gaps=${totalContentGaps}, experience gaps=${totalExperienceGaps}`,
);
console.log(
  "NOTE: Experience gaps exclude decorative alt text and intentional mobile simplifications (Phase B). Content gaps must remain 0.",
);

if (enforcePriority !== undefined) {
  let enforcedFailures = 0;
  for (const entry of dates) {
    const report = compareReportParity(
      { name: "Parity Smoke", birth_date: entry.birth_date },
      { maxPriority: enforcePriority },
    );
    enforcedFailures += report.contentParityGaps.length + report.experienceParityGaps.length;
  }

  if (enforcedFailures > 0) {
    console.error(
      `\nFAIL: ${enforcedFailures} parity gap(s) at or below priority ${enforcePriority}`,
    );
    process.exit(1);
  }

  console.log(`\nPASS: no parity gaps at or below priority ${enforcePriority}`);
} else {
  console.log("\nPASS: smoke-report-parity baseline recorded (non-enforcing mode)");
}
