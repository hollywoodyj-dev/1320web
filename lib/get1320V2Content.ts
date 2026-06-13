import { calculate1320Code } from "@/lib/calculate1320Code";
import { adaptV2Segment } from "@/lib/1320-v2/adapt-v2-segment";
import { lookupV2Entry } from "@/lib/1320-v2/v2-index";
import type { Get1320V2ContentResult, V2ModuleId } from "@/lib/types/1320-v2-content";
import type { Locale } from "@/lib/types/1320-content";

type Get1320V2ContentInput = {
  year: number;
  month: number;
  day: number;
  locale?: Locale;
};

const MODULE_CODES: Array<{ module: V2ModuleId; codeKey: keyof ReturnType<typeof calculate1320Code> }> = [
  { module: "S0", codeKey: "s0Code" },
  { module: "S1", codeKey: "s1Code" },
  { module: "S2", codeKey: "s2Code" },
  { module: "S3", codeKey: "s3Code" },
  { module: "S4", codeKey: "s4Code" },
  { module: "S5", codeKey: "s5Code" },
  { module: "S6", codeKey: "s6Code" },
  { module: "S7", codeKey: "s7Code" },
  { module: "S8", codeKey: "s8Code" },
  { module: "S9", codeKey: "s9Code" },
];

export function get1320V2Content(input: Get1320V2ContentInput): Get1320V2ContentResult {
  const locale = input.locale ?? "en";
  const codes = calculate1320Code(input.year, input.month, input.day);
  const missingCodes: string[] = [];

  const resolve = (module: V2ModuleId, code: string, s3Raw?: number) => {
    const entry = lookupV2Entry(module, code);
    if (!entry) missingCodes.push(code);
    return adaptV2Segment(module, code, entry, s3Raw);
  };

  return {
    locale,
    codes,
    s0Content: resolve("S0", codes.s0Code),
    s1Content: resolve("S1", codes.s1Code),
    s2Content: resolve("S2", codes.s2Code),
    s3Content: resolve("S3", codes.s3Code, codes.s3Raw),
    s4Content: resolve("S4", codes.s4Code),
    s5Content: resolve("S5", codes.s5Code),
    s6Content: resolve("S6", codes.s6Code),
    s7Content: resolve("S7", codes.s7Code),
    s8Content: resolve("S8", codes.s8Code),
    s9Content: resolve("S9", codes.s9Code),
    missingCodes,
  };
}

export function get1320V2ContentFromBirthDate(
  birthDate: string,
  locale?: Locale,
): Get1320V2ContentResult {
  const match = birthDate.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!match) throw new Error(`Invalid birth date: ${birthDate}`);
  return get1320V2Content({
    year: Number.parseInt(match[1], 10),
    month: Number.parseInt(match[2], 10),
    day: Number.parseInt(match[3], 10),
    locale,
  });
}
