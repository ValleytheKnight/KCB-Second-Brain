---
id: "64bdbf84-35cd-4a4f-aee3-da44f34c34a6"
type: "decision"
date: "2026-09-11"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: omarchy-theme-forge contains process execution with a source-scanning guard test (src-tauri/tests/co...

## Decision

omarchy-theme-forge contains process execution with a source-scanning guard test (src-tauri/tests/command_call_sites.rs) rather than with a Tauri capability. The test reads every .rs file under src/, extracts the program expression from each Command::new call site, and fails unless it is on a sanctioned list, does not assemble its own text, does not name a shell, and does not reach Command through an alias.

## Rationale

Capabilities gate what the WebView may invoke through a plugin and place no constraint on std::process::Command inside a Rust command, so the plan's original containment was not a real control (implementation scan finding 1; the spec half was already corrected by decision 16673ead). Fails closed: a new call site fails until someone adds it to the list, which makes sanctioning one a visible edit rather than a default. The text rule applies to list entries too, so an assembled program name cannot be sanctioned by adding it. Verified against three planted bad call sites. Known limits: it does not trace data flow, so a sanctioned bare identifier later re-bound to caller input still passes, and it covers no execution route other than std::process::Command. Alternative considered and rejected: a wrapper module that is the only caller of Command::new, taking an enum of sanctioned programs. Stronger, since the type system would carry the property, but it changes working code and sits outside the finding's scope, which was to lock the existing property in place.
