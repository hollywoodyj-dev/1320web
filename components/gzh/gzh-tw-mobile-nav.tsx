"use client";

import Link from "next/link";
import { useState } from "react";
import { GZH_TW_BRAND_UI_RC2 } from "@/lib/gzh/tw-brand-ui-rc2";
import { gzhHref, type GzhMarket } from "@/lib/gzh/locale";

export function GzhTwMobileNav({ market }: { market: GzhMarket }) {
  const [open, setOpen] = useState(false);
  const ui = GZH_TW_BRAND_UI_RC2;

  return (
    <>
      <button
        type="button"
        className="gzh-hamburger"
        aria-label={open ? "關閉選單" : "開啟選單"}
        aria-expanded={open}
        aria-controls="gzh-navigation"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "✕" : "☰"}
      </button>
      <nav
        className={`gzh-nav${open ? " gzh-nav--open" : ""}`}
        id="gzh-navigation"
        aria-label="主要導覽"
      >
        <Link href={gzhHref(market, "about")} onClick={() => setOpen(false)}>
          {ui.nav.about}
        </Link>
        <Link
          href={`${gzhHref(market)}#foundation`}
          onClick={() => setOpen(false)}
        >
          {ui.nav.foundation}
        </Link>
        <Link href={gzhHref(market, "free-soul-blueprint")} onClick={() => setOpen(false)}>
          {ui.nav.free}
        </Link>
        <Link href={gzhHref(market, "review-samples")} onClick={() => setOpen(false)}>
          {ui.nav.samples}
        </Link>
        <Link href="/" lang="en" onClick={() => setOpen(false)}>
          {ui.nav.english}
        </Link>
        <Link
          className="gzh-btn gzh-btn--gold gzh-btn--tiny"
          href={gzhHref(market, "free-soul-blueprint")}
          onClick={() => setOpen(false)}
        >
          {ui.nav.cta}
        </Link>
      </nav>
    </>
  );
}
