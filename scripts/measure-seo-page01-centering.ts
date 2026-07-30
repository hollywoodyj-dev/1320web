import puppeteer from "puppeteer-core";

const BASE = (process.env.QA_BASE_URL ?? "http://localhost:3013").replace(/\/$/, "");

async function main() {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(`${BASE}/what-is-a-soul-blueprint`, { waitUntil: "networkidle0" });
  const metrics = await page.evaluate(`(() => {
    const pick = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        sel,
        left: Math.round(r.left),
        width: Math.round(r.width),
        center: Math.round(r.left + r.width / 2),
        delta: Math.round(r.left + r.width / 2 - window.innerWidth / 2),
      };
    };
    return {
      viewport: window.innerWidth,
      mid: Math.round(window.innerWidth / 2),
      page: pick(".wisb-page"),
      hero: pick(".wisb-hero"),
      article: pick(".wisb-article"),
      figure: pick(".wisb-hero-figure"),
      actions: pick(".wisb-hero-actions"),
      breadcrumb: pick(".guides-breadcrumb"),
      h2: pick(".guides-article-section h2"),
    };
  })()`);
  console.log(JSON.stringify(metrics, null, 2));
  await browser.close();
}

main();
