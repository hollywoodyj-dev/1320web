/** Feature flag: use v2 content databases and calculation chain (S0–S9). */
export function use1320V2Content(): boolean {
  const raw = process.env.USE_1320_V2_CONTENT?.trim().toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes";
}
