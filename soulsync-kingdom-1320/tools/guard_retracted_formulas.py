#!/usr/bin/env python3
"""Fail if live source implements retracted S2/S3 arithmetic.

Allowed: warning text in docs/, and the superseded Data Pack under docs/superseded/.
Forbidden in src/current and src/frozen-baseline-v0.2.2: treating month+day or month*day
as a live algorithm (including test expectations).
"""
from __future__ import annotations

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
SCAN = [
    ROOT / "src" / "current",
    ROOT / "src" / "frozen-baseline-v0.2.2",
    ROOT / "tools",
]
SKIP_NAMES = {
    "guard_retracted_formulas.py",
}

# Live-implementation patterns. Docs may mention these as withdrawn.
PATTERNS = [
    re.compile(r"S2\s*=\s*月\s*[＋+]\s*日"),
    re.compile(r"S3\s*=\s*月\s*[×x*]\s*日"),
    re.compile(r"S2\s*=\s*month\s*\+\s*day", re.I),
    re.compile(r"S3\s*=\s*month\s*[x×*]\s*day", re.I),
    re.compile(r"\bm\s*\+\s*d\b.*S2|S2.*\bm\s*\+\s*d\b"),
    re.compile(r"\bm\s*\*\s*d\b.*S3|S3.*\bm\s*\*\s*d\b"),
]


def main() -> int:
    hits = []
    for base in SCAN:
        if not base.exists():
            hits.append(f"missing scan path: {base}")
            continue
        for path in base.rglob("*"):
            if not path.is_file() or path.name in SKIP_NAMES:
                continue
            if path.suffix.lower() not in {".html", ".js", ".py", ".md", ".txt", ".json"}:
                continue
            text = path.read_text(encoding="utf-8", errors="replace")
            for pat in PATTERNS:
                if pat.search(text):
                    rel = path.relative_to(ROOT).as_posix()
                    hits.append(f"{rel}: matches {pat.pattern}")
    if hits:
        print("FAIL retracted-formula guard")
        for h in hits:
            print(" ", h)
        return 1
    print("PASS no retracted S2/S3 formulas in current or frozen source")
    return 0


if __name__ == "__main__":
    sys.exit(main())
