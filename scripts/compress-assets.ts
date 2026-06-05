/**
 * Lossy compress `public/` images used by the app (PNG/JPEG → WebP or optimized JPEG).
 * Run: npm run compress:assets
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC = path.join(process.cwd(), "public");

/** Relative paths from `public/` — keep in sync with app references. */
const WEBP_TARGETS: { rel: string; quality: number }[] = [
  { rel: "report-bg-v3-1920x4048.png", quality: 82 },
  { rel: "report-bg-v2.png", quality: 82 },
  { rel: "hero-banner-desktop-v1.png", quality: 88 },
  { rel: "hero-banner-v5.png", quality: 88 },
  { rel: "generating-bg-v1.png", quality: 85 },
  { rel: "generating-1320-ring.png", quality: 88 },
  { rel: "generating-steps-s1.png", quality: 88 },
  { rel: "generating-steps-s2.png", quality: 88 },
  { rel: "generating-steps-s3.png", quality: 88 },
  { rel: "generating-steps-s0.png", quality: 88 },
  { rel: "card/s1.png", quality: 88 },
  { rel: "card/s2.png", quality: 88 },
  { rel: "card/s3.png", quality: 88 },
  { rel: "card/s0.png", quality: 88 },
  { rel: "how-1320-works/step-01.png", quality: 88 },
  { rel: "how-1320-works/step-02.png", quality: 88 },
  { rel: "how-1320-works/step-03.png", quality: 88 },
  { rel: "how-1320-works/step-04.png", quality: 88 },
  ...Array.from({ length: 44 }, (_, i) => ({
    rel: `S1-44/S${String(i + 1).padStart(2, "0")}.png`,
    quality: 88,
  })),
  ...Array.from({ length: 12 }, (_, i) => ({
    rel: `S3-12/S${String(i + 1).padStart(2, "0")}.png`,
    quality: 88,
  })),
];

const JPEG_TARGETS = [{ rel: "1320-logo.jpeg", quality: 88 }];

/** Card packs dropped in as PNG (e.g. `public/S2-50/S2-27.png`). */
function discoverPngInDir(dirRel: string, quality: number): { rel: string; quality: number }[] {
  const dir = path.join(PUBLIC, dirRel);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => /\.png$/i.test(name))
    .sort()
    .map((name) => ({ rel: `${dirRel}/${name}`, quality }));
}

function allWebpTargets(): { rel: string; quality: number }[] {
  return [
    ...WEBP_TARGETS,
    ...discoverPngInDir("S2-50", 88),
    ...discoverPngInDir("S0-19", 88),
  ];
}

function mb(bytes: number) {
  return (bytes / (1024 * 1024)).toFixed(2);
}

async function convertToWebp(rel: string, quality: number) {
  const input = path.join(PUBLIC, rel);
  if (!fs.existsSync(input)) {
    console.warn("  skip (missing)", rel);
    return;
  }

  const outRel = rel.replace(/\.(png|jpe?g)$/i, ".webp");
  const output = path.join(PUBLIC, outRel);
  const before = fs.statSync(input).size;

  await sharp(input).webp({ quality, effort: 6 }).toFile(output);
  const after = fs.statSync(output).size;

  if (path.resolve(input) !== path.resolve(output)) {
    fs.unlinkSync(input);
  }

  console.log(`  ${rel} → ${outRel}  ${mb(before)} MB → ${mb(after)} MB`);
}

async function optimizeJpeg(rel: string, quality: number) {
  const input = path.join(PUBLIC, rel);
  if (!fs.existsSync(input)) {
    console.warn("  skip (missing)", rel);
    return;
  }

  const tmp = `${input}.tmp`;
  const before = fs.statSync(input).size;
  await sharp(input).jpeg({ quality, mozjpeg: true }).toFile(tmp);
  fs.renameSync(tmp, input);
  const after = fs.statSync(input).size;
  console.log(`  ${rel}  ${mb(before)} MB → ${mb(after)} MB`);
}

async function main() {
  console.log("=== WebP conversion ===\n");
  for (const { rel, quality } of allWebpTargets()) {
    await convertToWebp(rel, quality);
  }

  console.log("\n=== JPEG optimize ===\n");
  for (const { rel, quality } of JPEG_TARGETS) {
    await optimizeJpeg(rel, quality);
  }

  console.log("\nDone. Update any hardcoded .png paths if you add new assets.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
