---
id: "c29dac8b-f51a-40f0-a4ca-da9ff0c51474"
type: "decision"
date: "2026-08-13"
scope: "repo"
source: "agent"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: KnightOS Phase 1 Multi-Window Task 5 (generalize multi-window routing) is complete, code-reviewed, s...

## Decision

KnightOS Phase 1 Multi-Window Task 5 (generalize multi-window routing) is complete, code-reviewed, simplified, and committed as commit `547ad63` on `master`. This closes the Phase 1 checkpoint after Task 5: the foundational architecture (generalized panes, proven tear-off, generalized routing) is now proven for any number of simultaneously torn-off OS windows, not just one, with the approved visual design already applied and no known gap on it. Everything after this point (Tasks 6-14) extends proven infrastructure to new pane types and layout modes rather than proving new architecture.

## Rationale

TerminalManager's output-routing callback dropped its last fallback reference to the single global mainWindow variable, satisfying the task's literal acceptance criterion; the fallback was already dead in every real path since windowRegistry always maps MAIN_WINDOW_ID to the real mainWindow whenever one exists. A real, previously-unknown bug was found by this task's own verification, not by inspection: tearing off the currently active pane left the main window's one remaining pane mounted but never marked active, so it stayed permanently invisible, since TerminalPane.tsx's `active` prop controls visibility. This is not an edge case, tearing off whatever pane happens to be in front is completely ordinary usage. Fixed by handing active status to another still-docked pane in the same Project the moment a torn-off broadcast shows the active one just left, extracted as a plain, unit-tested function (`project.ts`'s `reassignActivePaneAfterTearOff`, 5 new Vitest cases) rather than left inline in App.tsx, matching this file's own established pattern for pure per-Project logic. A new e2e test (`e2e/multi-window-routing.spec.ts`) proves 3 real simultaneous OS windows each producing genuinely independent terminal output, the acceptance criteria's own required proof. Building that test surfaced two real, separate findings, both handled rather than ignored: simulated Playwright keyboard input across 3 simultaneous Electron windows on this machine reported `document.hasFocus()` true in all three at once (impossible on a real desktop) and produced spurious cross-window keystroke leakage traced conclusively to Playwright's own input dispatch (a main-process diagnostic log showed routing was correct every single time), fixed by calling the app's own `window.knightos.terminal.write` bridge directly from each window's own page context instead of simulating keystrokes; and a separate, genuine but narrow platform-layer race was found where writing to two different panes' real ptys with zero gap between the calls could let characters cross between them in either direction, confirmed via the same diagnostic log to be unrelated to this app's own routing, and not reachable by any realistic human typing pattern (a person always takes far longer than the race window to click into a different window), so it does not block this task; recorded honestly in TODOS.md rather than silently worked around. Verified: typecheck clean, 204/204 Vitest (5 new), 48/48 Playwright e2e in a full serial run, one close-project.spec.ts failure on the first pass unrelated to any file this task touched, confirmed as this machine's known full-suite timing flake by rerunning it alone.
