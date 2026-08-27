# Engineering Rules

- Optimize for the smallest working POC that preserves a clean continuation path.
- Prefer existing repository conventions.
- Feature-based React structure is the default for greenfield work.
- Only add architectural layers when current complexity demonstrates a need.
- Keep remote data/provider access behind feature-level modules/hooks where practical.
- Do not put business-critical logic inside giant page components.
- Do not create shared abstractions used by only one feature without a concrete reason.
- Run actual checks before claiming success.
