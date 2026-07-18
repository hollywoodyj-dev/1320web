/**
 * Lumen QA — Facilitator Console Refinement Spec v1.0 (Page 19)
 * Run: npx tsx scripts/lumen-qa-facilitator-console-refinement-v1.ts
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
  "LUMEN_QA_FACILITATOR_CONSOLE_REFINEMENT_v1_2026-07-18.md",
);

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

async function main() {
  const puppeteer = await import("puppeteer-core");
  const browser = await puppeteer.default.launch({
    executablePath: await resolveExecutablePath(),
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: DESKTOP_VIEWPORT,
  });

  try {
    const page = await browser.newPage();
    const url = `${BASE}/integration/facilitator`;
    console.log(`QA URL: ${url}`);
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector(".facilitator-page--internal", { timeout: 45_000 });

    const headers = response?.headers() ?? {};
    const cacheControl = (headers["cache-control"] ?? "").toLowerCase();
    const robotsTag = (headers["x-robots-tag"] ?? "").toLowerCase();

    const desktop = await page.evaluate(() => {
      const html = document.documentElement.innerHTML.toLowerCase();
      const text = (document.body.textContent ?? "").toLowerCase().replace(/\s+/g, " ");
      const robotsMeta = Array.from(document.querySelectorAll('meta[name="robots"]'))
        .map((el) => (el.getAttribute("content") ?? "").toLowerCase())
        .join(" ");
      const sessionRows = document.querySelectorAll(".facilitator-session-row").length;
      const compactFooter = Boolean(document.querySelector(".auth-compact-footer"));
      const fullFooterGrid = Boolean(document.querySelector(".site-footer .footer-column"));
      const newsletter = Boolean(
        document.querySelector(".footer-subscribe, [class*='subscribe'] input[type='email']"),
      );
      const generateCta = Array.from(document.querySelectorAll(".topbar-cta, .gold-button")).some(
        (el) => (el.textContent ?? "").toLowerCase().includes("generate"),
      );
      const mantra = (
        document.querySelector(".auth-compact-footer-mantra, .footer-mantra")?.textContent ?? ""
      ).trim();
      const envLeak =
        text.includes("personal_integration_facilitator_key") ||
        html.includes("personal_integration_facilitator_key") ||
        text.includes("process.env");
      return {
        text,
        robotsMeta,
        sessionRows,
        compactFooter,
        fullFooterGrid,
        newsletter,
        generateCta,
        mantra,
        envLeak,
        hasAccessKey: text.includes("access key"),
        hasInternal: text.includes("internal") || text.includes("authorized facilitators"),
        hasLoad: text.includes("load sessions"),
      };
    });

    const required = [
      "facilitator console",
      "personal integration session management",
      "access key",
      "load sessions",
    ];
    const missing = required.filter((p) => !desktop.text.includes(p));
    const framingFail = [
      desktop.envLeak ? "env/secret name leak" : "",
      desktop.sessionRows > 0 ? "session rows before authorization" : "",
      desktop.fullFooterGrid ? "full marketing footer" : "",
      desktop.newsletter ? "newsletter present" : "",
      desktop.generateCta ? "generate CTA present" : "",
      desktop.text.includes("not a sentence") ? "old mantra" : "",
      !desktop.compactFooter ? "missing compact footer" : "",
    ].filter(Boolean);

    const robotsOk =
      desktop.robotsMeta.includes("noindex") &&
      (desktop.robotsMeta.includes("nofollow") || robotsTag.includes("nofollow"));
    const headerOk =
      (cacheControl.includes("no-store") || cacheControl.includes("no-cache")) &&
      robotsTag.includes("noindex") &&
      robotsTag.includes("noarchive");
    const mantraOk =
      desktop.mantra.toUpperCase().includes("YOUR BLUEPRINT IS A MIRROR") &&
      desktop.mantra.toUpperCase().includes("NOT A FIXED IDENTITY");

    const desktopPass =
      missing.length === 0 &&
      framingFail.length === 0 &&
      robotsOk &&
      headerOk &&
      desktop.hasAccessKey &&
      desktop.hasInternal &&
      desktop.hasLoad &&
      mantraOk;

    record("Desktop internal console gate", desktopPass, [
      `required missing (${missing.length}): ${missing.join(", ") || "none"}`,
      `framing fail: ${framingFail.join(", ") || "none"}`,
      `robots meta: ${desktop.robotsMeta || "(none)"}`,
      `cache-control: ${cacheControl || "(none)"}`,
      `x-robots-tag: ${robotsTag || "(none)"}`,
      `session rows before auth: ${desktop.sessionRows}`,
      `footer mantra: ${desktop.mantra}`,
    ]);

    // Unauthorized API must not return sessions
    const apiStatus = await page.evaluate(async () => {
      const res = await fetch("/api/personal-integration/facilitator/sessions", {
        cache: "no-store",
      });
      const json = (await res.json()) as { ok?: boolean; sessions?: unknown[] };
      return {
        status: res.status,
        ok: Boolean(json.ok),
        sessionCount: Array.isArray(json.sessions) ? json.sessions.length : 0,
        cacheControl: res.headers.get("cache-control") ?? "",
      };
    });
    const apiPass =
      (apiStatus.status === 401 || apiStatus.status === 503) &&
      !apiStatus.ok &&
      apiStatus.sessionCount === 0 &&
      apiStatus.cacheControl.toLowerCase().includes("no-store");
    record("API rejects unauthorized session load", apiPass, [
      `status: ${apiStatus.status}`,
      `ok: ${apiStatus.ok}`,
      `sessions: ${apiStatus.sessionCount}`,
      `cache-control: ${apiStatus.cacheControl}`,
    ]);

    await page.setViewport(VIEWPORT);
    await page.setUserAgent(MOBILE_UA);
    await page.reload({ waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForSelector(".facilitator-page--internal", { timeout: 45_000 });
    const overflow = await noHorizontalOverflow(page);
    record("Mobile no overflow", overflow, [`no horizontal overflow: ${overflow}`]);
  } finally {
    await browser.close();
  }

  const allPass = results.every((r) => r.pass);
  const md = [
    "# Lumen QA — Facilitator Console Refinement v1.0",
    "",
    `Date: 2026-07-18`,
    `Base: ${BASE}`,
    `Verdict: **${allPass ? "PASS" : "FAIL"}**`,
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
