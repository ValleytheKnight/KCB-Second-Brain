---
id: "2d7d1587-2cfd-4aa8-afb0-ee6657615582"
type: "decision"
date: "2026-08-07"
scope: "repo"
source: "user"
confidence: 10
tags: ["knight-code", "decision"]
---
# Decision: Delete interview-me entirely and fold its full mechanism into grill-me as the sole surviving skill, ...

## Decision

Delete interview-me entirely and fold its full mechanism into grill-me as the sole surviving skill, restored to ambient (model-triggered) invocation.

## Rationale

The prior decision ("replace interview-me's process with grilling's mechanism") was implemented as keeping interview-me as the real engine and adding grill-me as a content-free, disable-model-invocation:true pointer into it. Chris flagged this as a misread: "replace X with Y" means X is deleted and Y takes its place, not X renamed-in-place plus a shim. Corrected by deleting interview-me/ (source and installed), moving its full round-based interview mechanism into grill-me/SKILL.md.tmpl verbatim as native content, removing disable-model-invocation so grill-me regains interview-me's old ambient trigger-phrase behavior, and updating every cross-reference (SKILL-CATALOG.md, planning-and-task-breakdown, doubt-driven-development). Alternatives considered and rejected: keeping grill-me as an explicit-only pointer at interview-me (the original implementation, rejected outright by Chris as not what "replace" means); folding interview-me's content into grill-me but keeping it explicit-only (rejected via clarifying question, Chris wants grill-me to keep interview-me's old ambient invocation behavior too, not just its content).
