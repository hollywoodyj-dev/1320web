type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  reset: number;
};

export function checkRateLimit(input: {
  key: string;
  limit: number;
  windowMs: number;
}): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(input.key);
  if (!existing || existing.resetAt <= now) {
    const resetAt = now + input.windowMs;
    buckets.set(input.key, { count: 1, resetAt });
    return {
      allowed: true,
      limit: input.limit,
      remaining: input.limit - 1,
      reset: Math.ceil(resetAt / 1000),
    };
  }

  existing.count += 1;
  const remaining = Math.max(0, input.limit - existing.count);
  return {
    allowed: existing.count <= input.limit,
    limit: input.limit,
    remaining,
    reset: Math.ceil(existing.resetAt / 1000),
  };
}

export const RATE_LIMITS = {
  resolve: { limit: 30, windowMs: 60_000 },
  profile: { limit: 120, windowMs: 60_000 },
  health: { limit: 30, windowMs: 60_000 },
} as const;
