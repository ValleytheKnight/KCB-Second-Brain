---
id: "0bd4977e-eb18-4999-93e2-0f90338f30e7"
type: "decision"
date: "2026-08-14"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Scryptable's default term for a unit of work is "Recording," customizable app-wide via a Preferences...

## Decision

Scryptable's default term for a unit of work is "Recording," customizable app-wide via a Preferences setting (Chris sets his own to "Episode"). "Source Archives" gets a real user-facing definition: "The original, unedited recording file, kept as a permanent backup once its name is confirmed. Scryptable never modifies these."

## Rationale

"Episode" is Chris's own D&D-session terminology and doesn't generalize to other use cases (business meetings, interviews, lectures). "Recording" is neutral enough to fit all of them while still being renameable per user/workspace. "Source Archives" previously had no visible definition anywhere in the UI, just a sidebar label; users had no way to know what it actually held or why it's separate from the main working files.
