---
id: "69dbea9b-995f-4802-a8f1-15381a9c14ff"
type: "learning"
date: "2026-09-11"
skill: "cso"
learning-type: "architecture"
key: "tauri-capabilities-do-not-gate-rust-side-execution"
confidence: 9
source: "observed"
tags: ["knight-code", "learning", "cso"]
---
# Learning: tauri-capabilities-do-not-gate-rust-side-execution

## Insight

Tauri v2 capabilities gate what the WebView may invoke through plugin commands. They place no constraint whatsoever on std::process::Command or std::fs called inside Rust. Proven live in omarchy-theme-forge: src-tauri/capabilities/default.json grants only core:default and dialog:allow-open, with no shell permission of any kind, yet src-tauri/src/dependencies.rs:85 runs Command::new(path).arg("--version").output() and succeeds, confirmed by the app reporting wallust 3.5.2 in a real session. The trap is that a plan can name shell:allow-execute as its containment control for process execution and read as though it constrains the Rust side: omarchy-theme-forge's Task 17 did exactly that, with an acceptance criterion asserting that Command::new against a disallowed binary would fail at the capability layer, which can never be demonstrated because the capability layer is not in that code path. Rule: when reviewing a Tauri app, treat a capability entry as documentation of intent plus a real gate on the JS-side plugin surface, never as a sandbox around Rust. Containment for Rust-side execution comes from code: absolute paths from fixed constants, arguments passed as separate .arg() values rather than through a shell, and no command string built from user input. Note that this project's own Eng Review decision 2531000a had already stated the correct principle for the filesystem ("Capabilities gate whether a custom command is callable, not what std::fs calls inside it can touch") and the same reasoning simply was not carried across to process execution, so the correct understanding existing somewhere in the project's decisions is no guarantee a later task inherits it.
