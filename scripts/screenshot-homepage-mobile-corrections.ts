/**
 * Homepage hierarchy mobile correction screenshots.
 * Run: QA_BASE_URL=http://localhost:3030 npx tsx scripts/screenshot-homepage-mobile-corrections.ts
 */
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const BASE = (process.env.QA_BASE_URL ?? "http://localhost:3030").replace(/\/$/, "");
const OUT = path.join(process.cwd(), "qa-artifacts", "homepage-hierarchy-mobile-corrections");

async function resolveExecutablePath(): Promise<string> {
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
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle2", timeout: 90_000 });

  await page.screenshot({
    path: path.join(OUT, "mobile-390-full.png"),
    fullPage: true,
  });

  const pathSection = await page.$(".homepage-path-report");
  if (pathSection) {
    await pathSection.screenshot({
      path: path.join(OUT, "mobile-recognition-to-integration-crop.png"),
    });
  }

  const footer = await page.$(".site-footer--compact");
  if (footer) {
    await footer.screenshot({
      path: path.join(OUT, "mobile-footer-crop.png"),
    });
  }

  const checks = await page.evaluate(() => {
    const pathEl = document.querySelector(".homepage-path-report");
    const grid = pathEl?.querySelector(".steps-grid") as HTMLElement | null;
    const preview = pathEl?.querySelector(".homepage-path-report-preview") as HTMLElement | null;
    const stepIcons = [...(pathEl?.querySelectorAll(".step-icon-wrap") ?? [])].map((el) => {
      const r = el.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height) };
    });
    const gridStyle = grid ? getComputedStyle(grid) : null;
    const previewTop = preview?.getBoundingClientRect().top ?? 0;
    const gridBottom = grid?.getBoundingClientRect().bottom ?? 0;
    const subscribe = document.querySelector(".site-footer--compact .footer-subscribe");
    const subscribeVisible = Boolean(
      subscribe &&
        getComputedStyle(subscribe).display !== "none" &&
        getComputedStyle(subscribe).visibility !== "hidden",
    );
    return {
      stepIconSizes: stepIcons,
      gridGap: gridStyle?.gap ?? null,
      gridMarginTop: gridStyle?.marginTop ?? null,
      previewGapFromGrid: Math.round(previewTop - gridBottom),
      subscribeVisible,
      hasMantra: Boolean(document.querySelector(".footer-mantra")),
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    };
  });

  console.log(JSON.stringify(checks, null, 2));
  fs.writeFileSync(path.join(OUT, "mobile-correction-checks.json"), `${JSON.stringify(checks, null, 2)}\n`);

  await browser.close();
  console.log(`Saved to ${OUT}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
