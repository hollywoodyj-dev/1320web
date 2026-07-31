import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

async function main() {
  const out = path.join(process.cwd(), "public/seo/what-is-my-life-path-number-1320.webp");
  fs.mkdirSync(path.dirname(out), { recursive: true });

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#070d1c"/>
      <stop offset="55%" stop-color="#0c1830"/>
      <stop offset="100%" stop-color="#101f3a"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="52%" r="50%">
      <stop offset="0%" stop-color="#d4b56a" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#d4b56a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Subtle foundation geometry (background only — not calculator output) -->
  <g stroke="#e8cd96" stroke-width="1" fill="none" opacity="0.12">
    <line x1="140" y1="480" x2="260" y2="520"/>
    <line x1="260" y1="520" x2="200" y2="580"/>
    <line x1="200" y1="580" x2="320" y2="600"/>
  </g>

  <text x="600" y="120" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="42">What Is My</text>
  <text x="600" y="175" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="42">Life Path Number?</text>
  <text x="600" y="220" text-anchor="middle" fill="#c9b27a" font-family="Georgia, 'Times New Roman', serif" font-size="20">Free Calculator + Meaning</text>

  <!-- Reduction flow -->
  <g fill="#e8cd96" font-family="Georgia, 'Times New Roman', serif" text-anchor="middle">
    <text x="220" y="340" font-size="22">Birth date</text>
    <text x="420" y="340" font-size="20">Month + Day + Year</text>
    <text x="680" y="340" font-size="20">Reduction</text>
  </g>
  <g stroke="#e8cd96" stroke-width="1.5" opacity="0.7">
    <line x1="290" y1="332" x2="330" y2="332"/>
    <line x1="520" y1="332" x2="580" y2="332"/>
    <line x1="760" y1="332" x2="820" y2="332"/>
  </g>

  <circle cx="900" cy="330" r="64" fill="none" stroke="#e8cd96" stroke-width="2.5" opacity="0.95"/>
  <circle cx="900" cy="330" r="10" fill="#e8cd96"/>
  <text x="900" y="430" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="24">Life Path Number</text>

  <text x="600" y="560" text-anchor="middle" fill="#c9b27a" font-family="Georgia, 'Times New Roman', serif" font-size="18" letter-spacing="3">1320 SOUL CODE</text>
</svg>`;

  const info = await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(out);
  console.log("wrote", out, info);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
