import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { BlueprintExperienceApiError } from "@/lib/blueprint-experience-api/errors";

export function createRequestId(): string {
  return `req_${randomBytes(10).toString("hex")}`;
}

export function isBlueprintExperienceApiConfigured(): boolean {
  return Boolean(process.env.BLUEPRINT_EXPERIENCE_API_KEY?.trim());
}

function allowedClients(): Set<string> {
  const raw = process.env.BLUEPRINT_EXPERIENCE_ALLOWED_CLIENTS?.trim();
  if (!raw) return new Set(["coze-lifestyle-v1"]);
  return new Set(
    raw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  );
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

/** Authenticate Coze / server-to-server callers. Health is unauthenticated. */
export function assertBlueprintExperienceAuth(request: Request): { clientId: string } {
  const expected = process.env.BLUEPRINT_EXPERIENCE_API_KEY?.trim();
  if (!expected) {
    throw new BlueprintExperienceApiError("BLUEPRINT_SERVICE_UNAVAILABLE");
  }

  const auth = request.headers.get("authorization")?.trim() ?? "";
  const prefix = "Bearer ";
  if (!auth.startsWith(prefix) || !safeEqual(auth.slice(prefix.length), expected)) {
    throw new BlueprintExperienceApiError("UNAUTHORIZED");
  }

  const clientId = request.headers.get("x-client-id")?.trim() ?? "";
  if (!clientId || !allowedClients().has(clientId)) {
    throw new BlueprintExperienceApiError("FORBIDDEN_CLIENT");
  }

  return { clientId };
}

/** Hash for logs — never log the raw key or birth date. */
export function hashForLogs(value: string): string {
  return createHash("sha256").update(value).digest("hex").slice(0, 12);
}
