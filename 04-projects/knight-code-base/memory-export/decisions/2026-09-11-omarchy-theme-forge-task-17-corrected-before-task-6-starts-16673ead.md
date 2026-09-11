---
id: "16673ead-089d-41b4-8f2b-fec7d9cba969"
type: "decision"
date: "2026-09-11"
scope: "repo"
source: "agent"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: omarchy-theme-forge Task 17 corrected before Task 6 starts: its shell-execute capability is no longe...

## Decision

omarchy-theme-forge Task 17 corrected before Task 6 starts: its shell-execute capability is no longer treated as the containment control for Rust-side process execution, and setting a Content Security Policy is folded into its scope. Task retitled "Finalize capability manifest and Content Security Policy", rescoped S to M.

## Rationale

The implementation-time security scan found Task 17's fourth acceptance criterion asserts something that cannot happen: that invoking Command::new against a disallowed binary "fails at the capability layer". Tauri v2 capabilities gate what the WebView may invoke through plugin commands and place no constraint on std::process::Command or std::fs inside a Rust command. Verified against the real code rather than inferred: src-tauri/capabilities/default.json grants only core:default and dialog:allow-open, with no shell permission of any kind, yet src-tauri/src/dependencies.rs executes the sidecar via Command::new and succeeds, confirmed live by the app reporting wallust 3.5.2 in Chris's session. Left unfixed, the criterion would either be marked passed on a test that cannot fail or block the task with an impossible requirement, and a review would sign off believing process execution is constrained when it is not. The capability entry is kept, since it does gate the JS-side shell plugin and documents intent, but the criterion is replaced with a real control: every Command::new call site takes its path from a fixed constant or sidecar_path(), arguments pass as separate .arg() values rather than through a shell, no command string is built from user input, and a test asserts it. Separately, app.security.csp is null and a search of all 18 tasks found no task owning it, so it would never have been set; combined with withGlobalTauri exposing window.__TAURI__ to every page script, that leaves the WebView with no second line of defense once save_theme and apply_theme exist. CSP now belongs to Task 17 so both halves of the WebView boundary are locked in one reviewed pass. Note that Eng Review decision 2531000a already stated the correct principle for the filesystem and it simply was not carried across to process execution, so a correct understanding existing in one decision is no guarantee a later task inherits it.
