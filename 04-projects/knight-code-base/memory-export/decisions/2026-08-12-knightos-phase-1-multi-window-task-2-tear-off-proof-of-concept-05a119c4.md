---
id: "05a119c4-8217-4211-ae61-0406fde1ffe0"
type: "decision"
date: "2026-08-12"
source: "agent"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: KnightOS Phase 1 Multi-Window Task 2 (tear-off proof-of-concept, go/no-go checkpoint) passed: go. A ...

## Decision

KnightOS Phase 1 Multi-Window Task 2 (tear-off proof-of-concept, go/no-go checkpoint) passed: go. A live terminal pane tears off into a real second BrowserWindow with main-process-owned canonical routing state, no dropped live output across the handoff, last-write-wins concurrent-edit handling, and a working re-dock, proven by e2e/tear-off.spec.ts plus test/pane-host-registry.test.ts unit coverage.

## Rationale

Implemented per Chris's go-ahead. Scope cut carried forward explicitly rather than silently absorbed: a torn-off window starts with a blank terminal screen instead of replaying prior scrollback, since the spec's acceptance criteria only require no dropped LIVE output, not scrollback continuity. Full-fidelity scrollback handoff is deferred to Task 11 (tear-off generalized to all pane types, full gesture UI). A real regression was found and fixed during this task: the new tear-off icon added to the channel tag collided with Playwright's default click-center in the existing multi-tab.spec.ts, switching tabs silently stopped working. Root cause was a `justify-content: space-between` three-child flex row spreading the new icon into the tag's visual center; fixed by grouping the tear-off/close icons together and giving the label real flex-grow.
