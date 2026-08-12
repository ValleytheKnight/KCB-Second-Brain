---
id: "201f6714-be1b-4e90-b552-25f2358620e4"
type: "decision"
date: "2026-08-07"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: OneNote-style image positioning plugin (working name "Anchor Flow", not final): v1 scope locked. Pos...

## Decision

OneNote-style image positioning plugin (working name "Anchor Flow", not final): v1 scope locked. Positioning via a toolbar that appears on image selection (Left/Right/Full-width), resize via numeric width input in the same toolbar, no drag-based interaction in v1. New images stay explicit-only by default with a settings toggle to enable auto-convert on paste/drop. Existing plain ![[image]] embeds are left untouched, convertible one at a time via the toolbar. Settings tab included in v1 (default width, default position, auto-convert toggle). Built toward eventual community publish from the start, meeting publish-quality bar in v1 rather than personal-first-then-polish.

## Rationale

Chris confirmed via grill-me interview (2 rounds). Overrode the personal-first/right-click-menu/skip-settings-tab recommendations twice, consistently toward the more ambitious shape, read as genuine intent not a hedge. Feasibility for the core mechanism (CSS float + automatic text reflow in both Reading mode and Live Preview) was already confirmed via a live spike in the Plugin Tester vault before this scope conversation. Alternatives considered: right-click context menu instead of selection toolbar (rejected, Chris prefers the toolbar-on-select pattern); personal-use-only v1 with publish-readiness as a later phase (rejected twice by Chris); no settings tab in v1 (rejected, an auto-convert toggle requires one); true drag-handle positioning/resizing and a bulk existing-embed-convert command deferred to roadmap, not v1.
