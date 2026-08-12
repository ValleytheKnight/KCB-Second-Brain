---
id: "c1ce3b47-6e71-44fe-851a-379bff896cf5"
type: "decision"
date: "2026-08-09"
scope: "repo"
source: "agent"
confidence: 7
tags: ["knight-code", "decision"]
---
# Decision: KnightOS Phase 1 (multi-window system) broken into a 12-task vertically-sliced build plan, written t...

## Decision

KnightOS Phase 1 (multi-window system) broken into a 12-task vertically-sliced build plan, written to the vault at Projects/KnightOS/01 Planning/Phase 1 Multi-Window System Feature Spec.md. Tasks: 1 (generalize pane model), 2 (tear-off proof-of-concept, go/no-go), 3 (generalize multi-window routing, checkpoint), 4-7 (new pane types: browser, markdown, diff, file-explorer), 8-9 (layout modes: stacked, split), 10 (tear-off generalized + gesture UI), 11 (session schema v3), 12 (command palette/menu/shortcuts, checkpoint). Task 2 (tear-off's cross-process state sync) identified as the riskiest unproven assumption, isolated as its own XS/S-scoped task ahead of everything that depends on it, matching Milestone 1's node-pty precedent (decision 568bce33).

## Rationale

Ground truth for the task structure came from reading the real current code (TerminalManager, session.ts, main/index.ts, preload/api.ts, tab.ts, project.ts, ipc.ts), not from memory: today's app has one global BrowserWindow, TerminalManager output hardcoded to it, and a single flat Tab type with no window-type concept, which is the concrete gap Phase 1 must close. The riskiest-task determination was verified rather than assumed: cross-process synced main-process-owned state has zero precedent anywhere in this codebase, unlike new pane types or layout modes which extend existing patterns, and it compounds with TerminalManager's hardcoded output routing. Document format mirrors Project Tabs Feature Spec (sections 0-9, proposal-stage, 01 Planning) rather than Milestone 1's leaner execution-ready format, since Phase 1's complexity and open architectural questions (layout-tree shape, terminology, torn-off window chrome, pane scoping) are comparable to Project Tabs' pre-approval state, not to Milestone 1's already-locked scope. Considered treating Tabbed/Stacked/Split as three independent flat layout modes per decision 8ce60485's literal wording; instead proposed Split as the general recursive case (with Tabbed/Stacked as shapes of the same tree) based on the mockup's own nested worked example, but left this as an explicit open question for Chris rather than deciding it unilaterally, since it changes how Tasks 8-9 are scoped.
