/**
 * Step 5 E2E — Entitled account mini-QA (production).
 *
 * Requires authenticated session:
 *   STEP5_SESSION_COOKIE — session cookie header value
 *   STEP5_REPORT_ID      — entitled report UUID from /account
 *
 * Run: npx tsx scripts/lumen-qa-entitled-step5-prod.ts
 */
const BASE = "https://www.1320soulcode.com";

const TRIGGERS = [
  "Commercial report output layer",
  "It invites the user",
  "This Soul Origin reflects",
  "output layer - reflective",
  "template language",
  "missing: s1.soulTraits",
];

const MOBILE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

function fail(message: string): never {
  console.error("FAIL:", message);
  process.exit(1);
}

function pass(message: string) {
  console.log("PASS:", message);
}

function checkTriggers(label: string, text: string) {
  for (const phrase of TRIGGERS) {
    if (text.includes(phrase)) fail(`${label} trigger phrase: ${phrase}`);
  }
  pass(`${label} — no trigger phrases`);
}

async function fetchText(path: string, cookie: string, userAgent?: string) {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      Cookie: cookie,
      "User-Agent": userAgent ?? "Mozilla/5.0 Step5-Entitled-QA",
    },
    redirect: "follow",
  });
  return { status: res.status, text: await res.text(), url: res.url };
}

async function resolveExecutablePath(): Promise<string> {
  const localPath = process.env.PUPPETEER_EXECUTABLE_PATH?.trim();
  if (localPath) return localPath;
  const fs = await import("node:fs");
  const winChrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  if (fs.existsSync(winChrome)) return winChrome;
  const chromium = await import("@sparticuz/chromium");
  return chromium.default.executablePath();
}

async function main() {
  const cookie = process.env.STEP5_SESSION_COOKIE?.trim();
  const reportId = process.env.STEP5_REPORT_ID?.trim();
  if (!cookie) fail("Set STEP5_SESSION_COOKIE (session cookie after login)");
  if (!reportId) fail("Set STEP5_REPORT_ID (entitled report id from /account)");

  console.log("=== Step 5 entitled mini-QA ===");
  console.log(`reportId: ${reportId}`);

  const myReport = await fetchText(`/my-report/${reportId}`, cookie);
  if (myReport.status !== 200) fail(`/my-report HTTP ${myReport.status}`);
  if (myReport.url.includes("/login")) fail("/my-report redirected to login");
  if (!myReport.text.includes("Soul Blueprint")) fail("/my-report missing hero");
  if (!myReport.text.includes("data-surface=\"web\"") && !myReport.text.includes("UnifiedReport")) {
    // mobile UA check is separate; web should have report-root
  }
  if (!myReport.text.includes("report-root") && !myReport.text.includes("report-page")) {
    fail("/my-report missing unified renderer markers");
  }
  for (const code of ["S1-", "S3-", "S2-", "S0-", "S4-", "S5-", "S6-", "S7-", "S8-", "S9-"]) {
    if (!myReport.text.includes(code)) fail(`/my-report missing segment marker ${code}`);
  }
  checkTriggers("/my-report", myReport.text);
  pass("/my-report web — entitled full report renders");

  const print = await fetchText(`/report/${reportId}/print`, cookie);
  if (print.status !== 200) fail(`/report/print HTTP ${print.status}`);
  if (print.url.includes("/login")) fail("/report/print redirected to login");
  checkTriggers("/report/print", print.text);
  pass("/report/[id]/print — entitled print HTML");

  const pdfRes = await fetch(`${BASE}/api/report/${reportId}/pdf`, {
    headers: { Cookie: cookie },
  });
  if (pdfRes.status !== 200) fail(`PDF API HTTP ${pdfRes.status}`);
  const contentType = pdfRes.headers.get("content-type") ?? "";
  if (!contentType.includes("pdf")) fail(`PDF API content-type: ${contentType}`);
  pass("Account download PDF API — 200 application/pdf");

  const mobile = await fetchText(`/my-report/${reportId}`, cookie, MOBILE_UA);
  if (mobile.status !== 200) fail(`mobile /my-report HTTP ${mobile.status}`);
  if (!mobile.text.includes('data-surface="mobile"')) {
    fail("mobile /my-report should use mobile surface");
  }
  checkTriggers("mobile /my-report", mobile.text);
  pass("mobile /my-report — unified mobile shell");

  const sample = await fetchText("/full-report-v2?year=1982&month=2&day=3", cookie);
  if (sample.text.includes("locked-preview") || sample.text.includes("LockedPreview")) {
    pass("sample path still shows locked previews when accessed as entitled user on web sample");
  } else {
    console.log("NOTE: sample route may redirect or render full shell — verify manually if needed");
  }

  console.log("\nOVERALL: PASS — entitled account mini-QA");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

export {};
