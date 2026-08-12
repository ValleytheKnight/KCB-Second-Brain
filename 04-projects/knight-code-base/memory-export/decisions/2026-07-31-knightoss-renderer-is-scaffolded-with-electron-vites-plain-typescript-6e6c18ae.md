---
id: "6e6c18ae-7009-400e-ac5f-3f56d6333f2b"
type: "decision"
date: "2026-07-31"
scope: "repo"
source: "agent"
confidence: 7
tags: ["knight-code", "decision"]
---
# Decision: KnightOS's renderer is scaffolded with electron-vite's plain TypeScript setup (no UI framework), del...

## Decision

KnightOS's renderer is scaffolded with electron-vite's plain TypeScript setup (no UI framework), deliberately deferring the React/Vue/Svelte question until Task 3 (the xterm.js terminal UI), where it first genuinely matters. Task 1's scope (window, preload bridge, single-instance lock, disk logging, packaging) is entirely framework-agnostic.

## Rationale

Picking a UI framework during Task 1 would have been a durable architectural commitment made for no Task-1 reason, contrary to the project's own preference against premature scope. Adding a framework to an existing electron-vite project later is a plain Vite plugin change plus a renderer entry rewrite, not a rebuild, so the choice stays genuinely cheap to defer. The tradeoff is real but small: Task 3 pays a modest one-time cost to introduce the framework and port the current diagnostics panel, versus Task 1 locking in a framework before any UI requirement exists to judge it against. Flagged to Chris as an open question to answer before Task 3 rather than decided silently.

## Alternatives Considered

Scaffolding React immediately (most likely eventual pick given the tab/terminal UI, but an unforced commitment during a task with no UI requirements); scaffolding Vue or Svelte (no evidence either fits KnightOS better than React); waiting to scaffold at all (would have blocked Task 1 entirely on an unrelated question).
