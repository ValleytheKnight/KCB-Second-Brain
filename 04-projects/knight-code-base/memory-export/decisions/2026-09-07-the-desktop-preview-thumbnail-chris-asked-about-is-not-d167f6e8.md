---
id: "d167f6e8-5424-4871-87b2-85b7a79afa79"
type: "decision"
date: "2026-09-07"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: The desktop-preview "thumbnail" Chris asked about is not new/missing scope — it's the already-accept...

## Decision

The desktop-preview "thumbnail" Chris asked about is not new/missing scope — it's the already-accepted "live desktop preview panel" item (static fake-terminal + wallpaper thumbnail overlay, CSS-recolored client-side), which he described loosely as looking like a "screenshot" to the end user. No CEO review round-trip needed. The real gap is that this preview mechanism isn't represented on the Selection/picker screen, where theme cards currently show flat 5-color chip strips instead of a richer live-preview-style thumbnail resembling Omarchy's real theme picker.

## Rationale

Chris clarified directly after decision 9775f8b0 was reported: he used "screenshot" as a plain-language descriptor of the visual result, not a request for actual desktop-capture. That prior decision incorrectly treated this as a heavier, un-approved capability requiring CEO review; this supersedes it.
