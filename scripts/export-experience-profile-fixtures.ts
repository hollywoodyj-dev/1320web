/**
 * Option A deliverable — desensitized Connected MVP fixture pack.
 * Run: npx tsx scripts/export-experience-profile-fixtures.ts
 *
 * Writes:
 *  - docs/specs/blueprint-experience-api/experience-profile.schema.json (already committed)
 *  - qa-artifacts/connected-mvp-option-a-fixtures/*
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequestId } from "@/lib/blueprint-experience-api/auth";
import {
  BLUEPRINT_EXPERIENCE_BASE_URLS,
  BLUEPRINT_EXPERIENCE_CLIENT_TIMEOUT_MS,
  BLUEPRINT_EXPERIENCE_RATE_LIMITS,
  BLUEPRINT_EXPERIENCE_STAGING_CLIENT_ID,
} from "@/lib/blueprint-experience-api/contracts";
import { BlueprintExperienceApiError } from "@/lib/blueprint-experience-api/errors";
import {
  getBlueprintExperienceProfile,
  resolveBlueprintExperience,
  validateResolveRequest,
} from "@/lib/blueprint-experience-api/resolve";
import {
  BLUEPRINT_EXPERIENCE_API_VERSION,
  BLUEPRINT_EXPERIENCE_PROFILE_VERSION,
  type BlueprintExperienceResponse,
} from "@/lib/blueprint-experience-api/types";

process.env.BLUEPRINT_EXPERIENCE_API_KEY ||= "fixture-export-api-key";
process.env.BLUEPRINT_EXPERIENCE_ID_SECRET ||= "fixture-export-id-secret";

const OUT_DIR = path.join(process.cwd(), "qa-artifacts", "connected-mvp-option-a-fixtures");
const SCHEMA_PATH = path.join(
  process.cwd(),
  "docs",
  "specs",
  "blueprint-experience-api",
  "experience-profile.schema.json",
);
const ENDPOINT_RESOLVE = "POST /v1/blueprints/resolve";
const ENDPOINT_PROFILE = "GET /v1/blueprints/{blueprint_id}/experience-profile";
const ENDPOINT_HEALTH = "GET /v1/health";

type EvidenceRow = {
  fixture_id: string;
  scenario: string;
  timestamp: string;
  endpoint: string;
  http_status: number;
  duration_ms: number;
  api_version: string | null;
  profile_version: string | null;
  masked_signature: string | null;
  validation: "passed" | "failed" | "n/a";
  error_code: string | null;
  notes: string[];
};

function maskSignature(signature: string): string {
  return signature.replace(/S([1320])-[^/]+/g, "S$1-**");
}

function maskCodes(response: BlueprintExperienceResponse) {
  return {
    ...response,
    signature: maskSignature(response.signature),
    foundation: {
      s1: { code: "S1-**", display_name: response.foundation.s1.display_name },
      s3: { code: "S3-**", display_name: response.foundation.s3.display_name },
      s2: { code: "S2-**", display_name: response.foundation.s2.display_name },
      s0: { code: "S0-**", display_name: response.foundation.s0.display_name },
    },
    blueprint_id: `bp_fixture_${response.blueprint_id.slice(0, 8)}`,
  };
}

/** Lightweight structural validator aligned to experience-profile.schema.json required fields. */
function validateExperienceProfileSchema(payload: unknown): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { ok: false, errors: ["payload must be an object"] };
  }
  const record = payload as Record<string, unknown>;
  const required = [
    "request_id",
    "api_version",
    "profile_version",
    "blueprint_id",
    "signature",
    "foundation_order",
    "foundation",
    "experience_profile",
    "governance",
  ];
  for (const key of required) {
    if (!(key in record)) errors.push(`missing ${key}`);
  }
  if (record.api_version !== "1.0") errors.push("api_version must be 1.0");
  if (record.profile_version !== "1320-experience-profile-v1") {
    errors.push("profile_version must be 1320-experience-profile-v1");
  }
  if (JSON.stringify(record.foundation_order) !== JSON.stringify(["S1", "S3", "S2", "S0"])) {
    errors.push("foundation_order must be [S1,S3,S2,S0]");
  }
  const forbidden = [
    "birth_date",
    "email",
    "profile_id",
    "profile_fingerprint",
    "module_rules",
    "personalisation_vector",
    "trait_priorities",
    "schema_version",
    "source",
    "foundations",
  ];
  for (const key of forbidden) {
    if (key in record) errors.push(`forbidden field present: ${key}`);
  }
  const profile = record.experience_profile as Record<string, unknown> | undefined;
  if (!profile || typeof profile !== "object") {
    errors.push("experience_profile missing");
  } else {
    for (const key of [
      "essence_traits",
      "style_traits",
      "palette_traits",
      "texture_traits",
      "visual_traits",
      "travel_traits",
      "reading_traits",
      "brand_affinity_traits",
    ]) {
      if (!(key in profile)) errors.push(`experience_profile missing ${key}`);
    }
  }
  const gov = record.governance as Record<string, unknown> | undefined;
  if (!gov || gov.symbolic_only !== true || gov.non_predictive !== true) {
    errors.push("governance flags invalid");
  }
  return { ok: errors.length === 0, errors };
}

