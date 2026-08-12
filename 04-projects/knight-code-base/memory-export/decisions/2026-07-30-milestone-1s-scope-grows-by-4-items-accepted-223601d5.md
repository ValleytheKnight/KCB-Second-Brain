---
id: "223601d5-c8de-4454-9933-f4426fe88514"
type: "decision"
date: "2026-07-30"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: Milestone 1's scope grows by 4 items, accepted via the plan-ceo-review's SELECTIVE EXPANSION cherry-...

## Decision

Milestone 1's scope grows by 4 items, accepted via the plan-ceo-review's SELECTIVE EXPANSION cherry-pick ceremony: (1) a command palette for jumping to any open tab/project instantly, (2) reopen-last-closed-tab, (3) per-tab custom color/icon coding, (4) explicit schema versioning on the session-persistence save file (a version field in the saved JSON) to avoid painful unversioned-format migration pain if Milestone 2's background-service extraction ever happens.

## Rationale

All 4 were surfaced neutrally during the KnightOS PRD's plan-ceo-review (decision f7fb7c5c, SELECTIVE EXPANSION mode) and individually approved by Chris. Command palette and reopen-closed-tab are cheap additions on top of state Milestone 1 already builds (tabs, session persistence). Tab color coding was surfaced with a deferred recommendation but Chris chose to add it now anyway. Schema versioning is near-free insurance against a real, foreseeable future migration cost.
