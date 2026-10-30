#!/usr/bin/env python3
"""Confirm current and frozen HTML hashes still match the handoff verification report."""
from __future__ import annotations

import hashlib
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
EXPECTED = {
    "src/current/soulsync-kingdom-1320-v0.2.3-visual-dev.html":
        "415945045944264b21b362adb013a417ad3b6abaccf26a3ba1b888ce9ac3a77e",
    "src/current/soulsync-kingdom-1320-v0.2.3-visual-dev-selftest.html":
        "d57adeb60a608672753e42b89d72f12a45397a2aad4e19e1d599839f2df32740",
    "src/frozen-baseline-v0.2.2/soulsync-kingdom-1320-v0.2.2.html":
        "ff97cda62ab14382f789193278fff7eead0970fe9eb0906a46f50aa1bfb1e7de",
    "src/frozen-baseline-v0.2.2/soulsync-kingdom-1320-v0.2.2-selftest.html":
        "00e4d574cf31bc8624a51949e811157411ba233f338fa819a2248ab76862ff5a",
}


def sha256(path: pathlib.Path) -> str:
    h = hashlib.sha256()
    h.update(path.read_bytes())
    return h.hexdigest()


def main() -> int:
    fails = []
    for rel, expect in EXPECTED.items():
        path = ROOT / rel
        if not path.exists():
            fails.append(f"missing {rel}")
            continue
        got = sha256(path)
        if got != expect:
            fails.append(f"{rel}\n    expected {expect}\n    got      {got}")
        else:
            print(f"PASS {rel}")
    if fails:
        print("FAIL frozen/current hash guard")
        for f in fails:
            print(f)
        return 1
    print("RESULT: ALL PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
