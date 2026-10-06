#!/usr/bin/env python3
"""
Refresh the copies of repository files embedded in index.html.

Usage:
  python scripts/sync_index.py          # rewrite index.html
  python scripts/sync_index.py --check  # exit 1 if index.html is out of date
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).parent.parent
INDEX = ROOT / "index.html"

BLOCKS = {
    "readme": "README.md",
    "spec": "SPEC.md",
    "questions": "QUESTIONS.md",
    "ex-readme": "examples/README.md",
    "schema": "schema/datawill-0.1.schema.json",
    "simple": "examples/simple-example.json",
    "familial": "examples/familial-example.json",
    "riche": "examples/riche-example.json",
}

PATTERN = r'(<script type="text/plain" id="data-{id}">\n?)(.*?)(</script>)'


def main():
    check = "--check" in sys.argv[1:]
    html = INDEX.read_text(encoding="utf-8")
    stale = []
    for block_id, rel in BLOCKS.items():
        content = (ROOT / rel).read_text(encoding="utf-8").strip()
        if "</script" in content.lower():
            print(f"ERROR: {rel} contains '</script', which would break index.html")
            return 2
        regex = re.compile(PATTERN.format(id=re.escape(block_id)), re.S)
        match = regex.search(html)
        if not match:
            print(f"ERROR: block data-{block_id} not found in index.html")
            return 2
        if match.group(2).strip() != content:
            stale.append(rel)
            html = regex.sub(lambda m: m.group(1) + content + "\n" + m.group(3), html, count=1)
    if check:
        if stale:
            print("index.html is out of date for: " + ", ".join(stale))
            print("Run: python scripts/sync_index.py")
            return 1
        print("index.html is in sync")
        return 0
    if stale:
        INDEX.write_text(html, encoding="utf-8")
        print("Updated index.html from: " + ", ".join(stale))
    else:
        print("index.html already in sync")
    return 0


if __name__ == "__main__":
    sys.exit(main())
