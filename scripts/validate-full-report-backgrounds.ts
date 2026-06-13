/**
 * Verify screen-manifest backgrounds exist on disk.
 * Run: `npm run validate:backgrounds`
 */
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { FULL_REPORT_SCREENS } from "../lib/full-report/screen-manifest";

const DST = join(process.cwd(), "public", "full-report", "backgrounds");
const missing: string[] = [];
const duplicates = new Map<number, string[]>();

for (const screen of FULL_REPORT_SCREENS) {
  const path = join(DST, screen.background);
  if (!existsSync(path)) {
    missing.push(`${screen.artPage.toString().padStart(2, "0")} ${screen.id} → ${screen.background}`);
  }
  const bucket = duplicates.get(screen.artPage) ?? [];
  bucket.push(screen.id);
  duplicates.set(screen.artPage, bucket);
}

const dupArtPages = [...duplicates.entries()].filter(([, ids]) => ids.length > 1);
const fileCount = existsSync(DST) ? readdirSync(DST).filter((f) => f.endsWith(".png")).length : 0;

console.log(`Screens: ${FULL_REPORT_SCREENS.length} | PNG files in backgrounds/: ${fileCount}`);

if (dupArtPages.length) {
  console.error("\nDuplicate artPage values:");
  for (const [page, ids] of dupArtPages) {
    console.error(`  ${page}: ${ids.join(", ")}`);
  }
}

if (missing.length) {
  console.error(`\nMissing ${missing.length} background(s):`);
  for (const line of missing) console.error(`  ${line}`);
  process.exit(1);
}

console.log("All manifest backgrounds found.");
