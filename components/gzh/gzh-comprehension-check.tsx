"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { GZH_TW_COMPREHENSION } from "@/lib/gzh/tw-content";

/**
 * GZH-1 research comprehension check — neutral options, not persuasion.
 * Wire onto TW result flow when Free result is market-aware.
 */
export function GzhComprehensionCheck({ market = "tw" }: { market?: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!selected) return;
    trackEvent("gzh_comprehension_check", {
      market,
      product_track: "gzh",
      comprehension_choice: selected,
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="gzh-comprehension-thanks" role="status">
        謝謝。你的回答只用於理解產品定位，不會改變你的映照結果。
      </p>
    );
  }

  return (
    <form className="gzh-comprehension" onSubmit={onSubmit}>
      <fieldset>
        <legend>{GZH_TW_COMPREHENSION.question}</legend>
        <ul className="gzh-comprehension-options">
          {GZH_TW_COMPREHENSION.options.map((opt) => (
            <li key={opt.id}>
              <label>
                <input
                  type="radio"
                  name="gzh_comprehension"
                  value={opt.id}
                  checked={selected === opt.id}
                  onChange={() => setSelected(opt.id)}
                />
                {opt.label}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <button type="submit" className="gzh-btn" disabled={!selected}>
        提交
      </button>
    </form>
  );
}
