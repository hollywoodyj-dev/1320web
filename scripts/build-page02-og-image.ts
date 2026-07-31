import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

async function main() {
  const out = path.join(process.cwd(), "public/seo/life-path-number-vs-soul-blueprint-1320.webp");
  fs.mkdirSync(path.dirname(out), { recursive: true });

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#070d1c"/>
      <stop offset="55%" stop-color="#0c1830"/>
      <stop offset="100%" stop-color="#101f3a"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="48%" r="48%">
      <stop offset="0%" stop-color="#d4b56a" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#d4b56a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Left: one Life Path circle -->
  <circle cx="280" cy="300" r="78" fill="none" stroke="#e8cd96" stroke-width="2" opacity="0.9"/>
  <circle cx="280" cy="300" r="12" fill="#e8cd96"/>
  <text x="280" y="420" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="28">Life Path Number</text>
  <text x="280" y="455" text-anchor="middle" fill="#c9b27a" font-family="Georgia, 'Times New Roman', serif" font-size="18">One number</text>

  <!-- Centre bridge -->
  <line x1="390" y1="300" x2="560" y2="300" stroke="#e8cd96" stroke-width="1.5" opacity="0.55"/>
  <text x="600" y="250" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="34">vs</text>
  <line x1="640" y1="300" x2="760" y2="300" stroke="#e8cd96" stroke-width="1.5" opacity="0.55"/>

  <!-- Right: four foundation points S1 → S3 → S2 → S0 -->
  <g stroke="#e8cd96" stroke-width="1.5" fill="none" opacity="0.9">
    <line x1="820" y1="220" x2="930" y2="280"/>
    <line x1="930" y1="280" x2="860" y2="360"/>
    <line x1="860" y1="360" x2="980" y2="400"/>
  </g>
  <g fill="#e8cd96">
    <circle cx="820" cy="220" r="7"/>
    <circle cx="930" cy="280" r="7"/>
    <circle cx="860" cy="360" r="7"/>
    <circle cx="980" cy="400" r="7"/>
  </g>
  <g fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="18" text-anchor="middle">
    <text x="820" y="200">S1</text>
    <text x="955" y="275">S3</text>
    <text x="830" y="370">S2</text>
    <text x="1005" y="410">S0</text>
  </g>
  <text x="900" y="470" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="28">Soul Blueprint</text>
  <text x="900" y="505" text-anchor="middle" fill="#c9b27a" font-family="Georgia, 'Times New Roman', serif" font-size="18">S1 → S3 → S2 → S0</text>

  <text x="600" y="100" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="36">Life Path Number vs Soul Blueprint</text>
  <text x="600" y="580" text-anchor="middle" fill="#c9b27a" font-family="Georgia, 'Times New Roman', serif" font-size="18" letter-spacing="3">1320 SOUL CODE</text>
</svg>`;

  const info = await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(out);
  console.log("wrote", out, info);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
