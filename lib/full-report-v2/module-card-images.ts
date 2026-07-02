import {
  getAdvancedModuleCardImageUrlFromCode,
  type AdvancedModuleId,
} from "@/lib/advanced-module-card-asset";
import type { FullReportV2Calculation } from "@/lib/full-report-v2/types";

function codeForModule(
  moduleId: AdvancedModuleId,
  calculation: FullReportV2Calculation,
): string | undefined {
  switch (moduleId) {
    case "s4":
      return calculation.s4_code;
    case "s5":
      return calculation.s5_code;
    case "s6":
      return calculation.s6_code;
    case "s7":
      return calculation.s7_code;
    case "s8":
      return calculation.s8_code;
    case "s9":
      return calculation.s9_code;
    default:
      return undefined;
  }
}

/** Archetype card art for advanced module pages (S4–S9). */
export function getModuleCardImageUrl(
  moduleId: AdvancedModuleId,
  calculation: FullReportV2Calculation,
): string | undefined {
  const code = codeForModule(moduleId, calculation);
  if (!code) return undefined;
  return getAdvancedModuleCardImageUrlFromCode(code);
}
