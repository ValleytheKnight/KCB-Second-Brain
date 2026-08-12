---
id: "c5eaa3fb-6aac-416a-b046-a28fd0b8ed58"
type: "learning"
date: "2026-07-28"
skill: "knightbrain"
learning-type: "operational"
key: "callers-undercount-ambiguous-symbol"
confidence: 8
trusted: false
source: "observed"
tags: ["knight-code", "learning", "knightbrain"]
---
# Learning: callers-undercount-ambiguous-symbol

## Insight

knightbrain_callers can under-report real callers when the symbol name is ambiguous/overloaded across the repo. Confirmed live: looking up callers of lib/redact-engine.ts's scan() (four unrelated functions repo-wide share the name "scan", including third-party ones bundled inside impeccable's detector) returned applyRedactions() as a genuine hit but missed a second real caller, mcp/memory-server/src/lib/redact-guard.ts:62 inside validateFreeText(). Only caught by cross-checking with Grep after noticing the name collision. Cross-check knightbrain_callers/knightbrain_refs (and lorebrain_refs, same underlying graph engine) with Grep whenever the symbol name is common/overloaded and the completeness of the answer actually matters, don't treat the graph's caller list as complete for those cases without verifying.
