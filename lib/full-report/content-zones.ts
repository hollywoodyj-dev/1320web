import type { FullReportLayout } from "@/lib/full-report/screen-manifest";

/** CSS class suffix for overlay safe-zone positioning on combined art+text pages. */
export function contentZoneClass(layout: FullReportLayout, screenId: string): string {
  if (screenId === "how-to-read") return "fr-zone--how-to-read";
  if (screenId === "soul-archetype") return "fr-zone--soul-archetype";
  if (screenId === "thank-you") return "fr-zone--thank-you";
  if (screenId === "closing") return "fr-zone--closing";

  switch (layout) {
    case "cover":
      return "fr-zone--cover";
    case "dashboard":
      return "fr-zone--dashboard";
    case "divider":
      return "fr-zone--divider";
    case "content-left":
      return "fr-zone--content-left";
    case "content-center":
      return "fr-zone--content-center";
    case "portrait":
      return "fr-zone--portrait";
    case "practice":
      return "fr-zone--practice";
    case "closing":
      return "fr-zone--closing";
    default:
      return "fr-zone--content-left";
  }
}
