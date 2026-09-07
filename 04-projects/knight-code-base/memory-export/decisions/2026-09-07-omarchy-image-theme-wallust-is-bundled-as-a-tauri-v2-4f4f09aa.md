---
id: "4f4f09aa-ed1e-4cf8-8fa4-a6395837fba1"
type: "decision"
date: "2026-09-07"
scope: "repo"
source: "user"
confidence: 10
tags: ["knight-code", "decision"]
---
# Decision: omarchy-image-theme: wallust is bundled as a Tauri v2 sidecar binary (externalBin), not embedded as ...

## Decision

omarchy-image-theme: wallust is bundled as a Tauri v2 sidecar binary (externalBin), not embedded as a Cargo library dependency. The app keeps shelling out to wallust as a separate process, via a bundled path instead of a system PATH lookup.

## Rationale

Chris's explicit choice (Option A) on the eng-review gate question. Preserves the CEO plan's existing process-based shell-out architecture and the two already-approved Phase 2 mockups (Missing Dependency, Apply Failed) that model wallust as an external process with an exit code and stderr text, at the cost of one extra build step (fetch wallust's prebuilt musl release binary, rename to match Tauri's target-triple sidecar naming convention). Rejected the alternative (embedding wallust's lib crate in-process) because its internal API is undocumented and unstable, only the CLI is upstream's actual promised contract, and that path would have required redoing the two locked mockups for a performance gain that doesn't matter at this call volume.
