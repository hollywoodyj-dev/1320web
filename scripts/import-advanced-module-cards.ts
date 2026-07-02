/**
 * Import S5–S9 archetype card PNGs into `public/` and convert to WebP.
 *
 * Source (default): `C:\Users\holly\Downloads\s\1320 card\`
 *   S5 … / S6 … / S7 … / S8 … / S9 … subfolders with steward PNG filenames.
 *
 * Run: npm run import:advanced-module-cards
 * Optional: IMPORT_CARD_SOURCE=/path/to/1320 card
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const DEFAULT_SOURCE = path.join(
  process.env.USERPROFILE ?? "",
  "Downloads",
  "s",
  "1320 card",
);

const SOURCE = process.env.IMPORT_CARD_SOURCE ?? DEFAULT_SOURCE;
const QUALITY = 88;

const MODULE_CONFIG: Record<
  string,
  { dir: string; min: number; max: number; folderPrefix: string }
> = {
  S5: { dir: "S5-44", min: 1, max: 44, folderPrefix: "S5" },
  S6: { dir: "S6-44", min: 1, max: 44, folderPrefix: "S6" },
  S7: { dir: "S7-07", min: 0, max: 6, folderPrefix: "S7" },
  S8: { dir: "S8-08", min: 0, max: 7, folderPrefix: "S8" },
  S9: { dir: "S9-09", min: 0, max: 8, folderPrefix: "S9" },
};

function extractCodeNum(modulePrefix: string, filename: string): number | undefined {
  const patterns = [
    new RegExp(`${modulePrefix}\\s*\\(\\s*(\\d{1,2})\\s*\\)`, "i"),
    new RegExp(`${modulePrefix}-(\\d{1,2})`, "i"),
    new RegExp(`${modulePrefix}(\\d{1,2})`, "i"),
  ];

  for (const pattern of patterns) {
    const match = pattern.exec(filename);
    if (match) return Number.parseInt(match[1], 10);
  }
  return undefined;
}

function findModuleFolder(modulePrefix: string): string | undefined {
  if (!fs.existsSync(SOURCE)) return undefined;

  const entries = fs.readdirSync(SOURCE, { withFileTypes: true });
  const folder = entries.find(
    (entry) => entry.isDirectory() && entry.name.toUpperCase().startsWith(modulePrefix),
  );
  return folder ? path.join(SOURCE, folder.name) : undefined;
}

async function convertPngToWebp(input: string, output: string) {
  await sharp(input).webp({ quality: QUALITY, effort: 6 }).toFile(output);
}

async function importModule(modulePrefix: string) {
  const config = MODULE_CONFIG[modulePrefix];
  if (!config) return;

  const sourceDir = findModuleFolder(modulePrefix);
  if (!sourceDir) {
    console.warn(`skip ${modulePrefix}: no folder under ${SOURCE}`);
    return;
  }

  const outDir = path.join(PUBLIC, config.dir);
  fs.mkdirSync(outDir, { recursive: true });

  const files = fs
    .readdirSync(sourceDir)
    .filter((name) => /\.png$/i.test(name));

  const mapped = new Map<number, string>();
  for (const name of files) {
    const codeNum = extractCodeNum(modulePrefix, name);
    if (codeNum == null) {
      console.warn(`  skip (no code): ${name}`);
      continue;
    }
    if (codeNum < config.min || codeNum > config.max) {
      console.warn(`  skip (out of range ${config.min}-${config.max}): ${name}`);
      continue;
    }
    mapped.set(codeNum, path.join(sourceDir, name));
  }

  let converted = 0;
  for (const [codeNum, inputPath] of mapped) {
    const outName = `${modulePrefix}-${String(codeNum).padStart(2, "0")}.webp`;
    const outputPath = path.join(outDir, outName);
    await convertPngToWebp(inputPath, outputPath);
    converted += 1;
    console.log(`  ${path.basename(inputPath)} → ${config.dir}/${outName}`);
  }

  const expected = config.max - config.min + 1;
  const missing: number[] = [];
  for (let n = config.min; n <= config.max; n += 1) {
    if (!mapped.has(n)) missing.push(n);
  }

  console.log(
    `${modulePrefix}: ${converted}/${expected} cards in ${config.dir}` +
      (missing.length ? ` (missing: ${missing.map((n) => String(n).padStart(2, "0")).join(", ")})` : ""),
  );
}

async function main() {
  console.log("Import advanced module cards\n");
  console.log(`Source: ${SOURCE}`);
  console.log(`Output: ${PUBLIC}\n`);

  if (!fs.existsSync(SOURCE)) {
    console.error("Source folder not found. Set IMPORT_CARD_SOURCE or place cards in Downloads.");
    process.exit(1);
  }

  for (const modulePrefix of Object.keys(MODULE_CONFIG)) {
    console.log(`=== ${modulePrefix} ===`);
    await importModule(modulePrefix);
    console.log("");
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
