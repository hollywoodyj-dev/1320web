/** Blueprint Experience API — public contracts (Coze-safe). */

export const BLUEPRINT_EXPERIENCE_API_VERSION = "1.0" as const;
export const BLUEPRINT_EXPERIENCE_PROFILE_VERSION = "1320-experience-profile-v1" as const;

export const FOUNDATION_ORDER = ["S1", "S3", "S2", "S0"] as const;

export const SUPPORTED_LOCALES = ["zh-CN", "en"] as const;
export type BlueprintExperienceLocale = (typeof SUPPORTED_LOCALES)[number];

export const SUPPORTED_PURPOSES = [
  "lifestyle_expression",
  "soul_reading",
  "visual_expression",
  "travel_inspiration",
  "brand_matching",
  "combined",
] as const;
export type BlueprintExperiencePurpose = (typeof SUPPORTED_PURPOSES)[number];

export type BlueprintExperienceConsent = {
  blueprint_generation: boolean;
  personalized_expression: boolean;
};

export type FoundationSegment = {
  code: string;
  display_name: string;
};

export type ReadingTraits = {
  core_themes: string[];
  preferred_depth: "light" | "accessible" | "medium" | "deep" | "professional";
  preferred_styles: string[];
  learning_orientation: string[];
};

export type ExperienceProfile = {
  essence_traits: string[];
  style_traits: string[];
  palette_traits: string[];
  texture_traits: string[];
  visual_traits: string[];
  travel_traits: string[];
  reading_traits: ReadingTraits;
  brand_affinity_traits: string[];
};

export type GovernanceFlags = {
  symbolic_only: true;
  non_predictive: true;
  non_diagnostic: true;
  user_agency_required: true;
};

export type BlueprintExperienceResponse = {
  request_id: string;
  api_version: typeof BLUEPRINT_EXPERIENCE_API_VERSION;
  profile_version: typeof BLUEPRINT_EXPERIENCE_PROFILE_VERSION;
  blueprint_id: string;
  signature: string;
  foundation_order: typeof FOUNDATION_ORDER;
  foundation: {
    s1: FoundationSegment;
    s3: FoundationSegment;
    s2: FoundationSegment;
    s0: FoundationSegment;
  };
  experience_profile: ExperienceProfile;
  governance: GovernanceFlags;
};

export type BlueprintResolveRequest = {
  blueprint_id?: string;
  birth_date?: string;
  locale: BlueprintExperienceLocale;
  purpose: BlueprintExperiencePurpose;
  consent?: BlueprintExperienceConsent;
};

export type BlueprintExperienceErrorCode =
  | "INVALID_REQUEST"
  | "INVALID_BIRTH_DATE"
  | "CONSENT_REQUIRED"
  | "UNSUPPORTED_LOCALE"
  | "UNSUPPORTED_PURPOSE"
  | "UNAUTHORIZED"
  | "FORBIDDEN_CLIENT"
  | "BLUEPRINT_NOT_FOUND"
  | "VERSION_CONFLICT"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR"
  | "BLUEPRINT_SERVICE_UNAVAILABLE"
  | "PROFILE_SERVICE_UNAVAILABLE"
  | "IDEMPOTENCY_CONFLICT";

export type BlueprintExperienceErrorBody = {
  request_id: string;
  error: {
    code: BlueprintExperienceErrorCode;
    message: string;
    safe_message_zh: string;
    retryable: boolean;
  };
};
