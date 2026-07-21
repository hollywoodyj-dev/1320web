/**
 * Smoke — Blueprint Experience API v1 (protected Coze bridge).
 * Run: npx tsx scripts/smoke-blueprint-experience-api.ts
 */
import assert from "node:assert/strict";
import { createRequestId } from "@/lib/blueprint-experience-api/auth";
import { decodeBlueprintId, encodeBlueprintId } from "@/lib/blueprint-experience-api/blueprint-id";
import { BlueprintExperienceApiError } from "@/lib/blueprint-experience-api/errors";
import {
  getBlueprintExperienceProfile,
  resolveBlueprintExperience,
  validateResolveRequest,
} from "@/lib/blueprint-experience-api/resolve";

process.env.BLUEPRINT_EXPERIENCE_API_KEY ||= "smoke-test-api-key";
process.env.BLUEPRINT_EXPERIENCE_ID_SECRET ||= "smoke-test-id-secret";

function expectError(fn: () => void, code: string) {
  try {
    fn();
    throw new Error(`Expected ${code}`);
  } catch (error) {
    assert.ok(error instanceof BlueprintExperienceApiError, `expected API error for ${code}`);
    assert.equal(error.code, code);
  }
}

// Canonical production birth date
const resolved = resolveBlueprintExperience({
  requestId: createRequestId(),
  request: validateResolveRequest({
    birth_date: "1980-05-22",
    locale: "en",
    purpose: "combined",
    consent: { blueprint_generation: true, personalized_expression: true },
  }),
});

assert.equal(resolved.signature, "S1-18/S3-03/S2-27/S0-07");
assert.deepEqual([...resolved.foundation_order], ["S1", "S3", "S2", "S0"]);
assert.equal(resolved.foundation.s1.code, "S1-18");
assert.equal(resolved.foundation.s1.display_name, "The Transformer");
assert.equal(resolved.governance.symbolic_only, true);
assert.equal(resolved.governance.non_predictive, true);
assert.ok(resolved.experience_profile.style_traits.length > 0);
assert.ok(resolved.experience_profile.palette_traits.length > 0);
assert.ok(resolved.experience_profile.visual_traits.length > 0);
assert.ok(resolved.experience_profile.travel_traits.length > 0);
assert.ok(resolved.experience_profile.reading_traits.core_themes.length > 0);
assert.ok(resolved.experience_profile.brand_affinity_traits.length > 0);

const payload = JSON.stringify(resolved);
assert.equal(payload.includes("birth_date"), false);
assert.equal(payload.includes("1980-05-22"), false);
assert.equal(payload.includes("modulo"), false);
assert.equal(payload.includes("s3Raw"), false);
assert.equal(payload.includes("formula"), false);

const fromId = getBlueprintExperienceProfile({
  requestId: createRequestId(),
  blueprintId: resolved.blueprint_id,
  locale: "zh-CN",
  purpose: "combined",
});
assert.equal(fromId.blueprint_id, resolved.blueprint_id);
assert.equal(fromId.signature, resolved.signature);
assert.ok(fromId.foundation.s1.display_name.length > 0);

expectError(
  () =>
    validateResolveRequest({
      birth_date: "1980-05-22",
      locale: "en",
      purpose: "combined",
    }),
  "CONSENT_REQUIRED",
);

expectError(
  () =>
    validateResolveRequest({
      birth_date: "1980-02-30",
      locale: "en",
      purpose: "combined",
      consent: { blueprint_generation: true, personalized_expression: true },
    }),
  "INVALID_BIRTH_DATE",
);

expectError(
  () =>
    validateResolveRequest({
      birth_date: "1980-05-22",
      locale: "fr",
      purpose: "combined",
      consent: { blueprint_generation: true, personalized_expression: true },
    }),
  "UNSUPPORTED_LOCALE",
);

expectError(
  () =>
    validateResolveRequest({
      birth_date: "1980-05-22",
      locale: "en",
      purpose: "tarot",
      consent: { blueprint_generation: true, personalized_expression: true },
    }),
  "UNSUPPORTED_PURPOSE",
);

expectError(
  () =>
    getBlueprintExperienceProfile({
      requestId: createRequestId(),
      blueprintId: "bp_not-a-real-id",
      locale: "en",
      purpose: "combined",
    }),
  "BLUEPRINT_NOT_FOUND",
);

expectError(
  () =>
    getBlueprintExperienceProfile({
      requestId: createRequestId(),
      blueprintId: resolved.blueprint_id,
      locale: "en",
      purpose: "combined",
      profileVersion: "legacy-v0",
    }),
  "VERSION_CONFLICT",
);

const roundTrip = decodeBlueprintId(encodeBlueprintId({
  s1Code: "S1-18",
  s3Code: "S3-03",
  s2Code: "S2-27",
  s0Code: "S0-07",
}));
assert.deepEqual(roundTrip, {
  s1Code: "S1-18",
  s3Code: "S3-03",
  s2Code: "S2-27",
  s0Code: "S0-07",
});

console.log("smoke:blueprint-experience-api PASS");
