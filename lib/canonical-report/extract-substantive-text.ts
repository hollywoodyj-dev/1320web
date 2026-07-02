/**
 * Extract substantive text from resolved page content for parity comparison.
 * Ignores decorative/layout-only fields per Wisewave parity rules.
 */

const SKIP_KEYS = new Set([
  "icon",
  "iconUrl",
  "imageUrl",
  "image",
  "alt",
  "altText",
  "iconAlt",
  "iconUrl",
  "pageIndex",
  "brandName",
  "brandSubtitle",
  "kicker",
  "tone",
  "fallbackIcon",
  "hero",
  "frameClass",
  "sizeClass",
  "imageClass",
  "moduleIcons",
  "footerLotusLogoUrl",
  "mantraLeft",
  "mantraCenter",
  "mantraRight",
]);

const URL_PATTERN = /^(https?:\/\/|\/|data:image)/i;

export function normalizeSubstantiveText(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .trim();
}

function isSubstantiveString(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length < 12) return false;
  if (URL_PATTERN.test(trimmed)) return false;
  if (/^S[0-9]-\d{2}$/.test(trimmed)) return false;
  if (/^\d{2}$/.test(trimmed)) return false;
  return true;
}

export function collectSubstantiveStrings(
  value: unknown,
  key?: string,
  out: Set<string> = new Set(),
): Set<string> {
  if (key && SKIP_KEYS.has(key)) return out;

  if (typeof value === "string") {
    if (isSubstantiveString(value)) {
      out.add(normalizeSubstantiveText(value));
    }
    return out;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectSubstantiveStrings(item, undefined, out);
    }
    return out;
  }

  if (value && typeof value === "object") {
    for (const [childKey, childValue] of Object.entries(value as Record<string, unknown>)) {
      collectSubstantiveStrings(childValue, childKey, out);
    }
  }

  return out;
}

export function mobileContainsDesktopInsight(
  desktopText: string,
  mobileTexts: Set<string>,
): boolean {
  const normalizedDesktop = normalizeSubstantiveText(desktopText);
  if (!normalizedDesktop) return true;

  if (mobileTexts.has(normalizedDesktop)) return true;

  for (const mobileText of mobileTexts) {
    if (
      mobileText.includes(normalizedDesktop) ||
      normalizedDesktop.includes(mobileText)
    ) {
      return true;
    }
  }

  return false;
}
