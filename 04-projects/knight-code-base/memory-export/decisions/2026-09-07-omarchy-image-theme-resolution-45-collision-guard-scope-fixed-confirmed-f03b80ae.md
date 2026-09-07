---
id: "f03b80ae-4159-475b-bc2f-2af7681bfe2f"
type: "decision"
date: "2026-09-07"
tags: ["knight-code", "decision"]
---
# Decision: omarchy-image-theme resolution 4/5: collision guard scope fixed. Confirmed a real gap, not deferred:...

## Decision

omarchy-image-theme resolution 4/5: collision guard scope fixed. Confirmed a real gap, not deferred: the guard must check both ~/.config/omarchy/themes/ (user) and $OMARCHY_PATH/themes/ (Omarchy's own packaged themes) every time, fresh, no caching or stale-data shortcuts, since official theme releases add new names over time. Updated the CEO plan doc's collision-guard bullet (ceo-plans/2026-09-06-omarchy-image-theme.md) to state both paths and the real staging-logic reasoning (omarchy-theme-set copies the packaged theme first, then overlays a same-named user theme on top, so a packaged-only collision is a real silent-splice risk). Updated the Save Conflict mockup screen's Detail text (Collision Guard modal, ps2HX, node I7Ust) from "already exists in ~/.config/omarchy/themes/" to "already exists, checked against both your own themes and Omarchy's built-in ones," since the prior wording implied a user-directory-only check.
