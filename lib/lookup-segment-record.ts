import { segmentCodeKey, type SegmentCodePrefix } from "@/lib/segment-code";
import type { V1Record } from "@/lib/types/1320-content";

const RESERVED = new Set(["_meta", "default", "tiers"]);

/**
 * Lookup segment JSON by stable code key (e.g. `S0-07`).
 * Falls back to legacy numeric string keys (`"7"`) during migration.
 */
export function lookupSegmentRecord(
  data: Record<string, unknown>,
  prefix: SegmentCodePrefix,
  value: number,
): V1Record | null {
  const codeKey = segmentCodeKey(prefix, value);
  const fromCode = lookupRecord(data, codeKey);
  if (fromCode) return fromCode;

  return lookupRecord(data, String(value));
}

export function lookupRecord(data: Record<string, unknown>, key: string): V1Record | null {
  if (RESERVED.has(key)) return null;
  const value = data[key];
  if (!value || typeof value !== "object") return null;
  return value as V1Record;
}

export function lookupDefault(data: Record<string, unknown>): V1Record | null {
  return lookupRecord(data, "default");
}
