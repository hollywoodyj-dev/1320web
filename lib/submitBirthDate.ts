import { calculate1320Code } from "@/lib/calculate1320Code";
import { trackEvent } from "@/lib/analytics";
import { devLog } from "@/lib/dev-log";
import { birthPartsToNumbers, parseBirthDateInput } from "@/lib/parse-birth-date-input";
import { buildGeneratingHref, saveSession1320, toSessionPayload } from "@/lib/session1320";
import { getBirthDateValidationMessage } from "@/lib/validateBirthDate";

export type SubmitBirthDateResult =
  | { ok: true; href: string }
  | { ok: false; message: string };

export function submitBirthDate(
  yearRaw: string,
  monthRaw: string,
  dayRaw: string,
  options?: { source?: "homepage" | "your-code" },
): SubmitBirthDateResult {
  if (options?.source === "homepage") {
    trackEvent("homepage_generate_click");
  }
  trackEvent("calculator_submit", { source: options?.source ?? "your-code" });

  const parts = parseBirthDateInput(yearRaw, monthRaw, dayRaw);
  const { year, month, day } = birthPartsToNumbers(parts);

  devLog("submitBirthDate", { parts, year, month, day, source: options?.source });

  const validationMessage = getBirthDateValidationMessage(year, month, day);
  if (validationMessage) {
    trackEvent("calculator_error", { reason: "validation" });
    return { ok: false, message: validationMessage };
  }

  try {
    const code = calculate1320Code(year, month, day);
    saveSession1320(toSessionPayload(code));
    trackEvent("calculator_success", {
      s1: code.s1,
      s3: code.s3Raw,
      s2: code.s2,
      s0: code.s0,
    });
    return { ok: true, href: buildGeneratingHref(year, month, day) };
  } catch {
    trackEvent("calculator_error", { reason: "system" });
    return { ok: false, message: "Something went wrong. Please try again in a moment." };
  }
}
