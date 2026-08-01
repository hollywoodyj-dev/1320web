/**
 * Blueprint Experience API v1 — client-facing operational contracts.
 * Locked under Wisewave Option A (Connected Lifestyle Mode).
 */

import { RATE_LIMITS } from "@/lib/blueprint-experience-api/rate-limit";

/** Recommended Coze Backend client timeout for resolve + recovery. */
export const BLUEPRINT_EXPERIENCE_CLIENT_TIMEOUT_MS = 10_000;

/**
 * Server-side resolve is synchronous (no upstream LLM).
 * Soft ceiling for Next.js route work; clients should use CLIENT_TIMEOUT_MS.
 */
export const BLUEPRINT_EXPERIENCE_SERVER_SOFT_DEADLINE_MS = 5_000;

export const BLUEPRINT_EXPERIENCE_RATE_LIMITS = {
  resolve: {
    endpoint: "POST /v1/blueprints/resolve",
    limit: RATE_LIMITS.resolve.limit,
    window_ms: RATE_LIMITS.resolve.windowMs,
    description: "30 requests per client per rolling 60 seconds",
  },
  profile: {
    endpoint: "GET /v1/blueprints/{blueprint_id}/experience-profile",
    limit: RATE_LIMITS.profile.limit,
    window_ms: RATE_LIMITS.profile.windowMs,
    description: "120 requests per client per rolling 60 seconds",
  },
  health: {
    endpoint: "GET /v1/health",
    limit: RATE_LIMITS.health.limit,
    window_ms: RATE_LIMITS.health.windowMs,
    description: "30 requests per anonymous/client id per rolling 60 seconds",
  },
} as const;

export const BLUEPRINT_EXPERIENCE_BASE_URLS = {
  development: "http://localhost:3000",
  /**
   * Approved Connected MVP staging surface until dedicated staging-api host is provisioned.
   * Staging traffic is isolated by API key + X-Client-Id, not by a separate hostname requirement.
   */
  staging_approved: "https://www.1320soulcode.com",
  production: "https://www.1320soulcode.com",
  dedicated_api_future: "https://api.1320soulcode.com",
  dedicated_staging_future: "https://staging-api.1320soulcode.com",
} as const;

export const BLUEPRINT_EXPERIENCE_STAGING_CLIENT_ID = "coze-lifestyle-staging-v1" as const;
export const BLUEPRINT_EXPERIENCE_PRODUCTION_CLIENT_ID = "coze-lifestyle-v1" as const;
