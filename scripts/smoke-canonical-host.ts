/**
 * Smoke — canonical host redirect helpers.
 * Run: npx tsx scripts/smoke-canonical-host.ts
 */
import assert from "node:assert/strict";
import {
  CANONICAL_HOST,
  CANONICAL_SITE_URL,
  shouldRedirectHostToCanonical,
} from "../lib/platform-config";

assert.equal(CANONICAL_SITE_URL, "https://www.1320soulcode.com");
assert.equal(CANONICAL_HOST, "www.1320soulcode.com");

assert.equal(shouldRedirectHostToCanonical("www.1320soulcode.com"), false);
assert.equal(shouldRedirectHostToCanonical("1320soulcode.com"), true);
assert.equal(shouldRedirectHostToCanonical("thesoulprofile.com"), true);
assert.equal(shouldRedirectHostToCanonical("www.thesoulprofile.com"), true);
assert.equal(shouldRedirectHostToCanonical("localhost"), false);
assert.equal(shouldRedirectHostToCanonical("something.vercel.app"), false);

console.log("Canonical host smoke PASS");
