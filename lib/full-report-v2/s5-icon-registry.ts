import { getAdvancedModuleCardImageUrlFromCode } from "@/lib/advanced-module-card-asset";

/**
 * Official S5 primary icon assets — card pack under `public/S5-44/`.
 * Do not substitute generated or generic symbols when URL is available.
 */
export type S5PrimaryIconAsset = {
  primary_icon_url?: string;
  primary_icon_svg?: string;
  primary_icon_alt: string;
};

export function resolveS5PrimaryIconAsset(code: string, title?: string): S5PrimaryIconAsset {
  const primary_icon_url = getAdvancedModuleCardImageUrlFromCode(code) ?? undefined;
  return {
    primary_icon_url,
    primary_icon_svg: undefined,
    primary_icon_alt: `${code} ${title ?? ""} primary icon`.trim(),
  };
}
