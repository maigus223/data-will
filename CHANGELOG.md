# Changelog

All notable changes to DataWill spec will be documented here.

## [0.1.0] - 2026-10-05

### Added
- Initial experimental draft
- Document structure: version, id, declarant, assets, beneficiaries, triggers, accepted_proofs, timestamps
- Optional: instructions, previous_id, language, signature (optional in v0.1)
- Asset types: account, file, key, service, other (open list)
- Permissions: read, export, manage, delete, transfer (open list)
- Trigger types: death, incapacity, inactivity, custom (open list)
- Proof types: official_death_certificate, court_decision, attestation, inactivity_proof, medical_certificate, date_reached, custom (open list)
- 3 examples: simple, familial, riche (using @example.com)
- JSON Schema: schema/datawill-0.1.schema.json
- Validator: scripts/validate.py
- Static preview page index.html (no external requests) + scripts/sync_index.py to refresh its embedded copies
- Optional React demo in demo/ (reads files at build time)
- CI: GitHub Action validates examples and checks index.html is in sync
- Issue templates, CONTRIBUTING, SECURITY
- CITATION.cff ("Cite this repository" on GitHub)

### Changed
- Signature clarified as optional in v0.1 with placeholder allowed

### Fixed
- Examples now use @example.com (reserved) instead of @email.com
- Preview page no longer ships a truncated copy of the spec; its embedded copies are generated from the repository files
