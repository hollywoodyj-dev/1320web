import type { SoulCodeResult } from "@/lib/calculate1320Code";
import type { CodeDisplay } from "@/lib/types/1320-content";

export function soulCodeToCodeDisplay(soul: SoulCodeResult): CodeDisplay {
  return {
    s1: soul.s1,
    s3Raw: soul.s3Raw,
    s2: soul.s2,
    s0: soul.s0,
    s1Code: soul.s1Code,
    s3Code: soul.s3Code,
    s3Title: soul.s3Title,
    s2Code: soul.s2Code,
    s0Code: soul.s0Code,
    codeString: soul.codeString,
    compactCode: soul.compactCode,
    s3: soul.s3,
    s4: soul.s4,
    s5: soul.s5,
    s6: soul.s6,
    s7: soul.s7,
    s8: soul.s8,
    s9: soul.s9,
    s4Code: soul.s4Code,
    s5Code: soul.s5Code,
    s6Code: soul.s6Code,
    s7Code: soul.s7Code,
    s8Code: soul.s8Code,
    s9Code: soul.s9Code,
    fullCodeString: soul.fullCodeString,
    fullCompactCode: soul.fullCompactCode,
  };
}
