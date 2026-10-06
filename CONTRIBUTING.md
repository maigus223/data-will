# Contributing to DataWill

Thank you for considering a contribution!

## How to propose a spec change

1. Open an issue using template `Spec change proposal` in `.github/ISSUE_TEMPLATE/spec-change.md`
2. Describe: motivation, current spec excerpt, proposed change, examples, impact on existing implementations
3. For small fixes (typos), open a PR directly referencing the issue
4. For larger changes, wait for discussion and rough consensus before PR
5. All spec changes must:
   - Update `SPEC.md`
   - Update `schema/datawill-0.1.schema.json` if fields change
   - Update examples if needed
   - Pass `python scripts/validate.py`
   - Run `python scripts/sync_index.py`

## Development

- Validate: `python scripts/validate.py`
- After changing `SPEC.md`, `README.md`, `QUESTIONS.md`, `schema/` or `examples/`, refresh the preview page: `python scripts/sync_index.py` (CI fails if you forget)
- Optional React demo: `cd demo && npm install && npm run dev`

## Code of Conduct

Be respectful, focus on interoperability and privacy. No legal advice.

## License

By contributing, you agree that spec contributions are CC-BY 4.0 and code contributions are MIT.
