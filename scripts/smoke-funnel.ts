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
import { CONVERSION_EVENT_CATALOG } from "../lib/soulcode-conversion-tracking";
import { buildPinterestLandingUrl } from "../lib/funnel/pinterest-utm";
import {
  mergeAttribution,
  type FunnelAttribution,
} from "../lib/funnel/attribution";
import {
  PAGE_VIEW_BURST_MS,
  resetPageViewDedupe,
  shouldRecordPageView,
} from "../lib/funnel/page-view-dedupe";
import {
  getManifestEntry,
  getSitemapRoutesFromManifest,
} from "../lib/seo/intent-manifest";

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
assert(checkoutRoute.includes("recordAccountSignupIfCreated"), "T9 checkout must record signup_completed on new user");
const signupRoute = fs.readFileSync(path.join(webRoot, "app/api/auth/signup/route.ts"), "utf8");
assert(signupRoute.includes("recordAccountSignupIfCreated"), "T9 /signup must record signup_completed on new user");
const adminPanel = fs.readFileSync(path.join(webRoot, "components/admin/admin-conversion-panel.tsx"), "utf8");
assert(adminPanel.includes("Medium"), "admin events table must show medium");
assert(adminPanel.includes("Campaign"), "admin events table must show campaign");

const firstTouch: FunnelAttribution = {
  utm_source: "pinterest",
  utm_medium: "organic",
  utm_campaign: "haze_t8",
  landingPath: "/free-soul-blueprint",
};
const afterDirectReturn = mergeAttribution(firstTouch, {});
assert(afterDirectReturn.utm_source === "pinterest", "T8 no-UTM return must keep first-touch source");
assert(afterDirectReturn.utm_medium === "organic", "T8 no-UTM return must keep first-touch medium");
assert(afterDirectReturn.utm_campaign === "haze_t8", "T8 no-UTM return must keep first-touch campaign");
assert(afterDirectReturn.landingPath === "/free-soul-blueprint", "T8 no-UTM return must keep landingPath");
const afterLaterUtm = mergeAttribution(firstTouch, {
  utm_source: "google",
  utm_medium: "cpc",
  utm_campaign: "later",
  landingPath: "/",
});
assert(afterLaterUtm.utm_source === "pinterest", "T8 later UTM must not overwrite first-touch source");
assert(afterLaterUtm.utm_campaign === "haze_t8", "T8 later UTM must not overwrite first-touch campaign");
assert(afterLaterUtm.landingPath === "/free-soul-blueprint", "T8 later landing must not overwrite first landingPath");
assert(attributionLib.includes("if (hasCampaign)"), "T8 capture must skip save on no-UTM return");

const persistNames = CONVERSION_EVENT_CATALOG.map((entry) => entry.name);
assert(persistNames.includes("generate_code_started"), "T9 persist catalog missing generate_code_started");
assert(persistNames.includes("generate_code_completed"), "T9 persist catalog missing generate_code_completed");
assert(persistNames.includes("full_report_cta_click"), "T9 persist catalog missing full_report_cta_click");
assert(persistNames.includes("checkout_started"), "T9 persist catalog missing checkout_started");
assert(persistNames.includes("payment_button_clicked"), "T9 persist catalog missing payment_button_clicked");
assert(persistNames.includes("signup_completed"), "T9 persist catalog missing signup_completed");
assert(
  !persistNames.includes("free_result_view") &&
    !persistNames.includes("result_view") &&
    !persistNames.includes("free_blueprint_result_viewed"),
  "T9 persist catalog grew a Free Result view name — report the gap, do not add",
);

const reflectEntry = getManifestEntry("/reflect");
assert(reflectEntry?.class === "D", "T29 /reflect must be class D");
assert(reflectEntry?.index === false, "T29 /reflect must be noindex");
assert(reflectEntry?.sitemap === false, "T29 /reflect must leave sitemap");
assert(reflectEntry?.canonical === "/reflect", "T29 /reflect keeps self-canonical");
const sitemapRoutes = getSitemapRoutesFromManifest();
assert(sitemapRoutes.length === 19, `T29 sitemap must be 19 routes, got ${sitemapRoutes.length}`);
assert(
  sitemapRoutes.every((route) => route.path !== "/reflect"),
  "T29 sitemap must not include /reflect",
);
const sitemapXml = fs.readFileSync(path.join(webRoot, "public/sitemap.xml"), "utf8");
const sitemapLocs = sitemapXml.match(/<loc>/g) ?? [];
assert(sitemapLocs.length === 19, `T29 public/sitemap.xml must have 19 <loc>, got ${sitemapLocs.length}`);
assert(!sitemapXml.includes("/reflect</loc>"), "T29 public/sitemap.xml still lists /reflect");
const reflectPage = fs.readFileSync(path.join(webRoot, "app/(site)/reflect/page.tsx"), "utf8");
assert(reflectPage.includes("index: false"), "T29 /reflect page metadata must set robots noindex");
assert(reflectPage.includes('canonical: "/reflect"'), "T29 /reflect must keep self-canonical");
const robotsDisallow = fs.readFileSync(path.join(webRoot, "lib/seo/public-routes.ts"), "utf8");
assert(robotsDisallow.includes('"/reflect/"'), "T29 step 1 must not remove robots Disallow /reflect/");

const freeResultConversion = fs.readFileSync(
  path.join(webRoot, "components/funnel/free-result-conversion.tsx"),
  "utf8",
);
assert(freeResultConversion.includes("full_report_cta_click"), "T22 full_report_cta_click not wired");

const page01Body = fs.readFileSync(
  path.join(webRoot, "lib/seo/content/what-is-a-soul-blueprint-body.ts"),
  "utf8",
);
const page01View = fs.readFileSync(
  path.join(webRoot, "components/seo/pages/what-is-soul-blueprint-page.tsx"),
  "utf8",
);
assert(page01Body.includes("PAGE01_TRADITIONS"), "T15 traditions copy missing");
assert(page01Body.includes("Akashic Records"), "T15 must name Akashic Records");
assert(page01Body.includes("does not claim to read"), "T15 must refuse Akashic-record claims");
const traditionsJsx = page01View.indexOf("id={PAGE01_TRADITIONS.id}");
const fixedJsx = page01View.indexOf("id={PAGE01_FIXED.id}");
assert(traditionsJsx >= 0, "T15 traditions section not rendered");
assert(traditionsJsx < fixedJsx, "T15 traditions section should sit before fixed/changeable");

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
