import s5SeedDatabase from "@/data/1320/s5-seed-database.json";
import type { S5SeedBundle, S5SeedDatabaseFile, S5SeedRecord } from "@/lib/types/s5-soul-mission";

const database = s5SeedDatabase as S5SeedDatabaseFile;

export const S5_SEED_VERSION =
  database._meta?.version ?? "s5-seeds-bilingual-v1.0";

export class MissingS5SeedError extends Error {
  readonly seedKey: string;

  constructor(seedKey: string) {
    super(`Missing approved S5 seed: ${seedKey}`);
    this.name = "MissingS5SeedError";
    this.seedKey = seedKey;
  }
}

function lookupSeed(
  map: Record<string, S5SeedRecord>,
  code: string,
): S5SeedRecord | null {
  const record = map[code];
  if (!record || typeof record !== "object") return null;
  return record;
}

export function loadS5SeedBundle(codes: {
  s1Code: string;
  s2Code: string;
  s3Code: string;
  s0Code: string;
}): S5SeedBundle {
  const missing: string[] = [];

  const s1 = lookupSeed(database.S5_PrimaryMissionSeeds_From_S1, codes.s1Code);
  if (!s1) missing.push(codes.s1Code);

  const s2 = lookupSeed(database.S5_MirrorTaskSeeds_From_S2, codes.s2Code);
  if (!s2) missing.push(codes.s2Code);

  const s3 = lookupSeed(database.S5_VibrationCarrierSeeds_From_S3, codes.s3Code);
  if (!s3) missing.push(codes.s3Code);

  const s0 = lookupSeed(database.S5_VoidChallengeSeeds_From_S0, codes.s0Code);
  if (!s0) missing.push(codes.s0Code);

  if (missing.length > 0) {
    const key = missing.join(", ");
    if (process.env.NODE_ENV === "development") {
      throw new MissingS5SeedError(key);
    }
    throw new MissingS5SeedError(key);
  }

  return { s1: s1!, s2: s2!, s3: s3!, s0: s0! };
}

export function strSeed(record: S5SeedRecord, key: string): string {
  const value = record[key];
  return typeof value === "string" ? value.trim() : "";
}

export function strArraySeed(record: S5SeedRecord, key: string): string[] {
  const value = record[key];
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}
