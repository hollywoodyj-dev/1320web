import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const BASE = process.env.QA_BASE_URL ?? "https://www.1320soulcode.com";
const OUT = path.join(process.cwd(), "qa-artifacts", "homepage-layout-debug");

async function resolveExecutablePath(): Promise<string> {
  const localPath = process.env.PUPPETEER_EXECUTABLE_PATH?.trim();
  if (localPath) return localPath;
  const winChrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  if (fs.existsSync(winChrome)) return winChrome;
  const chromium = await import("@sparticuz/chromium");
  return chromium.default.executablePath();
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: await resolveExecutablePath(),
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const { w, h, name } of [
    { w: 390, h: 844, name: "mobile" },
    { w: 1280, h: 900, name: "desktop" },
    { w: 1440, h: 900, name: "desktop-wide" },
  ]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h });
    await page.goto(`${BASE}/`, { waitUntil: "networkidle2", timeout: 90_000 });
    await page.screenshot({ path: path.join(OUT, `${name}-full.png`), fullPage: true });
    await page.screenshot({ path: path.join(OUT, `${name}-viewport.png`), fullPage: false });
    await page.close();
    console.log(`saved ${name}`);
  }

  await browser.close();
  console.log(`Saved to ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
