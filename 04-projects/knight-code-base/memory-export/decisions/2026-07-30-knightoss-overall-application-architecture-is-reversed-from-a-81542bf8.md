---
id: "81542bf8-2f72-444e-a2e5-5cbd1b650885"
type: "decision"
date: "2026-07-30"
scope: "repo"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: KnightOS's overall application architecture is reversed from a native WinUI3/.NET shell to an Electr...

## Decision

KnightOS's overall application architecture is reversed from a native WinUI3/.NET shell to an Electron-based shell (renderer process in web tech), with real Windows-shell-level PC control (window snap/focus, global hotkeys, process launch) deferred to a separate native companion program built later, after the Electron shell itself is functional, rather than attempted inside the Electron process. This supersedes decision 223325c9. The Milestone 1-4 sequence, vertical-slicing rule (decision dc8e14d6), full-fidelity terminal (decision 2866ea40), and graph-panel UI/UX overhaul (decision d3056b62) all still stand; only the underlying app-shell technology changed. The graph panel's embedding mechanism simplifies as a direct consequence: Electron already renders web content natively, so lorebrain's graph.html no longer needs the WebView2-specific embedding decision 2eefa291 described, a plain in-app browser view now serves the same purpose.

## Rationale

Chris weighed real evidence (native Windows development has documented extra friction: MSIX packaging bugs, legacy Win32 interop, past Microsoft framework churn/skepticism) against the structural fact that Electron's Chromium sandbox can never grant window-snap/global-hotkey access from inside the shell itself. After confirming he still wants Milestone 3's capabilities and does not want to drop them, he chose to keep them by isolating shell-control into a separate native helper program built later, rather than requiring the whole app to be native from day one. This directly serves his stated real "why" (decision 5986aa7a, full ownership/control) by choosing the architecture that lets him start building and using KnightOS sooner (Electron's larger ecosystem, simpler tooling) while preserving the path to full shell-level control later, at the cost of eventually maintaining two programs in two languages rather than one unified codebase.

## Alternatives Considered

Keeping native WinUI3 for the whole app despite its documented friction (rejected, given Electron's ecosystem/tooling advantage for the parts that don't need OS-level access); dropping Milestone 3 entirely to make pure Electron fully sufficient (considered and explicitly reversed by Chris after a direct confirmation check, since it meant permanently losing real shell-control capability he confirmed he wants).
