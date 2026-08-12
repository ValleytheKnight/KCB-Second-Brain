---
id: "943776af-ad3d-4453-b2c3-d0b3be6d17b8"
type: "decision"
date: "2026-07-30"
scope: "repo"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: KnightOS's terminal (Task 2) sets a fixed xterm.js scrollback line cap (e.g. 5,000-10,000 lines, exa...

## Decision

KnightOS's terminal (Task 2) sets a fixed xterm.js scrollback line cap (e.g. 5,000-10,000 lines, exact number is an implementation call) rather than leaving scrollback unbounded.

## Rationale

Surfaced during plan-eng-review's performance section. Left unbounded, a long-running tab (multi-day agent session, a tailed build log) would grow terminal memory usage indefinitely, a real and avoidable risk given KnightOS is explicitly built for sustained daily use.
