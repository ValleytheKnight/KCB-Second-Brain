---
id: "89aef056-512a-4db9-896f-854877b16310"
type: "decision"
date: "2026-08-24"
scope: "issue"
source: "skill"
confidence: 7
tags: ["knight-code", "decision"]
---
# Decision: codemode v1 CLI ships as a bun run entry point, not a compiled binary like browse

## Decision

codemode v1 CLI ships as a bun run entry point, not a compiled binary like browse

## Rationale

Avoids a build step and a large binary artifact (browse/dist/browse is 94.7MB) for a v1 whose job is proving token savings on 2-3 real workflows, not shipping a polished distributable tool.
