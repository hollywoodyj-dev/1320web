/**
 * Preview-only Kingdom resolve checks. Does not print birth dates.
 * Run: npx tsx scripts/smoke-soulsync-kingdom-resolve.ts
 */
import { POST as kingdomResolve } from "../app/api/soulsync-kingdom/blueprints/resolve/route";
import { GET as kingdomPage } from "../app/soulsync-kingdom/route";
import { POST as cozeResolve } from "../app/api/v1/blueprints/resolve/route";
import { resolveSoulSyncKingdomBlueprint } from "../lib/soulsync-kingdom/resolve-blueprint";

const FIXTURE = "1980-05-22";
const EXPECTED = { s1: "S1-18", s3: "S3-03", s2: "S2-27", s0: "S0-07" };

function assert(condition: unknown, label: string) {
  if (!condition) {
    console.error(`FAIL ${label}`);
    process.exitCode = 1;
    throw new Error(label);
  }
  console.log(`PASS ${label}`);
}

function consentBody(date: string, extra?: Record<string, unknown>) {
  return {
    birth_date: date,
    locale: "zh-CN",
    purpose: "soulsync_kingdom",
    consent: { blueprint_generation: true, personalized_expression: true },
    ...extra,
  };
}

async function readJson(response: Response) {
  return (await response.json()) as Record<string, unknown>;
}

async function main() {
  const local = await kingdomResolve(
    new Request("http://localhost:3000/api/soulsync-kingdom/blueprints/resolve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(consentBody(FIXTURE)),
    }),
  );
  const success = await readJson(local);
  const foundation = success.foundation as Record<string, { code: string; display_name: string; short_meaning: string; totemId?: string }>;
  assert(local.status === 200, "fixture status 200");
  assert(foundation.s1.code === EXPECTED.s1, "fixture s1");
  assert(foundation.s3.code === EXPECTED.s3, "fixture s3");
  assert(foundation.s2.code === EXPECTED.s2, "fixture s2");
  assert(foundation.s0.code === EXPECTED.s0, "fixture s0");
  assert(
    [foundation.s1, foundation.s3, foundation.s2, foundation.s0].every(
      (segment) => segment.display_name.length > 0 && segment.short_meaning === "" && !segment.totemId,
    ),
    "public names only, empty short meaning, no totem",
  );
  const serialized = JSON.stringify(success);
  assert(!serialized.includes(FIXTURE), "success body omits birth date");
  assert(!serialized.includes("birth_date"), "success body omits birth_date field");
  assert(!("s4" in success) && !("s7" in success) && !("s8" in success) && !("s9" in success), "no later modules");
  console.log(
    `names ${foundation.s1.display_name} / ${foundation.s3.display_name} / ${foundation.s2.display_name} / ${foundation.s0.display_name}`,
  );

  const badDate = await kingdomResolve(
    new Request("http://localhost:3000/api/soulsync-kingdom/blueprints/resolve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(consentBody("1980-02-31")),
    }),
  );
  const badDateBody = await readJson(badDate);
  assert(badDate.status === 400, "invalid date status");
  assert((badDateBody.error as { code: string }).code === "INVALID_BIRTH_DATE", "invalid date code");
  assert(!JSON.stringify(badDateBody).includes("1980-02-31"), "invalid date body omits the date");

  const noConsent = await kingdomResolve(
    new Request("http://localhost:3000/api/soulsync-kingdom/blueprints/resolve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ birth_date: FIXTURE, locale: "zh-CN", purpose: "soulsync_kingdom" }),
    }),
  );
  const noConsentBody = await readJson(noConsent);
  assert(noConsent.status === 400, "missing consent status");
  assert((noConsentBody.error as { code: string }).code === "CONSENT_REQUIRED", "missing consent code");

  const badJson = await kingdomResolve(
    new Request("http://localhost:3000/api/soulsync-kingdom/blueprints/resolve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{",
    }),
  );
  assert(badJson.status === 400, "bad json status");

  const failed = resolveSoulSyncKingdomBlueprint(consentBody(FIXTURE), {
    requestId: "req_smoke",
    calculate: () => {
      throw new Error("lookup failed");
    },
  });
  assert(failed.status === 503, "service failure status");
  assert(
    (failed.body.error as { code: string }).code === "BLUEPRINT_SERVICE_UNAVAILABLE",
    "service failure code",
  );
  assert(!JSON.stringify(failed.body).includes(FIXTURE), "service failure omits birth date");

  const production = await kingdomResolve(
    new Request("https://www.1320soulcode.com/api/soulsync-kingdom/blueprints/resolve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(consentBody(FIXTURE)),
    }),
  );
  assert(production.status === 404, "production host blocked");

  const page = await kingdomPage(new Request("http://localhost:3000/soulsync-kingdom/"));
  const html = await page.text();
  assert(page.status === 200, "bridge page status");
  assert(html.includes("/api/soulsync-kingdom/blueprints/resolve"), "bridge calls resolve");
  assert(html.includes("Browser never holds BLUEPRINT_EXPERIENCE_API_KEY"), "bridge states the key stays off the browser");
  assert(!/Bearer\s+[A-Za-z0-9]{8,}/.test(html), "bridge html has no bearer token");

  const productionPage = await kingdomPage(
    new Request("https://www.1320soulcode.com/soulsync-kingdom/"),
  );
  assert(productionPage.status === 404, "production bridge blocked");

  const coze = await cozeResolve(
    new Request("http://localhost:3000/api/v1/blueprints/resolve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(consentBody(FIXTURE)),
    }),
  );
  assert(coze.status === 401 || coze.status === 403 || coze.status === 503, "coze resolve stays closed without a client key");

  if (process.exitCode) throw new Error("smoke failed");
  console.log("PASS soulsync kingdom preview resolve");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "smoke failed");
  process.exit(1);
});
