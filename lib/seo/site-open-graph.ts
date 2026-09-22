import type { Metadata } from "next";
import { CANONICAL_SITE_URL } from "@/lib/platform-config";

/** Page-specific OG assets — `/seo/{slug}-1320.webp` @ 1200×630. Replace file when Holly ships final art. */
export const OG_IMAGE_PATHS = {
  home: "/seo/home-1320.webp",
  freeSoulBlueprint: "/seo/free-soul-blueprint-1320.webp",
  isNumerologyScientificallyProven: "/seo/is-numerology-scientifically-proven-1320.webp",
} as const;

/** C-4 safe: descriptive, no identity assertion (match life-path guide alt style). */
export const OG_IMAGE_ALTS = {
  home: "1320 Soul Code — enter a birth date to explore a symbolic four-part Soul Blueprint",
  freeSoulBlueprint:
    "Birth date entry leading to four foundation mirrors in a symbolic Soul Blueprint",
  isNumerologyScientificallyProven:
    "Diagram of five claim layers — calculation, tradition, resonance, evidence, and authority",
} as const;

export function absoluteOgImageUrl(imagePath: string): string {
  return `${CANONICAL_SITE_URL.replace(/\/$/, "")}${imagePath}`;
}

export function buildOgImageEntries(imagePath: string, alt: string) {
  const url = absoluteOgImageUrl(imagePath);
  return [
    {
      url,
      width: 1200,
      height: 630,
      alt,
    },
  ];
}

export function buildTwitterLargeImage(
  title: string,
  description: string,
  imagePath: string,
): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [absoluteOgImageUrl(imagePath)],
  };
}

export function buildPageOpenGraph(input: {
  title: string;
  description: string;
  url: string;
  type: "website" | "article";
  imagePath: string;
  imageAlt: string;
}): NonNullable<Metadata["openGraph"]> {
  return {
    title: input.title,
    description: input.description,
    type: input.type,
    url: input.url,
    images: buildOgImageEntries(input.imagePath, input.imageAlt),
  };
}
