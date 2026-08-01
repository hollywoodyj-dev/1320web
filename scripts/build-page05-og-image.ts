import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

async function main() {
  const out = path.join(
    process.cwd(),
    "public/seo/birthday-number-vs-life-path-number-vs-soul-blueprint-1320.webp",
  );
  fs.mkdirSync(path.dirname(out), { recursive: true });

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#070d1c"/>
      <stop offset="55%" stop-color="#0c1830"/>
      <stop offset="100%" stop-color="#101f3a"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="48%" r="48%">
      <stop offset="0%" stop-color="#d4b56a" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#d4b56a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <text x="600" y="78" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="28">Birthday Number</text>
  <text x="600" y="112" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="22">vs</text>
  <text x="600" y="146" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="28">Life Path Number</text>
  <text x="600" y="180" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="22">vs</text>
  <text x="600" y="214" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="28">Soul Blueprint</text>

  <!-- Left: Birthday Number -->
  <text x="200" y="300" text-anchor="middle" fill="#c9b27a" font-family="Georgia, 'Times New Roman', serif" font-size="18">Day 14</text>
  <line x1="200" y1="315" x2="200" y2="350" stroke="#e8cd96" stroke-width="1.5" opacity="0.7"/>
  <circle cx="200" cy="390" r="42" fill="none" stroke="#e8cd96" stroke-width="1.8"/>
  <text x="200" y="396" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="20">14/5</text>
  <text x="200" y="470" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="18">Birthday Number</text>

  <!-- Centre: Life Path -->
  <text x="600" y="300" text-anchor="middle" fill="#c9b27a" font-family="Georgia, 'Times New Roman', serif" font-size="18">14 June 1990</text>
  <line x1="600" y1="315" x2="600" y2="350" stroke="#e8cd96" stroke-width="1.5" opacity="0.7"/>
  <circle cx="600" cy="390" r="42" fill="none" stroke="#e8cd96" stroke-width="1.8"/>
  <text x="600" y="398" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="28">3</text>
  <text x="600" y="470" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="18">Life Path Number</text>

  <!-- Right: Soul Blueprint -->
  <text x="980" y="300" text-anchor="middle" fill="#c9b27a" font-family="Georgia, 'Times New Roman', serif" font-size="18">Full birth date</text>
  <g stroke="#e8cd96" stroke-width="1.5" fill="none" opacity="0.9">
    <line x1="920" y1="340" x2="980" y2="370"/>
    <line x1="980" y1="370" x2="940" y2="410"/>
    <line x1="940" y1="410" x2="1010" y2="450"/>
  </g>
  <g fill="#e8cd96">
    <circle cx="920" cy="340" r="6"/>
    <circle cx="980" cy="370" r="6"/>
    <circle cx="940" cy="410" r="6"/>
    <circle cx="1010" cy="450" r="6"/>
  </g>
  <g fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="15" text-anchor="middle">
    <text x="905" y="330">S1</text>
    <text x="1000" y="365">S3</text>
    <text x="920" y="420">S2</text>
    <text x="1030" y="460">S0</text>
  </g>
  <text x="980" y="510" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="18">Soul Blueprint</text>
  <text x="980" y="535" text-anchor="middle" fill="#c9b27a" font-family="Georgia, 'Times New Roman', serif" font-size="14">S1 → S3 → S2 → S0</text>

  <text x="600" y="590" text-anchor="middle" fill="#c9b27a" font-family="Georgia, 'Times New Roman', serif" font-size="16" letter-spacing="3">1320 SOUL CODE</text>
</svg>`;

  const info = await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(out);
  console.log("wrote", out, info);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
