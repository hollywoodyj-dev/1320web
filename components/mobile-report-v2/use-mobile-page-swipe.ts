import { type RefObject, useEffect } from "react";

const AXIS_LOCK_PX = 10;
const SWIPE_THRESHOLD_PX = 48;

type TouchAxis = "none" | "horizontal" | "vertical";

function findInnerScroll(target: EventTarget | null): HTMLElement | null {
  if (!target || !(target instanceof Element)) return null;
  return target.closest(".mr-v2-page-panel-inner--scroll");
}

function canScrollInnerVertically(element: HTMLElement, direction: "up" | "down"): boolean {
  const { scrollTop, scrollHeight, clientHeight } = element;
  if (direction === "down" && scrollTop + clientHeight < scrollHeight - 2) return true;
  if (direction === "up" && scrollTop > 2) return true;
  return false;
}

function resolveAxis(dx: number, dy: number, innerScroll: HTMLElement | null): TouchAxis {
  if (Math.abs(dx) < AXIS_LOCK_PX && Math.abs(dy) < AXIS_LOCK_PX) return "none";

  if (innerScroll) {
    if (Math.abs(dy) > Math.abs(dx)) {
      const direction = dy > 0 ? "up" : "down";
      if (canScrollInnerVertically(innerScroll, direction)) return "vertical";
    }

    if (Math.abs(dx) > Math.abs(dy)) return "horizontal";

    // Vertical edge — allow horizontal page flip when swiping sideways.
    return Math.abs(dx) >= AXIS_LOCK_PX ? "horizontal" : "vertical";
  }

  return Math.abs(dx) > Math.abs(dy) ? "horizontal" : "vertical";
}

export function useMobilePageSwipe(
  trackRef: RefObject<HTMLDivElement | null>,
  pageCount: number,
): void {
  useEffect(() => {
    const track = trackRef.current;
    if (!track || pageCount <= 0) return;

    let startX = 0;
    let startY = 0;
    let axis: TouchAxis = "none";
    let tracking = false;
    let innerScroll: HTMLElement | null = null;

    const getPageWidth = () => track.clientWidth;

    const getPageIndex = () => {
      const width = getPageWidth();
      if (width <= 0) return 0;
      return Math.round(track.scrollLeft / width);
    };

    const scrollToPage = (index: number, behavior: ScrollBehavior = "smooth") => {
      const width = getPageWidth();
      if (width <= 0) return;
      const clamped = Math.max(0, Math.min(pageCount - 1, index));
      track.scrollTo({ left: clamped * width, behavior });
    };

    const snapToNearestPage = () => {
      scrollToPage(getPageIndex(), "auto");
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      tracking = true;
      axis = "none";
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
      innerScroll = findInnerScroll(event.target);
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!tracking || event.touches.length !== 1) return;

      const dx = event.touches[0].clientX - startX;
      const dy = event.touches[0].clientY - startY;

      if (axis === "none") {
        axis = resolveAxis(dx, dy, innerScroll);
        if (axis === "none") return;
      }

      if (axis === "horizontal") {
        event.preventDefault();
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (!tracking) return;
      tracking = false;

      if (axis !== "horizontal") {
        axis = "none";
        innerScroll = null;
        return;
      }

      const dx = event.changedTouches[0].clientX - startX;
      const current = getPageIndex();

      if (dx <= -SWIPE_THRESHOLD_PX) {
        scrollToPage(current + 1);
      } else if (dx >= SWIPE_THRESHOLD_PX) {
        scrollToPage(current - 1);
      } else {
        snapToNearestPage();
      }

      axis = "none";
      innerScroll = null;
    };

    const onTouchCancel = () => {
      if (!tracking) return;
      tracking = false;
      if (axis === "horizontal") snapToNearestPage();
      axis = "none";
      innerScroll = null;
    };

    track.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    track.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    track.addEventListener("touchend", onTouchEnd, { passive: true, capture: true });
    track.addEventListener("touchcancel", onTouchCancel, { passive: true, capture: true });

    return () => {
      track.removeEventListener("touchstart", onTouchStart, true);
      track.removeEventListener("touchmove", onTouchMove, true);
      track.removeEventListener("touchend", onTouchEnd, true);
      track.removeEventListener("touchcancel", onTouchCancel, true);
    };
  }, [trackRef, pageCount]);
}
