import type { LocalizedText } from "@/lib/types/1320-content";

export type S5SeedRecord = Record<string, unknown>;

export type S5SeedBundle = {
  s1: S5SeedRecord;
  s2: S5SeedRecord;
  s3: S5SeedRecord;
  s0: S5SeedRecord;
};

export type SoulMissionSection = {
  /** Template slot e.g. S5-1, S5-2 */
  id: string;
  label: LocalizedText;
  body: LocalizedText;
};

/** Deterministic S5 output — assembled from approved seeds, not AI-generated. */
export type AssembledSoulMission = {
  /** Same as combination signature: S1-24|S3-04|S2-23|S0-09 */
  signature: string;
  seedVersion: string;
  sections: SoulMissionSection[];
  integratedSummary: LocalizedText;
};

export type S5SeedDatabaseFile = {
  _meta?: {
    version?: string;
    databaseName?: string;
    rule?: string;
  };
  S5_PrimaryMissionSeeds_From_S1: Record<string, S5SeedRecord>;
  S5_MirrorTaskSeeds_From_S2: Record<string, S5SeedRecord>;
  S5_VibrationCarrierSeeds_From_S3: Record<string, S5SeedRecord>;
  S5_VoidChallengeSeeds_From_S0: Record<string, S5SeedRecord>;
};
