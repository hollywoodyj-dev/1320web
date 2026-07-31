/**
 * Capture Page 03 desktop + mobile screenshots after implementation.
 * Run: npx tsx scripts/screenshot-seo-page03.ts
 * Optional: QA_BASE_URL=http://localhost:3015
 */
import fs from "node:fs";
import path from "node:path";

const BASE = (process.env.QA_BASE_URL ?? "http://localhost:3015").replace(/\/$/, "");
const PATH = "/what-is-my-life-path-number";
const OUT_DIR = path.join(process.cwd(), "qa-artifacts", "seo-page03-check");

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
    { name: "page03-1280-first-viewport.png", width: 1280, height: 900 },
    { name: "page03-1280-full.png", width: 1280, height: 900, fullPage: true },
    { name: "page03-390-first-viewport.png", width: 390, height: 844 },
    { name: "page03-390-full.png", width: 390, height: 844, fullPage: true },
    {
      name: "page03-1280-result.png",
      width: 1280,
      height: 900,
      calculate: true,
      fullPage: true,
    },
  ] as const;

  for (const shot of shots) {
    const page = await browser.newPage();
    await page.setViewport({ width: shot.width, height: shot.height, deviceScaleFactor: 1 });
    await page.goto(`${BASE}${PATH}`, { waitUntil: "networkidle0", timeout: 60000 });

    if ("calculate" in shot && shot.calculate) {
      await page.select('select[name="month"]', "6");
      await page.select('select[name="day"]', "15");
      await page.type('input[name="year"]', "1990");
      await page.click('button[type="submit"]');
      await page.waitForSelector(".wimlpn-result", { timeout: 5000 });
    }

    const checks = await page.evaluate(() => {
      const text = document.body.innerText;
      const goldButtons = Array.from(
        document.querySelectorAll("a.gold-button, button.gold-button"),
      ).filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0 && rect.width > 0;
      });
      const calcButtonInView = goldButtons.some((el) =>
        /Calculate My Life Path Number/i.test(el.textContent ?? ""),
      );
      const overflow = document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
      return {
        h1: document.querySelectorAll("h1").length,
        h1Text: document.querySelector("h1")?.textContent?.trim() ?? "",
        hasCalculator: /Calculate Your Life Path Number/i.test(text),
        hasCalcButton: /Calculate My Life Path Number/i.test(text),
        hasResultCard: Boolean(document.querySelector(".wimlpn-result")),
        calcButtonInView,
        goldInView: goldButtons.length,
        hasOrder: text.includes("S1 · Soul Origin"),
        hasMeanings: /Life Path 4 · The Builder/i.test(text),
        overflow,
        hasDestiny: /destiny revealed|most accurate life path/i.test(text),
      };
    });
    console.log(shot.name, checks);

    await page.screenshot({
      path: path.join(OUT_DIR, shot.name),
      fullPage: "fullPage" in shot ? Boolean(shot.fullPage) : false,
    });
    await page.close();
  }

  const res = await fetch(`${BASE}/guides/what-is-my-life-path-number`, {
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
