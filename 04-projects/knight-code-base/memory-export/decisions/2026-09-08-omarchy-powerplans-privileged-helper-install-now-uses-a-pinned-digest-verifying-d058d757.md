---
id: "d058d757-a263-4499-b7e1-c7d9c31e85a8"
type: "decision"
date: "2026-09-08"
scope: "repo"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: omarchy-powerplan's privileged-helper install now uses a pinned-digest verifying installer (scripts/...

## Decision

omarchy-powerplan's privileged-helper install now uses a pinned-digest verifying installer (scripts/install-privileged-helper) instead of a bare `sudo install` from the mutable checkout, with a CI job that fails if the pinned sha256 drifts from the actual helper file.

## Rationale

HANCORE-linux's security review on omacom/omarchy-plugin-marketplace#5402 flagged a TOCTOU: sudo's auth delay gave a local process a window to swap the source file before `install` copied it, so arbitrary bytes could become a root-owned executable pkexec later runs. Considered a CI-bot-committed digest sidecar, a GPG/minisign detached signature, and distributing via a signed pacman/AUR package (the reviewer's own stated alternative); rejected all three as disproportionate to a single-file personal plugin. Kept the hand-edited pinned digest but backstopped it with a CI check so a forgotten update fails at review time instead of silently at a user's install time.
