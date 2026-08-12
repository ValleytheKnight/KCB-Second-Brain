---
id: "8ce60485-de38-42ed-a932-ff1bdab769d6"
type: "decision"
date: "2026-08-09"
scope: "branch"
source: "skill"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Eng review (PHASED): KnightOS mockup scope builds in 3 phases, Phase 1 multi-window system, Phase 2 ...

## Decision

Eng review (PHASED): KnightOS mockup scope builds in 3 phases, Phase 1 multi-window system, Phase 2 multi-workspace sidebar, Phase 3 interaction layer. Phase 1 architecture: shared layout engine across all window types (terminal becomes a 5th type alongside browser/markdown/diff/explorer), main-process-owned state for tear-off windows synced over debounced IPC (last-write-wins on conflict), mandatory E2E coverage for tear-off+concurrent-edit+re-dock. Phase 2 gets a hard cap on simultaneous live MCP connections plus health-check/auto-reconnect. KnightOS's single-user-vs-distributable audience question is unresolved, deferred to a separate investigation.

## Rationale

Confirmed scope (decision d2f528a4) was too large to size or build as one combined effort; phasing gives shippable checkpoints matching how Milestone 1 and Project Tabs were both built. Outside-voice adversarial review caught two real gaps the in-frame review missed (MCP connection cap, TerminalManager migration path) that got folded in before closing.
