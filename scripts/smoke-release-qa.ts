/**
 * Release QA — automated regression bundle (Section 1 of FULL_REPORT_RELEASE_QA_v1.md).
 * Run: npm run smoke:release-qa
 */
import { execSync } from "node:child_process";

const steps: Array<{ name: string; command: string }> = [
  { name: "build", command: "npm run build" },
  { name: "report-canonical", command: "npm run smoke:report-canonical" },
  { name: "report-parity", command: "npm run smoke:report-parity" },
  {
    name: "report-parity-enforce-p2",
    command: "npm run smoke:report-parity -- --enforce-priority=2",
  },
  { name: "audit-experience-gaps", command: "npx tsx scripts/audit-experience-gaps.ts" },
  { name: "v2-calculation", command: "npm run smoke:v2-calculation" },
  { name: "v2-content", command: "npm run smoke:v2-content" },
  { name: "full-report-v2-sample", command: "npm run smoke:full-report-v2-sample" },
  { name: "full-report-payload", command: "npm run smoke:full-report-payload" },
  { name: "result-1977", command: "npm run smoke:result-1977" },
];

let failures = 0;

console.log("=== Full Report Release QA — automated regression ===\n");

for (const step of steps) {
  process.stdout.write(`→ ${step.name}… `);
  try {
    execSync(step.command, { stdio: "pipe", encoding: "utf8" });
    console.log("PASS");
  } catch (error) {
    failures += 1;
    console.log("FAIL");
    const err = error as { stdout?: string; stderr?: string };
    const output = [err.stdout, err.stderr].filter(Boolean).join("\n").trim();
    if (output) {
      console.log(output.slice(0, 2000));
      if (output.length > 2000) console.log("… (truncated)");
    }
  }
}

console.log(`\n=== Summary: ${failures === 0 ? "PASS" : `${failures} failure(s)`} ===`);

if (failures > 0) {
  process.exit(1);
}
