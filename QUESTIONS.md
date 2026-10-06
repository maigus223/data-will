# Open Questions – DataWill v0.1

These questions are intentionally left open. Feedback is highly welcome.

1. **Proofs of death / incapacity**  
   What is the minimal viable set of accepted proofs that is both practical for ordinary people and sufficiently trustworthy?

2. **Multi-jurisdiction**  
   How should a DataWill handle differences between national succession and data-protection laws?

3. **Encryption of sensitive parts**  
   Should the format support encrypted sections so that only designated beneficiaries can read certain assets or messages?

4. **Revocation and superseding**  
   What is the cleanest way to revoke or replace a previous DataWill so that implementers can reliably know which version is current?

5. **Discovery / registry**  
   Should there be any optional public or semi-public discovery mechanism, or must everything stay fully private and presented by the heirs?

6. **Technical inactivity signals**  
   How far should the specification go in defining machine-detectable inactivity (last login, dead-man’s switch, etc.)?

7. **Relationship with existing vaults**  
   What is the lightest useful compatibility layer so that projects like Sarcophagus, HandoverKey, etc. could consume a DataWill?

8. **Identity of beneficiaries**  
   How should beneficiaries be identified in a privacy-preserving yet usable way (email, DID, government ID hash, trusted contact list…)?

9. **Signature canonicalization**  
   Should we mandate JCS (RFC 8785) for v1.0? What about detached JWS?

10. **Likeness & AI policy**  
    Should there be a standard field for posthumous AI likeness permissions (as discussed in DADE CG)?