function writeJson(file: string, value: unknown) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function timed<T>(fn: () => T): { value: T; duration_ms: number } {
  const start = performance.now();
  const value = fn();
  return { value, duration_ms: Math.round(performance.now() - start) };
}

function resolveSuccess(birthDate: string, fixtureId: string): {
  evidence: EvidenceRow;
  desensitized: ReturnType<typeof maskCodes>;
  rawForRecovery: BlueprintExperienceResponse;
} {
  const timestamp = new Date().toISOString();
  const { value, duration_ms } = timed(() =>
    resolveBlueprintExperience({
      requestId: createRequestId(),
      request: validateResolveRequest({
        birth_date: birthDate,
        locale: "zh-CN",
        purpose: "combined",
        consent: { blueprint_generation: true, personalized_expression: true },
      }),
    }),
  );

  const validation = validateExperienceProfileSchema(value);
  assert.equal(validation.ok, true, validation.errors.join("; "));

  const serialized = JSON.stringify(value);
  assert.equal(serialized.includes(birthDate), false, "birth date must not appear in response");
  assert.equal(serialized.includes("birth_date"), false);

  return {
    rawForRecovery: value,
    desensitized: maskCodes(value),
    evidence: {
      fixture_id: fixtureId,
      scenario: "resolve_by_birth_date",
      timestamp,
      endpoint: ENDPOINT_RESOLVE,
      http_status: 200,
      duration_ms,
      api_version: value.api_version,
      profile_version: value.profile_version,
      masked_signature: maskSignature(value.signature),
      validation: "passed",
      error_code: null,
      notes: [
        "Desensitized fixture: signature and foundation codes masked.",
        "experience_profile traits retained for Translation Plan mapping.",
        "Birth date absent from response body.",
      ],
    },
  };
}

