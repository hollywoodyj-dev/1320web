import type { Metadata } from "next";

/** Self-referencing canonical (resolved via root metadataBase). */
export function pageCanonical(path: string): Pick<Metadata, "alternates"> {
  return { alternates: { canonical: path } };
}

export function withPageCanonical(path: string, metadata: Metadata): Metadata {
  return { ...metadata, ...pageCanonical(path) };
}
