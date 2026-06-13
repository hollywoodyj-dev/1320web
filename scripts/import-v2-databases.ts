/**
 * Re-copy v2 content JSON from steward pack into web/data/1320-v2/.
 * Run: npm run import:v2-databases  (alias for build:bilingual-v2)
 *
 * Builds full bilingual databases from steward pack + v1 masters.
 * See scripts/build-bilingual-v2-databases.ts
 */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const result = spawnSync("npx", ["tsx", join(here, "build-bilingual-v2-databases.ts")], {
  stdio: "inherit",
  shell: true,
});
process.exit(result.status ?? 1);
