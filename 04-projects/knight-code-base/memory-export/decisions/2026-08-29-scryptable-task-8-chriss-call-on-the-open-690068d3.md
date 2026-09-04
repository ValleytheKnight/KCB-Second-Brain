---
id: "690068d3-bcf9-447b-8d25-46437f0260c7"
type: "decision"
date: "2026-08-29"
tags: ["knight-code", "decision"]
---
# Decision: Scryptable Task 8: Chris's call on the open Continue-destination judgment call. Ready page stays the...

## Decision

Scryptable Task 8: Chris's call on the open Continue-destination judgment call. Ready page stays the default (unchanged). Added a persisted, user-level "Start transcription automatically" checkbox to the Speaker Identities screen; when checked, Continue advances straight into transcription (RecordingTab re-emits start_transcription_requested) instead of returning to the ready page. Persisted via app_config.py's existing AppConfig/load_config/save_config mechanism, a new auto_advance_to_transcription: bool = False field, saved on Continue (same explicit-commit-action timing as diarization_settings_dialog.py's own Save button), not live per-toggle.

## Rationale

Resolves the open item from decision c2349561/ffb86074 with Chris's direct answer rather than leaving it as an unconfirmed inference. app_config.py was already the right, existing mechanism for a cross-workspace, cross-recording user preference (distinct from workspace_state.py's per-recording .scryptable-recording.json cache and from diarization.py's own settings file, both scoped differently); no new persistence mechanism was built. The checkbox reads its initial state from app_config.load_config() at construction and is one of the two things (with speaker_identities) Continue persists together, so toggling it and then clicking Back leaves the saved default untouched, matching Back's existing no-persistence behavior.
