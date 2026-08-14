---
id: "b979c3be-801e-4391-9cb9-db8f14bce564"
type: "decision"
date: "2026-08-12"
source: "agent"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: KnightOS Phase 1 Multi-Window Task 3 (apply the approved mockup visual design) implemented and verif...

## Decision

KnightOS Phase 1 Multi-Window Task 3 (apply the approved mockup visual design) implemented and verified. The lunaris token set from knightos-mockup.pen now covers every surface Tasks 1-2 shipped: project rail, channel/tag rail, terminal chrome, all dialogs, command palette, and the torn-off window's chrome, which was reworked from a native-OS-frame-plus-overlaid-header into a real frame:false BrowserWindow with its own drawn title bar (ember accent, drag region, minimize/maximize/close via three new ChromeWindow* IPC channels), matching the mockup's View 7 pop-out treatment rather than approximating it.

## Rationale

Chris asked explicitly to study the mockups closely (knightos-mockup.pen and 02 Design/Mockups.md) before and during the retheme, rather than rush an approximation. Studied the actual exported reference images directly (iyyfD.png View 7 pop-out, z86KAl.png agent terminal, UttLI.png close confirmation, bDKT1.png command palette) since the .pen file itself needs a live Pencil editor session unavailable in this environment. Verified fidelity against the real running app via Playwright screenshots, not just by reading the CSS values in isolation, which caught a real layout bug: the torn-off window's root reused .app-shell, a row-flex meant for the main window's rail-beside-content shape, causing its title bar and terminal area to lay out side by side instead of stacked. JetBrains Mono and Geist Sans vendored locally via @fontsource (OFL-licensed, self-hosted, no CSP change, no external font CDN) rather than approximated with system font fallbacks, since real typographic fidelity was the explicit ask. Full suite green throughout: typecheck, 199/199 Vitest, 47/47 Playwright e2e.
