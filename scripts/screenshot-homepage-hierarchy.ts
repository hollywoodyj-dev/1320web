/**
 * Homepage hierarchy correction screenshots + structural checks.
 * Run: QA_BASE_URL=http://localhost:3030 npx tsx scripts/screenshot-homepage-hierarchy.ts
 */
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const BASE = (process.env.QA_BASE_URL ?? "http://localhost:3030").replace(/\/$/, "");
const OUT = path.join(process.cwd(), "qa-artifacts", "homepage-hierarchy-correction");

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

  for (const shot of [
    { w: 1280, h: 900, prefix: "after-desktop" },
    { w: 390, h: 844, prefix: "after-mobile" },
  ] as const) {
    const page = await browser.newPage();
    await page.setViewport({ width: shot.w, height: shot.h });
    await page.goto(`${BASE}/`, { waitUntil: "networkidle2", timeout: 90_000 });
    await page.screenshot({
      path: path.join(OUT, `${shot.prefix}-viewport.png`),
      fullPage: false,
    });
    await page.screenshot({
      path: path.join(OUT, `${shot.prefix}-full.png`),
      fullPage: true,
    });

    if (shot.w === 1280) {
      const checks = await page.evaluate(() => {
        const text = document.body.innerText;
        const sections = [...document.querySelectorAll("#main-content > .home-section")].map((el) => ({
          className: el.className,
          h2: el.querySelector("h2")?.textContent?.trim() ?? null,
        }));
        const elevated = document.querySelectorAll(".homepage-block--elevated").length;
        const heroDetail = getComputedStyle(document.querySelector(".hero-detail")!);
        const heroPanel = getComputedStyle(document.querySelector(".hero-panel")!);
        const whatIs = document.querySelector(".homepage-what-is")?.textContent ?? "";
        return {
          sections,
          elevated,
          heroDetailMarginTop: heroDetail.marginTop,
          heroMinHeight: heroPanel.minHeight,
          hasOriginSection: /Born from a Number/.test(text),
          hasStandaloneBoundarySection: Boolean(document.querySelector(".homepage-not-this")),
          hasGuidesLink: Boolean(document.querySelector('.homepage-what-is a[href="/guides"]')),
          hasDefinitionLink: Boolean(
            document.querySelector('.homepage-what-is a[href="/what-is-a-soul-blueprint"]'),
          ),
          seoClusterStillInWhatIs: /Life Path Number vs Soul Blueprint|Birthday Number vs/.test(whatIs),
          hasNavCta: Boolean(document.querySelector(".topbar .gold-button.topbar-cta")),
          overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        };
      });
      console.log(JSON.stringify(checks, null, 2));
      fs.writeFileSync(path.join(OUT, "after-desktop-checks.json"), `${JSON.stringify(checks, null, 2)}\n`);
    }

    await page.close();
    console.log("saved", shot.prefix);
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
