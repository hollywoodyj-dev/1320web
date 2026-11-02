import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

/** Fixture mapping whose file bytes match the published sha256. Not a full registry. */
const VERIFIED_TOTEMS = {
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

export function verifiedTotemForCode(code: string): VerifiedTotem | null {
  const entry = VERIFIED_TOTEMS[code as keyof typeof VERIFIED_TOTEMS];
  if (!entry) return null;
  try {
    const bytes = readFileSync(path.join(process.cwd(), entry.file));
    const hash = createHash("sha256").update(bytes).digest("hex");
    if (hash !== entry.sha256) return null;
    return { totemId: code, totemAssetUrl: entry.url };
  } catch {
    return null;
  }
}
