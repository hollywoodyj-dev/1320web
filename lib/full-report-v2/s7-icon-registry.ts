import { getAdvancedModuleCardImageUrlFromCode } from "@/lib/advanced-module-card-asset";

/**
 * Official S7 primary icon assets — card pack under `public/S7-07/`.
 * Fallback symbol ♛ only when both URL and SVG are missing.
 */
export type S7PrimaryIconAsset = {
  primary_icon_url?: string;
  primary_icon_svg?: string;
  primary_icon_alt: string;
};

export function resolveS7PrimaryIconAsset(code: string, title?: string): S7PrimaryIconAsset {
  const primary_icon_url = getAdvancedModuleCardImageUrlFromCode(code) ?? undefined;
  return {
    primary_icon_url,
    primary_icon_svg: undefined,
    primary_icon_alt: `${code} ${title ?? ""} primary icon`.trim(),
  };
}
