---
id: "2531000a-4f43-4697-affa-c308d153b7ea"
type: "decision"
date: "2026-09-07"
scope: "repo"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: omarchy-image-theme: image/folder file I/O goes through custom Rust Tauri commands, not the generic ...

## Decision

omarchy-image-theme: image/folder file I/O goes through custom Rust Tauri commands, not the generic @tauri-apps/plugin-fs JS API. Frontend uses @tauri-apps/plugin-dialog for picking (dialog:allow-open only), passes the picked path to a custom command that canonicalizes/bounds-checks it in Rust. No fs:allow-read scope is granted for arbitrary user-picked paths, and no $HOME/** grant is used.

## Rationale

Batch mode's real scope ("point at a directory") can't be expressed as a static fs capability glob, and Tauri v2 has no documented mechanism granting temporary fs-scope access for a dialog- or drag-drop-picked path outside a declared scope (verified against the official fs plugin docs and the Tauri team's own GitHub discussion on this exact gap). Capabilities gate whether a custom command is callable, not what std::fs calls inside it can touch, so routing through a custom command avoids ever needing a broad $HOME/** grant, which tauri-dev's own rules already forbid. Alternatives considered: a static fs:allow-read scoped to $PICTURE/** (the plan's own worked example), rejected since it doesn't cover an arbitrary user-chosen batch folder; a broad $HOME/** or **/* scope (the workaround seen in Tauri's own community discussion of this gap), rejected as the exact over-broad grant tauri-dev warns against.
