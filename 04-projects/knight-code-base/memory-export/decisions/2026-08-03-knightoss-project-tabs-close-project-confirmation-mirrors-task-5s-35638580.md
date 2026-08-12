---
id: "35638580-0bbf-42d9-8a3f-b859cc171580"
type: "decision"
date: "2026-08-03"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: KnightOS's Project Tabs close-Project confirmation mirrors Task 5's existing per-channel close-confi...

## Decision

KnightOS's Project Tabs close-Project confirmation mirrors Task 5's existing per-channel close-confirmation logic exactly, one tier up: a Project with nothing running inside it closes immediately, no prompt. A Project with one or more channels actively running shows exactly one combined confirmation naming how many channels are still hot; confirming ends every running process and removes the Project, cancelling leaves everything untouched. This resolves the Project Tabs Feature Spec's section 6, question 3 (previously the last of two open questions besides the cross-project command palette).

## Rationale

This was presented to Chris as a real, unresolved product/UX question rather than picked unilaterally, since it turns on how much friction feels right around Chris's own workflow, not a technical tradeoff. Chris chose Option A directly: mirror today's per-channel rule exactly, one combined warning only when something is actually running, no prompt when a Project is already idle.

## Alternatives Considered

Always confirming before closing any Project regardless of whether anything is running (Option B, presented alongside A): rejected by Chris. It would add a click to every single Project close, including the common case of an already-idle Project, and a confirmation that fires unconditionally risks becoming a reflexive, unread click rather than real protection.
