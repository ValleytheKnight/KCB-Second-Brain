---
id: "9de7619e-22f9-4bcf-a4c3-722bf3e83099"
type: "decision"
date: "2026-08-14"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Scryptable ships as a PyInstaller onefile .exe for v1; the onedir + Inno Setup installer p...

## Decision

Scryptable ships as a PyInstaller onefile .exe for v1; the onedir + Inno Setup installer path is deferred, not abandoned.

## Rationale

V1 has no outside users yet, only Chris testing it, so the simplest packaging that produces a giveable .exe wins: one tool (PyInstaller --onefile), no separate installer-build step. The tradeoff is startup speed (onefile self-extracts to a temp folder on every launch) and first-impression trust (a proper Setup.exe with Start Menu entry and uninstaller reads as more legitimate to a stranger than a bare unsigned .exe). Once real outside users are on the app, switch to PyInstaller --onedir wrapped in an Inno Setup installer for faster startup and a normal Windows install/uninstall experience.
