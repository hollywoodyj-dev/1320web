/**
 * Shift full-report backgrounds 07→08 … 36→37 after inserting new page 07 (S1 overflow).
 * Run once when upgrading from the 36-page art pack: `npm run renumber:backgrounds`
 *
 * Expect Lumen's new art as `07-S1 OVERFLOW.png` (syncs to `07-s1-overflow.png`).
 * After renumber, run `npm run sync:backgrounds` when the 37-file source pack is in place.
 */
import { copyFileSync, existsSync, readdirSync, renameSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(process.cwd(), "public");
const DST = join(ROOT, "full-report", "backgrounds");
const SRC = join(ROOT, "1320 FULL REPORT BACKGROUND PICTURES");

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

function renumberFolder(dir: string, label: string) {
  if (!existsSync(dir)) {
    console.log(`Skip ${label}: folder not found (${dir})`);
    return;
  }

  const files = readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".png"));
  const toShift = files
    .map((f) => ({ file: f, num: pageNum(f) }))
    .filter((entry): entry is { file: string; num: number } => entry.num !== null && entry.num >= 7 && entry.num <= 36)
    .sort((a, b) => b.num - a.num);

  if (!toShift.length) {
    console.log(`Skip ${label}: no numbered files 07–36 to shift`);
    return;
  }

  const alreadyShifted = files.some((f) => pageNum(f) === 37);
  if (alreadyShifted) {
    console.log(`Skip ${label}: page 37 already present — looks renumbered`);
    return;
  }

  for (const { file } of toShift) {
    const from = join(dir, file);
    const to = join(dir, shiftFilename(file, 1));
    renameSync(from, to);
    console.log(`[${label}] ${file} → ${shiftFilename(file, 1)}`);
  }
}

renumberFolder(DST, "backgrounds");

const overflowDst = join(DST, "07-s1-overflow.png");
if (!existsSync(overflowDst)) {
  const overflowCandidates = [
    join(SRC, "07-S1 OVERFLOW.png"),
    join(SRC, "07-S1 CONTENT 2.png"),
    join(SRC, "07-S1 CONTENT PART 2.png"),
    join(DST, "07-s1-content-2.png"),
  ];
  const found = overflowCandidates.find((p) => existsSync(p));
  if (found) {
    copyFileSync(found, overflowDst);
    console.log(`[backgrounds] copied new page 07 from ${found}`);
  } else {
    console.warn(
      "[backgrounds] missing 07-s1-overflow.png — add Lumen art (07-S1 OVERFLOW.png) to source folder, then npm run sync:backgrounds",
    );
  }
}

console.log("Done. Verify screen-manifest.ts matches 37-page numbering.");
