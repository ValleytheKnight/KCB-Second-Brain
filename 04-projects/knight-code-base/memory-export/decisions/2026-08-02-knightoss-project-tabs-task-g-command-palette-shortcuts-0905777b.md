---
id: "0905777b-a062-4787-8a45-1d43c67d373d"
type: "decision"
date: "2026-08-02"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: KnightOS's Project Tabs Task G (command palette + shortcuts, project-aware) also updates the real na...

## Decision

KnightOS's Project Tabs Task G (command palette + shortcuts, project-aware) also updates the real native application menu bar (src/main/menu.ts, File/Edit/View/Help) to reflect the new Project-aware commands and keyboard shortcuts, rather than leaving the menu to silently drift out of sync with the new left-rail Project tier. Concretely: the File menu gains "New Project" and "Close Project" entries dispatched through the existing one-way MenuAction IPC channel, and any of the three new shortcuts that exist as renderer-side capture-phase listeners get registerAccelerator: false with the real combo shown as a display-only label, following the exact pattern decision a91960b4 already established for Ctrl+K and Ctrl+Shift+T.

## Rationale

Chris confirmed this directly as part of approving the Project Tabs spec to move forward. The native menu is real, shipped, user-facing surface (added outside the numbered Milestone 1 task sequence, per 00 Overview.md's Continuation Point), and the spec's own review had already flagged that no task currently owned keeping it in sync once Project-aware shortcuts exist. Reusing decision a91960b4's established accelerator pattern (display-only label, no live Electron accelerator, for any shortcut that already has a tested renderer-side capture-phase listener) avoids repeating that decision's own reasoning: KnightOS embeds a full-fidelity terminal, and a live native accelerator would let Electron's menu system claim a keystroke at the OS level before the renderer's own listener ever sees it, risking a race or a silently swallowed key.</parameter>

## Alternatives Considered

Leaving the native menu unmaintained and letting Project-aware commands exist only via keyboard shortcut and the left rail's own UI (rejected, Chris confirmed he wants the menu kept current rather than allowed to go stale a second time). Binding the new shortcuts as live Electron accelerators for menu discoverability (rejected, repeats the exact risk decision a91960b4 already ruled out: Electron's native accelerator system would claim the keystroke before xterm.js or the renderer's own capture-phase listener ever saw it).
