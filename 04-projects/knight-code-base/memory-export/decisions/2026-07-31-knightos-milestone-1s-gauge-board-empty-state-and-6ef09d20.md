---
id: "6ef09d20-46a3-45dc-8e84-96d739140f73"
type: "decision"
date: "2026-07-31"
scope: "repo"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: KnightOS Milestone 1's gauge board, empty state, and command palette get three concrete answers, fou...

## Decision

KnightOS Milestone 1's gauge board, empty state, and command palette get three concrete answers, found during plan-design-review: (1) a channel with no git repo keeps the full Branch/Ahead/Behind/Dirty row structure but greys out each value to a dash, rather than collapsing to a single italic message. (2) The zero-channels first-launch state shows the KnightOS logo centered in the anvil area with a prompt to open a project, not a blank rectangle or an auto-restored session. (3) The command palette gets a small visible icon button in the shop rail (next to the new-channel "+"), not keyboard-shortcut-only, so mouse-only users can discover it.

## Rationale

Task 6's acceptance criteria explicitly require a "no git info" state and Task 8 requires a real command palette, but the locked Milestone 1 mockup only showed the happy-path default view, clean/dirty/behind git states, no empty-channel state, and no visible palette entry point. Surfaced and resolved during a design review pass before Task 3 starts building, so these are real answers Task 3-8 build against, not gaps discovered mid-implementation.

## Alternatives Considered

No-git state as a single collapsed italic message (rejected, Chris chose the dash-value row instead for visual consistency across channels). Auto-restoring the last session on first launch (rejected as the empty-state answer, that depends on Task 7 session persistence existing first and doesn't resolve what a true first launch with zero prior sessions looks like). Relying on the hint-bar text alone for palette discovery (rejected, not clickable and easy to miss).
