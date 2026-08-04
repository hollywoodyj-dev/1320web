/**
 * Capture Page 06 desktop + mobile screenshots after implementation.
 * Run: npx tsx scripts/screenshot-seo-page06.ts
 */
import fs from "node:fs";
import path from "node:path";

const BASE = (process.env.QA_BASE_URL ?? "http://localhost:3020").replace(/\/$/, "");
const PATH = "/what-does-your-birthday-mean";
const OUT_DIR = path.join(process.cwd(), "qa-artifacts", "seo-page06-check");

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

  const shots = [
    { name: "page06-1280-first-viewport.png", width: 1280, height: 900 },
    { name: "page06-1280-full.png", width: 1280, height: 900, fullPage: true },
    { name: "page06-390-first-viewport.png", width: 390, height: 844 },
    { name: "page06-390-full.png", width: 390, height: 844, fullPage: true },
  ] as const;

  for (const shot of shots) {
    const page = await browser.newPage();
    await page.setViewport({ width: shot.width, height: shot.height, deviceScaleFactor: 1 });
    await page.goto(`${BASE}${PATH}`, { waitUntil: "networkidle0", timeout: 60000 });

    const checks = await page.evaluate(() => {
      const text = document.body.innerText;
      const goldInView = Array.from(document.querySelectorAll("a.gold-button")).filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0 && rect.width > 0;
      }).length;
      const overflow = document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
      return {
        h1: document.querySelectorAll("h1").length,
        h1Text: document.querySelector("h1")?.textContent?.trim() ?? "",
        hasOrder: text.includes("S1 → S3 → S2 → S0"),
        hasWrongOrder: /S1\s*→\s*S2\s*→\s*S3\s*→\s*S0/.test(text),
        hasCalculatorForm: Boolean(document.querySelector("select[name='month']")),
        hasDirectory: /Birthday (1|for every day)|days 1–31|1 to 31 directory/i.test(text),
        hasFourLayers:
          /\bFACT\b/i.test(text) ||
          (/factual/i.test(text) && /cultural/i.test(text) && /personal/i.test(text) && /symbolic/i.test(text)),
        hasCannotSection: /What Can My Birthday Actually Tell Me/i.test(text),
        goldInView,
        overflow,
        hasPredictionClaim:
          /\b(will happen|your destiny is|guarantees your future|predicts your future)\b/i.test(text) &&
          !/cannot .{0,40}predict/i.test(text),
      };
    });
    console.log(shot.name, checks);

    await page.screenshot({
      path: path.join(OUT_DIR, shot.name),
      fullPage: "fullPage" in shot ? Boolean(shot.fullPage) : false,
    });
    await page.close();
  }

  const res = await fetch(`${BASE}/guides/what-does-your-birthday-mean`, {
    method: "GET",
    redirect: "manual",
  });
  console.log("guides duplicate status", res.status, res.headers.get("location"));
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
