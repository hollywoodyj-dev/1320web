/**
 * Capture Page 02 desktop + mobile screenshots after implementation.
 * Run: npx tsx scripts/screenshot-seo-page02.ts
 * Optional: QA_BASE_URL=http://localhost:3015
 */
import fs from "node:fs";
import path from "node:path";

const BASE = (process.env.QA_BASE_URL ?? "http://localhost:3015").replace(/\/$/, "");
const PATH = "/life-path-number-vs-soul-blueprint";
const OUT_DIR = path.join(process.cwd(), "qa-artifacts", "seo-page02-check");

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
    { name: "page02-1280-first-viewport.png", width: 1280, height: 900 },
    { name: "page02-1280-full.png", width: 1280, height: 900, fullPage: true },
    { name: "page02-390-first-viewport.png", width: 390, height: 844 },
    { name: "page02-390-full.png", width: 390, height: 844, fullPage: true },
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
        hasCalculator: /calculate my life path|interactive calculator/i.test(text),
        goldInView,
        overflow,
        hasSuperiority: /better than numerology|more accurate than|spiritually superior/i.test(text),
      };
    });
    console.log(shot.name, checks);

    await page.screenshot({
      path: path.join(OUT_DIR, shot.name),
      fullPage: "fullPage" in shot ? Boolean(shot.fullPage) : false,
    });
    await page.close();
  }

  // 301 check
  const page = await browser.newPage();
  const res = await fetch(`${BASE}/guides/life-path-number-vs-soul-blueprint`, {
    method: "GET",
    redirect: "manual",
  });
  console.log("guides duplicate status", res.status, res.headers.get("location"));
  await page.close();
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
