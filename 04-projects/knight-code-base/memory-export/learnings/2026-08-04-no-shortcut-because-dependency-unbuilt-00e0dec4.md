---
id: "00e0dec4-309f-40fb-a0c9-7ecefca79ead"
type: "learning"
date: "2026-08-04"
skill: "plan-eng-review"
learning-type: "preference"
key: "no-shortcut-because-dependency-unbuilt"
confidence: 9
trusted: true
source: "user-stated"
tags: ["knight-code", "learning", "plan-eng-review"]
---
# Learning: no-shortcut-because-dependency-unbuilt

## Insight

When there's no stated deadline, don't default-recommend a cheaper option just because it reuses an existing pattern or avoids building something new. Chris explicitly rejected a silent-fallback recommendation on those grounds during KnightOS Milestone 6's eng review: "if something doesn't exist that needs to in order for made decision to be realized then it will have to be queued for development. we arent cutting corners because a dependency doesnt exist yet. that is lazy and not thoughtful." Apply this whenever a plan review is choosing between a complete option and a cheaper one under no time pressure, default to proposing the complete option as the recommendation, not the reuse-shaped shortcut.
