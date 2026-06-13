/** Desktop art pack (16:9 @ 1672×941, except how-to-read 4:3). */
export const FULL_REPORT_BG_DESKTOP = "/full-report/backgrounds";

/** Mobile art pack — drop files here when supplied (same filenames). */
export const FULL_REPORT_BG_MOBILE = "/full-report/backgrounds-mobile";

export type ReportBackgroundVariant = "desktop" | "mobile";

export function fullReportBackgroundSrc(
  filename: string,
  variant: ReportBackgroundVariant = "desktop",
): string {
  const base = variant === "mobile" ? FULL_REPORT_BG_MOBILE : FULL_REPORT_BG_DESKTOP;
  return `${base}/${filename}`;
}