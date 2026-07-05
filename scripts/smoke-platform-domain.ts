/**
 * Smoke: FS-005A platform domain types + Soul Blueprint immutability guard.
 * Run: npm run smoke:platform-domain
 */
import { buildCanonicalSampleReport } from "@/lib/canonical-report";
import { withDb } from "@/lib/db/client";
import { getSoulReportById } from "@/lib/db/reports";
import { isDatabaseConfigured } from "@/lib/platform-config";
import {
  assertSoulBlueprintReadOnly,
  freezeSoulBlueprintSnapshot,
  toSoulBlueprintRef,
} from "@/lib/platform-domain";
import type { SoulReportRow } from "@/lib/db/types";

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(message);
}

async function main() {
  const canonical = buildCanonicalSampleReport();
  const mockReport: SoulReportRow = {
    id: "00000000-0000-4000-8000-000000000001",
    user_id: "00000000-0000-4000-8000-000000000002",
    birth_date: "1980-05-22",
    birth_year: 1980,
    birth_month: 5,
    birth_day: 22,
    s1_code: "S1-18",
    s3_code: "S3-110",
    s2_code: "S2-27",
    s0_code: "S0-07",
    code_string: "S1-18 | S3-110 | S2-27 | S0-07",
    combination_signature: "mock-signature",
    report_version: "v1",
    created_at: new Date(),
  };

  const ref = toSoulBlueprintRef(mockReport, canonical);
  assert(ref.domainVersion === "soul-blueprint-v1", "domain version");
  assert(ref.codes.s1 === "S1-18", "s1 code mapped");

  const snapshot = freezeSoulBlueprintSnapshot(ref, canonical);
  assert(snapshot.canonical.payload.client.name === canonical.payload.client.name, "snapshot clone");

  const frozen = assertSoulBlueprintReadOnly(canonical);
  assert(Object.isFrozen(frozen), "canonical frozen");

  if (isDatabaseConfigured()) {
    await withDb(async () => {
      const live = await getSoulReportById(mockReport.id);
      if (live) {
        const liveRef = toSoulBlueprintRef(live, canonical);
        assert(liveRef.reportId === live.id, "live report ref");
      }
    });
  }

  console.log("smoke:platform-domain PASS");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
