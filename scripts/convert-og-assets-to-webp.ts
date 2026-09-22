/**
 * One-off: 1024×576 PNG → 1200×630 WebP (cover crop).
 * Run: npx tsx scripts/convert-og-assets-to-webp.ts <assetsDir>
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const assetsDir = process.argv[2]?.trim();
if (!assetsDir || !fs.existsSync(assetsDir)) {
  console.error("Usage: npx tsx scripts/convert-og-assets-to-webp.ts <assetsDir>");
  process.exit(1);
}

const outDir = path.join(process.cwd(), "public", "seo");

const jobs: { src: string; dest: string }[] = [
  { src: "1320-og-home.png", dest: "home-1320.webp" },
  { src: "1320-og-free-soul-blueprint.png", dest: "free-soul-blueprint-1320.webp" },
  {
    src: "1320-og-is-numerology-scientifically-proven-v2.png",
    dest: "is-numerology-scientifically-proven-1320.webp",
  },
];

async function main() {
  for (const { src, dest } of jobs) {
    const input = path.join(assetsDir, src);
    const output = path.join(outDir, dest);
    if (!fs.existsSync(input)) {
      console.error("Missing:", input);
      process.exit(1);
    }
    await sharp(input)
      .resize(1200, 630, { fit: "cover", position: "centre" })
      .webp({ quality: 88 })
      .toFile(output);
    const stat = fs.statSync(output);
    console.log(`${dest}: ${stat.size} bytes`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
