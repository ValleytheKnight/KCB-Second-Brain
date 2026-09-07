---
id: "955470e9-383e-42c0-bd38-a6d651affda5"
type: "decision"
date: "2026-09-07"
tags: ["knight-code", "decision"]
---
# Decision: omarchy-image-theme resolution 5/5: wallpaper must not change on a color-only save. Confirmed by rea...

## Decision

omarchy-image-theme resolution 5/5: wallpaper must not change on a color-only save. Confirmed by reading omarchy-theme-set directly that re-applying an already-active theme advances its backgrounds/ wallpaper to the next image in that folder, since theme apply and wallpaper cycling share one call with no way to request one without the other. Real requirement, not left open: the general editor's Save on an already-loaded theme must explicitly re-pin the current wallpaper (re-link the same background file after the omarchy theme set call completes) so a pure color edit never silently cycles the desktop wallpaper. Added to the CEO plan doc's Foundational Decisions section (ceo-plans/2026-09-06-omarchy-image-theme.md), alongside batch processing order and mid-run failure handling. Purely a backend/apply-sequencing requirement; confirmed no mockup representation is needed, since nothing about it is visible in any screen state, it only changes what the app does internally right after Save on the Loaded screen.
