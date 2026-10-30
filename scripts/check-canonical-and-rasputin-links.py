#!/usr/bin/env python3
"""Fail the PR build if canonical URLs or Rasputin crawl links go missing.

Hugo --minify rewrites attribute quoting, so matching is quote-tolerant.
Run from the repo root after `hugo --minify --gc`.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

PUBLIC = Path("public")

CANONICAL_PAGES = {
    "index.html": "https://geekdojo.com/",
    "about/index.html": "https://geekdojo.com/about/",
    "developing-with-ai/index.html": "https://geekdojo.com/developing-with-ai/",
    "developing-with-ai/company-of-one/index.html": "https://geekdojo.com/developing-with-ai/company-of-one/",
    "developing-with-ai/ai-wrote-the-fix/index.html": "https://geekdojo.com/developing-with-ai/ai-wrote-the-fix/",
}

RASPUTIN_URLS = (
    "https://rasputin.geekdojo.com/",
    "https://rasputin.geekdojo.com/docs/",
    "https://rasputin.geekdojo.com/learn/",
    "https://rasputin.geekdojo.com/devlog/",
)

LINK_PAGES = (
    "index.html",
    "about/index.html",
    "developing-with-ai/index.html",
    "developing-with-ai/company-of-one/index.html",
    "developing-with-ai/ai-wrote-the-fix/index.html",
)

HREF_RE = re.compile(r"""href\s*=\s*(?:["']([^"']+)["']|([^\s>]+))""", re.I)
CANONICAL_RE = re.compile(
    r"""<link\b[^>]*\brel\s*=\s*["']?canonical["']?[^>]*>""",
    re.I,
)
HREF_IN_TAG_RE = re.compile(r"""href\s*=\s*(?:["']([^"']+)["']|([^\s>]+))""", re.I)


def hrefs(html: str) -> list[str]:
    found = []
    for match in HREF_RE.finditer(html):
        found.append(match.group(1) or match.group(2))
    return found


def canonical_href(html: str) -> str | None:
    tag = CANONICAL_RE.search(html)
    if not tag:
        return None
    match = HREF_IN_TAG_RE.search(tag.group(0))
    if not match:
        return None
    return match.group(1) or match.group(2)


def main() -> int:
    errors: list[str] = []

    cfg_path = PUBLIC / "staticwebapp.config.json"
    if not cfg_path.is_file():
        errors.append(f"missing {cfg_path} (Hugo must copy static/staticwebapp.config.json)")
    else:
        try:
            cfg = json.loads(cfg_path.read_text())
        except json.JSONDecodeError as exc:
            errors.append(f"{cfg_path} is not JSON: {exc}")
        else:
            if cfg.get("trailingSlash") != "always":
                errors.append(
                    f"{cfg_path}: expected trailingSlash=always, got {cfg.get('trailingSlash')!r}"
                )

    for rel, expected in CANONICAL_PAGES.items():
        path = PUBLIC / rel
        if not path.is_file():
            errors.append(f"missing built page {path}")
            continue
        html = path.read_text()
        got = canonical_href(html)
        if got != expected:
            errors.append(f"{path}: canonical {got!r}, expected {expected!r}")

    sitemap = PUBLIC / "sitemap.xml"
    if not sitemap.is_file():
        errors.append(f"missing {sitemap}")
    else:
        text = sitemap.read_text()
        for expected in CANONICAL_PAGES.values():
            loc = f"<loc>{expected}</loc>"
            if loc not in text:
                errors.append(f"{sitemap}: missing {loc}")

    for rel in LINK_PAGES:
        path = PUBLIC / rel
        if not path.is_file():
            errors.append(f"missing built page {path}")
            continue
        found = set(hrefs(path.read_text()))
        for url in RASPUTIN_URLS:
            if url not in found:
                errors.append(f"{path}: missing crawlable href {url}")

    if errors:
        print("canonical / Rasputin link check failed:", file=sys.stderr)
        for err in errors:
            print(f"  - {err}", file=sys.stderr)
        return 1
    print(
        f"ok: trailingSlash=always, {len(CANONICAL_PAGES)} canonicals, "
        f"{len(LINK_PAGES)} pages each link {len(RASPUTIN_URLS)} Rasputin URLs"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
