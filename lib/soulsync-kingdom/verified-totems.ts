/**
 * Official Soul Code card images already published with the live report.
 * SoulSync is the same 1320 project, so Preview may point at these paths.
 * A code outside the published pack, or a code whose file is missing, gets
 * no totem fields. Do not read image bytes here.
 */
const PACKS = {
  S1: { min: 1, max: 44, url: (n: number) => `/S1-44/S${pad(n)}.webp` },
  S3: { min: 1, max: 12, url: (n: number) => `/S3-12/S${pad(n)}.webp` },
  S2: { min: 1, max: 50, url: (n: number) => `/S2-50/S2-${pad(n)}.webp` },
  S0: { min: 0, max: 19, url: (n: number) => `/S0-19/S0-${pad(n)}.webp` },
  S4: { min: 0, max: 19, url: (n: number) => `/S4-20/S4-${pad(n)}.webp` },
} as const;

/** public/S2-50 has no S2-45.webp. The other packs are complete. */
const MISSING_FILES = new Set(["S2-45"]);

const HASH_CHECKED = {
  "S1-18": {
    url: "/S1-44/S18.webp",
    file: "public/S1-44/S18.webp",
    sha256: "43a3cd59118c227fab52933fc8428bdfcc85034e91fa4e8d5f5899a8c0dc612d",
  },
  "S3-03": {
    url: "/S3-12/S03.webp",
    file: "public/S3-12/S03.webp",
    sha256: "fbea8fb1abd7b35b758a82bb63427bdee06b14c2a263834ecde25c713456a16f",
  },
  "S2-27": {
    url: "/S2-50/S2-27.webp",
    file: "public/S2-50/S2-27.webp",
    sha256: "b16a15f5d65b318ca25ff95174a9ebf9142f010dc52d6cabfc50e1210db68fe2",
  },
  "S0-07": {
    url: "/S0-19/S0-07.webp",
    file: "public/S0-19/S0-07.webp",
    sha256: "080f29c049a3a2f2f2a6796a16f4ccdd42e79c1004c077225c9eaeb18496b9eb",
  },
} as const;

export type VerifiedTotem = {
  totemId: string;
  totemAssetUrl: string;
};

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

export function verifiedTotemForCode(code: string): VerifiedTotem | null {
  const match = /^(S[0-4])-(\d{2})$/.exec(code);
  if (!match) return null;
  const prefix = match[1] as keyof typeof PACKS;
  const pack = PACKS[prefix];
  const number = Number(match[2]);
  if (!pack || number < pack.min || number > pack.max) return null;
  if (MISSING_FILES.has(code)) return null;
  const totem = { totemId: code, totemAssetUrl: pack.url(number) };
  const checked = HASH_CHECKED[code as keyof typeof HASH_CHECKED];
  if (checked && checked.url !== totem.totemAssetUrl) return null;
  return totem;
}

export function verifiedTotemRegistry(): ReadonlyArray<{
  code: string;
  file: string;
  sha256: string;
  url: string;
}> {
  return Object.entries(HASH_CHECKED).map(([code, entry]) => ({ code, ...entry }));
}
