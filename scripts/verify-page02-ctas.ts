import puppeteer from "puppeteer-core";

const BASE = process.env.QA_BASE_URL ?? "http://localhost:3017";

async function main() {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(`${BASE}/life-path-number-vs-soul-blueprint`, { waitUntil: "networkidle0" });
  const ctas = await page.evaluate(`(() => {
    return Array.from(document.querySelectorAll(".lpvsb-page a.gold-button")).map((a) => ({
      text: a.textContent.trim(),
      href: a.getAttribute("href"),
      inHero: Boolean(a.closest(".lpvsb-hero")),
      inConversion: Boolean(a.closest(".lpvsb-conversion")),
    }));
  })()`);
  console.log(JSON.stringify(ctas, null, 2));
  const nonHero = ctas.filter((c) => !c.inHero).length;
  const pass = ctas.some((c) => c.inHero) && nonHero >= 2;
  console.log(pass ? "PASS hero/mid/final" : "FAIL", { nonHero, total: ctas.length });
  await browser.close();
  if (!pass) process.exit(1);
}

main();
