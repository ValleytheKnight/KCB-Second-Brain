---
id: "c2349561-3051-43dc-8e20-e1ae7573bc4f"
type: "decision"
date: "2026-08-28"
tags: ["knight-code", "decision"]
---
# Decision: Scryptable Task 8: revised speaker-identity resolution logic. The Continue gate and the table's own ...

## Decision

Scryptable Task 8: revised speaker-identity resolution logic. The Continue gate and the table's own Status column both now read a row's LIVE dropdown value (via a shared _row_is_resolved check), not the value from the last refresh(). Status updates in real time on every dropdown edit. Continue returning to the ready page (not auto-starting transcription) is unchanged from decision ffb86074, re-examined and kept.

## Rationale

Supersedes decision ffb86074's first judgment call, which was wrong to log as a mere style tradeoff. Devil's-advocate re-check (Chris-approved, via the coordinating session) found a real, guaranteed bug, not an edge case: since Status was only ever set during refresh() from persisted disk state, and nothing re-ran refresh() after a dropdown edit, EVERY first-time use of this screen showed "Needs review" on every row regardless of what the user actually selected, and Continue's gate read that same stale column, so the confirmation dialog fired unconditionally on a recording's first Continue click even when every row held a real, resolved name. Fixed by making both the visible Status column and the gate check read the combo box's current live text, via one shared _row_is_resolved(row) predicate: a row counts resolved when its current value is non-blank, isn't the "Add new name..." sentinel, and either differs from the row's raw label (a real edit was made) or matches what's already persisted for that row (an earlier session explicitly confirmed the raw label itself as the real name, the one case live-text-vs-raw-label alone can't distinguish from "never touched"). Second judgment call (Continue returns to the ready page rather than auto-starting transcription) was re-examined against the Task Breakdown and design review text directly: neither document says what happens immediately after Continue, so this remains an inferred choice, not a spec-confirmed one. Kept as-is because it matches a real, consistent, whole-codebase pattern (transcription and diarization both only ever start from an explicit, dedicated user click, never silently chained from another UI event) rather than because any written spec settles it either way; flagged as still worth Chris's explicit confirmation if the extra click reads as bad UX in practice.
