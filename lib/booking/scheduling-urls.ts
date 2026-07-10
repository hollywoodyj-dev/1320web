import type { PersonalIntegrationSessionVariant } from "@/lib/personal-integration/types";

const VARIANT_ENV_KEYS: Record<PersonalIntegrationSessionVariant, string> = {
  intro: "BOOKING_SCHEDULE_URL_INTRO",
  deep: "BOOKING_SCHEDULE_URL_DEEP",
  integration: "BOOKING_SCHEDULE_URL_INTEGRATION",
  "not-sure": "BOOKING_SCHEDULE_URL_DEFAULT",
};

function trimUrl(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

/** Calendar or scheduling link shown after booking payment (Cal.com, Calendly, etc.). */
export function getBookingScheduleUrl(variant: PersonalIntegrationSessionVariant): string | null {
  const variantUrl = trimUrl(process.env[VARIANT_ENV_KEYS[variant]]);
  if (variantUrl) return variantUrl;
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
