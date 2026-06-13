import type { CodeDisplay, ReportProductTier } from "@/lib/types/1320-content";

export function formatBirthDateLabel(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatCodeStrip(codes: CodeDisplay): string {
  return `${codes.s1Code} · ${codes.s3Code} · ${codes.s2Code} · ${codes.s0Code}`;
}

/** Full-report dashboard seal — awareness chain plus S4–S7 (S8/S9 when Advanced). */
export function formatFullReportCodeStrip(
  codes: CodeDisplay,
  tier: ReportProductTier = "full",
): string {
  const parts = [codes.s1Code, codes.s3Code, codes.s2Code, codes.s0Code];
  if (codes.s4Code) parts.push(codes.s4Code);
  if (codes.s5Code) parts.push(codes.s5Code);
  if (codes.s6Code) parts.push(codes.s6Code);
  if (codes.s7Code) parts.push(codes.s7Code);
  if (tier === "advanced" && codes.s8Code && codes.s9Code) {
    parts.push(codes.s8Code, codes.s9Code);
  }
  return parts.join(" · ");
}

/** S3 code is never the raw month×day value. */
export function formatS3Headline(codes: CodeDisplay): string {
  return `${codes.s3Code} · ${codes.s3Title}`;
}

export function formatSegmentHeadline(code: string, title: string): string {
  return `${code} · ${title}`;
}

export function formatS3RawLine(codes: CodeDisplay): string {
  return `Raw Value: ${codes.s3Raw}`;
}
