# -*- coding: utf-8 -*-
"""Reorder CLUB_PORTAL_CLUBS in js/main.js."""

import re

MAIN = r"c:\Users\user\OneDrive\Documents\GitHub\vivame-web\js\main.js"

ORDER = [
    "그립(Grip)",
    "포시즌스",
    "비상턴",
    "모종의 시작",
    "그림책 놀이터",
    "퐁당다이브클럽",
    "팝케팅",
    "Focus on",
    "원모어 (One More)",
    "비상다독",
    "다람지",
    "비상골린이들",
    "온니 플라워",
    "떼구르",
    "AVOCADO",
]


def main():
    with open(MAIN, encoding="utf-8") as f:
        s = f.read()

    marker = "var CLUB_PORTAL_CLUBS = ["
    tail_marker = "\n];\n\nfunction escapeHtmlText"
    i_start = s.index(marker)
    i0 = i_start + len(marker)
    i1 = s.index(tail_marker)

    inner = s[i0:i1]
    sep = "\n  },\n  "
    parts = inner.split(sep)

    if len(parts) != 15:
        raise SystemExit(f"expected 15 segments, got {len(parts)}")

    blocks = []
    for i, p in enumerate(parts):
        if i < 14:
            blocks.append(p + sep)
        else:
            blocks.append(p)

    by_name = {}
    for b in blocks:
        m = re.search(r'name:\s*"([^"]+)"', b)
        if not m:
            raise SystemExit("no name in block")
        by_name[m.group(1)] = b

    missing = [n for n in ORDER if n not in by_name]
    if missing:
        raise SystemExit(f"missing: {missing}")

    new_inner = "".join(by_name[n] for n in ORDER)
    head = s[:i0]
    tail = s[i1:]
    new_s = head + new_inner + tail

    with open(MAIN, "w", encoding="utf-8") as f:
        f.write(new_s)
    print("OK: reordered", len(ORDER), "clubs")


if __name__ == "__main__":
    main()
