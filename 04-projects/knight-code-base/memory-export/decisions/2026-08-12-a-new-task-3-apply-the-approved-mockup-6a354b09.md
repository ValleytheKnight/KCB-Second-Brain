---
id: "6a354b09-8213-4daf-90bf-cd31b16ba1b6"
type: "decision"
date: "2026-08-12"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: A new Task 3 ("Apply the approved mockup visual design") is inserted into the KnightOS Phase 1 Multi...

## Decision

A new Task 3 ("Apply the approved mockup visual design") is inserted into the KnightOS Phase 1 Multi-Window System Feature Spec's task breakdown, sequenced right after Task 2 (tear-off proof-of-concept) and before what was Task 3 (generalized routing, now Task 4). All subsequent tasks renumbered: old 3-12 become new 4-13, spec is now a 13-task plan.

## Rationale

Chris corrected an earlier read: the 44-mockup knightos-mockup.pen design pass already went through review and is approved for implementation, not just inspiration, and Task 2's own tear-off behavior was itself derived from that mockup. The existing 12-task spec covered architecture only (pane model, layout tree, new pane types); none of it carried the mockup's actual visual skin (colors, chrome, typography, spacing) onto what gets built. New Task 3 applies the approved lunaris token set (ember #FF8400, near-black background, JetBrains Mono/Geist) to every surface Tasks 1-2 already shipped, replacing this codebase's current placeholder CSS tokens, before Task 4 (now) generalizes routing against final rather than placeholder chrome.
