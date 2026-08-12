---
id: "568bce33-d15c-4928-b9b6-b8bcdaf46e40"
type: "decision"
date: "2026-07-31"
scope: "repo"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: KnightOS's Milestone 1 Task Breakdown gets a new Task 2, "node-pty in Electron, proof of concept," i...

## Decision

KnightOS's Milestone 1 Task Breakdown gets a new Task 2, "node-pty in Electron, proof of concept," inserted before the terminal-UI work, isolating node-pty's Electron-specific native-module rebuild and preload/IPC round trip as its own tiny vertical slice. Old Task 2 ("Single tab, real terminal") becomes Task 3 and now depends on this new Task 2 instead of directly on Task 1; every task from old Task 3 onward renumbers up by one (old Task 9, Auto-update, becomes Task 10); the Task-2 checkpoint becomes the Task-3 checkpoint; and the Risks table's node-pty row is corrected to state the real, still-open risk (Electron's own runtime ABI, not the standalone Node runtime already verified) rather than treating it as already resolved.

## Rationale

node-pty is a native Node module and has to be rebuilt specifically against Electron's own bundled runtime ABI, not the regular Node runtime the earlier standalone verification used. This is a well-documented real pain point in Electron development and was the single riskiest unverified assumption still sitting inside Milestone 1. The original Task 2 description claimed this risk was already resolved ("Windows/ConPTY compatibility already verified on Chris's machine"), which conflated standalone-Node verification with proof inside Electron itself, those are not the same thing. Splitting it into its own thin but genuinely vertical slice (native module rebuild, one process spawned in the main process, one byte of output round-tripped through the hardened preload/IPC bridge from Task 1, no terminal UI yet) keeps the vertical-slicing rule (decision dc8e14d6) intact: it is still real, testable, end-to-end behavior, just deliberately minimal in scope, not a horizontal layer. If it fails, it is found immediately and cheaply, before any xterm.js rendering, ANSI/VT handling, resize, or scrollback work gets built on an assumption that was never actually proven inside the real app shell.

## Alternatives Considered

Considered folding this verification into old Task 2's acceptance criteria instead of a separate task, rejected because it would blur a go/no-go native-module risk check with real UI feature work in the same task, and would not give as clean a stop-here-if-it-fails checkpoint before committing to the larger xterm.js effort. Considered a lettered sub-task (Task 2a/2b) instead of a full renumber, rejected in favor of matching this document's existing sequential-numbering convention rather than introducing a scheme not used anywhere else in it.
