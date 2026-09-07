---
id: "9775f8b0-e688-4f9a-b1f9-505c8145258a"
type: "decision"
date: "2026-09-07"
tags: ["knight-code", "decision", "superseded", "superseded"]
status: "superseded"
---

# Decision: omarchy-image-theme: Chris's raised multi-window desktop-screenshot theme-card thumbnail (matching O...

## Decision

omarchy-image-theme: Chris's raised multi-window desktop-screenshot theme-card thumbnail (matching Omarchy's real theme picker, which screenshots a live desktop with terminal/file-manager/system-monitor windows open) is confirmed genuinely missing scope, not something discussed and dropped. Checked decision_search "thumbnail"/"screenshot" (no hits), dev_diary_search "thumbnail" (no hits), and grepped the full CEO plan (ceo-plans/2026-09-06-omarchy-image-theme.md) and the CEO review summary for "thumbnail"/"screenshot"/"picker": the only real hits are the accepted "Live desktop preview panel" item, whose mechanism is explicitly a static mockup (fake terminal + a small wallpaper thumbnail overlay, CSS-recolored client-side), a single big preview panel shown only on the active-theme editing screen, not a per-theme-card screenshot thumbnail for the selection/picker grid. The existing Selection screen's theme cards use flat 5-color chip strips, not screenshots. Not adding this to the mockup. Per formal-dev-workflow sequencing, a real new scope item needs CEO review acceptance (with a real mechanism/effort call, since live-desktop screenshotting is a materially different and heavier capability than the already-accepted CSS-recolor preview) before Design Review can build mockups for it.
