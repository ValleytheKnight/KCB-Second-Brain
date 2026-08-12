---
id: "bb29078e-d5f3-4c1f-b805-ac5638389910"
type: "learning"
date: "2026-08-08"
skill: "token-optimizer"
learning-type: "pitfall"
key: "audit-coordination-folder-not-shared-with-dispatched-agents"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "token-optimizer"]
---
# Learning: audit-coordination-folder-not-shared-with-dispatched-agents

## Insight

Token Optimizer's Phase 1 audit dispatches 6 general-purpose subagents via the Agent tool, all writing to a shared /tmp coordination folder for a later synthesis agent to read back. In this Claude Code setup, dispatched agents run in isolated environments and do not share a /tmp with the primary session: every one of 6 agents this run reported writing its output file successfully (confirmed via their own completion summaries), but the coordination folder was completely empty when checked from the primary session afterward. The fix used this run: skip file-based synthesis entirely and synthesize directly from each agent's completion-notification result text, which already contains the full findings. This also retroactively explains an earlier session where two of six audit output files were reported as "gone, OS temp files not durable" -- they were never actually written to the primary session's filesystem in the first place, not lost to cleanup.
