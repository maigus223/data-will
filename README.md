# DataWill

> Open format for digital wills and posthumous access declarations

**Experimental draft v0.1. Not a standard. Not legally binding. Not security-audited.**

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.23186473.svg)](https://doi.org/10.5281/zenodo.23186473)

DataWill is a simple, open and interoperable format that lets a person declare, during their lifetime:

- Who may access which digital assets
- Under which conditions (death, incapacity, prolonged inactivity…)
- With which accepted proofs
- And with which specific instructions

It is **not** another encrypted vault.  
It is the missing open contract that vaults, platforms, notaries and heirs can all understand and apply.

**Demo live:** https://maigus223.github.io/data-will/  
*(GitHub Pages serves `index.html` at repo root)*

---

## Why DataWill exists

Today:
- Open-source projects (Sarcophagus, HandoverKey, Hereditas, Deadhand, etc.) each use their own format.
- Big platforms (Google, Apple, Meta) keep everything in closed silos.
- There is no simple, shared, machine-readable way to express digital last wishes.

Result: data is often lost, locked, or recovered through opaque and stressful processes.

DataWill aims to fill that gap with a clear, open contract.

---

## Core Principles

1. The person remains in full control until the trigger conditions are met.
2. Declarations must be simple to create and update.
3. Access is granular (not all-or-nothing).
4. Trigger conditions and accepted proofs are explicit.
5. The format is open and designed for interoperability.
6. Everything is versioned and revocable.
7. Privacy is respected by default.

---

## What a DataWill contains (high level)

- Identity of the declarant (privacy-friendly)
- List of digital assets covered
- Beneficiaries and their exact rights
- Trigger conditions
- Accepted proofs of the trigger event
- Optional messages or instructions
- Cryptographic signature for integrity (optional in v0.1)
- Version and timestamps

---

## Contents

- [`SPEC.md`](SPEC.md) — Specification draft v0.1
- [`examples/`](examples/) — Concrete examples (3)
- [`schema/datawill-0.1.schema.json`](schema/datawill-0.1.schema.json) — JSON Schema (machine reference)
- [`index.html`](index.html) — Preview site served by GitHub Pages (single static file, no external requests). It embeds copies of the repository files; regenerate them with `python scripts/sync_index.py`.
- [`demo/`](demo/) — Optional React + Vite version of the preview (renders Markdown, reads the files at build time). See `demo/README.md`.
- [`scripts/validate.py`](scripts/validate.py) — Validator for examples against schema
- [`scripts/sync_index.py`](scripts/sync_index.py) — Refreshes the copies embedded in `index.html` (`--check` to verify)
- [`QUESTIONS.md`](QUESTIONS.md) — Open questions
- [`.github/`](.github/) — Issue templates and CI
- [`CONTRIBUTING.md`](CONTRIBUTING.md), [`CHANGELOG.md`](CHANGELOG.md), [`SECURITY.md`](SECURITY.md)
- [`LICENSE`](LICENSE) — MIT (for demo code, validator, and any future reference code)
- [`LICENSE-SPEC`](LICENSE-SPEC) — CC BY 4.0 (for the specification text: SPEC.md, README.md, QUESTIONS.md, examples, schema)

---

## Quick start

### Validate examples

```bash
python3 -m pip install jsonschema
python3 scripts/validate.py
```

### Refresh the preview page

```bash
python3 scripts/sync_index.py          # rewrite the copies embedded in index.html
python3 scripts/sync_index.py --check  # fail if they are out of date (used in CI)
```

### Optional React demo

```bash
cd demo
npm install
npm run dev     # local development
npm run build   # single-file build in demo/dist/index.html
```

`demo/dist/index.html` is not copied automatically: copy it over `index.html` only if you want to publish the React version instead of the static page.

---

## Status

This is an early experimental draft (v0.1).

Contributions, reviews, security feedback and discussions are very welcome. See `CONTRIBUTING.md`.

---

## License

- **Specification text** (`SPEC.md`, `README.md`, `examples/`, `QUESTIONS.md`, `schema/`): [Creative Commons Attribution 4.0 International](LICENSE-SPEC) (CC BY 4.0)
- **Demo code, validator, and any future reference code** (`demo/`, `scripts/`, `index.html`): [MIT License](LICENSE)

The preview page uses system fonts only — no Google Fonts or external requests.

---

## Authorship and disclaimers

- Conceived by Mahamadou Issiaka MAIGA (MAIGUS).
- Drafted with AI assistance under the direction of the author.
- Provided "as is", without warranty of any kind.
- This project is independent and is not affiliated with, endorsed by, or sponsored by any existing vault, platform or standards body.

---

## Résumé en français

**DataWill** est un format ouvert et interopérable qui permet à une personne de déclarer, de son vivant, qui pourra accéder à ses actifs numériques, sous quelles conditions (décès, incapacité, inactivité…), avec quelles preuves, et avec quelles instructions.

Ce n’est **pas** un coffre-fort de plus. C’est le contrat ouvert qui manquait pour que les différents systèmes puissent enfin se comprendre.
