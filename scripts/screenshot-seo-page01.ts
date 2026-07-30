/**
 * Capture Page 01 desktop + mobile screenshots for centering QA.
 * Run: npx tsx scripts/screenshot-seo-page01.ts
 * Optional: QA_BASE_URL=http://localhost:3013
 */
import fs from "node:fs";
import path from "node:path";

const BASE = (process.env.QA_BASE_URL ?? "http://localhost:3013").replace(/\/$/, "");
const OUT_DIR = path.join(process.cwd(), "qa-artifacts", "seo-page01-centering-check");

async function resolveExecutablePath(): Promise<string> {
  const localPath = process.env.PUPPETEER_EXECUTABLE_PATH?.trim();
  if (localPath) return localPath;
  const winChrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  if (fs.existsSync(winChrome)) return winChrome;
  const chromium = await import("@sparticuz/chromium");
  return chromium.default.executablePath();
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const puppeteer = await import("puppeteer-core");
  const browser = await puppeteer.default.launch({
    executablePath: await resolveExecutablePath(),
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const shots: { name: string; width: number; height: number; fullPage?: boolean }[] = [
    { name: "page01-1280-first-viewport.png", width: 1280, height: 900 },
    { name: "page01-1280-full.png", width: 1280, height: 900, fullPage: true },
    { name: "page01-390-first-viewport.png", width: 390, height: 844 },
    { name: "page01-390-full.png", width: 390, height: 844, fullPage: true },
  ];

  for (const shot of shots) {
    const page = await browser.newPage();
    await page.setViewport({ width: shot.width, height: shot.height, deviceScaleFactor: 1 });
    await page.goto(`${BASE}/what-is-a-soul-blueprint`, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });
    // Confirm byline removed
    const bodyText = await page.evaluate(() => document.body.innerText);
    if (bodyText.includes("Written by Nobu Isaki") || bodyText.includes("Content & Governance")) {
      console.warn(`WARN: author/byline text still visible in ${shot.name}`);
    } else {
      console.log(`OK: no visible byline in ${shot.name}`);
    }
    const out = path.join(OUT_DIR, shot.name);
    await page.screenshot({ path: out, fullPage: Boolean(shot.fullPage) });
    console.log("wrote", out);
    await page.close();
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
