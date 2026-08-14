---
id: "49ee2fa7-0822-4037-8616-f6b2a9e46cac"
type: "decision"
date: "2026-08-14"
source: "agent"
confidence: 7
tags: ["knight-code", "decision"]
---
# Decision: Resolved the four open critique items: Import/Export get an outline-style treatment (primary-colored...

## Decision

Resolved the four open critique items: Import/Export get an outline-style treatment (primary-colored border and text, not plain gray secondary) to read as the emphasized actions they're meant to be; status badges get a thin border added for separation from the page background regardless of tint/luminance; toast auto-dismiss set to 6 seconds for New Recording Detected, but Connection Lost does NOT auto-dismiss (stays until the user acts, since it represents an unresolved problem); the "mostly generic" signature finding is accepted as-is for now, the terminal-style monospace panel (already used for the live log and the folder-structure preview) is adopted as the app's one deliberate recurring visual signature rather than inventing something new.

## Rationale

Each resolved with the smallest change that actually fixes the finding: visual weight and badge separation are cheap styling fixes, toast timing follows the design-critique reference's own 4-8s auto-dismiss guidance except where an unresolved problem state makes auto-dismiss wrong (a connection error disappearing on its own would be a silent failure, an anti-pattern the same reference explicitly flags). Signature is deliberately not over-solved at mockup stage; naming what already exists as the chosen motif beats inventing new decoration to pad it out.
