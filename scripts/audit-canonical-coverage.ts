/**
 * Canonical correctness audit — actual metadata must match SEO Intent Manifest.
 * Run: npx tsx scripts/audit-canonical-coverage.ts
 * Optional: BASE_URL=https://www.1320soulcode.com npx tsx scripts/audit-canonical-coverage.ts --live
 */
import { SEO_INTENT_MANIFEST } from "../lib/seo/intent-manifest";
import { CANONICAL_SITE_URL } from "../lib/platform-config";

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function stripHtml(value: string): string {
  return normalizeText(value.replace(/<[^>]+>/g, " "));
}

async function auditLive() {
  const siteUrl = (process.env.BASE_URL ?? CANONICAL_SITE_URL).replace(/\/$/, "");
  let failures = 0;

  for (const entry of SEO_INTENT_MANIFEST) {
    if (entry.class === "D") continue;
    const url = `${siteUrl}${entry.path === "/" ? "" : entry.path}`;
    const html = await (await fetch(url)).text();
    const canonical =
      html.match(/rel="canonical" href="([^"]+)"/)?.[1] ??
      html.match(/rel='canonical' href='([^']+)'/)?.[1] ??
      "";
    const expectedCanonical = `${siteUrl}${entry.canonical === "/" ? "" : entry.canonical}`;
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
    const h1Raw = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? "";
    const h1 = stripHtml(h1Raw);
    const robots = html.match(/name="robots" content="([^"]+)"/)?.[1] ?? "";
    const indexedOk = entry.index
      ? !/noindex/i.test(robots)
      : /noindex/i.test(robots);

    const titleOk =
      normalizeText(title) === normalizeText(entry.title) ||
      normalizeText(title).startsWith(normalizeText(entry.title));
    const h1Ok = normalizeText(h1) === normalizeText(entry.h1);
    const canonicalOk = canonical === expectedCanonical || canonical === `${expectedCanonical}/`;

    if (!canonicalOk || !titleOk || !h1Ok || !indexedOk) {
      failures += 1;
      console.error(`FAIL ${entry.path}`);
      if (!canonicalOk) console.error(`  canonical: got=${canonical} want=${expectedCanonical}`);
      if (!titleOk) console.error(`  title: got=${title} want=${entry.title}`);
      if (!h1Ok) console.error(`  h1: got=${h1} want=${entry.h1}`);
      if (!indexedOk) console.error(`  robots: got=${robots || "(none)"} index=${entry.index}`);
    } else {
      console.log(`OK ${entry.path}`);
    }
  }

  if (failures) {
    console.error(`${failures} intent mismatch(es)`);
    process.exit(1);
  }
  console.log(`All ${SEO_INTENT_MANIFEST.length} manifest entries match live metadata.`);
}

function auditStaticShape() {
  const sitemap = SEO_INTENT_MANIFEST.filter((e) => e.sitemap);
  const bad = SEO_INTENT_MANIFEST.filter(
    (e) =>
      (e.class === "D" && e.sitemap) ||
      (e.class === "A" && e.canonical !== e.path) ||
      (e.sitemap && !e.index),
  );
  console.log(`Manifest entries: ${SEO_INTENT_MANIFEST.length}`);
  console.log(`Sitemap members: ${sitemap.length}`);
  if (bad.length) {
    console.error("Structural issues:");
    for (const e of bad) console.error(`  ${e.path} class=${e.class} sitemap=${e.sitemap} canonical=${e.canonical}`);
    process.exit(1);
  }
  console.log("Structural checks passed (A self-canonical; D not in sitemap; sitemap implies index).");
}

async function main() {
  auditStaticShape();
  if (process.argv.includes("--live")) {
    await auditLive();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
