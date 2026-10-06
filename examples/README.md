# Examples

This folder contains illustrative DataWill documents in official v0.1 format.

All emails use `@example.com` (reserved for documentation per RFC 2606).

- `simple-example.json` — Minimal realistic example (one beneficiary, two assets, death trigger) — Alex Example. Uses `account`, `service`, proof `official_death_certificate`.
- `familial-example.json` — Familial case (photos + passwords, 2 beneficiaries, death OR 90d inactivity, 2-of-3 attestation threshold) — Karim Example. Uses asset type `key` and proof types `attestation`, `inactivity_proof`.
- `riche-example.json` — Rich case (granularity, date trigger, wallet, AI likeness policy, DID) — Sophie Example. Uses `medical_certificate`, `date_reached`, asset types `key`, `file`, `other`.

**Signature note:** All examples use placeholder signature `{"note": "Signature placeholder – to be defined"}`. In v0.1, `signature` is optional and placeholder is accepted by validator with a warning. In v1.0 it will be required and fully specified (see SPEC.md §9).

All examples validate against `../schema/datawill-0.1.schema.json` via `python ../scripts/validate.py`. All use `@example.com`.
