import { calculate1320Code } from "@/lib/calculate1320Code";
import { parseValidBirthDate } from "@/lib/blueprint-experience-api/birth-date";
import {
  decodeBlueprintId,
  encodeBlueprintId,
  publicSignature,
  type FoundationCodes,
} from "@/lib/blueprint-experience-api/blueprint-id";
import { BlueprintExperienceApiError } from "@/lib/blueprint-experience-api/errors";
import {
  buildExperienceProfile,
  filterExperienceProfileByPurpose,
} from "@/lib/blueprint-experience-api/experience-profile";
import { getPublicSegmentTitle } from "@/lib/blueprint-experience-api/segment-titles";
import {
  BLUEPRINT_EXPERIENCE_API_VERSION,
  BLUEPRINT_EXPERIENCE_PROFILE_VERSION,
  FOUNDATION_ORDER,
  SUPPORTED_LOCALES,
  SUPPORTED_PURPOSES,
  type BlueprintExperienceLocale,
  type BlueprintExperiencePurpose,
  type BlueprintExperienceResponse,
  type BlueprintResolveRequest,
} from "@/lib/blueprint-experience-api/types";
import { get1320Content } from "@/lib/get1320Content";
import type { Locale } from "@/lib/types/1320-content";

const GOVERNANCE = {
  symbolic_only: true as const,
  non_predictive: true as const,
  non_diagnostic: true as const,
  user_agency_required: true as const,
};

function isLocale(value: string): value is BlueprintExperienceLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

function isPurpose(value: string): value is BlueprintExperiencePurpose {
  return (SUPPORTED_PURPOSES as readonly string[]).includes(value);
}

function contentLocale(locale: BlueprintExperienceLocale): Locale {
  return locale === "zh-CN" ? "zh" : "en";
}

function assertProfileVersion(version: string | undefined) {
  if (!version) return;
  if (version !== BLUEPRINT_EXPERIENCE_PROFILE_VERSION) {
    throw new BlueprintExperienceApiError("VERSION_CONFLICT");
  }
}

function foundationNames(codes: FoundationCodes, locale: BlueprintExperienceLocale) {
  return {
    s1: getPublicSegmentTitle("s1", codes.s1Code, locale),
    s3: getPublicSegmentTitle("s3", codes.s3Code, locale),
    s2: getPublicSegmentTitle("s2", codes.s2Code, locale),
    s0: getPublicSegmentTitle("s0", codes.s0Code, locale),
  };
}

function buildResponseFromCodes(input: {
  requestId: string;
  codes: FoundationCodes;
  locale: BlueprintExperienceLocale;
  purpose: BlueprintExperiencePurpose;
}): BlueprintExperienceResponse {
  const names = foundationNames(input.codes, input.locale);
  const profile = filterExperienceProfileByPurpose(
    buildExperienceProfile(input.codes, input.locale),
    input.purpose,
  );

  return {
    request_id: input.requestId,
    api_version: BLUEPRINT_EXPERIENCE_API_VERSION,
    profile_version: BLUEPRINT_EXPERIENCE_PROFILE_VERSION,
    blueprint_id: encodeBlueprintId(input.codes),
    signature: publicSignature(input.codes),
    foundation_order: FOUNDATION_ORDER,
    foundation: {
      s1: { code: input.codes.s1Code, display_name: names.s1 },
      s3: { code: input.codes.s3Code, display_name: names.s3 },
      s2: { code: input.codes.s2Code, display_name: names.s2 },
      s0: { code: input.codes.s0Code, display_name: names.s0 },
    },
    experience_profile: profile,
    governance: GOVERNANCE,
  };
}

