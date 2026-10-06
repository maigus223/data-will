# DataWill Specification – Draft v0.1

**Status:** Experimental draft  
**Author:** Mahamadou Issiaka MAIGA (MAIGUS)  
**Date:** 2026-10-05  
**License:** CC-BY 4.0 (spec text), MIT (reference code & demo)

---

## 1. Goal

Define a simple, open, machine-readable format for expressing digital wills and posthumous (or incapacity-related) access rules.

DataWill is intentionally minimal. It focuses on **declaration** and **interoperability**, not on implementing the vault, the key management, or the legal enforcement.

---

## 2. Document Structure

A DataWill document is a JSON object. In v0.1 the `signature` field is **optional** (see §9) to allow early experimentation. All other fields below are required unless marked optional.

### Required top-level fields (v0.1)

| Field              | Type     | Description |
|--------------------|----------|-------------|
| `version`          | string   | Specification version (e.g. `"0.1"`) |
| `id`               | string   | Unique identifier of this DataWill (UUID recommended) |
| `declarant`        | object   | Information about the person making the declaration |
| `assets`           | array    | List of digital assets covered |
| `beneficiaries`    | array    | List of people/entities and their rights |
| `triggers`         | array    | Conditions that activate the will |
| `accepted_proofs`  | array    | What proofs are accepted for each trigger |
| `created_at`       | string   | Creation timestamp (ISO 8601) |
| `updated_at`       | string   | Last update timestamp (ISO 8601) |

### Optional fields (v0.1)

| Field              | Type     | Description |
|--------------------|----------|-------------|
| `signature`        | object   | Cryptographic signature (optional in v0.1, see §9) |
| `instructions`     | array    | Free-form messages or special wishes |
| `previous_id`      | string   | ID of the DataWill this one supersedes |
| `language`         | string   | Primary language of free-text fields (BCP 47) |

---

## 3. Declarant

```json
"declarant": {
  "display_name": "Optional human-readable name",
  "identifiers": [
    {
      "type": "email" | "did" | "other",
      "value": "..."
    }
  ]
}
```

Keep personal data minimal. Strong identifiers (government ID numbers, etc.) should be avoided inside the document when possible.

---

## 4. Assets

Each asset describes something the declarant wants to control access to.

```json
{
  "id": "asset-1",
  "type": "account" | "file" | "key" | "service" | "other",
  "label": "Personal Gmail",
  "description": "Optional longer description",
  "locator": "Optional URL, account identifier, or reference"
}
```

### Asset types (v0.1 - open list)

- `account` - Online account (email, cloud)
- `file` - File or folder
- `key` - Cryptographic key, seed phrase, password vault
- `service` - Service or subscription
- `other` - Anything else

> The list is intentionally open. Implementations MUST accept unknown types but SHOULD warn. Future versions may register additional types.

---

## 5. Beneficiaries and Rights

```json
{
  "id": "ben-1",
  "display_name": "Alice Example",
  "identifiers": [ ... ],
  "rights": [
    {
      "asset_id": "asset-1",
      "permissions": ["read", "export"]
    }
  ]
}
```

### Standard permissions

- `read`
- `export`
- `manage`
- `delete`
- `transfer`

Additional custom permissions are allowed but should be clearly documented. The permissions list is open.

---

## 6. Triggers

Conditions that can activate the DataWill.

```json
{
  "id": "trigger-death",
  "type": "death" | "incapacity" | "inactivity" | "custom",
  "description": "Official death of the declarant",
  "parameters": {
    "inactivity_days": 365
  }
}
```

---

## 7. Accepted Proofs

What evidence is required to consider a trigger activated.

```json
{
  "trigger_id": "trigger-death",
  "proofs": [
    {
      "type": "official_death_certificate",
      "description": "Death certificate issued by a competent authority",
      "min_count": 1
    },
    {
      "type": "attestation",
      "description": "Attestation from family / notary",
      "min_count": 2
    }
  ]
}
```

### Proof types (v0.1 - open list, examples)

- `official_death_certificate` - Official death certificate
- `court_decision` - Court declaration
- `attestation` - Human attestation (K-of-N)
- `inactivity_proof` - Proof of prolonged inactivity
- `medical_certificate` - Medical certificate for incapacity
- `date_reached` - Calendar date reached
- `custom` - Custom proof type

> This list is **open**. The examples in `examples/` use `attestation`, `inactivity_proof`, `medical_certificate`, `date_reached`. Implementations MUST accept unknown proof types. If you need a new type, open an issue.

The exact validation of proofs is left to the implementing system or human process. DataWill only declares what the person accepts.

---

## 8. Instructions (optional)

Free-form wishes that do not grant technical access rights.

```json
{
  "id": "instr-1",
  "audience": "all_beneficiaries" | "specific beneficiary id",
  "message": "Please delete my personal photos after exporting the family ones."
}
```

---

## 9. Signature (optional in v0.1)

In v0.1, `signature` is **optional** to allow early adoption without crypto tooling. When present, it SHOULD follow this structure:

```json
"signature": {
  "algorithm": "Ed25519" | "ES256" | "other",
  "public_key": "did:key:z... or base64-encoded key",
  "value": "base64-encoded signature",
  "canonicalization": "JCS (RFC 8785) or other",
  "note": "Optional human-readable note"
}
```

Recommended approach:
- Canonicalize the JSON excluding the `signature` field using JCS (RFC 8785)
- Sign with a key controlled by the declarant (Ed25519 recommended)
- Store result in `signature`

**Placeholder:** Examples in v0.1 use `{"note": "Signature placeholder – to be defined"}`. A validator MUST accept this placeholder in v0.1 but SHOULD warn. In v1.0, `signature` will become required and fully specified.

---

## 10. Design Goals for later versions

- Support for encrypted sections
- Multi-signature / threshold schemes
- Clearer proof presentation formats (W3C VC)
- Compatibility notes for existing vaults
- Internationalization

---

## 11. Non-goals (v0.1)

- Implementing the vault or key recovery mechanism
- Providing legal enforceability by itself
- Defining a global public registry
- Solving jurisdictional differences
