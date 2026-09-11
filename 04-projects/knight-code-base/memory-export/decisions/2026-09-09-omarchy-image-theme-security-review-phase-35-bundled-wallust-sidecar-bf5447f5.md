---
id: "bf5447f5-b491-4fff-9886-e1310edfecb4"
type: "decision"
date: "2026-09-09"
scope: "repo"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: omarchy-image-theme Security Review (Phase 3.5): bundled wallust sidecar needs a pinned SHA256 of th...

## Decision

omarchy-image-theme Security Review (Phase 3.5): bundled wallust sidecar needs a pinned SHA256 of the release asset, not just a pinned version string.

## Rationale

Decisions 4f4f09aa/1a3eb3cc pin wallust's version but never verify the fetched Codeberg release binary's contents against a known-good hash before bundling it as a Tauri sidecar. Same gap shape already found and fixed once in this account for omarchy-powerplan's privileged-helper install (d058d757, 33ba160e): a version pin alone doesn't catch a swapped or tampered release asset. Required fix: pin the exact SHA256 of the release asset alongside the version tag, verify it in the build step before placing the binary at src-tauri/binaries/, fail the build on mismatch, and re-check the digest in CI so a stale pin fails at build time, not silently at ship time. No Chris decision needed.
