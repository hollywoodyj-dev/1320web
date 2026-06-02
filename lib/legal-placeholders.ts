/** Steward placeholders — replace when final legal details are confirmed. */

export const LEGAL_PLACEHOLDERS = {
  contactEmail: "[Insert Contact Email]",
  effectiveDate: "[Insert Date]",
  companyName: "1320 Soul Origin Code System",
} as const;

export function withPlaceholders(text: string): string {
  return text
    .replaceAll("[Insert Contact Email]", LEGAL_PLACEHOLDERS.contactEmail)
    .replaceAll("[Insert Date]", LEGAL_PLACEHOLDERS.effectiveDate);
}
