import { createHmac, timingSafeEqual } from "node:crypto";
import { BlueprintExperienceApiError } from "@/lib/blueprint-experience-api/errors";

export type FoundationCodes = {
  s1Code: string;
  s3Code: string;
  s2Code: string;
  s0Code: string;
};

function signingSecret(): string {
  const key =
    process.env.BLUEPRINT_EXPERIENCE_ID_SECRET?.trim() ||
    process.env.BLUEPRINT_EXPERIENCE_API_KEY?.trim();
  if (!key) {
    throw new BlueprintExperienceApiError("BLUEPRINT_SERVICE_UNAVAILABLE");
  }
  return key;
}

function toBase64Url(value: string | Buffer): string {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string): string {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  return Buffer.from(padded + pad, "base64").toString("utf8");
}

function signPayload(payload: string): string {
  return createHmac("sha256", signingSecret()).update(payload).digest("base64url").slice(0, 16);
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

/** Opaque-ish public ID — encodes only public foundation codes, HMAC-signed. */
export function encodeBlueprintId(codes: FoundationCodes): string {
  const payload = `${codes.s1Code}|${codes.s3Code}|${codes.s2Code}|${codes.s0Code}`;
  return `bp_${toBase64Url(payload)}.${signPayload(payload)}`;
}

export function decodeBlueprintId(blueprintId: string): FoundationCodes {
  const trimmed = blueprintId.trim();
  if (!trimmed.startsWith("bp_") || trimmed.length < 12 || trimmed.length > 128) {
    throw new BlueprintExperienceApiError("BLUEPRINT_NOT_FOUND");
  }

  const body = trimmed.slice(3);
  const dot = body.lastIndexOf(".");
  if (dot <= 0) throw new BlueprintExperienceApiError("BLUEPRINT_NOT_FOUND");

  const payloadEncoded = body.slice(0, dot);
  const signature = body.slice(dot + 1);
  let payload: string;
  try {
    payload = fromBase64Url(payloadEncoded);
  } catch {
    throw new BlueprintExperienceApiError("BLUEPRINT_NOT_FOUND");
  }

  const expected = signPayload(payload);
  if (!safeEqual(signature, expected)) {
    throw new BlueprintExperienceApiError("BLUEPRINT_NOT_FOUND");
  }

  const parts = payload.split("|");
  if (parts.length !== 4) throw new BlueprintExperienceApiError("BLUEPRINT_NOT_FOUND");
  const [s1Code, s3Code, s2Code, s0Code] = parts;
  if (![s1Code, s3Code, s2Code, s0Code].every((part) => /^S[0-9]-\d{2}$/.test(part))) {
    throw new BlueprintExperienceApiError("BLUEPRINT_NOT_FOUND");
  }

  return { s1Code, s3Code, s2Code, s0Code };
}

export function publicSignature(codes: FoundationCodes): string {
  return `${codes.s1Code}/${codes.s3Code}/${codes.s2Code}/${codes.s0Code}`;
}
