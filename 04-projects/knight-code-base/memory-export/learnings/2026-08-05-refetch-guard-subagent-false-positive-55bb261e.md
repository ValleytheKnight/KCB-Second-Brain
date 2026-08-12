---
id: "55bb261e-238b-440f-9e74-d298bc57d573"
type: "learning"
date: "2026-08-05"
skill: "devknight"
learning-type: "tool"
key: "refetch-guard-subagent-false-positive"
confidence: 8
trusted: false
source: "observed"
tags: ["knight-code", "learning", "devknight"]
---
# Learning: refetch-guard-subagent-false-positive

## Insight

The token-optimizer refetch guard can deny an MCP call the current context never made. It keys its archive on session_id, and a dispatched subagent's calls are recorded under the parent session, so after a subagent runs a tool, the parent asking for that tool is told it already ran and is pointed at the subagent's archived result, produced in a different context and possibly answering a different question. Observed live: get_agent denied in the primary session, naming an archive id from a subagent's call. There is no env flag or config switch for this guard, unlike the read cache which honors TOKEN_OPTIMIZER_READ_CACHE_MODE; its only disable path is its own import failing, and editing the plugin cache is not durable because the cache is replaced on update, which happened mid-session when 5.11.80 became 5.11.81. Recovery: get the data another way, since a direct file read is usually available and is what the tool would have read anyway. Never treat the archived result as an answer to the current question without checking which context produced it.
