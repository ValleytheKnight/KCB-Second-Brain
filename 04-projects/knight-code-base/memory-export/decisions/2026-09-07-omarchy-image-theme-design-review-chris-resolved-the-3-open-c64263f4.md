---
id: "c64263f4-27c5-4ca6-b03d-8ea04cc132dd"
type: "decision"
date: "2026-09-07"
tags: ["knight-code", "decision"]
---
# Decision: omarchy-image-theme design review: Chris resolved the 3 open Pass 3/5 items from the 7-pass review. ...

## Decision

omarchy-image-theme design review: Chris resolved the 3 open Pass 3/5 items from the 7-pass review. (1) Post-save UX: shows a toast/confirmation, stays on the same editing screen, no redirect. Now on canvas as a "Save Toast" element (checkmark icon + "Theme saved", $success-stroked, $surface fill) absolutely positioned top-right on both Generate-Happy-Path (HEVbu, toast id mGX0y) and Edit-Loaded (dFXN0, toast id HuXe3). (2) Error Banner width: 560px is the standard, Edit's error screen (oy3rJ) was the outlier at 640px, corrected to 560px to match both Generate screens. (3) Undo count vs strip count: 5 was correct, the "Undo (3)" label was wrong on both Happy Path and Loaded, corrected to "Undo (5)" in both places.
