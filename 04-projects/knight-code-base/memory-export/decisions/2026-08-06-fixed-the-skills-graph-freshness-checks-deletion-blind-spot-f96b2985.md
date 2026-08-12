---
id: "f96b2985-3fde-490e-91bf-6dee84b1ce54"
type: "decision"
date: "2026-08-06"
scope: "repo"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Fixed the skills-graph freshness check's deletion blind spot with a per-check input-file count stamp...

## Decision

Fixed the skills-graph freshness check's deletion blind spot with a per-check input-file count stamp (KnowledgeGraph.inputFileCount) compared alongside the existing newest-mtime comparison, rather than switching to a full content-hash of the discovered file set.

## Rationale

The bug: newestSkillsMtime only tracked the maximum mtime among currently-discovered input files, so a pure deletion (a pruned skill directory) never produced a timestamp newer than the stored graph, and the graph kept resolving content that no longer existed on disk until an unrelated add/edit elsewhere happened to move the newest mtime forward. A file count is the cheapest signal that also catches a removal: incrementing on every stat() call inside the same walk that already computes the newest mtime, no extra directory walk, no hashing. It cannot detect a same-count swap (one file deleted, a different one added in the same check window), but that case is already covered by the existing mtime check, since the addition itself produces a newer mtime.

## Alternatives Considered

A full digest over the sorted list of discovered file paths (like skillsInputShape's source-label digest, but over concrete paths instead of source-kind labels) would also catch a same-count swap, at the cost of building and hashing a string proportional to file count on every single query instead of a cheap integer increment. Rejected as disproportionate to the bug actually found; the freshness check's own docstring already commits to being "cheap by construction" at personal-project scale, and a count catches the exact failure mode observed (a pure deletion) without changing that cost profile.
