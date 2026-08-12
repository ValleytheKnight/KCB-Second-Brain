---
id: "9f55565d-f615-4e00-b9a4-c931b466ce03"
type: "decision"
date: "2026-08-02"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: KnightOS Milestone 1 Task 9 gets a third piece of scope added: drag-to-reorder tabs in the tab strip...

## Decision

KnightOS Milestone 1 Task 9 gets a third piece of scope added: drag-to-reorder tabs in the tab strip, alongside the already-scoped reopen-closed-tab keyboard shortcut (in-memory close history) and per-tab color coding via the session schema's color field. Task 9's spec in the Milestone 1 Task Breakdown and its Kanban card are both updated to include drag-to-reorder as a real acceptance criterion. Scope-only change, no implementation code written yet.

## Rationale

Chris asked for this directly. Task 9 already touches the tab strip UI for the reopen shortcut and the color picker, so drag-to-reorder is a natural extension of the same vertical slice rather than a reason to split off a new task.
