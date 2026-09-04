---
id: "3980d200-a9e8-4e70-8fbe-6286215f5cea"
type: "decision"
date: "2026-08-29"
tags: ["knight-code", "decision"]
---
# Decision: Scryptable Task 8: fixed 3 real correctness bugs found by /code-review against commit 3be4e55, plus ...

## Decision

Scryptable Task 8: fixed 3 real correctness bugs found by /code-review against commit 3be4e55, plus applied the review-consensus /simplify findings. Bug 1: names_master.add() was writing every non-blank row's raw label as a permanent known name, polluting future dropdowns; now only a resolved row's name gets added, gated on the same _row_confirmed state Status reads. Bug 2: the auto-advance checkbox only synced from app_config in __init__, so a second already-open tab kept showing a stale value after another tab changed the saved default, and could silently overwrite it on its own Continue; refresh() (called by show_identities_view every time the screen is shown) now resyncs it. Bug 3: RecordingTab's auto-advance branch never called refresh_status(), so a rejected start-transcription request (e.g. one already running) left the tab stuck on the identities view; refresh_status() now runs unconditionally before the request is emitted.

## Rationale

Simplify changes applied alongside the bug fixes, same commit-review pass: row resolution is now explicit cached state (_row_confirmed, set at load and on edit) instead of re-derived on every read; RecordingState and AppConfig are cached on self from the most recent load and reused rather than re-read per Continue click; names_master.load/save is now called once per Continue rather than once per confirmed row; TabStrip.open_tab now returns the live widget and MainWindow._open_recording_tab checks _find_recording_tab before constructing a new RecordingTab at all, removing the build-then-discard waste and the after-the-fact instance lookup. Skipped by explicit scope call, not oversight: import_source as a real RecordingState field instead of a marker file (real improvement, future task); names_master.py as a second parallel persistence mechanism (Task 10 owns real consolidation); the JSON load-or-corrupt-fallback pattern duplicated across app_config/workspace_state/names_master (real shared-helper candidate, flagged not extracted); SpeakerIdentitiesWidget's eager construction in RecordingTab.__init__ (changes tab lifecycle more broadly than this pass). 6 new regression tests added for the 3 bugs and the simplify-driven behavior change; full suite at 198/198 passing.
