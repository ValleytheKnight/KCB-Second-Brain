---
id: "cb4e0c55-6adc-4bda-99e8-dc59b95176e8"
type: "decision"
date: "2026-08-07"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: Ported grill-with-docs from github.com/mattpocock/skills as its own thin, explicit-only skill rather...

## Decision

Ported grill-with-docs from github.com/mattpocock/skills as its own thin, explicit-only skill rather than folding its composition into grill-me.

## Rationale

Upstream's grill-with-docs is a three-line file whose whole body is running a grilling session together with domain-modeling, structurally similar to the content-free pointer pattern Chris had just rejected for the old grill-me/interview-me split. Flagged the similarity and asked before building rather than assume either reading applied. Chris chose to port it faithfully as its own skill (matching upstream's shape) over folding the composition into grill-me's own process. Kept disable-model-invocation: true, matching upstream, since it exists specifically as a deliberate explicit trigger, both grill-me and domain-modeling already run standalone without it.
