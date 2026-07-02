import { sanitizeCustomerFacingCopy } from "@/lib/report/customer-facing-copy";

export function pickOrFallback(value: string, fallback: string): string {
  return sanitizeCustomerFacingCopy(value.trim() || fallback);
}

export function firstSentence(text: string): string {
  const match = text.match(/^[\s\S]*?[.!?](?:\s|$)/);
  return match ? match[0].trim() : text.trim();
}

export function joinEssenceParagraphs(paragraphs: string[]): string {
  return paragraphs.filter(Boolean).join(" ");
}

export function pickIndexed<T>(items: readonly T[], index: number, fallback: T): T {
  return items[index] ?? fallback;
}

export function pickStringAt(values: string[], index: number, fallback: string): string {
  return pickOrFallback(values[index] ?? "", fallback);
}

export function padStringList(values: string[], fallbacks: readonly string[], count: number): string[] {
  const merged = [...values.filter(Boolean)];
  for (const fallback of fallbacks) {
    if (merged.length >= count) break;
    merged.push(fallback);
  }
  return merged.slice(0, count).map((value) => sanitizeCustomerFacingCopy(value));
}

/** Flatten string groups in order, dropping empty values and case-insensitive duplicates. */
export function uniqueStrings(...groups: Array<string | readonly string[]>): string[] {
  const seen = new Set<string>();
  const out: string[] = [];

  for (const group of groups) {
    const items = Array.isArray(group) ? group : [group];
    for (const item of items) {
      const trimmed = item.trim();
      if (!trimmed) continue;
      const key = trimmed.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(trimmed);
    }
  }

  return out;
}

/** Assign pooled copy to fixed UI slots; falls back when the pool is shorter than slot count. */
export function distributeToSlots(
  sources: readonly string[],
  slotCount: number,
  fallbacks: readonly string[],
): string[] {
  return Array.from({ length: slotCount }, (_, index) =>
    pickOrFallback(sources[index] ?? "", fallbacks[index] ?? fallbacks[fallbacks.length - 1] ?? ""),
  );
}

/** Append desktop-only sentences when they are not already represented in a long-form field. */
export function appendUniqueSentences(base: string, additions: readonly string[]): string {
  let result = base.trim();

  for (const addition of additions) {
    const normalized = addition.trim();
    if (!normalized) continue;
    if (result.toLowerCase().includes(normalized.toLowerCase())) continue;
    result = result ? `${result} ${normalized}` : normalized;
  }

  return sanitizeCustomerFacingCopy(result);
}

type MapNodeCopy = { fullCopy: string; copy: string };

export function mapNodeFullCopies(nodes: {
  top: MapNodeCopy;
  right: MapNodeCopy;
  bottom: MapNodeCopy;
  left: MapNodeCopy;
}): string[] {
  return [nodes.top.fullCopy, nodes.right.fullCopy, nodes.bottom.fullCopy, nodes.left.fullCopy].filter(Boolean);
}

export function mapNodeShortCopies(nodes: {
  top: MapNodeCopy;
  right: MapNodeCopy;
  bottom: MapNodeCopy;
  left: MapNodeCopy;
}): string[] {
  return [nodes.top.copy, nodes.right.copy, nodes.bottom.copy, nodes.left.copy].filter(Boolean);
}
