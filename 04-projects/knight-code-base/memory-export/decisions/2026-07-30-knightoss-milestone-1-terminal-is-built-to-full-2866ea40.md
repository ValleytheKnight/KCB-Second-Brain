---
id: "2866ea40-b873-4d26-a8c6-3f633ebad777"
type: "decision"
date: "2026-07-30"
scope: "repo"
source: "user"
confidence: 10
tags: ["knight-code", "decision"]
---
# Decision: KnightOS's Milestone 1 terminal is built to full fidelity from day one (real ANSI/VT handling, resiz...

## Decision

KnightOS's Milestone 1 terminal is built to full fidelity from day one (real ANSI/VT handling, resize, scrollback), not the basic passthrough-plus-copy-paste cut the cross-model review originally recommended as a faster first step.

## Rationale

Chris has no deadline on KnightOS and explicitly does not want a rushed, thinner first version just to reach a usable state sooner. He directly corrected an assumption that faster-to-usable was a real constraint he needed to weigh, it wasn't, that framing was introduced by the reviewing agent, not something Chris ever said. Effort cost is accepted knowingly: a full terminal is comparable in scope to the rest of Milestone 1 combined, per the doc's own estimate.

## Alternatives Considered

Basic passthrough-plus-copy-paste first, upgrading terminal fidelity in a fast-follow once the shell is usable (the cross-model review's original recommendation, rejected by Chris).
