"use client";

import { useEffect, useState } from "react";

/** Desktop with fine pointer → click-to-flip; mobile → scroll (until mobile art pack). */
export function usePreferFlip(): boolean {
  const [preferFlip, setPreferFlip] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px) and (pointer: fine)");
    const update = () => setPreferFlip(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return preferFlip;
}
