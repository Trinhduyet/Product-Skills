# Engineering Rules

- Optimize for the smallest working experience that preserves a clean continuation path.
- Prefer existing repository conventions.
- Feature-based React structure is the default for greenfield work.
- Add architectural layers only when current complexity demonstrates a need.
- Keep remote data/provider access behind feature-level modules/hooks where practical.
- Do not bury business-critical logic inside giant page components.
- Do not create shared abstractions used by only one feature without a concrete reason.
- Run actual checks before claiming success.
