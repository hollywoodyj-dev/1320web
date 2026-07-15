/** Unified report PDF — portrait page box (must match report-tokens.css). */
export const REPORT_PDF_PAGE_WIDTH_PX = 900;
export const REPORT_PDF_PAGE_HEIGHT_PX = 1600;

export function reportPdfPageWidthCss(): string {
  return `${REPORT_PDF_PAGE_WIDTH_PX}px`;
}

export function reportPdfPageHeightCss(): string {
  return `${REPORT_PDF_PAGE_HEIGHT_PX}px`;
}
