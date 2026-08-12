---
id: "6a296d5b-4ba1-4f42-b4b7-de552b2b994f"
type: "decision"
date: "2026-07-31"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: DevKnight takes on vault currency as a standing, self-firing responsibility rather than something th...

## Decision

DevKnight takes on vault currency as a standing, self-firing responsibility rather than something that only happens during "pause project X". A new "Keeping the vault current" rule was written into DevKnight's own definition (via update_agent) and mirrored into the DevKnight Workshop vault's own workshop_management.md rulebook. It names five triggers that fire on their own without being asked (a plan review completes; a significant decision is locked or reversed; a task breakdown is created or changes shape; scope moves in or out of a milestone; a build task starts, finishes, or fails), and five artifacts to check and repair in the same session on each one (the project's Continuation Point, its kanban board, its one-liner in Projects/_index.md, any folder README whose assumptions the change invalidated, and the day's Calendar daily note). It also requires verifying against real current state (fresh file reads, decision_search for the real decision trail, and an on-disk check of the actual code directory before writing anything about build status) rather than against the conversation or a prior summary, and reporting what was synced in one line rather than doing it silently. Alongside this, KnightOS's stale vault content was repaired: 00 Overview.md's Continuation Point rewritten, 07 Progress/kanban.md rebuilt, 02 Design/README.md and 03 Diagrams/README.md and 06 Lessons Learned/README.md updated, a new Electron Process Architecture canvas added, Projects/_index.md and the daily note updated.

## Rationale

Chris caught the drift himself and said directly that these are things DevKnight should be checking on and keeping up with, making this a standing gap in DevKnight's operating discipline rather than a one-off cleanup. The root cause was structural, not carelessness: vault updates had only ever been wired into the pause protocol, and pause only fires when Chris asks to stop, so an entire planning arc can complete and a build can start without one ever happening. Verified extent of the drift: KnightOS's Continuation Point was frozen at its original office-hours pause while an architecture reversal from native WinUI3 to Electron (decision 81542bf8), a completed plan-ceo-review (f7fb7c5c), a completed plan-eng-review (b2087fc4), a 10-task Milestone 1 breakdown (568bce33 renumbering included), and the start of Task 1's real build all landed on top of it; the kanban still listed WinUI3/ConPTY/WebView2 items including a graph-panel embed that decision 5321f1c5 had removed from Milestone 1 entirely; the design README still described winui-design producing XAML. Placing the rule as its own subsection rather than folding it into the pause procedure was deliberate: folding it into pause would have reproduced the exact failure, since pause is the step that never ran. The on-disk verification requirement was added because Task 1's real status (in progress, main process and renderer not yet written, no git repo, no acceptance criteria verified) was only knowable by checking the build directory directly, not from the dispatch itself. Alternatives weighed: leaving it to the pause protocol (rejected, that is the failure mode), or a periodic sweep (rejected, no trigger to fire it and it would still let drift sit until the sweep ran).

## Alternatives Considered

Folding the rule into the existing "pause project X" procedure (rejected, pause only fires when Chris asks to stop, which is exactly why the drift happened). A periodic or session-start vault sweep (rejected, nothing would trigger it reliably and drift would still sit unrepaired between sweeps). Leaving vault currency to Chris to flag (rejected outright, that is the complaint being answered).
