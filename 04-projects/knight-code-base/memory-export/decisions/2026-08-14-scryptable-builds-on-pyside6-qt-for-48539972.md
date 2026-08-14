---
id: "48539972-8af1-41b7-8e91-7c52b959eac0"
type: "decision"
date: "2026-08-14"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Scryptable builds on PySide6 (Qt for Python), not WinUI3, Tauri, or Avalonia.

## Decision

Scryptable builds on PySide6 (Qt for Python), not WinUI3, Tauri, or Avalonia.

## Rationale

The app is a GUI shell around an existing, working Python pipeline (transcribe_stems.py, TASMAS clone). PySide6 keeps the app in the same language as that pipeline, so it can import the scripts as modules directly instead of shelling out to a subprocess and parsing exit codes/stdout, and QtMultimedia gives built-in audio playback for the planned QA flagged-window review screen. Genuine stack expansion for DevKnight (previously scoped to WinUI3/WPF native and Electron), not its existing skillset, but Chris explicitly said DevKnight should grow new tooling when a project calls for it. Alternatives considered: WinUI3 (native Windows, DevKnight's existing skillset, but stays cross-language via subprocess), Tauri (small Rust+web app, but adds two new languages and still needs a Python bridge), Avalonia (cross-platform .NET, but cross-platform portability is wasted on a single-machine Windows-only tool).
