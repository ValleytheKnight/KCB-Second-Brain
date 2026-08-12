---
id: "50fe731e-2a1c-4a65-af51-cae783c32bb1"
type: "decision"
date: "2026-07-30"
scope: "repo"
source: "user"
confidence: 7
tags: ["knight-code", "decision"]
---
# Decision: KnightOS's distribution plan is not committed to personal-use-only. Chris said he might want to shar...

## Decision

KnightOS's distribution plan is not committed to personal-use-only. Chris said he might want to share it with others eventually, a real possibility, not yet a commitment. Code-signing and auto-update mechanism choices (part of the electron-builder/electron-forge/electron-vite research already dispatched) should account for this possibility rather than assume single-machine personal use only.

## Rationale

Chris explicitly did not confirm personal-use-only when asked directly, choosing instead to flag a real someday-maybe for sharing with others. This changes what "good enough" packaging looks like (code-signing trust, update mechanism) even if public distribution never actually happens.
