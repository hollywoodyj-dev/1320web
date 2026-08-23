/** In-memory burst guard for page_view. Survives remounts in the same JS context. */

export const PAGE_VIEW_BURST_MS = 2000;

const lastFireByPath = new Map<string, number>();

export function shouldRecordPageView(path: string, now = Date.now()): boolean {
  const prev = lastFireByPath.get(path);
  if (prev !== undefined && now - prev < PAGE_VIEW_BURST_MS) return false;
  lastFireByPath.set(path, now);
  return true;
}

export function resetPageViewDedupe(): void {
  lastFireByPath.clear();
}
