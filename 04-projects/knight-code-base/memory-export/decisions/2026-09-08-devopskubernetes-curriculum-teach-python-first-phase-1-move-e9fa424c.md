---
id: "e9fa424c-9155-40b3-b30b-28228d189287"
type: "decision"
date: "2026-09-08"
source: "user"
tags: ["knight-code", "decision"]
---
# Decision: DevOps/Kubernetes curriculum: teach Python first (Phase 1), move Go to a new Phase 4 after CI/CD, re...

## Decision

DevOps/Kubernetes curriculum: teach Python first (Phase 1), move Go to a new Phase 4 after CI/CD, reversing the original "Go primary, Python woven in" mission language.

## Rationale

Chris wants to start with Python fundamentals now, not Go, while still keeping Go as a real later goal. Phase 1's containerization capstone now targets a Python automation script instead of a Go CLI tool; Go gets its own phase later where it's learned against tooling (Docker/CI-CD/k8s) Chris already trusts, then reimplements the same script as a comparison exercise through the existing pipeline. Alternatives considered and rejected: folding Go into the existing Single-node Kubernetes phase instead of a standalone phase, and dropping Docker out of Phase 1 entirely until Go arrives.
