/**
 * FS-006 smoke — Personal Integration wiring (no live DB required).
 */
import fs from "node:fs";
import path from "node:path";
import {
  isPersonalIntegrationSessionVariant,
  SESSION_VARIANT_LABELS,
} from "@/lib/personal-integration/session-variants";
import { isPlatformSessionStatus } from "@/lib/personal-integration/facilitator-sessions";
import { parseBirthDateString } from "@/lib/personal-integration/parse-birth-date";

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(message);
}

const root = process.cwd();
const required = [
  "docs/specs/personal-integration/FS006_PERSONAL_INTEGRATION_SESSION_v1.md",
  "docs/specs/personal-integration/FS006_1_PERSONAL_INTEGRATION_FOLLOWUP_v1.md",
  "lib/personal-integration/create-booking-request.ts",
  "lib/personal-integration/prep-context.ts",
  "lib/personal-integration/follow-up-context.ts",
  "lib/personal-integration/facilitator-sessions.ts",
  "lib/email/send-prep-link.ts",
  "lib/email/send-follow-up-link.ts",
  "lib/db/platform-sessions.ts",
  "lib/db/reflections.ts",
  "app/api/personal-integration/request/route.ts",
  "app/api/personal-integration/prep/route.ts",
  "app/api/personal-integration/follow-up/route.ts",
  "app/api/personal-integration/facilitator/sessions/route.ts",
  "app/(site)/integration/prep/[sessionId]/page.tsx",
  "app/(site)/integration/follow-up/[sessionId]/page.tsx",
  "app/(site)/integration/facilitator/page.tsx",
  "db/platform-domain-v1.2-personal-integration.sql",
  "db/platform-domain-v1.3-follow-up.sql",
];

for (const rel of required) {
  assert(fs.existsSync(path.join(root, rel)), `Missing ${rel}`);
}

assert(isPersonalIntegrationSessionVariant("intro"), "intro variant");
assert(isPersonalIntegrationSessionVariant("not-sure"), "not-sure variant");
assert(!isPersonalIntegrationSessionVariant("invalid"), "reject invalid variant");
assert(Object.keys(SESSION_VARIANT_LABELS).length === 4, "four session variants");

assert(isPlatformSessionStatus("completed"), "completed status");
assert(!isPlatformSessionStatus("invalid"), "reject invalid status");

const birth = parseBirthDateString("1980-05-22");
assert(birth?.isoDate === "1980-05-22", "parse birth date");
assert(parseBirthDateString("invalid") === null, "reject invalid birth date");

const bookingForm = fs.readFileSync(path.join(root, "components/booking-request-form.tsx"), "utf8");
assert(bookingForm.includes("/api/personal-integration/request"), "booking form wired to FS-006 API");

console.log("smoke:personal-integration PASS");
