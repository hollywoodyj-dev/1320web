import { getAdvancedModuleCardImageUrlFromCode } from "@/lib/advanced-module-card-asset";

/**
 * Official S8 primary icon assets — card pack under `public/S8-08/`.
 * Fallback symbol ✺ when both URL and SVG are missing.
 */
export type S8PrimaryIconAsset = {
  primary_icon_url?: string;
  primary_icon_svg?: string;
  primary_icon_alt: string;
};

export function resolveS8PrimaryIconAsset(code: string, title?: string): S8PrimaryIconAsset {
  const primary_icon_url = getAdvancedModuleCardImageUrlFromCode(code) ?? undefined;
  return {
    primary_icon_url,
    primary_icon_svg: undefined,
    primary_icon_alt: `${code} ${title ?? ""} primary icon`.trim(),
  };
}
