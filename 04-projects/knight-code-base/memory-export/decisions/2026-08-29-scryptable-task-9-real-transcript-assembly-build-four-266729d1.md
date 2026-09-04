---
id: "266729d1-9f25-489b-ad5f-30ba80261df5"
type: "decision"
date: "2026-08-29"
tags: ["knight-code", "decision"]
---
# Decision: Scryptable Task 9: real Transcript Assembly build, four judgment calls made while porting the real T...

## Decision

Scryptable Task 9: real Transcript Assembly build, four judgment calls made while porting the real TASMAS assemble()/tasmas.py logic into src/scryptable/assembly.py. (1) TASMAS's punctuation-model auto-repair retry for out-of-sync lines (loading deepmultilingualpunctuation to attempt a fix before giving up) was not ported: out-of-sync lines are flagged and written to outOfSyncItems.txt directly, the same fallback path the original already falls back to once its own retry fails. This avoids adding a new, heavy ML dependency the coordinator's own criterion-1 step list did not call for. (2) Corrections apply to each sentence's own spoken text before formatting, not to the fully formatted output line: the original script replaces corrections across the whole formatted string, which risks a match landing inside a padded speaker name or timestamp instead of the words actually spoken, a real, if unlikely, source bug not worth preserving. (3) The original per-file ellipsis-insertion heuristic assumed a single-speaker word list; a diarized single file's word stream is split into contiguous same-speaker runs first (a real generalization TASMAS itself never needed, since it was never designed for one file holding several diarized speakers). (4) is_ready() checks more than pending_stems: for a needs-diarization recording it also confirms the transcribed words.json actually carries a real "speaker" field, since a failed diarization run leaves a fully transcribed file with no speaker data, which pending_stems alone can't distinguish from a genuinely ready recording.
