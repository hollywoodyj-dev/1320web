/**
 * Build browser tab icons from public/1320-icon.svg
 * Run: npx tsx scripts/build-favicon.ts
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import sharp from "sharp";

const root = process.cwd();
const svgPath = path.join(root, "public", "1320-icon.svg");
const svg = fs.readFileSync(svgPath);
const require = createRequire(import.meta.url);

async function writePng(size: number, file: string) {
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(file);
  console.log(`wrote ${file} (${size}x${size})`);
}

function loadPngToIco(): (inputs: Buffer[]) => Promise<Buffer> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require("png-to-ico") as { default?: (inputs: Buffer[]) => Promise<Buffer> } & ((
      inputs: Buffer[],
    ) => Promise<Buffer>);
    return typeof mod === "function" ? mod : mod.default!;
  } catch {
    console.log("Installing png-to-ico…");
    execSync("npm install --no-save png-to-ico", { cwd: root, stdio: "inherit" });
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require("png-to-ico") as { default?: (inputs: Buffer[]) => Promise<Buffer> } & ((
      inputs: Buffer[],
    ) => Promise<Buffer>);
    return typeof mod === "function" ? mod : mod.default!;
  }
}

async function main() {
  const appDir = path.join(root, "app");
  const fav16 = path.join(appDir, "_favicon-16.png");
  const fav32 = path.join(appDir, "_favicon-32.png");

  await writePng(512, path.join(appDir, "icon.png"));
  await writePng(180, path.join(appDir, "apple-icon.png"));
  await writePng(16, fav16);
  await writePng(32, fav32);
  await writePng(512, path.join(root, "public", "1320-icon.png"));

  fs.copyFileSync(svgPath, path.join(appDir, "icon.svg"));
  console.log("wrote app/icon.svg");

  const pngToIco = loadPngToIco();
  const ico = await pngToIco([fs.readFileSync(fav16), fs.readFileSync(fav32)]);
  const faviconPath = path.join(appDir, "favicon.ico");
  fs.writeFileSync(faviconPath, ico);
  console.log(`wrote ${faviconPath} (${ico.length} bytes)`);

  fs.unlinkSync(fav16);
  fs.unlinkSync(fav32);
  console.log("removed temporary PNG helpers");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
