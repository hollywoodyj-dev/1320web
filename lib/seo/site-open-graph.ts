import type { Metadata } from "next";
import { CANONICAL_SITE_URL } from "@/lib/platform-config";

/** Default 1200×630 share image (link previews · until page-specific art exists). */
export const DEFAULT_OG_IMAGE_PATH = "/seo/what-is-a-soul-blueprint-1320.webp";

export const DEFAULT_OG_IMAGE_ALT =
  "1320 Soul Code — symbolic Soul Blueprint reflection from birth date";

export function absoluteOgImageUrl(imagePath: string = DEFAULT_OG_IMAGE_PATH): string {
  return `${CANONICAL_SITE_URL.replace(/\/$/, "")}${imagePath}`;
}

export function buildOgImageEntries(imagePath: string = DEFAULT_OG_IMAGE_PATH, alt?: string) {
  const url = absoluteOgImageUrl(imagePath);
  return [
    {
      url,
      width: 1200,
      height: 630,
      alt: alt ?? DEFAULT_OG_IMAGE_ALT,
    },
  ];
}

export function buildTwitterLargeImage(
  title: string,
  description: string,
  imagePath: string = DEFAULT_OG_IMAGE_PATH,
): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [absoluteOgImageUrl(imagePath)],
  };
}
