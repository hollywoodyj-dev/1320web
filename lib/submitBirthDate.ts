import { calculate1320Code } from "@/lib/calculate1320Code";
import { trackEvent } from "@/lib/analytics";
import {
  appendAttributionToHref,
  attributionToAnalyticsProps,
  loadFunnelAttribution,
} from "@/lib/funnel/attribution";
import { devLog } from "@/lib/dev-log";
import { birthPartsToNumbers, parseBirthDateInput } from "@/lib/parse-birth-date-input";
import { buildGeneratingHref, saveSession1320, toSessionPayload } from "@/lib/session1320";
import { getBirthDateValidationMessage } from "@/lib/validateBirthDate";

export type SubmitBirthDateResult =
  | { ok: true; href: string }
  | { ok: false; message: string };

export type SubmitBirthDateSource = "homepage" | "your-code" | "free-soul-blueprint";

export function submitBirthDate(
  yearRaw: string,
  monthRaw: string,
  dayRaw: string,
  options?: { source?: SubmitBirthDateSource },
): SubmitBirthDateResult {
  const source = options?.source ?? "your-code";
  const attrProps = attributionToAnalyticsProps(loadFunnelAttribution());

  if (source === "homepage") {
    trackEvent("homepage_generate_click");
  }
  if (source === "free-soul-blueprint") {
    trackEvent("free_blueprint_birthdate_submitted", attrProps);
  }
  trackEvent("calculator_submit", { source, ...attrProps });

  const parts = parseBirthDateInput(yearRaw, monthRaw, dayRaw);
  const { year, month, day } = birthPartsToNumbers(parts);

  devLog("submitBirthDate", { parts, year, month, day, source });

  const validationMessage = getBirthDateValidationMessage(year, month, day);
  if (validationMessage) {
    trackEvent("calculator_error", { reason: "validation", source });
    if (source === "free-soul-blueprint") {
      trackEvent("free_blueprint_generation_failed", { reason: "validation", ...attrProps });
    }
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
      source,
    });
    if (source === "free-soul-blueprint") {
      trackEvent("free_blueprint_generation_started", attrProps);
    }
    const href = appendAttributionToHref(buildGeneratingHref(year, month, day));
    return { ok: true, href };
  } catch {
    trackEvent("calculator_error", { reason: "system", source });
    if (source === "free-soul-blueprint") {
      trackEvent("free_blueprint_generation_failed", { reason: "system", ...attrProps });
    }
    return { ok: false, message: "Something went wrong. Please try again in a moment." };
  }
}
