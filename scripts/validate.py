#!/usr/bin/env python3
"""
Validator for DataWill examples against JSON Schema v0.1
Usage: python scripts/validate.py
"""
import json
import pathlib
import sys

try:
    import jsonschema
except ImportError:
    print("ERROR: the 'jsonschema' package is not installed.")
    print("Install it with: python3 -m pip install jsonschema")
    print("(on recent systems, use a virtual environment: python3 -m venv .venv && . .venv/bin/activate)")
    sys.exit(2)

ROOT = pathlib.Path(__file__).parent.parent
SCHEMA_PATH = ROOT / "schema" / "datawill-0.1.schema.json"
EXAMPLES_DIR = ROOT / "examples"

def load_schema():
    with open(SCHEMA_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

def validate_examples():
    schema = load_schema()
    validator = jsonschema.Draft7Validator(schema)
    ok = True
    for example_path in sorted(EXAMPLES_DIR.glob("*.json")):
        print(f"\nValidating {example_path.name}...")
        with open(example_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        errors = list(validator.iter_errors(data))
        if errors:
            ok = False
            print(f"  ❌ {len(errors)} error(s):")
            for err in errors:
                print(f"    - {err.message} at {'/'.join(map(str, err.path))}")
        else:
            print(f"  ✅ Valid")
            # Check placeholder signature warning
            if data.get("signature", {}).get("note", "").lower().startswith("signature placeholder"):
                print(f"    ⚠️  Signature is placeholder (allowed in v0.1)")
            # Check emails
            text = json.dumps(data)
            if "@email.com" in text:
                print(f"    ⚠️  Contains @email.com, should be @example.com")
                ok = False
    if ok:
        print("\n✅ All examples valid (with warnings allowed in v0.1)")
        return 0
    else:
        print("\n❌ Validation failed")
        return 1

if __name__ == "__main__":
    sys.exit(validate_examples())
