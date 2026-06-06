/** Steward contact and effective date for legal pages and footer. */

export const LEGAL_PLACEHOLDERS = {
  contactEmail: "info@1320soulcode.com",
  effectiveDate: "June 6, 2026",
  companyName: "1320 Soul Origin Code System",
} as const;

export function withPlaceholders(text: string): string {
  return text
    .replaceAll("[Insert Contact Email]", LEGAL_PLACEHOLDERS.contactEmail)
    .replaceAll("[Insert Date]", LEGAL_PLACEHOLDERS.effectiveDate);
}
