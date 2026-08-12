---
id: "a91960b4-e3fb-4f47-940b-dc454e385189"
type: "decision"
date: "2026-08-02"
scope: "repo"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: KnightOS's native application menu (Task B) never binds a live Electron keyboard accelerator for the...

## Decision

KnightOS's native application menu (Task B) never binds a live Electron keyboard accelerator for the two shortcuts that already existed as renderer-side capture-phase listeners (Ctrl+K command palette, Ctrl+Shift+T reopen-closed-tab); both show their real binding in the menu as a display-only label only (registerAccelerator: false). Brand-new menu items with no prior shortcut (Open Project, Close Tab, Copy, Paste) get no keyboard accelerator at all, rather than inventing new ones.

## Rationale

KnightOS embeds a real, full-fidelity terminal (node-pty/xterm.js), and Electron's native menu accelerator system claims a keystroke at the OS level before the renderer's own JS event pipeline ever sees it. Binding Ctrl+K/Ctrl+Shift+T as live accelerators would risk racing or silently overriding the renderer's own already-tested capture-phase listeners that make those shortcuts survive xterm.js owning keyboard focus. Several obvious candidate accelerators for the new items (Ctrl+W especially, a near-universal readline/shell "delete word backward" binding; also Ctrl+O, used by bash's operate-and-get-next and vim's jumplist) would silently steal real, commonly-used keystrokes from whatever shell or CLI tool is running inside the terminal, a real regression against the app's core promise of full-fidelity terminal behavior. Task 8's own Ctrl+K already accepted a narrower version of this same tradeoff (colliding with readline's own kill-line binding) as a conscious choice; this design didn't repeat that trade for new items without an equally deliberate reason.

## Alternatives Considered

Binding Ctrl+K/Ctrl+Shift+T as live Electron accelerators too (rejected: would create two competing keystroke-owning mechanisms for the same shortcut, main-process accelerator vs. renderer listener, with unpredictable double-fire/swallow behavior). Giving new items real accelerators matching common conventions like Ctrl+O (Open) and Ctrl+W (Close), mirroring generic desktop-app convention (rejected: Ctrl+W specifically collides with a near-universal shell/readline binding; Windows Terminal, the most directly comparable sibling app, deliberately avoids Ctrl+W for exactly this reason and uses Ctrl+Shift+W instead, real evidence favoring the more conservative no-new-accelerator choice over guessing at a safe combo).
