/** Read dot-path values from nested objects (e.g. `modules.s1.code`). */

export function getPayloadPathValue(root: unknown, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = root;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

export function hasPayloadPathValue(root: unknown, path: string): boolean {
  const value = getPayloadPathValue(root, path);
  if (value === undefined || value === null) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value as object).length > 0;
  return true;
}

export function collectPayloadPathStrings(root: unknown, path: string): string[] {
  const value = getPayloadPathValue(root, path);
  return collectStringsFromValue(value);
}

export function collectStringsFromValue(value: unknown): string[] {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed ? [trimmed] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item) => collectStringsFromValue(item));
  }
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).flatMap((item) =>
      collectStringsFromValue(item),
    );
  }
  return [];
}
