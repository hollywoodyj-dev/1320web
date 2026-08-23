/**
 * Phase 1 funnel smoke — Batch 10 acceptance checklist (automated portion).
 * Run: npm run smoke:funnel
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { calculate1320Code } from "../lib/calculate1320Code";
import { ANALYTICS_EVENTS } from "../lib/analytics-events";
import { buildReportViewModel } from "../lib/report/build-report-view-model";
import { get1320Content } from "../lib/get1320Content";
import { isValidBirthDate } from "../lib/validateBirthDate";
import { buildPinterestLandingUrl } from "../lib/funnel/pinterest-utm";
import {
  PAGE_VIEW_BURST_MS,
  resetPageViewDedupe,
  shouldRecordPageView,
} from "../lib/funnel/page-view-dedupe";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, "..");

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error("FAIL:", message);
    process.exit(1);
  }
}

const ROUTES = [
  "/",
  "/about-1320",
  "/blueprint",
  "/your-code",
  "/generating",
  "/result",
  "/full-report",
  "/full-report-v2",
  "/booking",
  "/faq",
  "/privacy",
  "/terms",
  "/disclaimer",
];

for (const route of ROUTES) {
  const segment = route === "/" ? "page.tsx" : `${route.slice(1)}/page.tsx`;
  const candidates = [
    path.join(webRoot, "app", segment),
    path.join(webRoot, "app", "(site)", segment),
    path.join(webRoot, "app", route.slice(1), "page.tsx"),
  ];
  const exists = candidates.some((file) => fs.existsSync(file));
  assert(exists, `Route file missing for ${route}`);
}

const REQUIRED_ASSETS = [
  "public/1320-logo.jpeg",
  "public/generating-1320-ring.webp",
  "public/1320-icon.svg",
  "public/hero-banner-desktop-v1.webp",
  "public/hero-banner-v5.webp",
  "public/homepage-ui.png",
  "public/generating-ui.png",
  "public/report-ui.jpeg",
  "public/card/s1.webp",
  "public/card/s3.webp",
  "public/card/s2.webp",
  "public/card/s0.webp",
  "public/how-1320-works/step-01.webp",
  "public/how-1320-works/step-04.webp",
];

for (const asset of REQUIRED_ASSETS) {
  assert(fs.existsSync(path.join(webRoot, asset)), `Missing asset: ${asset}`);
}

assert(fs.existsSync(path.join(webRoot, "app/api/leads/route.ts")), "Missing /api/leads route");
assert(fs.existsSync(path.join(webRoot, ".env.example")), "Missing .env.example");

const analyticsSource = fs.readFileSync(path.join(webRoot, "lib/analytics.ts"), "utf8");
for (const event of ANALYTICS_EVENTS) {
  assert(analyticsSource.includes(`"${event}"`) || fs.readFileSync(path.join(webRoot, "lib/analytics-events.ts"), "utf8").includes(`"${event}"`), `Analytics event not registered: ${event}`);
}

const wiredFiles = [
  "lib/submitBirthDate.ts",
  "components/generating/generating-chamber.tsx",
  "components/report/report-dashboard.tsx",
  "components/blueprint/blueprint-view-tracker.tsx",
  "components/waitlist-form.tsx",
  "components/booking-request-form.tsx",
  "components/lead-capture-form.tsx",
  "components/checkout/unlock-checkout-form.tsx",
  "lib/funnel/track-funnel-event.ts",
].map((file) => fs.readFileSync(path.join(webRoot, file), "utf8"));

assert(wiredFiles[0].includes("homepage_generate_click"), "homepage_generate_click not wired");
assert(wiredFiles[0].includes("calculator_submit"), "calculator_submit not wired");
assert(wiredFiles[0].includes("generate_code_started"), "generate_code_started not wired");
assert(wiredFiles[1].includes("generating_view"), "generating_view not wired");
assert(wiredFiles[2].includes("result_view"), "result_view not wired");
assert(wiredFiles[2].includes("generate_code_completed"), "generate_code_completed not wired");
assert(wiredFiles[3].includes("blueprint_view"), "blueprint_view not wired");
assert(wiredFiles[7].includes("checkout_started"), "checkout_started not wired");
assert(wiredFiles[7].includes("payment_button_clicked"), "payment_button_clicked not wired");
assert(wiredFiles[8].includes("trackSoulcodeEvent"), "funnel beacon helper missing");
const footerSubscribe = fs.readFileSync(path.join(webRoot, "components/footer-subscribe.tsx"), "utf8");
assert(footerSubscribe.includes("signup_completed"), "T25 footer signup_completed not wired");
assert(footerSubscribe.includes("submitLead"), "T25 footer submitLead missing");

const attributionLib = fs.readFileSync(path.join(webRoot, "lib/funnel/attribution.ts"), "utf8");
const pageViewSource = fs.readFileSync(
  path.join(webRoot, "components/analytics/soulcode-page-view.tsx"),
  "utf8",
);
const checkoutRoute = fs.readFileSync(path.join(webRoot, "app/api/checkout/route.ts"), "utf8");
assert(attributionLib.includes("captureLandingAttribution"), "T8 capture helper missing");
assert(pageViewSource.includes("captureLandingAttribution"), "T8 page-view persist not wired");
assert(pageViewSource.includes("shouldRecordPageView"), "T12 page_view burst guard not wired");
assert(pageViewSource.includes("window.location.search"), "T12 page_view should read live search, not useSearchParams identity");

resetPageViewDedupe();
assert(shouldRecordPageView("/full-report", 1_000), "T12 first page_view should record");
assert(!shouldRecordPageView("/full-report", 1_000 + PAGE_VIEW_BURST_MS - 1), "T12 same-path burst should drop");
assert(shouldRecordPageView("/checkout", 1_000 + 10), "T12 different path should record");
assert(shouldRecordPageView("/full-report", 1_000 + PAGE_VIEW_BURST_MS), "T12 after burst window should record");
assert(checkoutRoute.includes("attributionToCheckoutMetadata"), "T8 checkout metadata sanitize missing");
assert(checkoutRoute.includes("payment_intent_data"), "T8 PaymentIntent metadata missing");

const freeResultConversion = fs.readFileSync(
  path.join(webRoot, "components/funnel/free-result-conversion.tsx"),
  "utf8",
);
assert(freeResultConversion.includes("full_report_cta_click"), "T22 full_report_cta_click not wired");

const pinUrl = buildPinterestLandingUrl({
  batch: "2026-09",
  theme: "soul-blueprint",
  dest: "fsb",
});
assert(pinUrl.includes("utm_source=pinterest"), "T22 pin URL missing utm_source");
assert(pinUrl.includes("utm_medium=organic"), "T22 pin URL missing utm_medium");
assert(pinUrl.includes("utm_campaign=pin_2026-09_soul-blueprint_fsb"), "T22 pin campaign grain wrong");
assert(pinUrl.includes("/free-soul-blueprint"), "T22 pin dest path wrong");

const code = calculate1320Code(1980, 5, 22);
assert(code.s1 === 18 && code.s3Raw === 110 && code.s2 === 27 && code.s0 === 7, "Canonical code mismatch");
assert(isValidBirthDate(1980, 5, 22), "Canonical birth date should validate");

const content = get1320Content({ s1: 18, s3: 110, s2: 27, s0: 7, locale: "en" });
const freeVm = buildReportViewModel(content, { mode: "free", variant: "result" });
assert(freeVm.mode === "free" && freeVm.modules.every((m) => m.showLocked), "Free result should lock modules");

const sampleVm = buildReportViewModel(content, { mode: "free", variant: "sample" });
assert(sampleVm.mode === "free" && sampleVm.modules.every((m) => m.showLocked), "Sample should match free result layer");

const paidVm = buildReportViewModel(content, { mode: "full", variant: "result" });
assert(paidVm.modules.every((m) => !m.showLocked), "Paid report mode should not lock modules");

console.log("PASS: Batch 10 funnel smoke");
console.log("  routes:", ROUTES.length, "page files found");
console.log("  assets:", REQUIRED_ASSETS.length, "required files present");
console.log("  analytics events:", ANALYTICS_EVENTS.length);
console.log("  canonical:", content.codes.codeString);
console.log("  manual: homepage → your-code → generating → result (browser)");
