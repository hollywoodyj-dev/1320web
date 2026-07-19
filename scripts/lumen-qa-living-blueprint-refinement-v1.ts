/**
 * Lumen QA — Living Blueprint member-space refinement
 * Uses the unauthenticated gate only (no member PII in screenshots/HTML).
 * Run: npx tsx scripts/lumen-qa-living-blueprint-refinement-v1.ts
 */
import fs from "node:fs";
import path from "node:path";

const BASE = (process.env.QA_BASE_URL ?? "https://www.1320soulcode.com").replace(/\/$/, "");
const VIEWPORT = { width: 390, height: 844 };
const DESKTOP_VIEWPORT = { width: 1280, height: 900 };
const MOBILE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const ARTIFACT = path.join(
  process.cwd(),
  "qa-artifacts",
  "LUMEN_QA_LIVING_BLUEPRINT_REFINEMENT_v1_2026-07-19.md",
);
/** Non-owned id — must stay gated; never authenticate in this QA. */
const GATE_URL = `${BASE}/living-blueprint/qa-gate-check`;

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
  if (fs.existsSync(winChrome)) return winChrome;
  const chromium = await import("@sparticuz/chromium");
  return chromium.default.executablePath();
}

async function noHorizontalOverflow(page: import("puppeteer-core").Page): Promise<boolean> {
  return page.evaluate(
    () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
  );
}

function sourceChecks(): CheckResult {
  const notes: string[] = [];
  const root = process.cwd();
  const pageSrc = fs.readFileSync(
    path.join(root, "app/(site)/living-blueprint/[reportId]/page.tsx"),
    "utf8",
  );
  const contentSrc = fs.readFileSync(path.join(root, "lib/living-blueprint/content.ts"), "utf8");
  const dashSrc = fs.readFileSync(
    path.join(root, "components/living-blueprint-dashboard.tsx"),
    "utf8",
  );
  const labelsSrc = fs.readFileSync(
    path.join(root, "lib/living-blueprint/expression-labels.ts"),
    "utf8",
  );
  const memorySrc = fs.readFileSync(
    path.join(root, "lib/living-blueprint/memory-layers.ts"),
    "utf8",
  );
  const shellSrc = fs.readFileSync(path.join(root, "components/page-shell.tsx"), "utf8");

  const checks: Array<[boolean, string]> = [
    [contentSrc.includes("Living Blueprint Membership"), "membership title"],
    [contentSrc.includes("Your Living Blueprint Journey"), "journey title"],
    [contentSrc.includes("Current Expression State"), "expression label"],
    [!contentSrc.includes("Expression Framework stage"), "no Expression Framework stage label"],
    [!pageSrc.includes("Tier:"), "no Tier: section title"],
    [labelsSrc.includes('active: "Active"'), "Active label"],
    [labelsSrc.includes('dormant: "Dormant"'), "Dormant label"],
    [memorySrc.includes("Journey Notes"), "Journey Notes label"],
    [memorySrc.includes("Recent Reflection"), "Recent Reflection label"],
    [memorySrc.includes("Current Expression"), "Current Expression memory label"],
    [dashSrc.includes("Today’s Reflection") || dashSrc.includes("NEXT_STEPS"), "next steps wiring"],
    [contentSrc.includes("Continue With Wisewave"), "Wisewave next step"],
    [contentSrc.includes("Open My Full Report"), "Full Report next step"],
    [contentSrc.includes("Book Personal Integration Session"), "Booking next step"],
    [shellSrc.includes('startsWith("/living-blueprint/")'), "member compact footer route"],
    [pageSrc.includes("getEntitledReportAccess"), "access protection"],
    [pageSrc.includes("robots"), "noindex robots"],
    [!dashSrc.includes("PROFILE_SUMMARY.email"), "email not rendered in dashboard"],
  ];

  let pass = true;
  for (const [ok, label] of checks) {
    if (!ok) {
      pass = false;
      notes.push(`FAIL: ${label}`);
    } else {
      notes.push(`ok: ${label}`);
    }
  }
  return { name: "Source member-language + privacy", pass, notes };
}

