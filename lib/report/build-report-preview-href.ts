/** Build preview URLs for full-report-v2 / mobile-report-v2 from YYYY-MM-DD. */

export function parseBirthDateLabel(label: string): { year: number; month: number; day: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(label.trim());
  if (!match) return null;

  const year = Number.parseInt(match[1], 10);
  const month = Number.parseInt(match[2], 10);
  const day = Number.parseInt(match[3], 10);
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return null;

  return { year, month, day };
}

export function buildReportPreviewSearchParams(label: string): string {
  const parts = parseBirthDateLabel(label);
  if (!parts) return "";
  return `year=${parts.year}&month=${parts.month}&day=${parts.day}`;
}

export function buildFullReportV2PreviewHref(birthDateLabel: string): string {
  const query = buildReportPreviewSearchParams(birthDateLabel);
  return query ? `/full-report-v2?${query}` : "/full-report-v2";
}

export function buildMobileReportV2PreviewHref(birthDateLabel: string): string {
  const query = buildReportPreviewSearchParams(birthDateLabel);
  return query ? `/mobile-report-v2?${query}` : "/mobile-report-v2";
}
