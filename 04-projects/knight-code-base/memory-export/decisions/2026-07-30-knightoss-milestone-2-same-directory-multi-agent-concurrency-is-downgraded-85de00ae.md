---
id: "85de00ae-07ec-4f20-ac45-8edbda2eb0cd"
type: "decision"
date: "2026-07-30"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: KnightOS's Milestone 2 (same-directory multi-agent concurrency) is downgraded from a committed roadm...

## Decision

KnightOS's Milestone 2 (same-directory multi-agent concurrency) is downgraded from a committed roadmap item to a someday/backlog item, not currently scoped as real near-term work. Milestone 1 (many tabs, one agent per tab) fully satisfies the actual current want.

## Rationale

Chris confirmed directly during the plan-review interview that one agent per open tab is enough for what he's picturing; true same-directory concurrent-agent editing was never a concrete near-term need, just something that seemed interesting when the doc was first drafted. Building it now would be solving a problem that doesn't exist yet, contrary to Knight Code's own engineering preferences against premature scope.

## Alternatives Considered

Keeping Milestone 2 as a committed research spike per the original office-hours draft.
