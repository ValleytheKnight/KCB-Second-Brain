---
id: "ffb86074-d5bd-46b5-9ee3-171128aecb1f"
type: "decision"
date: "2026-08-28"
tags: ["knight-code", "decision", "superseded"]
status: "superseded"
---

# Decision: Scryptable Task 8: Speaker Identities' Continue button gates on the table's persisted Status column ...

## Decision

Scryptable Task 8: Speaker Identities' Continue button gates on the table's persisted Status column ("Needs review" per row) at click time, and on confirm (or when nothing is unresolved) persists every row's live dropdown value into RecordingState.speaker_identities, then emits identities_confirmed. RecordingTab wires that signal to refresh_status(), returning to the ready page rather than jumping straight into transcription.

## Rationale

Two real design choices with more than one defensible option, made without a prior explicit Chris sign-off since this was delegated implementation work within an already-approved task's acceptance criteria: (1) gate check uses the Status column literally, per the handoff's own wording ("If any row's Status is Needs review... when Continue is clicked"), rather than inventing a live raw-label-vs-current-text comparison; this means the very first Continue click on a fresh recording always warns once, since nothing has been persisted yet, even if the user already typed real names. (2) Continue returns to the ready page instead of auto-starting transcription, matching this app's existing pattern where every pipeline stage (transcription, diarization) only starts on an explicit user click, never silently chained from a prior screen. Both are implementation judgment calls, not confirmed with Chris directly; flagged in the Continuation Point for review if the first-click-always-warns behavior turns out to be unwanted UX.
