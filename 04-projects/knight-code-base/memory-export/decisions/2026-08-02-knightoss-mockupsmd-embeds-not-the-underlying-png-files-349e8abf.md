---
id: "349e8abf-516b-46de-8136-694729e391c7"
type: "decision"
date: "2026-08-02"
scope: "repo"
source: "agent"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: KnightOS's Mockups.md embeds, not the underlying PNG files, were the actual remaining bug. The 5 ren...

## Decision

KnightOS's Mockups.md embeds, not the underlying PNG files, were the actual remaining bug. The 5 renamed Assets/KnightOS/ PNGs from decision df366b3e do hold correct content matching their own filenames, re-verified directly by opening all 5 files fresh: milestone-1-forge-direction.png shows the shop-rail/gauge-board/anvil default view, milestone-1-forge-tool-rack-search.png shows the Tool Rack command-palette popup, milestone-1-forge-still-hot-confirm.png shows the tab-close STILL HOT dialog, northstar-combined-overview.png shows the Overview-mode dashboard, northstar-combined-graph.png shows the Graph-mode starfield. But Mockups.md's own embeds were never updated after that file rename, so each caption still sat next to the pre-rename filename, reproducing the identical visible mismatch from the other direction. df366b3e's claim that "no caption or embed text needed to change" was wrong. Fixed now by swapping which filename each caption embeds in Mockups.md; no image files renamed, no caption text changed. Also corrected two stale vault references (00 Overview.md's Continuation Point, and the Milestone 1 Kanban's Task 8 Done card) that still cited northstar-combined-overview.png as Task 8's command-palette copy/vocabulary source; the real source is milestone-1-forge-tool-rack-search.png, which df366b3e had already identified but those two files had not been updated to reflect.

## Rationale

Verified by opening all 5 real PNG files directly at their current vault paths and visually confirming rendered content against each caption, not by trusting df366b3e's own prose or any prior agent's summary from earlier in this session. This is the second failed attempt at this fix, not the first: df366b3e got the file-content-to-filename mapping right but incorrectly assumed Mockups.md needed no follow-up edit, so the visible symptom (caption next to wrong content) never actually went away, it just flipped which side of the swap was broken.

## Alternatives Considered

Considered leaving the file renames as the sole fix and declaring done again without re-opening every image, which is exactly the mistake df366b3e already made.
