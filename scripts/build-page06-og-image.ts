import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

/**
 * Page 06 OG — four meaning layers only (FACT / MEMORY / SYMBOL / CHOICE).
 * No zodiac glyphs, no S-codes, no numerology numbers.
 * Run: npx tsx scripts/build-page06-og-image.ts
 */
async function main() {
  const out = path.join(process.cwd(), "public/seo/what-does-your-birthday-mean-1320.webp");
  fs.mkdirSync(path.dirname(out), { recursive: true });

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#070d1c"/>
      <stop offset="55%" stop-color="#0c1830"/>
      <stop offset="100%" stop-color="#101f3a"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="52%">
      <stop offset="0%" stop-color="#d4b56a" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#d4b56a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <text x="600" y="88" text-anchor="middle" fill="#c9b27a" font-family="Georgia, 'Times New Roman', serif" font-size="18" letter-spacing="4">BIRTHDAY MEANING</text>
  <text x="600" y="140" text-anchor="middle" fill="#f4d88a" font-family="Georgia, 'Times New Roman', serif" font-size="42">What Does Your Birthday Mean?</text>
  <text x="600" y="182" text-anchor="middle" fill="#c9b27a" font-family="Georgia, 'Times New Roman', serif" font-size="18">Four layers of meaning — not a fixed identity</text>

  <!-- Four layer columns -->
  <g font-family="Georgia, 'Times New Roman', serif" text-anchor="middle">
    <!-- FACT -->
    <rect x="90" y="250" width="220" height="220" rx="4" fill="none" stroke="#e8cd96" stroke-width="1.4" opacity="0.85"/>
    <text x="200" y="310" fill="#f4d88a" font-size="22">FACT</text>
    <line x1="140" y1="328" x2="260" y2="328" stroke="#e8cd96" stroke-width="1" opacity="0.55"/>
    <text x="200" y="370" fill="#c9b27a" font-size="16">A date in time</text>
    <text x="200" y="400" fill="#c9b27a" font-size="16">when life began</text>

    <!-- MEMORY -->
    <rect x="350" y="250" width="220" height="220" rx="4" fill="none" stroke="#e8cd96" stroke-width="1.4" opacity="0.85"/>
    <text x="460" y="310" fill="#f4d88a" font-size="22">MEMORY</text>
    <line x1="400" y1="328" x2="520" y2="328" stroke="#e8cd96" stroke-width="1" opacity="0.55"/>
    <text x="460" y="370" fill="#c9b27a" font-size="16">Family, ritual</text>
    <text x="460" y="400" fill="#c9b27a" font-size="16">and lived story</text>

    <!-- SYMBOL -->
    <rect x="610" y="250" width="220" height="220" rx="4" fill="none" stroke="#e8cd96" stroke-width="1.4" opacity="0.85"/>
    <text x="720" y="310" fill="#f4d88a" font-size="22">SYMBOL</text>
    <line x1="660" y1="328" x2="780" y2="328" stroke="#e8cd96" stroke-width="1" opacity="0.55"/>
    <text x="720" y="370" fill="#c9b27a" font-size="16">Interpretive lenses</text>
    <text x="720" y="400" fill="#c9b27a" font-size="16">and patterns</text>

    <!-- CHOICE -->
    <rect x="870" y="250" width="220" height="220" rx="4" fill="none" stroke="#e8cd96" stroke-width="1.4" opacity="0.85"/>
    <text x="980" y="310" fill="#f4d88a" font-size="22">CHOICE</text>
    <line x1="920" y1="328" x2="1040" y2="328" stroke="#e8cd96" stroke-width="1" opacity="0.55"/>
    <text x="980" y="370" fill="#c9b27a" font-size="16">Meaning you</text>
    <text x="980" y="400" fill="#c9b27a" font-size="16">continue to shape</text>
  </g>

  <text x="600" y="560" text-anchor="middle" fill="#c9b27a" font-family="Georgia, 'Times New Roman', serif" font-size="15">A mirror for reflection — not a verdict</text>
  <text x="600" y="595" text-anchor="middle" fill="#c9b27a" font-family="Georgia, 'Times New Roman', serif" font-size="16" letter-spacing="3">1320 SOUL CODE</text>
</svg>`;

  const info = await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(out);
  console.log("wrote", out, info);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
