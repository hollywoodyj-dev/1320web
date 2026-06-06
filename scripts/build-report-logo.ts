/**
 * Build transparent `public/1320-logo-report-v5.webp` from source PNG/JPEG.
 * Source ships with a white matte (not real alpha) — we feather it out in build.
 * Run: npm run build:report-logo
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SOURCE_PNG = path.join(ROOT, "data/1320/sources/1320-logo-report.png");
const SOURCE_JPEG = path.join(ROOT, "data/1320/sources/1320-logo-report.jpeg");
const OUTPUT = path.join(ROOT, "public/1320-logo-report-v5.webp");

/** White matte → premultiplied alpha (keeps saturated gold, drops flat white). */
function applyWhiteMatte(data: Buffer) {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const minC = Math.min(r, g, b);
    const maxC = Math.max(r, g, b);
    const saturation = maxC === 0 ? 0 : (maxC - minC) / maxC;

    let alpha = 255;

    if (minC >= 252) {
      alpha = 0;
    } else if (saturation < 0.12 && minC >= 200) {
      alpha = Math.round((252 - minC) * (255 / 52));
    } else if (saturation < 0.06 && minC >= 170) {
      alpha = Math.round((220 - minC) * (255 / 50));
    }

    alpha = Math.max(0, Math.min(255, alpha));
    data[i] = Math.round((r * alpha) / 255);
    data[i + 1] = Math.round((g * alpha) / 255);
    data[i + 2] = Math.round((b * alpha) / 255);
    data[i + 3] = alpha;
  }
}

async function main() {
  const source = fs.existsSync(SOURCE_PNG) ? SOURCE_PNG : SOURCE_JPEG;
  if (!fs.existsSync(source)) {
    console.error("Missing source:", SOURCE_PNG, "or", SOURCE_JPEG);
    process.exit(1);
  }

  const { data, info } = await sharp(source)
    .resize(1254, 1254, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  applyWhiteMatte(data);

  await sharp(data, { raw: info })
    .webp({ quality: 92, effort: 6, alphaQuality: 100 })
    .toFile(OUTPUT);

  const sizeKb = (fs.statSync(OUTPUT).size / 1024).toFixed(1);
  console.log(`Wrote ${path.relative(ROOT, OUTPUT)} from ${path.basename(source)} (${info.width}x${info.height}, ${sizeKb} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
