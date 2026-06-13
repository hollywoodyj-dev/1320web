/**
 * Copy art pack PNGs from the designer folder into URL-safe `public/full-report/backgrounds/`.
 * Run after adding or replacing backgrounds: `npm run sync:backgrounds`
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(process.cwd(), "public");
const SRC = join(ROOT, "1320 FULL REPORT BACKGROUND PICTURES");
const DST_DESKTOP = join(ROOT, "full-report", "backgrounds");
const DST_MOBILE = join(ROOT, "full-report", "backgrounds-mobile");

function normalizeFilename(name: string): string {
  const base = name.replace(/\.png$/i, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${base}.png`;
}

if (!existsSync(SRC)) {
  console.error(`Source folder not found: ${SRC}`);
  process.exit(1);
}

function syncTo(dst: string, label: string) {
  mkdirSync(dst, { recursive: true });
  const files = readdirSync(SRC).filter((f) => f.toLowerCase().endsWith(".png"));
  for (const file of files) {
    const dest = join(dst, normalizeFilename(file));
    copyFileSync(join(SRC, file), dest);
    console.log(`[${label}] ${file} → ${normalizeFilename(file)}`);
  }
  console.log(`Synced ${files.length} backgrounds to ${dst}`);
  if (files.length === 36) {
    console.log(
      "36-file source pack: rename old 07-S3 DIVIDE to 07-s1-overflow.png after sync; add 08-s3-divider-v2.png and 09-s2-divider-v2.png from Lumen.",
    );
  }
}

syncTo(DST_DESKTOP, "desktop");

if (existsSync(join(ROOT, "1320 FULL REPORT BACKGROUND PICTURES MOBILE"))) {
  const mobileSrc = join(ROOT, "1320 FULL REPORT BACKGROUND PICTURES MOBILE");
  mkdirSync(DST_MOBILE, { recursive: true });
  const mobileFiles = readdirSync(mobileSrc).filter((f) => f.toLowerCase().endsWith(".png"));
  for (const file of mobileFiles) {
    copyFileSync(join(mobileSrc, file), join(DST_MOBILE, normalizeFilename(file)));
  }
  console.log(`Synced ${mobileFiles.length} mobile backgrounds to ${DST_MOBILE}`);
} else {
  console.log("Mobile source folder not found — skip (add 1320 FULL REPORT BACKGROUND PICTURES MOBILE when ready)");
}
