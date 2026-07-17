/**
 * One-off production verification for Page 07 Wisewave cache check.
 */
const BASE = "https://www.1320soulcode.com";

async function resolveExecutablePath() {
  const winChrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const fs = await import("node:fs");
  if (fs.existsSync(winChrome)) return winChrome;
  const chromium = await import("@sparticuz/chromium");
  return chromium.default.executablePath();
}

async function check(width: number, height: number) {
  const puppeteer = await import("puppeteer-core");
  const browser = await puppeteer.default.launch({
    executablePath: await resolveExecutablePath(),
    headless: true,
    args: ["--no-sandbox"],
    defaultViewport: { width, height },
  });
  try {
    const page = await browser.newPage();
    if (width <= 500) {
      await page.setUserAgent(
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
      );
    }
    await page.goto(`${BASE}/full-report`, { waitUntil: "networkidle2", timeout: 90_000 });
    await page.waitForSelector(".full-report-marketing--refined", { timeout: 30_000 });
    const data = await page.evaluate(() => {
      const hero = document.querySelector(".full-report-hero");
      const heroLinks = hero
        ? Array.from(hero.querySelectorAll("a")).map((a) => ({
            text: (a.textContent || "").trim().replace(/\s+/g, " "),
            href: a.getAttribute("href") || "",
            isGold: a.classList.contains("gold-button"),
          }))
        : [];
      const body = (document.body.textContent || "").toLowerCase().replace(/\s+/g, " ");
      const triggers = {
        book1320Reading: body.includes("book a 1320 reading"),
        waitlist: body.includes("waitlist"),
        joinWaitlist: body.includes("join the waitlist") || body.includes("join waitlist"),
        moneyPatterns: body.includes("money patterns") || body.includes("money pattern"),
        moneyFrequency: body.includes("money frequency"),
        notASentence: body.includes("not a sentence"),
        unlockMyFullReport: body.includes("unlock my full report"),
        viewSample: body.includes("view sample report"),
        preferLive: body.includes("prefer live integration"),
        bookPersonal: body.includes("book personal integration session"),
        fixedIdentity: body.includes("not a fixed identity"),
      };
      const suspects = Array.from(document.querySelectorAll("a,button,h1,h2,h3,p,li,span"))
        .filter((el) =>
          /book a 1320 reading|waitlist|money pattern|money frequency|not a sentence/i.test(
            el.textContent || "",
          ),
        )
        .map((el) => ({
          tag: el.tagName,
          text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 100),
          inHero: Boolean(el.closest(".full-report-hero")),
          inLive: Boolean(el.closest(".full-report-live-path")),
          inNav: Boolean(el.closest("header.site-header, nav, .site-header")),
        }));
      return {
        refined: Boolean(document.querySelector(".full-report-marketing--refined")),
        heroLinks,
        triggers,
        suspects,
      };
    });
    console.log(`\n=== VIEWPORT ${width}x${height} ===`);
    console.log(JSON.stringify(data, null, 2));
    return data;
  } finally {
    await browser.close();
  }
}

async function main() {
  const mobile = await check(390, 844);
  const desktop = await check(1280, 900);

  const ok = (d: Awaited<ReturnType<typeof check>>) =>
    d.refined &&
    d.heroLinks.length === 2 &&
    d.heroLinks[0]?.isGold &&
    /unlock my full report/i.test(d.heroLinks[0]?.text ?? "") &&
    /view sample report/i.test(d.heroLinks[1]?.text ?? "") &&
    !d.triggers.book1320Reading &&
    !d.triggers.waitlist &&
    !d.triggers.joinWaitlist &&
    !d.triggers.moneyPatterns &&
    !d.triggers.moneyFrequency &&
    !d.triggers.notASentence &&
    d.triggers.unlockMyFullReport &&
    d.triggers.preferLive &&
    d.triggers.bookPersonal &&
    d.suspects.length === 0;

  console.log("\n=== VERDICT ===");
  console.log("390px:", ok(mobile) ? "PASS — matches refinement" : "FAIL");
  console.log("1280px:", ok(desktop) ? "PASS — matches refinement" : "FAIL");
  process.exit(ok(mobile) && ok(desktop) ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

export {};
