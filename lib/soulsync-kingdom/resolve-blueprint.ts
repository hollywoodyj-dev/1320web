import { parseValidBirthDate } from "@/lib/blueprint-experience-api/birth-date";
import {
  BlueprintExperienceApiError,
  toErrorBody,
} from "@/lib/blueprint-experience-api/errors";
import { createRequestId } from "@/lib/blueprint-experience-api/auth";
import { getPublicSegmentTitle } from "@/lib/blueprint-experience-api/segment-titles";
import {
  BLUEPRINT_EXPERIENCE_API_VERSION,
  BLUEPRINT_EXPERIENCE_PROFILE_VERSION,
  FOUNDATION_ORDER,
} from "@/lib/blueprint-experience-api/types";
import { calculate1320Code, type SoulCodeResult } from "@/lib/calculate1320Code";

const BODY_KEYS = new Set(["birth_date", "locale", "purpose", "consent"]);
const CONSENT_KEYS = new Set(["blueprint_generation", "personalized_expression"]);

type OfficialCodes = Pick<SoulCodeResult, "s1Code" | "s3Code" | "s2Code" | "s0Code">;

export type KingdomResolveOutput = {
  status: number;
  body: Record<string, unknown>;
};

function fail(requestId: string, error: BlueprintExperienceApiError): KingdomResolveOutput {
  return { status: error.status, body: toErrorBody(requestId, error) };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

/**
 * Official S1 / S3 / S2 / S0 only.
 * Returns public codes and existing display names. Does not return arithmetic,
 * totems, report prose, or a demo substitute.
 */
export function resolveSoulSyncKingdomBlueprint(
  body: unknown,
  options?: { requestId?: string; calculate?: (year: number, month: number, day: number) => OfficialCodes },
): KingdomResolveOutput {
  const requestId = options?.requestId ?? createRequestId();
  const calculate = options?.calculate ?? calculate1320Code;

  try {
    if (!isRecord(body)) throw new BlueprintExperienceApiError("INVALID_REQUEST");
    if (Object.keys(body).some((key) => !BODY_KEYS.has(key))) {
      throw new BlueprintExperienceApiError("INVALID_REQUEST");
    }
    if (body.locale !== "zh-CN") throw new BlueprintExperienceApiError("UNSUPPORTED_LOCALE");
    if (body.purpose !== "soulsync_kingdom") {
      throw new BlueprintExperienceApiError("UNSUPPORTED_PURPOSE");
    }
    if (!isRecord(body.consent)) throw new BlueprintExperienceApiError("CONSENT_REQUIRED");
    if (Object.keys(body.consent).some((key) => !CONSENT_KEYS.has(key))) {
      throw new BlueprintExperienceApiError("INVALID_REQUEST");
    }
    if (
      body.consent.blueprint_generation !== true ||
      body.consent.personalized_expression !== true
    ) {
      throw new BlueprintExperienceApiError("CONSENT_REQUIRED");
    }
    if (typeof body.birth_date !== "string") {
      throw new BlueprintExperienceApiError("INVALID_BIRTH_DATE");
    }

    const parts = parseValidBirthDate(body.birth_date);
    const codes = calculate(parts.year, parts.month, parts.day);
    if (!codes.s1Code || !codes.s3Code || !codes.s2Code || !codes.s0Code) {
      throw new BlueprintExperienceApiError("BLUEPRINT_SERVICE_UNAVAILABLE");
    }

    const segment = (segmentKey: "s1" | "s3" | "s2" | "s0", code: string) => ({
      code,
      display_name: getPublicSegmentTitle(segmentKey, code, "zh-CN"),
      short_meaning: "",
    });

    return {
      status: 200,
      body: {
        request_id: requestId,
        api_version: BLUEPRINT_EXPERIENCE_API_VERSION,
        profile_version: BLUEPRINT_EXPERIENCE_PROFILE_VERSION,
        foundation_order: [...FOUNDATION_ORDER],
        foundation: {
          s1: segment("s1", codes.s1Code),
          s3: segment("s3", codes.s3Code),
          s2: segment("s2", codes.s2Code),
          s0: segment("s0", codes.s0Code),
        },
        experience_profile: {},
        governance: {
          symbolic_only: true,
          non_predictive: true,
          non_diagnostic: true,
          user_agency_required: true,
        },
      },
    };
  } catch (error) {
    if (error instanceof BlueprintExperienceApiError) return fail(requestId, error);
    return fail(requestId, new BlueprintExperienceApiError("BLUEPRINT_SERVICE_UNAVAILABLE"));
  }
}
