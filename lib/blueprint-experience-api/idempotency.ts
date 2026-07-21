import { createHash } from "node:crypto";

type IdempotencyRecord = {
  bodyHash: string;
  status: number;
  responseJson: string;
  expiresAt: number;
};

const store = new Map<string, IdempotencyRecord>();
const TTL_MS = 24 * 60 * 60 * 1000;

function prune(now: number) {
  for (const [key, value] of store) {
    if (value.expiresAt <= now) store.delete(key);
  }
}

export function hashRequestBody(body: unknown): string {
  return createHash("sha256").update(JSON.stringify(body)).digest("hex");
}

export function getIdempotentResponse(key: string, bodyHash: string): IdempotencyRecord | "conflict" | null {
  const now = Date.now();
  prune(now);
  const existing = store.get(key);
  if (!existing) return null;
  if (existing.expiresAt <= now) {
    store.delete(key);
    return null;
  }
  if (existing.bodyHash !== bodyHash) return "conflict";
  return existing;
}

export function saveIdempotentResponse(input: {
  key: string;
  bodyHash: string;
  status: number;
  responseJson: string;
}) {
  store.set(input.key, {
    bodyHash: input.bodyHash,
    status: input.status,
    responseJson: input.responseJson,
    expiresAt: Date.now() + TTL_MS,
  });
}
