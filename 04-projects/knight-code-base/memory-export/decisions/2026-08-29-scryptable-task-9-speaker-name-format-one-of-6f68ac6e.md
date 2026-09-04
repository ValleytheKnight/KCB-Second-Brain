---
id: "6f68ac6e-4a94-4982-ae20-860f712cdecf"
type: "decision"
date: "2026-08-29"
tags: ["knight-code", "decision"]
---
# Decision: Scryptable Task 9: "speaker name format" (one of the four Transcript Assembly Settings named in the ...

## Decision

Scryptable Task 9: "speaker name format" (one of the four Transcript Assembly Settings named in the Design Review) is a column-alignment toggle, exposing the real TASMAS assemble.py output_items() behavior (item.speaker.rjust(max_speaker_width), right-padding every speaker name to the width of the longest name so colons align in a column) as an on/off setting. Default ON, matching current TASMAS behavior exactly when off is not chosen.
