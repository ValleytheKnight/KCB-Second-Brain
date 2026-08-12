---
id: "7da99a3a-bb3c-4785-8547-35b54807df87"
type: "decision"
date: "2026-08-04"
scope: "repo"
source: "user"
confidence: 10
tags: ["knight-code", "decision"]
---
# Decision: KnightOS Project Tabs: the Project-reorder keyboard binding is settled as `Ctrl+ArrowUp`/`Ctrl+Arrow...

## Decision

KnightOS Project Tabs: the Project-reorder keyboard binding is settled as `Ctrl+ArrowUp`/`Ctrl+ArrowDown` on a focused Project chip, as shipped in Task F. The `Ctrl+Shift+Up/Down` an earlier draft of the Project Tabs Feature Spec proposed is closed out and is not to be revisited. Chris ruled on this directly on August 4, 2026, accepting the reasoning already recorded under decision `6c7ba49e`. This also establishes a standing rule for any future KnightOS shortcut: KnightOS has two deliberately separate classes of keyboard binding, and a new shortcut picks its modifier from which class it belongs to rather than from what happens to be unclaimed. Global, app-wide shortcuts that fire regardless of focus use `Ctrl+Shift+*` (`Ctrl+Shift+T`, `Ctrl+Shift+N`, `Ctrl+Shift+W`, `Ctrl+Shift+Tab`), and `Ctrl+Shift` stays reserved for them. Focus-scoped rail bindings that only fire while a rail control itself holds focus use plain `Ctrl+Arrow` (`Ctrl+ArrowLeft`/`Ctrl+ArrowRight` for channel reorder from Task 9, `Ctrl+ArrowUp`/`Ctrl+ArrowDown` for Project reorder from Task F).

## Rationale

Two reasons carried the call, both accepted by Chris in his own words as the accepted basis. (1) Symmetry: `Ctrl+ArrowUp/ArrowDown` on the Project rail mirrors the already-shipped, already-tested channel-strip `Ctrl+ArrowLeft/ArrowRight` exactly one tier up, the same gesture one level higher in the hierarchy, so the two rails read as one consistent system rather than two arbitrary bindings. Both listeners are scoped to a focused rail control, so there is nothing an extra Shift would disambiguate against. (2) Reserving `Ctrl+Shift` for global app-wide shortcuts: spending a `Ctrl+Shift` combo on a focus-scoped reorder would blur the line between the two classes, and that distinction is what makes the modifier choice predictable for every shortcut added later. Collision risk was verified rather than assumed when Task F shipped: `menu.ts` binds no `Ctrl+Arrow` accelerator, and `TerminalPane`'s xterm.js key handler intercepts only Ctrl+C/Ctrl+V, so the terminal never competes for these keys. Logged as its own decision rather than left as a note inside `6c7ba49e` because that decision recorded the binding as the agent's default pending Chris's answer, and the point of this entry is that the question is now closed with real user authority behind it, plus the reusable modifier-class rule that falls out of it. Confidence 10 covers the binding itself, which Chris stated directly. The modifier-class rule generalizing from it is this agent's articulation of the reasoning he accepted, not separate wording of his own.
