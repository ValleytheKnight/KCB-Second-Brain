---
id: "5b27dddc-e585-431e-baaf-7a5615771385"
type: "decision"
date: "2026-08-29"
tags: ["knight-code", "decision"]
---
# Decision: Scryptable Task 8: reverted 4 speculative-caching additions from the correctness-bug-fix round (on t...

## Decision

Scryptable Task 8: reverted 4 speculative-caching additions from the correctness-bug-fix round (on top of commit 8975ad4), per a second /simplify pass (4 reviewers, unanimous) plus /code-review confirming zero new correctness bugs. Dropped _row_confirmed cached list (back to live _resolve_row computation on every read), dropped self._recording_state/self._app_config instance caching (back to loading fresh in _persist_identities/_persist_auto_advance_preference), reverted _persist_identities to per-row names_master.add() instead of hand-rolled load/append/save, and dropped the _find_recording_tab pre-check in MainWindow._open_recording_tab (TabStrip.open_tab's return value is now the single source of truth, no double linear scan).

## Rationale

All 3 correctness bugs from decision 3980d200 stay fixed; only the caching/complexity added while fixing them was reverted, confirmed unneeded (local file reads, small row counts, no evidence of a real performance problem) and, in the case of instance-level state caching, identified as the same root-cause class as Bug 2 itself (staleness risk from caching a loaded value beyond the call that needs it). refresh() still re-reads app_config fresh on every show, which is what actually fixed Bug 2; only the redundant self._app_config field was dropped. Net diff: 17 insertions, 41 deletions across main_window.py and speaker_identities_widget.py, a real shrink. Full suite 198/198 passing; one unrelated pre-existing flaky background-thread test in test_diarization_flow.py was confirmed via git stash to fail identically against the unmodified commit 8975ad4 baseline, ruling it out as a regression from this round.
