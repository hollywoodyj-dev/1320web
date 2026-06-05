/**
 * Image weight audit for perf baseline (step 4).
 * Run: npm run audit:assets
 */
import fs from "node:fs";
import path from "node:path";

const PUBLIC = path.join(process.cwd(), "public");
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"]);

const WARN_MB = 1.5;
const FAIL_MB = 8;

type Row = { rel: string; mb: number };

function walk(dir: string, base = ""): Row[] {
  const rows: Row[] = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = base ? `${base}/${name}` : name;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      rows.push(...walk(full, rel));
      continue;
    }
    const ext = path.extname(name).toLowerCase();
    if (!IMAGE_EXT.has(ext)) continue;
    rows.push({ rel, mb: stat.size / (1024 * 1024) });
  }
  return rows;
}

const rows = walk(PUBLIC).sort((a, b) => b.mb - a.mb);
const totalMb = rows.reduce((sum, r) => sum + r.mb, 0);
const heavy = rows.filter((r) => r.mb >= WARN_MB);
const critical = rows.filter((r) => r.mb >= FAIL_MB);

console.log("=== Image audit (public/) ===\n");
console.log(`Files: ${rows.length}  |  Total: ${totalMb.toFixed(1)} MB\n`);

console.log("Top 15 by size:");
for (const row of rows.slice(0, 15)) {
  console.log(`  ${row.mb.toFixed(2).padStart(7)} MB  ${row.rel}`);
}

console.log(`\n>= ${WARN_MB} MB (warn): ${heavy.length} files`);
console.log(`>= ${FAIL_MB} MB (critical): ${critical.length} files`);

if (critical.length > 0) {
  console.error("\nFAIL: compress or convert critical assets before production:");
  for (const row of critical) {
    console.error(`  ${row.mb.toFixed(2)} MB  ${row.rel}`);
  }
  process.exit(1);
}

console.log("\nPASS: audit-assets (no file >= 8 MB — tune FAIL_MB when v3 is compressed)");
