---
id: "53f6ac27-0ace-40d3-93f7-638f0a8e67bd"
type: "learning"
date: "2026-08-21"
skill: "knightcode-code-review"
learning-type: "pitfall"
key: "verify-review-claims-against-real-diff-not-prose"
confidence: 8
tags: ["knight-code", "learning", "knightcode-code-review"]
---
# Learning: verify-review-claims-against-real-diff-not-prose

## Insight

A prior review's own commit message or lessons-learned note claiming a dead-code finding was "deleted" is not proof the deletion was complete. Verify by reading the cited commit's real diff (or the file state at that commit) directly. Found live in Scryptable: badf171's own message said MainWindow._active_recording_tab was "set in three places, read nowhere... Deleted," but the real diff only removed the __init__ declaration, leaving both remaining assignment sites shipped in every commit since, until a later cross-cutting review re-found and fully removed them.
