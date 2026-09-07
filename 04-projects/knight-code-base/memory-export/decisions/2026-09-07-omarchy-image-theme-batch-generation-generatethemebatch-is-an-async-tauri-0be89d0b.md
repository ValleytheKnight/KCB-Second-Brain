---
id: "0be89d0b-7ab0-4ada-bfa0-a9d8d4ef574a"
type: "decision"
date: "2026-09-07"
scope: "repo"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: omarchy-image-theme: batch generation (generate_theme_batch) is an async Tauri command taking a Chan...

## Decision

omarchy-image-theme: batch generation (generate_theme_batch) is an async Tauri command taking a Channel<BatchProgressEvent>, emitting one event per image as it completes, rather than a single blocking call returning only at the end.

## Rationale

The CEO plan specifies sequential batch processing "with progress shown as it goes" but never named the IPC mechanism. tauri-dev's own guidance is explicit: use a Channel for long-running work rather than blocking the IPC call. Matches what the already-built Batch Progress mockup's live per-image tally implies.
