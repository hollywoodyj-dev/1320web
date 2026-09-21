/**
 * N0.5 — survey closure checklist (conditional, not row-count padding).
 * Run: npx tsx scripts/probe-t18-survey-closure.ts [json-path]
 */
import fs from "node:fs";
import path from "node:path";

type SurveyRow = {
  name: string;
  outputMeasured: string;
  proseOutputMismatch?: boolean;
  rowClosed?: boolean;
  triplet?: string | null;
};

const MIN_PER_CONVENTION = 2;
const MIN_MISMATCH = 2;
const MIN_TOTAL_CLOSED = 8;

const CONVENTIONS = ["A", "A_prime", "B"] as const;

function main() {
  const jsonPath =
    process.argv[2]?.trim() ||
    path.join(process.cwd(), "qa-artifacts", "t18-calculator-survey-partial.json");

  if (!fs.existsSync(jsonPath)) {
    console.log(JSON.stringify({ error: "survey file not found", path: jsonPath }));
    process.exit(1);
  }

  const rows = JSON.parse(fs.readFileSync(jsonPath, "utf8")) as SurveyRow[];
  const closed = rows.filter((r) => r.rowClosed);
  /** Stop rule: evidenced measurement that matches no signature — not scrape failures. */
  const unknowns = rows.filter((r) => r.rowClosed && r.outputMeasured === "UNKNOWN");
  const scrapeFailed = rows.filter((r) => r.outputMeasured === "SCRAPE_FAILED");

  const byConvention: Record<string, string[]> = { A: [], A_prime: [], B: [] };
  const mismatches: string[] = [];

  for (const row of closed) {
    const measured = row.outputMeasured;
    if (measured in byConvention) {
      byConvention[measured].push(row.name);
    }
    if (row.proseOutputMismatch) mismatches.push(row.name);
  }

  const conventionOk = CONVENTIONS.every((c) => byConvention[c].length >= MIN_PER_CONVENTION);
  const mismatchOk = mismatches.length >= MIN_MISMATCH;
  const totalOk = closed.length >= MIN_TOTAL_CLOSED;

  const gaps = {
    A: Math.max(0, MIN_PER_CONVENTION - byConvention.A.length),
    A_prime: Math.max(0, MIN_PER_CONVENTION - byConvention.A_prime.length),
    B: Math.max(0, MIN_PER_CONVENTION - byConvention.B.length),
    mismatch: Math.max(0, MIN_MISMATCH - mismatches.length),
    totalClosed: Math.max(0, MIN_TOTAL_CLOSED - closed.length),
  };

  console.log("=== N0.5 survey closure checklist ===");
  console.log(
    JSON.stringify(
      {
        file: jsonPath,
        totalRows: rows.length,
        closedRows: closed.length,
        byConvention: {
          A: byConvention.A,
          A_prime: byConvention.A_prime,
          B: byConvention.B,
        },
        mismatches,
        unknownTripletStop: unknowns.map((r) => ({ name: r.name, triplet: r.triplet })),
        scrapeFailedNotStop: scrapeFailed.map((r) => ({ name: r.name, triplet: r.triplet })),
        criteria: {
          minPerConvention: MIN_PER_CONVENTION,
          minMismatch: MIN_MISMATCH,
          minTotalClosed: MIN_TOTAL_CLOSED,
        },
        gaps,
        readyToClose: conventionOk && mismatchOk && totalOk && unknowns.length === 0,
      },
      null,
      2,
    ),
  );

  if (unknowns.length > 0) {
    console.error("\nSTOP: UNKNOWN triplet(s) — report to Haze before continuing.");
    process.exit(2);
  }
}

main();
