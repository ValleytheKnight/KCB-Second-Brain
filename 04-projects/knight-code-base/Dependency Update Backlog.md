# Dependency Update Backlog

Major-version dependency bumps found during the 2026-08-08 systems/skills/MCP update audit. Each needs its own isolated pass with real testing, not a routine bump, so they're parked here instead of applied.

## Knight Code root (`package.json`)

- **typescript**: 5.9.3 → 7.0.2. Two majors behind. Needs a full repo typecheck pass on its own, not folded into another change.
- **@types/node**: 22.20.1 → 26.2.0. Only relevant if also moving to a newer Node runtime target — otherwise leave pinned to match what's actually running.
- **diff**: 7.0.0 → 9.0.0. Two majors behind. Check what in the repo actually calls this package before bumping — its diffing API has changed shape across majors historically.

## Not urgent, tracked for context

- `@modelcontextprotocol/sdk` (1.29.0 → 1.30.0, minor) and a handful of other patch/minor bumps (`marked`, `playwright`, `web-tree-sitter` in `lorebrain/`) are low-risk and can go whenever — not the reason this note exists, just noted so a future pass doesn't have to re-run the audit from scratch.
