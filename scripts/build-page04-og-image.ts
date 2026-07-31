import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

async function main() {
  const out = path.join(
    process.cwd(),
    "public/seo/numerology-by-date-of-birth-vs-soul-blueprint-1320.webp",
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
      <stop offset="0%" stop-color="#d4b56a" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#d4b56a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <text x="600" y="88" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="34">Birth Date Numerology</text>
  <text x="600" y="128" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="28">vs</text>
  <text x="600" y="168" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="34">Soul Blueprint</text>

  <!-- Left: birth date into numerology pathway -->
  <text x="220" y="250" text-anchor="middle" fill="#c9b27a" font-family="Georgia, 'Times New Roman', serif" font-size="18">Birth date</text>
  <line x1="220" y1="270" x2="220" y2="310" stroke="#e8cd96" stroke-width="1.5" opacity="0.7"/>
  <circle cx="170" cy="360" r="36" fill="none" stroke="#e8cd96" stroke-width="1.8" opacity="0.9"/>
  <circle cx="270" cy="360" r="36" fill="none" stroke="#e8cd96" stroke-width="1.8" opacity="0.9"/>
  <text x="170" y="366" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="16">LP</text>
  <text x="270" y="366" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="16">BD</text>
  <text x="220" y="430" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="20">Life Path + Birthday</text>
  <text x="220" y="458" text-anchor="middle" fill="#c9b27a" font-family="Georgia, 'Times New Roman', serif" font-size="16">Numerology numbers</text>

  <!-- Centre bridge -->
  <line x1="360" y1="360" x2="520" y2="360" stroke="#e8cd96" stroke-width="1.5" opacity="0.45"/>
  <text x="600" y="355" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="26">vs</text>
  <line x1="680" y1="360" x2="780" y2="360" stroke="#e8cd96" stroke-width="1.5" opacity="0.45"/>

  <!-- Right: Foundation mirrors -->
  <g stroke="#e8cd96" stroke-width="1.5" fill="none" opacity="0.9">
    <line x1="840" y1="280" x2="940" y2="330"/>
    <line x1="940" y1="330" x2="880" y2="400"/>
    <line x1="880" y1="400" x2="980" y2="450"/>
  </g>
  <g fill="#e8cd96">
    <circle cx="840" cy="280" r="7"/>
    <circle cx="940" cy="330" r="7"/>
    <circle cx="880" cy="400" r="7"/>
    <circle cx="980" cy="450" r="7"/>
  </g>
  <g fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="18" text-anchor="middle">
    <text x="840" y="262">S1</text>
    <text x="965" y="325">S3</text>
    <text x="850" y="410">S2</text>
    <text x="1005" y="460">S0</text>
  </g>
  <text x="910" y="510" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="20">Soul Blueprint</text>
  <text x="910" y="538" text-anchor="middle" fill="#c9b27a" font-family="Georgia, 'Times New Roman', serif" font-size="16">S1 → S3 → S2 → S0</text>

  <text x="600" y="590" text-anchor="middle" fill="#c9b27a" font-family="Georgia, 'Times New Roman', serif" font-size="16" letter-spacing="3">1320 SOUL CODE</text>
</svg>`;

  const info = await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(out);
  console.log("wrote", out, info);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
