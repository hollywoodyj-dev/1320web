/** Probe title/h1 from prod for intent-overlap facts. */
const PATHS = ["/", "/your-code", "/free-soul-blueprint"] as const;

async function main() {
  for (const p of PATHS) {
    const url = `https://www.1320soulcode.com${p === "/" ? "" : p}`;
    const html = await (await fetch(url)).text();
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "?";
    const canonical =
      html.match(/rel="canonical" href="([^"]+)"/)?.[1] ?? "?";
    const h1 =
      html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]
        ?.replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim() ?? "?";
    const hasBirthForm =
      /name=["']year["']|BirthDateForm|entry-form|fsb-birth-form|HomeBirthdateEntry/i.test(html) ||
      /Enter your birth date|Generate My Code|Discover My Free Soul Blueprint/i.test(html);
    console.log("---");
    console.log(`path: ${p}`);
    console.log(`canonical: ${canonical}`);
    console.log(`title: ${title}`);
    console.log(`h1: ${h1}`);
    console.log(`birth_ui_signal: ${hasBirthForm}`);
  }
}

main();
