---
id: "b2087fc4-dbe2-48f8-a8d5-7506980b82ff"
type: "decision"
date: "2026-07-30"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: 3 real engineering-execution fixes to KnightOS's Milestone 1 task breakdown, found during plan-eng-r...

## Decision

3 real engineering-execution fixes to KnightOS's Milestone 1 task breakdown, found during plan-eng-review: (1) Session Persistence moves to Task 6 (right after multi-tab support exists), fixing a real dependency-ordering bug where the original Task 7 depended on a task numbered after it. (2) Task 1 (Electron scaffold) explicitly includes designing the preload-script IPC bridge (Electron's contextBridge) that lets the renderer safely request file access, terminal spawning, and git commands from the main process, required because contextIsolation is on and nodeIntegration is off. (3) Testing framework named: Vitest for pure logic (session-file parsing, command-palette filtering), Playwright for Electron end-to-end flows (tab open/close/switch).

## Rationale

All 3 surfaced during plan-eng-review (architecture and test-coverage sections) and approved by Chris. The dependency-ordering bug was a real defect that would have blocked implementation; the preload-bridge gap was architecturally load-bearing (every later feature task assumes this exists) and cheap to specify now versus retrofit later; the testing framework fills a real gap, nothing named automated verification beyond manual checks.
