/**
 * Import S5 Seed Database into `data/1320/s5-seed-database.json`.
 * Source: `data/1320/sources/S5_Seed_Database_Bilingual.json`
 *
 * Run: npm run import:s5-seeds
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, "data/1320/sources/S5_Seed_Database_Bilingual.json");
const OUT = path.join(ROOT, "data/1320/s5-seed-database.json");

function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error("Missing", SOURCE);
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(SOURCE, "utf8")) as {
    _meta?: Record<string, unknown>;
    S5_PrimaryMissionSeeds_From_S1?: Record<string, unknown>;
    S5_MirrorTaskSeeds_From_S2?: Record<string, unknown>;
    S5_VibrationCarrierSeeds_From_S3?: Record<string, unknown>;
    S5_VoidChallengeSeeds_From_S0?: Record<string, unknown>;
  };

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