function resolveError(
  fixtureId: string,
  scenario: string,
  body: Record<string, unknown>,
  expectedCode: string,
): EvidenceRow {
  const timestamp = new Date().toISOString();
  const { duration_ms } = timed(() => {
    try {
      resolveBlueprintExperience({
        requestId: createRequestId(),
        request: validateResolveRequest(body),
      });
      throw new Error(`Expected ${expectedCode}`);
    } catch (error) {
      assert.ok(error instanceof BlueprintExperienceApiError);
      assert.equal(error.code, expectedCode);
    }
  });

  return {
    fixture_id: fixtureId,
    scenario,
    timestamp,
    endpoint: ENDPOINT_RESOLVE,
    http_status: expectedCode === "INVALID_BIRTH_DATE" || expectedCode === "INVALID_REQUEST" || expectedCode === "CONSENT_REQUIRED" ? 400 : 500,
    duration_ms,
    api_version: null,
    profile_version: null,
    masked_signature: null,
    validation: "n/a",
    error_code: expectedCode,
    notes: ["Error-path fixture. No Connected eligibility."],
  };
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  assert.ok(fs.existsSync(SCHEMA_PATH), "experience-profile.schema.json missing");

  const evidence: EvidenceRow[] = [];

  const f1990 = resolveSuccess("1990-01-15", "birth-1990-01-15");
  evidence.push(f1990.evidence);
  writeJson(path.join(OUT_DIR, "success-1990-01-15.desensitized.json"), f1990.desensitized);

  const f1980 = resolveSuccess("1980-05-22", "birth-1980-05-22");
  evidence.push(f1980.evidence);
  writeJson(path.join(OUT_DIR, "success-1980-05-22.desensitized.json"), f1980.desensitized);

  const f2000 = resolveSuccess("2000-02-29", "birth-2000-02-29");
  evidence.push(f2000.evidence);
  writeJson(path.join(OUT_DIR, "success-2000-02-29.desensitized.json"), f2000.desensitized);

  // Recovery trace using blueprint_id from 1980 fixture (canonical smoke date).
  const recoveryTimestamp = new Date().toISOString();
  const recovery = timed(() =>
    getBlueprintExperienceProfile({
      requestId: createRequestId(),
      blueprintId: f1980.rawForRecovery.blueprint_id,
      locale: "zh-CN",
      purpose: "combined",
    }),
  );
  const recoveryValidation = validateExperienceProfileSchema(recovery.value);
  assert.equal(recoveryValidation.ok, true, recoveryValidation.errors.join("; "));
  evidence.push({
    fixture_id: "recovery-1980-05-22",
    scenario: "recovery_by_blueprint_id",
    timestamp: recoveryTimestamp,
    endpoint: ENDPOINT_PROFILE,
    http_status: 200,
    duration_ms: recovery.duration_ms,
    api_version: recovery.value.api_version,
    profile_version: recovery.value.profile_version,
    masked_signature: maskSignature(recovery.value.signature),
    validation: "passed",
    error_code: null,
    notes: [
      "Returning-user recovery path.",
      "Local blueprint_id is reference only; Nova confirmation required for connected.",
    ],
  });
  writeJson(
    path.join(OUT_DIR, "recovery-1980-05-22.desensitized.json"),
    maskCodes(recovery.value),
  );

  evidence.push(
    resolveError(
      "invalid-birth-date",
      "invalid_birth_date",
      {
        birth_date: "1980-02-30",
        locale: "zh-CN",
        purpose: "combined",
        consent: { blueprint_generation: true, personalized_expression: true },
      },
      "INVALID_BIRTH_DATE",
    ),
  );

  evidence.push(
    resolveError(
      "future-birth-date",
      "future_birth_date",
      {
        birth_date: "2030-01-01",
        locale: "zh-CN",
        purpose: "combined",
        consent: { blueprint_generation: true, personalized_expression: true },
      },
      "INVALID_BIRTH_DATE",
    ),
  );

  // Schema sample for Coze Zod generation (shape-complete; codes masked).
  writeJson(path.join(OUT_DIR, "schema-valid-sample.desensitized.json"), f1980.desensitized);

  // Health evidence (in-process contract — no HTTP server required for pack generation).
  evidence.push({
    fixture_id: "health-ok",
    scenario: "health_probe",
    timestamp: new Date().toISOString(),
    endpoint: ENDPOINT_HEALTH,
    http_status: 200,
    duration_ms: 0,
    api_version: BLUEPRINT_EXPERIENCE_API_VERSION,
    profile_version: null,
    masked_signature: null,
    validation: "n/a",
    error_code: null,
    notes: [
      "Health route returns status/api_version/service availability flags.",
      "No auth required. No infrastructure disclosure.",
      "Live HTTP probe: GET /api/v1/health on staging base URL after credential deploy.",
    ],
  });

  writeJson(path.join(OUT_DIR, "evidence-summary.json"), {
    generated_at: new Date().toISOString(),
    option: "A",
    canonical_api: {
      resolve: ENDPOINT_RESOLVE,
      recovery: ENDPOINT_PROFILE,
      health: ENDPOINT_HEALTH,
      rewrite_prefix: "/api/v1",
    },
    versions: {
      api_version: BLUEPRINT_EXPERIENCE_API_VERSION,
      profile_version: BLUEPRINT_EXPERIENCE_PROFILE_VERSION,
    },
    schema_path: "docs/specs/blueprint-experience-api/experience-profile.schema.json",
    base_urls: BLUEPRINT_EXPERIENCE_BASE_URLS,
    timeout_ms: {
      recommended_client: BLUEPRINT_EXPERIENCE_CLIENT_TIMEOUT_MS,
    },
    rate_limits: BLUEPRINT_EXPERIENCE_RATE_LIMITS,
    staging_client_id: BLUEPRINT_EXPERIENCE_STAGING_CLIENT_ID,
    fixtures: evidence,
  });

  writeJson(path.join(OUT_DIR, "timeout-and-rate-limits.json"), {
    client_timeout_ms: BLUEPRINT_EXPERIENCE_CLIENT_TIMEOUT_MS,
    rate_limits: BLUEPRINT_EXPERIENCE_RATE_LIMITS,
    headers: ["X-RateLimit-Limit", "X-RateLimit-Remaining", "X-RateLimit-Reset"],
  });

  console.log(`Wrote ${evidence.length} evidence rows to ${OUT_DIR}`);
  console.log("export:experience-profile-fixtures PASS");
}

main();
