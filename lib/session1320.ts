import { saveBirthCookie } from "@/lib/birth-cookie";
import type { SoulCodeResult } from "@/lib/calculate1320Code";

export const SESSION_KEY = "1320-birth";

export type Session1320Birth = {
  year: number;
  month: number;
  day: number;
  s1: number;
  s3Raw: number;
  s2: number;
  s0: number;
  codeString: string;
  compactCode: string;
};

export function toSessionPayload(code: SoulCodeResult): Session1320Birth {
  return {
    year: code.year,
    month: code.month,
    day: code.day,
    s1: code.s1,
    s3Raw: code.s3Raw,
    s2: code.s2,
    s0: code.s0,
    codeString: code.codeString,
    compactCode: code.compactCode,
  };
}

export function saveSession1320(payload: Session1320Birth): void {
  if (typeof window === "undefined") return;
  saveBirthCookie(payload.year, payload.month, payload.day);
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(payload));
  } catch {
    // Storage unavailable — cookie + query params still carry the funnel.
  }
}

export function loadSession1320(): Session1320Birth | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session1320Birth;
  } catch {
    return null;
  }
}

export function buildResultHref(year: number, month: number, day: number): string {
  return `/result?year=${year}&month=${month}&day=${day}`;
}

export function buildGeneratingHref(year: number, month: number, day: number): string {
  return `/generating?year=${year}&month=${month}&day=${day}`;
}
