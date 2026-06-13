import type { CodeDisplay } from "@/lib/types/1320-content";

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
