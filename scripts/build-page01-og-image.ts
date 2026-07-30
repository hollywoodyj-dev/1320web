import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

async function main() {
  const out = path.join(process.cwd(), "public/seo/what-is-a-soul-blueprint-1320.webp");
  fs.mkdirSync(path.dirname(out), { recursive: true });

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#070d1c"/>
      <stop offset="55%" stop-color="#0c1830"/>
      <stop offset="100%" stop-color="#101f3a"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="48%" r="42%">
      <stop offset="0%" stop-color="#d4b56a" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#d4b56a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g stroke="#e8cd96" stroke-width="1.5" fill="none" opacity="0.85">
    <line x1="600" y1="168" x2="760" y2="300"/>
    <line x1="760" y1="300" x2="600" y2="432"/>
    <line x1="600" y1="432" x2="440" y2="300"/>
    <line x1="440" y1="300" x2="600" y2="168"/>
    <line x1="440" y1="300" x2="760" y2="300" stroke-opacity="0.35"/>
    <line x1="600" y1="168" x2="600" y2="432" stroke-opacity="0.35"/>
  </g>
  <g fill="#e8cd96">
    <circle cx="600" cy="168" r="7"/>
    <circle cx="760" cy="300" r="7"/>
    <circle cx="440" cy="300" r="7"/>
    <circle cx="600" cy="432" r="7"/>
  </g>
  <g fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="22" text-anchor="middle">
    <text x="600" y="148">S1</text>
    <text x="790" y="306">S3</text>
    <text x="410" y="306">S2</text>
    <text x="600" y="462">S0</text>
  </g>
  <text x="600" y="530" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="42">What Is a Soul Blueprint?</text>
  <text x="600" y="575" text-anchor="middle" fill="#c9b27a" font-family="Georgia, 'Times New Roman', serif" font-size="20" letter-spacing="3">1320 SOUL CODE</text>
</svg>`;

  const info = await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(out);
  console.log("wrote", out, info);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
