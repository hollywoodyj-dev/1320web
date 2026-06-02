import type { Locale, LocalizedText } from "@/lib/types/1320-content";

/** Build LocalizedText without copying zh into en. */
export function fromV1Fields(en?: string | null, zh?: string | null): LocalizedText {
  const enText = en?.trim() ?? "";
  const zhText = zh?.trim() ?? "";
  if (enText && zhText) return { en: enText, zh: zhText };
  if (enText) return { en: enText };
  if (zhText) return { en: "", zh: zhText };
  return { en: "" };
}

/** English-first UI: en locale never falls back to zh. */
export function pickLocalized(text: LocalizedText | undefined, locale: Locale, fallback = ""): string {
  if (!text) return fallback;
  if (locale === "zh") return text.zh?.trim() || text.en.trim() || fallback;
  return text.en.trim() || fallback;
}

export function ensureLocalized(text: LocalizedText | undefined, fallback: LocalizedText): LocalizedText {
  if (!text || (!text.en.trim() && !text.zh?.trim())) return fallback;
  return text;
}

/** Prefer explicit en; if only zh exists, en comes from fallback (not zh). */
export function localizedFromStrings(
  en: string | undefined,
  zh: string | undefined,
  fallback: LocalizedText,
): LocalizedText {
  const enText = en?.trim() ?? "";
  const zhText = zh?.trim() ?? "";
  if (enText && zhText) return { en: enText, zh: zhText };
  if (enText) return zhText ? { en: enText, zh: zhText } : { en: enText };
  if (zhText) return { en: fallback.en, zh: zhText };
  return fallback;
}

export function containsCjk(text: string): boolean {
  return /[\u3400-\u9fff]/.test(text);
}
