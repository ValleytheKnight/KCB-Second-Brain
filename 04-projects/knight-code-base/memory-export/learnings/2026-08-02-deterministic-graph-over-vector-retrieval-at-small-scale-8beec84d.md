---
id: "8beec84d-98ad-4754-b108-ed9f349b1a52"
type: "learning"
date: "2026-08-02"
skill: "knightcode-office-hours"
learning-type: "architecture"
key: "deterministic-graph-over-vector-retrieval-at-small-scale"
confidence: 7
trusted: false
source: "cross-model"
tags: ["knight-code", "learning", "knightcode-office-hours"]
---
# Learning: deterministic-graph-over-vector-retrieval-at-small-scale

## Insight

Industry consensus for "AI agent tool catalog drift" defaults to vector-similarity/dynamic retrieval, but that solves a scale problem (50+ tools blowing context, accuracy degrading with tool count). Knight Code's real failure mode is different: stale hand-maintained catalog text causing an agent to pull the wrong lever, not tool-count overload. At dozens (not 50+) of skills/agents, a deterministic AST-based graph with real edges (already the lorebrain engine used for code) is the better fit than adding a vector store, since it's inspectable and auditable rather than a similarity score to trust blindly. Applies to KBV2 (skills/agents knowledge graph design).
