/**
 * Reverse the +1 renumber (08→07 … 37→36), then apply Lumen naming:
 * - 07-s3-divide → 07-s1-overflow.png
 * - keep 08-s3-divider-v2.png, 09-s2-divider-v2.png after shift
 */
import { existsSync, readdirSync, renameSync } from "node:fs";
import { join } from "node:path";

const DST = join(process.cwd(), "public", "full-report", "backgrounds");

function pageNum(filename: string): number | null {
  const match = /^(\d+)-/.exec(filename);
  return match ? Number(match[1]) : null;
}

function shiftFilename(filename: string, delta: number): string {
  const match = /^(\d+)-(.*)$/.exec(filename);
  if (!match) return filename;
  const next = Number(match[1]) + delta;
  return `${String(next).padStart(2, "0")}-${match[2]}`;
}

if (!existsSync(DST)) {
  console.error("backgrounds folder not found");
  process.exit(1);
}

const files = readdirSync(DST).filter((f) => f.toLowerCase().endsWith(".png"));
const toShift = files
  .map((f) => ({ file: f, num: pageNum(f) }))
  .filter((entry): entry is { file: string; num: number } => entry.num !== null && entry.num >= 8 && entry.num <= 37)
  .sort((a, b) => a.num - b.num);

const alreadyRolledBack = files.some((f) => pageNum(f) === 7);
if (alreadyRolledBack && existsSync(join(DST, "07-s1-overflow.png"))) {
  console.log("Already rolled back (07-s1-overflow.png present).");
} else {
  for (const { file } of toShift) {
    const from = join(DST, file);
    const toName = shiftFilename(file, -1);
    const to = join(DST, toName);
    if (existsSync(to)) {
      console.warn(`Skip ${file}: target ${toName} already exists`);
      continue;
    }
    renameSync(from, to);
    console.log(`${file} → ${toName}`);
  }

  const oldS3Divide = join(DST, "07-s3-divide.png");
  const overflow = join(DST, "07-s1-overflow.png");
  if (existsSync(oldS3Divide)) {
    renameSync(oldS3Divide, overflow);
    console.log("07-s3-divide.png → 07-s1-overflow.png");
  } else if (!existsSync(overflow)) {
    console.warn("Missing 07-s3-divide.png and 07-s1-overflow.png");
  }
}

console.log("Rollback complete.");
