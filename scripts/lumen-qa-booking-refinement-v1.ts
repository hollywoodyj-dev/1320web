/**
 * Lumen QA — Personal Integration Session / Booking Page Refinement Spec v1.0
 * Run: npx tsx scripts/lumen-qa-booking-refinement-v1.ts
 */
const BASE = (process.env.QA_BASE_URL ?? "https://www.1320soulcode.com").replace(/\/$/, "");
const VIEWPORT = { width: 390, height: 844 };
const DESKTOP_VIEWPORT = { width: 1280, height: 900 };
const MOBILE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

type CheckResult = { name: string; pass: boolean; notes: string[] };
const results: CheckResult[] = [];

function record(name: string, pass: boolean, notes: string[]) {
  results.push({ name, pass, notes });
  console.log(`\n=== ${name}: ${pass ? "PASS" : "FAIL"} ===`);
  for (const note of notes) console.log(`  - ${note}`);
}

async function resolveExecutablePath(): Promise<string> {
  const localPath = process.env.PUPPETEER_EXECUTABLE_PATH?.trim();
  if (localPath) return localPath;
  const winChrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const fs = await import("node:fs");
  if (fs.existsSync(winChrome)) return winChrome;
  const chromium = await import("@sparticuz/chromium");
  return chromium.default.executablePath();
}

async function noHorizontalOverflow(page: import("puppeteer-core").Page): Promise<boolean> {
  return page.evaluate(
    () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
  );
}

async function main() {
  const puppeteer = await import("puppeteer-core");
  const browser = await puppeteer.default.launch({
    executablePath: await resolveExecutablePath(),
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: VIEWPORT,
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(MOBILE_UA);
    console.log(`QA URL: ${BASE}/booking`);

    await page.goto(`${BASE}/booking`, { waitUntil: "networkidle2", timeout: 90_000 });
    await page.waitForSelector(".booking-page--refined", { timeout: 45_000 });

    const mobile = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ");
      const hero = document.querySelector(".booking-hero");
      const heroGold = hero
        ? Array.from(hero.querySelectorAll(".gold-button")).map((el) =>
            (el.textContent ?? "").trim().toLowerCase(),
          )
        : [];
      const heroLinks = hero
        ? Array.from(hero.querySelectorAll("a")).map((a) =>
            (a.textContent ?? "").trim().toLowerCase(),
          )
        : [];
      const sessionTitles = Array.from(
        document.querySelectorAll(".booking-session-card h3"),
      ).map((el) => (el.textContent ?? "").trim());
      const sessionCtas = Array.from(
        document.querySelectorAll(".booking-session-card .conversion-reading-cta"),
      ).map((el) => (el.textContent ?? "").trim().toLowerCase());
      const faqCount = document.querySelectorAll(".blueprint-faq-item").length;
      const bodyFont = parseFloat(getComputedStyle(document.body).fontSize);
      return {
        text,
        heroGold,
        heroLinks,
        sessionTitles,
        sessionCtas,
        faqCount,
        bodyFont,
        hasCreateAccount: text.includes("create account"),
        hasSignIn: text.includes("sign in"),
        generateInHero: heroLinks.some((t) => t.includes("generate my code")),
      };
    });

    const required = [
      "personal integration session",
      "your blueprint does not change",
      "your relationship with it does",
      "pay & book session",
      "explore full report",
      "reflective integration only",
      "not therapy",
      "blueprint integration session",
      "deep blueprint integration",
      "focused life integration",
      "your blueprint is a mirror — not a fixed identity",
    ];
    const forbidden = [
      "who you attract",
      "spiritual maturity",
      "not a sentence",
      "will tell you your future",
      "guaranteed transformation",
      "book deep integration",
      "book focused integration",
      "book blueprint integration",
    ];

    const missing = required.filter((p) => !mobile.text.includes(p));
    const foundForbidden = forbidden.filter((p) => mobile.text.includes(p));
    const overflow = await noHorizontalOverflow(page);
    const sessionsOk =
      mobile.sessionTitles.length === 3 &&
      mobile.sessionCtas.every((c) => c === "book this session");

    const notes = [
      `required missing (${missing.length}): ${missing.join(", ") || "none"}`,
      `forbidden found: ${foundForbidden.join(", ") || "none"}`,
      `hero gold CTAs: ${mobile.heroGold.join(" | ") || "none"}`,
      `generate code not in hero: ${!mobile.generateInHero ? "yes" : "NO"}`,
      `session titles: ${mobile.sessionTitles.join(" · ")}`,
      `session CTAs consistent: ${sessionsOk ? "yes" : "NO"}`,
      `auth gate present: ${mobile.hasCreateAccount && mobile.hasSignIn ? "yes" : "NO"}`,
      `FAQ count: ${mobile.faqCount}`,
      `body font: ${mobile.bodyFont}px`,
      `horizontal overflow: ${overflow ? "none" : "DETECTED"}`,
    ];

    const pass =
      missing.length === 0 &&
      foundForbidden.length === 0 &&
      mobile.heroGold.length === 1 &&
      mobile.heroGold[0]?.includes("pay & book") &&
      !mobile.generateInHero &&
      sessionsOk &&
      mobile.hasCreateAccount &&
      mobile.hasSignIn &&
      mobile.faqCount <= 5 &&
      mobile.bodyFont >= 16.5 &&
      overflow;

    record("Booking / Personal Integration refinement (390px)", pass, notes);

    await page.setViewport(DESKTOP_VIEWPORT);
    await page.reload({ waitUntil: "networkidle2", timeout: 90_000 });
    const desktopOverflow = await noHorizontalOverflow(page);
    record("Booking desktop (1280px)", desktopOverflow, [
      `horizontal overflow: ${desktopOverflow ? "none" : "DETECTED"}`,
    ]);

    const allPass = results.every((r) => r.pass);
    console.log(`\n\nOVERALL: ${allPass ? "PASS" : "FAIL WITH NOTES"}`);

    const fs = await import("node:fs");
    const path = await import("node:path");
    const artifactDir = path.join(process.cwd(), "qa-artifacts");
    fs.mkdirSync(artifactDir, { recursive: true });
    const date = new Date().toISOString().slice(0, 10);
    const artifactPath = path.join(artifactDir, `LUMEN_QA_BOOKING_REFINEMENT_v1_${date}.md`);
    fs.writeFileSync(
      artifactPath,
      [
        "# Lumen QA — Personal Integration Session Page Refinement Spec v1.0",
        "",
        `**Date:** ${new Date().toISOString()}`,
        `**Base URL:** ${BASE}`,
        `**Overall:** ${allPass ? "PASS" : "FAIL WITH NOTES"}`,
        "",
        ...results.flatMap((r) => [
          `### ${r.name}`,
          "",
          `**Verdict:** ${r.pass ? "PASS" : "FAIL"}`,
          "",
          ...r.notes.map((n) => `- ${n}`),
          "",
        ]),
      ].join("\n"),
      "utf8",
    );
    console.log(`Artifact: ${artifactPath}`);
    process.exit(allPass ? 0 : 1);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

export {};
