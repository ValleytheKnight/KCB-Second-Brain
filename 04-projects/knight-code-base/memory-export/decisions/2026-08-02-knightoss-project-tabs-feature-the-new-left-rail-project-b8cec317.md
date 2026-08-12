---
id: "b8cec317-0daf-43e4-892b-0451eba2d441"
type: "decision"
date: "2026-08-02"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: KnightOS's Project Tabs feature (the new left-rail Project tier above the channel strip, Tasks A-H) ...

## Decision

KnightOS's Project Tabs feature (the new left-rail Project tier above the channel strip, Tasks A-H) is approved to proceed. Chris gave a real go-ahead on the proposal at Projects/KnightOS/01 Planning/Project Tabs Feature Spec.md, moving its status from "proposal, pending review" to approved. The doc's 4 outstanding review findings were applied before Task A started: (1) the false claim that today's session-save writes atomically was corrected (it's a direct writeFileSync with no temp file or rename, confirmed by reading src/main/session-store.ts directly), and Task B's scope now includes building a real crash-safe write (temp file plus rename) rather than just fixing the doc's wording; (2) Task C and Task D both gained explicit acceptance criteria for the two bugs found in review: reopening a closed channel must never load stale/cached state, and an inactive Project's terminal UI components must be disposed, not left mounted, a resource-leak risk distinct from the backend pty process intentionally staying alive in the background; (3) Task C's description now has an explicit table naming exactly which state moves from global to per-Project (channel list, active channel, git status map, close history) versus what stays global (the terminal/pty registry, activeProjectId itself); (4) Task G's scope was expanded per Chris's confirmed decision to also update KnightOS's real native menu bar (src/main/menu.ts) with Project-aware commands, logged separately below.

## Rationale

This is a real, approved scope change with a lifecycle (a feature moving from proposal to active build), not a turn-level edit, so it needs a durable record independent of this conversation. The 4 fixes came from an independent adversarial review already referenced in the vault (00 Overview.md's Continuation Point and the KnightOS Project Kanban's backlog entry both named the same 4 findings before this session started: false atomic-write claim, two state-isolation risks in Task C, a menu.ts gap in Task G), so applying them was mechanical confirmation of already-identified problems, not new judgment calls. The atomic-write correction was independently re-verified against the real shipped code (src/main/session-store.ts's saveSession, a plain writeFileSync with no temp-file-plus-rename step) rather than trusted from the review's own prior wording, consistent with this project's standing verify-don't-guess rule.</parameter>

## Alternatives Considered

Leaving Task B's scope as a documentation-only fix (rejected: the underlying crash-safety gap is real and shipping, correcting only the doc's claim without fixing the actual write mechanism would leave the false sense of safety in place, just relocated from prose to code). Splitting the stale-reopen and orphaned-terminal-UI acceptance criteria into only one of Task C or Task D rather than both (rejected: the state-level bug and the UI/mount-level bug are each independently verifiable at a different layer, matching this project's existing pattern of unit-level checks in the restructuring task and Playwright e2e checks in the UI task).
