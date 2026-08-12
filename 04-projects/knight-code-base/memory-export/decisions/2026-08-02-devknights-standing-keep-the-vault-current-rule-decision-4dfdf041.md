---
id: "4dfdf041-d78d-4e50-a02b-baac6a262254"
type: "decision"
date: "2026-08-02"
scope: "repo"
source: "agent"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: DevKnight's standing "keep the vault current" rule (decision `6a296d5b`) gets a named 6th sync artif...

## Decision

DevKnight's standing "keep the vault current" rule (decision `6a296d5b`) gets a named 6th sync artifact: the project's own task-breakdown document (e.g. KnightOS's Milestone 1 Task Breakdown.md), specifically its per-task Status line and acceptance-criteria/verification checkboxes, distinct from the kanban board. Root cause of the recurring stale-checkbox problem Chris flagged: that document got a real Status line and checked boxes for Tasks 1-6 during the original vault-currency repair, but Tasks 7, 8, and 9 then shipped, verified, and committed real work with neither this document's own per-task fields nor the Milestone 1 Kanban's Done column updated again, three real completions in a row narrating pre-completion state. The kanban board was already named in the standing rule's trigger list and still went stale for those same three tasks, because attention concentrated on the Continuation Point (the prose artifact read every session) as though it alone were authoritative, while the two structured, checkbox-bearing artifacts were treated as secondary. Fixed in this session: Tasks 7, 8, 9 in Milestone 1 Task Breakdown.md now carry real Status lines, commit references, and checked boxes; the Milestone 1 Kanban's Done column gained cards for Tasks 7, 8, 9 and the two ad hoc pieces (folder-picker fix, native menu); devknight's own agent definition (via update_agent) and the vault's workshop_management.md both had the 6th artifact and this root-cause account added to the standing rule.

## Rationale

Chris named this a recurring problem, not a one-off, so the fix needed to be a rule change, not just a one-time cleanup of the stale boxes. The mechanism was verified directly rather than guessed: real commit hashes from `git log` in the KnightOS repo (`21c6560`, `313accf`, `4cd1854` for Tasks 7-9) were cross-checked against dev-diary entries and the existing decision log, confirming Tasks 7-9 were genuinely complete, and the Milestone 1 Task Breakdown document itself was read fresh and confirmed to have no Status line or checked boxes for those three tasks despite that. The standing rule already named "kanban board" as a trigger-driven artifact, so simply repeating that name wouldn't have closed the gap; the task-breakdown document needed to be named as its own separate, equally load-bearing artifact, since treating "kanban board" as covering it is exactly the assumption that let both go stale together.</parameter>

## Alternatives Considered

Only fixing the visible stale checkboxes without changing the standing rule (rejected, Chris asked for the actual root cause and a fix, not just the boxes checked, and a one-time cleanup would leave the same gap open for Task 10 onward). Treating the kanban board's own drift as the whole story (rejected, the task-breakdown document is a genuinely separate file with its own separate per-task fields, and conflating the two is the actual cause of the gap).
