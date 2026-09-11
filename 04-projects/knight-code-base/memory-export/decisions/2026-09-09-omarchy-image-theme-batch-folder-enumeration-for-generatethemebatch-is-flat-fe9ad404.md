---
id: "fe9ad404-d024-4959-b200-cf82112e4f9f"
type: "decision"
date: "2026-09-09"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: omarchy-image-theme: batch folder enumeration for generate_theme_batch is flat, non-recursive, symli...

## Decision

omarchy-image-theme: batch folder enumeration for generate_theme_batch is flat, non-recursive, symlinks not followed.

## Rationale

Security Review (Phase 3.5) recommended this as the safe reading of the CEO plan's "point at a directory, generate one theme per image" line, but left it as a note rather than a locked decision. Chris's own Phase 4 dispatch explicitly directed this be folded in as a task/spec line, so it is adopted now as the real v1 behavior rather than left for implementation-time guessing. Folded into Task 14 of the task breakdown (generate_theme_batch), with its own acceptance criteria (no subfolder descent, no symlink following).
