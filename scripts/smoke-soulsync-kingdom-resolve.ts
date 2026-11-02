/**
 * Preview-only Kingdom resolve checks. Does not print birth dates.
 * Run: npx tsx scripts/smoke-soulsync-kingdom-resolve.ts
 */
import { POST as kingdomResolve } from "../app/api/soulsync-kingdom/blueprints/resolve/route";
import { POST as kingdomReflect } from "../app/api/soulsync-kingdom/reflect/route";
import { GET as kingdomPage } from "../app/soulsync-kingdom/route";
import { POST as cozeResolve } from "../app/api/v1/blueprints/resolve/route";
import { reflectSoulSyncKingdom } from "../lib/soulsync-kingdom/reflect";
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
  const foundation = success.foundation as Record<
    string,
    { code: string; display_name: string; short_meaning: string; totemId?: string; totemAssetUrl?: string }
  >;
  assert(local.status === 200, "fixture status 200");
  assert(foundation.s1.code === EXPECTED.s1, "fixture s1");
  assert(foundation.s3.code === EXPECTED.s3, "fixture s3");
  assert(foundation.s2.code === EXPECTED.s2, "fixture s2");
  assert(foundation.s0.code === EXPECTED.s0, "fixture s0");
  assert(
    [foundation.s1, foundation.s3, foundation.s2, foundation.s0].every(
      (segment) =>
        segment.display_name.length > 0 &&
        segment.short_meaning === "" &&
        segment.totemId === segment.code &&
        typeof segment.totemAssetUrl === "string" &&
        segment.totemAssetUrl.startsWith("/"),
    ),
    "fixture codes keep public names and verified totem urls",
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
  assert(html.includes("choices"), "bridge reflect sends a choice summary");
  assert(!html.includes("blueprint_id:(S.bp"), "bridge reflect no longer sends a blueprint id");
  assert(html.includes("占位符号"), "missing totem stays labeled as a placeholder");

  const unmapped = resolveSoulSyncKingdomBlueprint(consentBody(FIXTURE), {
    requestId: "req_unmap",
    calculate: () => ({ s1Code: "S1-01", s3Code: "S3-01", s2Code: "S2-02", s0Code: "S0-01" }),
  });
  const unmappedFoundation = (unmapped.body.foundation ?? {}) as Record<string, { totemId?: string }>;
  assert(
    ["s1", "s3", "s2", "s0"].every((key) => !unmappedFoundation[key]?.totemId),
    "unverified codes keep no official totem",
  );

  const reflectBody = {
    locale: "zh-CN",
    purpose: "soulsync_kingdom",
    choices: [
      { module: "s1", choice: "part" },
      { module: "s2", choice: "look", relation: "friend" },
    ],
  };
  const reflectOk = await reflectSoulSyncKingdom(reflectBody, {
    requestId: "req_reflect_ok",
    complete: async () => "今晚你认出意象里有自己的一部分，也选择只看看朋友的倒影。",
  });
  assert(reflectOk.status === 200, "reflect success status");
  assert(typeof reflectOk.body.text === "string" && (reflectOk.body.text as string).length > 0, "reflect success text");
  assert(!JSON.stringify(reflectOk.body).includes("birth"), "reflect success omits birth");
  console.log("reflect fields sent: locale, purpose, choices[].module, choices[].choice, choices[].relation");
  console.log(`reflect sample: ${reflectOk.body.text}`);

  const reflectBlocked = await reflectSoulSyncKingdom(
    { ...reflectBody, blueprint_id: "bp_hidden", playerWords: "private" },
    { requestId: "req_reflect_block", complete: async () => "不应该出现" },
  );
  assert(reflectBlocked.status === 400, "reflect rejects extra fields");
  assert(!JSON.stringify(reflectBlocked.body).includes("不应该出现"), "rejected reflect does not invent a sentence");

  const reflectDown = await reflectSoulSyncKingdom(reflectBody, {
    requestId: "req_reflect_down",
    complete: async () => {
      throw new Error("model down");
    },
  });
  assert(reflectDown.status === 503, "reflect failure status");
  assert(!("text" in reflectDown.body), "reflect failure has no substitute sentence");

  const previousOpenAiKey = process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_API_KEY;
  const reflectRouteDown = await kingdomReflect(
    new Request("http://localhost:3000/api/soulsync-kingdom/reflect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reflectBody),
    }),
  );
  const reflectRouteDownBody = await readJson(reflectRouteDown);
  assert(reflectRouteDown.status === 503, "reflect route failure status");
  assert(!("text" in reflectRouteDownBody), "reflect route failure has no substitute sentence");
  if (previousOpenAiKey) process.env.OPENAI_API_KEY = previousOpenAiKey;

  const reflectRouteRejected = await kingdomReflect(
    new Request("http://localhost:3000/api/soulsync-kingdom/reflect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...reflectBody, birth_date: FIXTURE }),
    }),
  );
  const reflectRouteRejectedBody = await readJson(reflectRouteRejected);
  assert(reflectRouteRejected.status === 400, "reflect route rejects a birth date");
  assert(!JSON.stringify(reflectRouteRejectedBody).includes(FIXTURE), "reflect rejection omits the birth date");
  const reflectProd = await kingdomReflect(
    new Request("https://www.1320soulcode.com/api/soulsync-kingdom/reflect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reflectBody),
    }),
  );
  assert(reflectProd.status === 404, "reflect stays off production");

  if (process.exitCode) throw new Error("smoke failed");
  console.log("PASS soulsync kingdom preview resolve");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "smoke failed");
  process.exit(1);
});
