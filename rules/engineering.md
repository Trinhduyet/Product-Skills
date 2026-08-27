# Engineering Rules

- Optimize for the smallest working experience that preserves a clean continuation path.
- Prefer existing repository conventions.
- Feature-based React structure is the default for greenfield work.
- Greenfield React uses TypeScript strict mode and ESLint.
- `typecheck`, `lint`, and `build` must pass before `PREVIEW_READY`.
- Do not hide type/lint failures with blanket disables, unsafe `any`, or casts used only to silence checks.
- Add architectural layers only when current complexity demonstrates a need.
- Keep remote data/provider access behind feature-level modules/hooks where practical.
- Do not bury business-critical logic inside giant page components.
- Do not create shared abstractions used by only one feature without a concrete reason.
- Run actual checks before claiming success.
