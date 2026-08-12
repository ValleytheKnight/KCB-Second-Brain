---
id: "f9473812-2705-49bb-94ff-96d4ca704694"
type: "learning"
date: "2026-07-31"
skill: "plan-design-review"
learning-type: "operational"
key: "no-plan-file-context"
confidence: 7
trusted: false
source: "observed"
tags: ["knight-code", "learning", "plan-design-review"]
---
# Learning: no-plan-file-context

## Insight

This skill assumes a git-repo plan-mode workflow (a plan file in context, ExitPlanMode gate, PR/base-branch diff detection). It has no fallback for reviewing a standalone locked mockup in a project with no active plan file (e.g. KnightOS's Milestone 1 forge-direction mockup, reviewed directly from its HTML/screenshots and DESIGN.md, not from a Claude Code plan file). When invoked this way, skip Step 0's git/PR detection and the terminal ExitPlanMode gate entirely (they have no target), run the substantive 7 review passes against the real artifacts, and still call review_log at the end.
