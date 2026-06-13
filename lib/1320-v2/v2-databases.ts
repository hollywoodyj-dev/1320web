import s0Data from "@/data/1320-v2/s0-void-gate.json";
import s1Data from "@/data/1320-v2/s1-soul-origin.json";
import s2Data from "@/data/1320-v2/s2-soul-mirror.json";
import s3Data from "@/data/1320-v2/s3-soul-vibration.json";
import s4Data from "@/data/1320-v2/s4-core-shadow.json";
import s5Data from "@/data/1320-v2/s5-soul-mission.json";
import s6Data from "@/data/1320-v2/s6-value-receiving.json";
import s7Data from "@/data/1320-v2/s7-soul-sovereignty.json";
import s8Data from "@/data/1320-v2/s8-soul-contribution.json";
import s9Data from "@/data/1320-v2/s9-return-to-source.json";
import type { V2ModuleId } from "@/lib/types/1320-v2-content";

export type V2DatabaseFile = Record<string, unknown>;

export const V2_DATABASE_FILES: Record<V2ModuleId, V2DatabaseFile> = {
  S0: s0Data as V2DatabaseFile,
  S1: s1Data as V2DatabaseFile,
  S2: s2Data as V2DatabaseFile,
  S3: s3Data as V2DatabaseFile,
  S4: s4Data as V2DatabaseFile,
  S5: s5Data as V2DatabaseFile,
  S6: s6Data as V2DatabaseFile,
  S7: s7Data as V2DatabaseFile,
  S8: s8Data as V2DatabaseFile,
  S9: s9Data as V2DatabaseFile,
};
