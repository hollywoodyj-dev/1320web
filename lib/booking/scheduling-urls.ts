import {
  resolveSessionVariant,
  type PersonalIntegrationSessionVariant,
} from "@/lib/personal-integration/session-catalog";

const VARIANT_ENV_KEYS: Record<PersonalIntegrationSessionVariant, string> = {
  blueprint_integration: "BOOKING_SCHEDULE_URL_BLUEPRINT_INTEGRATION",
  focused_life_integration: "BOOKING_SCHEDULE_URL_FOCUSED_LIFE",
  deep_blueprint_integration: "BOOKING_SCHEDULE_URL_DEEP_BLUEPRINT",
};

const LEGACY_ENV_KEYS: Partial<Record<PersonalIntegrationSessionVariant, string[]>> = {
  blueprint_integration: ["BOOKING_SCHEDULE_URL_INTRO"],
  focused_life_integration: ["BOOKING_SCHEDULE_URL_INTEGRATION", "BOOKING_SCHEDULE_URL_DEFAULT"],
  deep_blueprint_integration: ["BOOKING_SCHEDULE_URL_DEEP"],
};

function trimUrl(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

/** Calendar or scheduling link shown after booking payment (Cal.com, Calendly, etc.). */
export function getBookingScheduleUrl(
  variant: string | PersonalIntegrationSessionVariant,
): string | null {
  const resolved = resolveSessionVariant(variant) ?? "focused_life_integration";
  const keys = [VARIANT_ENV_KEYS[resolved], ...(LEGACY_ENV_KEYS[resolved] ?? [])];
  for (const key of keys) {
    const url = trimUrl(process.env[key]);
    if (url) return url;
  }
  return trimUrl(process.env.BOOKING_SCHEDULE_URL);
}

export function shouldEmbedScheduleUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    if (host.includes("cal.com") || host.includes("calendly.com")) return true;
    return parsed.searchParams.get("embed") === "true";
  } catch {
    return false;
  }
}

/** Normalize external scheduling URLs for inline embed when supported. */
export function toScheduleEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    if (host.includes("cal.com") && parsed.searchParams.get("embed") !== "true") {
      parsed.searchParams.set("embed", "true");
      return parsed.toString();
    }
    if (host.includes("calendly.com") && !parsed.pathname.includes("/embed")) {
      parsed.pathname = parsed.pathname.replace(/\/?$/, "/embed");
      return parsed.toString();
    }
    return url;
  } catch {
    return url;
  }
}
