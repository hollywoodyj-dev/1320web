/**
 * Capture Page 05 desktop + mobile screenshots after implementation.
 * Run: npx tsx scripts/screenshot-seo-page05.ts
 */
import fs from "node:fs";
import path from "node:path";

const BASE = (process.env.QA_BASE_URL ?? "http://localhost:3020").replace(/\/$/, "");
const PATH = "/birthday-number-vs-life-path-number-vs-soul-blueprint";
const OUT_DIR = path.join(process.cwd(), "qa-artifacts", "seo-page05-check");

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
    { name: "page05-1280-first-viewport.png", width: 1280, height: 900 },
    { name: "page05-1280-full.png", width: 1280, height: 900, fullPage: true },
    { name: "page05-390-first-viewport.png", width: 390, height: 844 },
    { name: "page05-390-full.png", width: 390, height: 844, fullPage: true },
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
        hasExample: /14\/5/.test(text) && /Life Path Number:\s*3/i.test(text),
        hasBirthdayCalc: /How Do You Calculate a Birthday Number/i.test(text),
        goldInView,
        overflow,
        // Affirmative ranking claims only (governance copy that denies these is OK).
        hasSuperiority:
          /\b(is more accurate|are more accurate|spiritually superior|basic vs advanced|more powerful than)\b/i.test(
            text,
          ) && !/not .{0,40}(more accurate|spiritually superior)/i.test(text),
      };
    });
    console.log(shot.name, checks);

    await page.screenshot({
      path: path.join(OUT_DIR, shot.name),
      fullPage: "fullPage" in shot ? Boolean(shot.fullPage) : false,
    });
    await page.close();
  }

  const res = await fetch(`${BASE}/guides/birthday-number-vs-life-path-number-vs-soul-blueprint`, {
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
