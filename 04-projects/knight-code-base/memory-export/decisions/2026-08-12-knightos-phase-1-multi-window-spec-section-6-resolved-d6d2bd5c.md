---
id: "d6d2bd5c-0131-426f-b849-31e4a4078adf"
type: "decision"
date: "2026-08-12"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: KnightOS Phase 1 Multi-Window spec Section 6 resolved: (1) terminology - "channel" extends to cover ...

## Decision

KnightOS Phase 1 Multi-Window spec Section 6 resolved: (1) terminology - "channel" extends to cover all five pane kinds, no separate "window type" term; (2) layout-tree shape - Split is the general case, Tabbed and Stacked are shapes of the same Split/TabGroup tree, not three mutually exclusive modes; (3) torn-off chrome - a torn-off pane keeps KnightOS's own app-level title bar, not a bare native OS frame; (4) pane scoping - new pane types are scoped to one Project like terminal channels today, with "pane can exist independent of a Project" logged as a later roadmap item, out of Phase 1 scope.

## Rationale

Chris answered all four open questions from Phase 1 Multi-Window System Feature Spec.md Section 6 directly via AskUserQuestion. Spec updated in place at Projects/KnightOS/01 Planning/Phase 1 Multi-Window System Feature Spec.md.
