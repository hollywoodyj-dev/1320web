/**
 * Import S5 Seed Database into `data/1320/s5-seed-database.json`.
 * Canonical source: `data/1320/sources/S5_Seed_Database_Bilingual.xlsx`
 * Intermediate: `data/1320/sources/S5_Seed_Database_Bilingual.json`
 *
 * Run: npm run import:s5-seeds
 */
import fs from "node:fs";
import path from "node:path";
import { buildS5SeedDatabaseFromXlsx } from "./build-s5-json-from-xlsx";

const ROOT = process.cwd();
const XLSX_SOURCE = path.join(
  ROOT,
  "data/1320/sources/S5_Seed_Database_Bilingual.xlsx"
);
const JSON_SOURCE = path.join(
  ROOT,
  "data/1320/sources/S5_Seed_Database_Bilingual.json"
);
const OUT = path.join(ROOT, "data/1320/s5-seed-database.json");

function main() {
  let raw: {
    _meta?: Record<string, unknown>;
    S5_PrimaryMissionSeeds_From_S1?: Record<string, unknown>;
    S5_MirrorTaskSeeds_From_S2?: Record<string, unknown>;
    S5_VibrationCarrierSeeds_From_S3?: Record<string, unknown>;
    S5_VoidChallengeSeeds_From_S0?: Record<string, unknown>;
  };

  if (fs.existsSync(XLSX_SOURCE)) {
    raw = buildS5SeedDatabaseFromXlsx(XLSX_SOURCE);
    fs.writeFileSync(JSON_SOURCE, `${JSON.stringify(raw, null, 2)}\n`, "utf8");
    console.log("Built", JSON_SOURCE, "from", path.basename(XLSX_SOURCE));
  } else if (fs.existsSync(JSON_SOURCE)) {
    raw = JSON.parse(fs.readFileSync(JSON_SOURCE, "utf8")) as typeof raw;
    console.log("Using existing", JSON_SOURCE);
  } else {
    console.error("Missing", XLSX_SOURCE, "and", JSON_SOURCE);
    process.exit(1);
  }

  const counts = {
    s1: Object.keys(raw.S5_PrimaryMissionSeeds_From_S1 ?? {}).length,
    s2: Object.keys(raw.S5_MirrorTaskSeeds_From_S2 ?? {}).length,
    s3: Object.keys(raw.S5_VibrationCarrierSeeds_From_S3 ?? {}).length,
    s0: Object.keys(raw.S5_VoidChallengeSeeds_From_S0 ?? {}).length,
  };

  fs.writeFileSync(OUT, `${JSON.stringify(raw, null, 2)}\n`, "utf8");

  console.log("Wrote", OUT);
  console.log("  S1 seeds:", counts.s1);
  console.log("  S2 seeds:", counts.s2);
  console.log("  S3 seeds:", counts.s3);
  console.log("  S0 seeds:", counts.s0);
  console.log("  total:", counts.s1 + counts.s2 + counts.s3 + counts.s0);
}

main();
