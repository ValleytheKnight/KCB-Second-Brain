---
id: "1a3eb3cc-fb23-4b5b-9d31-7149bebb8b8c"
type: "decision"
date: "2026-09-07"
scope: "repo"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: omarchy-image-theme: the bundled wallust dependency is pinned to an exact version (not a caret range...

## Decision

omarchy-image-theme: the bundled wallust dependency is pinned to an exact version (not a caret range), and its MIT license text ships with the app (About/Licenses screen or a bundled LICENSES/wallust.txt resource).

## Rationale

tauri-dev's standing rule pins exact versions for security-sensitive dependencies. Bundling wallust's MIT-licensed binary/source inside the app carries a real attribution obligation under that license; Chris already accepted bundling it (decision 9e7e95c7), this just names the concrete deliverable so task breakdown doesn't drop it.
