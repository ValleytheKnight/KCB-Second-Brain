---
id: "1b33800a-ec83-41d3-acf6-561f63ef16cb"
type: "decision"
date: "2026-08-29"
tags: ["knight-code", "decision"]
---
# Decision: Scryptable Task 9: three real correctness bugs found by a /code-review pass (against commit 6219bfc)...

## Decision

Scryptable Task 9: three real correctness bugs found by a /code-review pass (against commit 6219bfc) and fixed in commit 033dea6, each confirmed by execution, not just inspection. (1) A malformed word entry (missing "start"/"end", the real shape a bad hand-edit of a .words.json file could produce, a scenario TASMAS's own README explicitly invites) raised a raw KeyError instead of the documented AssemblyError; AssemblyWorker only catches AssemblyError, so this permanently wedged MainWindow._active_assembly, silently blocking every future assembly attempt until app restart. Fixed with a broad exception boundary around assemble_recording()'s core body, matching transcription.py/diarization.py's own established pattern. (2) Corrections used a plain substring .replace(), no word-boundary check; a short wrong-form (this app's real use case: misheard fantasy/RPG names) could corrupt an unrelated word it happened to appear inside (e.g. "Al" -> "Albert" turning "Always" into "Albertways"). Fixed with word-boundary-matched re.sub. (3) is_ready() returned True for a recording folder deleted or renamed out from under an open tab, since both pending_stems() and needs_diarization() treat a missing directory the same as "nothing found here, so nothing pending." Fixed with an explicit is_dir() guard.
