---
id: "9f18da49-6a5d-4d07-a0cd-a6d2e340b578"
type: "decision"
date: "2026-09-07"
tags: ["knight-code", "decision"]
---
# Decision: omarchy-image-theme: resolved Chris's naming-normalization question with the real on-disk script, no...

## Decision

omarchy-image-theme: resolved Chris's naming-normalization question with the real on-disk script, not assumption. ~/.local/bin/omarchy-theme-from-image (the exact script the CEO plan/review names as reused theme-folder-write logic) contains: NAME=$(echo "$RAW_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-'), confirmed matching /usr/bin/omarchy-theme-set's own THEME_NAME normalization. Direction is lowercase + spaces-to-dashes on the stored directory name (e.g. "Autumn Hearth 2" -> autumn-hearth-2), backend/filesystem-only, not live input-field reformatting. Chris had the transformation direction backwards in his question: the "no dashes, Title Case" form he described is Omarchy's own theme picker deriving a display label from the lowercase-dash directory name at render time, not something this app produces or writes. This was never an open decision, already implemented in the real script; the gap was the mockup and plan language not reflecting it. Fixed on canvas: the Collision Guard modal's rename field (ps2HX) now shows a raw human-typed value ("Autumn Hearth 2", unmodified in the input, proving no live reformatting) plus two small derived-preview lines: "Stored as: autumn-hearth-2" (this app's real behavior) and "Omarchy's picker shows it as: Autumn Hearth 2" (a distinct, clearly separate preview of Omarchy's own downstream display, not conflated with the storage behavior).