export function validateResolveRequest(body: unknown): BlueprintResolveRequest {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new BlueprintExperienceApiError("INVALID_REQUEST");
  }
  const record = body as Record<string, unknown>;
  const keys = Object.keys(record);
  const allowed = new Set(["blueprint_id", "birth_date", "locale", "purpose", "consent"]);
  if (keys.some((key) => !allowed.has(key))) {
    throw new BlueprintExperienceApiError("INVALID_REQUEST");
  }

  const locale = record.locale;
  const purpose = record.purpose;
  if (typeof locale !== "string" || !isLocale(locale)) {
    throw new BlueprintExperienceApiError("UNSUPPORTED_LOCALE");
  }
  if (typeof purpose !== "string" || !isPurpose(purpose)) {
    throw new BlueprintExperienceApiError("UNSUPPORTED_PURPOSE");
  }

  const hasId = typeof record.blueprint_id === "string" && record.blueprint_id.trim().length > 0;
  const hasBirth = typeof record.birth_date === "string" && record.birth_date.trim().length > 0;
  if (hasId === hasBirth) {
    throw new BlueprintExperienceApiError("INVALID_REQUEST");
  }

  if (hasId) {
    if ("birth_date" in record && record.birth_date != null) {
      throw new BlueprintExperienceApiError("INVALID_REQUEST");
    }
    return {
      blueprint_id: String(record.blueprint_id).trim(),
      locale,
      purpose,
    };
  }

  const consent = record.consent;
  if (!consent || typeof consent !== "object" || Array.isArray(consent)) {
    throw new BlueprintExperienceApiError("CONSENT_REQUIRED");
  }
  const consentRecord = consent as Record<string, unknown>;
  if (consentRecord.blueprint_generation !== true || consentRecord.personalized_expression !== true) {
    throw new BlueprintExperienceApiError("CONSENT_REQUIRED");
  }

  return {
    birth_date: (() => {
      const value = String(record.birth_date).trim();
      parseValidBirthDate(value);
      return value;
    })(),
    locale,
    purpose,
    consent: {
      blueprint_generation: true,
      personalized_expression: true,
    },
  };
}

export function resolveBlueprintExperience(input: {
  requestId: string;
  request: BlueprintResolveRequest;
  profileVersion?: string;
}): BlueprintExperienceResponse {
  assertProfileVersion(input.profileVersion);

  try {
    if (input.request.blueprint_id) {
      const codes = decodeBlueprintId(input.request.blueprint_id);
      return buildResponseFromCodes({
        requestId: input.requestId,
        codes,
        locale: input.request.locale,
        purpose: input.request.purpose,
      });
    }

    const parts = parseValidBirthDate(input.request.birth_date!);
    const code = calculate1320Code(parts.year, parts.month, parts.day);
    const content = get1320Content(
      {
        s1: code.s1,
        s3: code.s3Raw,
        s2: code.s2,
        s0: code.s0,
        locale: contentLocale(input.request.locale),
      },
      { reportTier: "free" },
    );

    const codes: FoundationCodes = {
      s1Code: content.codes.s1Code,
      s3Code: content.codes.s3Code,
      s2Code: content.codes.s2Code,
      s0Code: content.codes.s0Code,
    };

    return buildResponseFromCodes({
      requestId: input.requestId,
      codes,
      locale: input.request.locale,
      purpose: input.request.purpose,
    });
  } catch (error) {
    if (error instanceof BlueprintExperienceApiError) throw error;
    throw new BlueprintExperienceApiError("BLUEPRINT_SERVICE_UNAVAILABLE");
  }
}

export function getBlueprintExperienceProfile(input: {
  requestId: string;
  blueprintId: string;
  locale: string;
  purpose: string;
  profileVersion?: string;
}): BlueprintExperienceResponse {
  if (!isLocale(input.locale)) throw new BlueprintExperienceApiError("UNSUPPORTED_LOCALE");
  if (!isPurpose(input.purpose)) throw new BlueprintExperienceApiError("UNSUPPORTED_PURPOSE");
  assertProfileVersion(input.profileVersion);

  try {
    const codes = decodeBlueprintId(input.blueprintId);
    return buildResponseFromCodes({
      requestId: input.requestId,
      codes,
      locale: input.locale,
      purpose: input.purpose,
    });
  } catch (error) {
    if (error instanceof BlueprintExperienceApiError) throw error;
    throw new BlueprintExperienceApiError("PROFILE_SERVICE_UNAVAILABLE");
  }
}
