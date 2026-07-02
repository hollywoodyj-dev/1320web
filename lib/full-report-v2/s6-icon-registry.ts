import { getAdvancedModuleCardImageUrlFromCode } from "@/lib/advanced-module-card-asset";

/**
 * Official S6 primary icon assets — card pack under `public/S6-44/`.
 * Fallback symbol ◇ only when both URL and SVG are missing.
 */
export type S6PrimaryIconAsset = {
  primary_icon_url?: string;
  primary_icon_svg?: string;
  primary_icon_alt: string;
};

export function resolveS6PrimaryIconAsset(code: string, title?: string): S6PrimaryIconAsset {
  const primary_icon_url = getAdvancedModuleCardImageUrlFromCode(code) ?? undefined;
  return {
    primary_icon_url,
    primary_icon_svg: undefined,
    primary_icon_alt: `${code} ${title ?? ""} primary icon`.trim(),
  };
}
