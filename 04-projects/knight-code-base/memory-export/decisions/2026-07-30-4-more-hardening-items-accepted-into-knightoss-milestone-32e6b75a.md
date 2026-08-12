---
id: "32e6b75a-9799-4344-a034-c08804aff772"
type: "decision"
date: "2026-07-30"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: 4 more hardening items accepted into KnightOS's Milestone 1 scope via the plan-ceo-review's Section ...

## Decision

4 more hardening items accepted into KnightOS's Milestone 1 scope via the plan-ceo-review's Section 1-4 findings: (1) Electron contextIsolation enabled + nodeIntegration disabled from the app's initial scaffold, not retrofitted later, (2) git status displays "no git info" gracefully when git isn't installed or the folder isn't a repo, rest of the tab stays usable, (3) a manual rollback-to-previous-version option ships alongside electron-updater's auto-update capability, (4) a single-instance lock (Electron's requestSingleInstanceLock) prevents two KnightOS processes from corrupting the shared session-persistence file.

## Rationale

All 4 surfaced as real gaps during the KnightOS PRD's plan-ceo-review (architecture, error/rescue, and edge-case sections) and individually approved by Chris, each at effort XS-S, addressing concrete, well-documented failure modes rather than speculative ones.
