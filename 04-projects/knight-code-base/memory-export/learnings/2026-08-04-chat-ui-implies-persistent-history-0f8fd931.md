---
id: "0f8fd931-b930-45fb-b5e2-73f7cec82669"
type: "learning"
date: "2026-08-04"
skill: "plan-eng-review"
learning-type: "pattern"
key: "chat-ui-implies-persistent-history"
confidence: 8
trusted: false
source: "cross-model"
tags: ["knight-code", "learning", "plan-eng-review"]
---
# Learning: chat-ui-implies-persistent-history

## Insight

A terminal-scrollback-style hard cap on visible history is an accepted convention for terminal UIs but contradicts the premise of a chat-style UI, which conventionally implies persistent, scrollable-to-the-start history. When a design explicitly aims for "feels like chat," don't reuse a terminal's memory-safety pattern (drop old data) without adapting it, virtualize the rendered list instead (cap DOM nodes, keep all underlying data, still scrollable to the start). Caught via an outside-voice cross-model review during KnightOS Milestone 6's eng review; the original recommendation (direct reuse of Milestone 1's xterm.js scrollback cap) would have silently recreated the "can't see full history" problem the feature was built to solve.
