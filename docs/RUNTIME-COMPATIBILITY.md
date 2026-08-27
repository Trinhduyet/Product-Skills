# Runtime Compatibility

Phase 1 targets:

- ChatGPT
- Claude Code
- OpenAI Codex
- Cursor

## Canonical content

`skills/`, `subagents/`, `memory/`, `rules/`, and `workflows/` are runtime-neutral sources.

## Runtime directories

`.claude/`, `.codex/`, and `.cursor/` are configuration-only areas. They should contain only settings/rules/role wrappers required by that runtime.

Do not copy canonical skill content into those directories.

## AGENTS.md

`AGENTS.md` is the shared project map and behavioral contract. Runtime-specific instructions should point back to it rather than duplicating it.

## Future runtimes

Add a runtime only after the core workflow is stable. Runtime support must not require changing canonical skill semantics.
