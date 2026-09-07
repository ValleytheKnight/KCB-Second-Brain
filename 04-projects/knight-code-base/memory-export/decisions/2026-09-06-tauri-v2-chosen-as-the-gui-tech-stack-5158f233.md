---
id: "5158f233-5a1a-4105-a603-aa56ff086761"
type: "decision"
date: "2026-09-06"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: Tauri v2 chosen as the GUI tech stack for the Omarchy image-theme app, over gtk-rs, Electron, and Py...

## Decision

Tauri v2 chosen as the GUI tech stack for the Omarchy image-theme app, over gtk-rs, Electron, and PySide6

## Rationale

Lightest genuinely native option that keeps HTML/CSS for the UI (color swatches, sliders, drag-drop), which stays easy for Chris to tweak visually later. Alternatives considered: gtk-rs (fully native, no webview, but means hand-drawn Rust widget code for every visual change), Electron (ruled out, documented Wayland fractional-scale bug already hit on this exact machine), PySide6 (fastest to build, heaviest runtime of the three real contenders).