async function main() {
  const source = sourceChecks();
  record(source.name, source.pass, source.notes);

  const puppeteer = await import("puppeteer-core");
  const browser = await puppeteer.default.launch({
    executablePath: await resolveExecutablePath(),
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: DESKTOP_VIEWPORT,
  });

  try {
    const page = await browser.newPage();
    console.log(`QA URL (gate only): ${GATE_URL}`);
    await page.goto(GATE_URL, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector(".living-blueprint-page--gate, .auth-compact-footer", {
      timeout: 45_000,
    });

    const desktop = await page.evaluate(() => {
      const text = (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ");
      const html = document.documentElement.innerHTML.toLowerCase();
      const compactFooter = Boolean(document.querySelector(".auth-compact-footer"));
      const fullFooterGrid = Boolean(document.querySelector(".site-footer .footer-column"));
      const newsletter = Boolean(
        document.querySelector(".footer-subscribe, [class*='subscribe'] input[type='email']"),
      );
      const generateCta = Array.from(document.querySelectorAll(".topbar-cta, a.gold-button")).some(
        (el) => (el.textContent ?? "").toLowerCase().includes("generate"),
      );
      const mantra = (
        document.querySelector(".auth-compact-footer-mantra, .footer-mantra")?.textContent ?? ""
      ).trim();
      const memberDashboard = Boolean(document.querySelector(".living-blueprint-dashboard"));
      const tierLeak = text.includes("tier:") || text.includes("living_blueprint");
      const emailLeak = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(
        document.body.textContent ?? "",
      );
      return {
        compactFooter,
        fullFooterGrid,
        newsletter,
        generateCta,
        mantra,
        memberDashboard,
        tierLeak,
        emailLeak,
        gated: text.includes("sign in") || text.includes("living blueprint"),
        htmlHasSession: html.includes("cs_live_") || html.includes("cs_test_"),
      };
    });

    const framingFail = [
      desktop.fullFooterGrid ? "full marketing footer" : "",
      desktop.newsletter ? "newsletter" : "",
      desktop.generateCta ? "generate CTA" : "",
      desktop.memberDashboard ? "member dashboard visible without auth" : "",
      desktop.tierLeak ? "tier/internal leak" : "",
      desktop.emailLeak ? "email in gate HTML" : "",
      desktop.htmlHasSession ? "session leak" : "",
    ].filter(Boolean);

    const mantraOk =
      desktop.mantra.toUpperCase().includes("YOUR BLUEPRINT IS A MIRROR") &&
      desktop.mantra.toUpperCase().includes("NOT A FIXED IDENTITY");

    const desktopPass =
      framingFail.length === 0 && desktop.compactFooter && desktop.gated && mantraOk;

    record("Desktop Living Blueprint gate chrome", desktopPass, [
      `framing fail: ${framingFail.join(", ") || "none"}`,
      `compact footer: ${desktop.compactFooter}`,
      `generate CTA: ${desktop.generateCta}`,
      `member dashboard leaked: ${desktop.memberDashboard}`,
      `footer mantra: ${desktop.mantra}`,
    ]);

    await page.setViewport(VIEWPORT);
    await page.setUserAgent(MOBILE_UA);
    await page.goto(GATE_URL, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector(".living-blueprint-page--gate, .auth-compact-footer", {
      timeout: 45_000,
    });
    const overflow = await noHorizontalOverflow(page);
    record("Mobile no overflow", overflow, [`no horizontal overflow: ${overflow}`]);
  } finally {
    await browser.close();
  }

  const allPass = results.every((r) => r.pass);
  const md = [
    "# Lumen QA — Living Blueprint Refinement v1.0",
    "",
    `Date: 2026-07-19`,
    `Base: ${BASE}`,
    `Gate URL: ${GATE_URL}`,
    `Verdict: **${allPass ? "PASS" : "FAIL"}**`,
    "",
    "Note: Authenticated member content was not opened in this QA run (PII / screenshot safety).",
    "",
    ...results.flatMap((r) => [
      `## ${r.name}: ${r.pass ? "PASS" : "FAIL"}`,
      ...r.notes.map((n) => `- ${n}`),
      "",
    ]),
  ].join("\n");
  fs.mkdirSync(path.dirname(ARTIFACT), { recursive: true });
  fs.writeFileSync(ARTIFACT, md, "utf8");
  console.log(`\nWrote ${ARTIFACT}`);
  console.log(`\nVerdict: ${allPass ? "PASS" : "FAIL"}`);
  if (!allPass) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
