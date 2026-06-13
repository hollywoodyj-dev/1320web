/** Stable segment code strings — always use these for JSON lookup keys. */

export function formatS0Code(value: number): string {
  return `S0-${String(value).padStart(2, "0")}`;
}

export function formatS1Code(value: number): string {
  return `S1-${String(value).padStart(2, "0")}`;
}

export function formatS2Code(value: number): string {
  return `S2-${String(value).padStart(2, "0")}`;
}

export function formatS3TierCode(tier: number): string {
  return `S3-${String(tier).padStart(2, "0")}`;
}

export function formatS4Code(value: number): string {
  return `S4-${String(value).padStart(2, "0")}`;
}

export function formatS5Code(value: number): string {
  return `S5-${String(value).padStart(2, "0")}`;
}

export function formatS6Code(value: number): string {
  return `S6-${String(value).padStart(2, "0")}`;
}

export function formatS7Code(value: number): string {
  return `S7-${String(value).padStart(2, "0")}`;
}

export function formatS8Code(value: number): string {
  return `S8-${String(value).padStart(2, "0")}`;
}

export function formatS9Code(value: number): string {
  return `S9-${String(value).padStart(2, "0")}`;
}

export type SegmentCodePrefix = "S0" | "S1" | "S2";

export function segmentCodeKey(prefix: SegmentCodePrefix, value: number): string {
  switch (prefix) {
    case "S0":
      return formatS0Code(value);
    case "S1":
      return formatS1Code(value);
    case "S2":
      return formatS2Code(value);
  }
}
