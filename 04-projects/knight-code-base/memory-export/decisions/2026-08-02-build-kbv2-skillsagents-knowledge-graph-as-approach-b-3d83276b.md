---
id: "3d83276b-3cd9-483a-a0ab-cc01828380df"
type: "decision"
date: "2026-08-02"
scope: "repo"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Build KBV2 (skills/agents knowledge graph) as Approach B: extend lorebrain's existing skills-mode in...

## Decision

Build KBV2 (skills/agents knowledge graph) as Approach B: extend lorebrain's existing skills-mode indexer with agent nodes, a two-tier duplicate-detection edge (Tier 1 deterministic name-collision, Tier 2 deterministic token-overlap), and a skills-mode freshness fix, all in one build. Full design doc: Knight Code BAse vault, 01 Planning/KBV2 Design.md.

## Rationale

Confirmed by office-hours (2 rounds adversarial review), plan-ceo-review (SELECTIVE EXPANSION mode, independently converged on Approach B), and plan-eng-review (DONE_WITH_CONCERNS, both P1 findings folded into the doc). Real, already-paid cost: 32 duplicate skills found and deleted by hand this week (naming collision between knightcode-prefixed and unprefixed installs, not generic description drift), plus real tool-call/token waste from agents picking the wrong skill/agent off stale hand-maintained catalogs. Deterministic graph approach explicitly chosen over industry-standard vector-similarity retrieval since that threshold (50+ tools) doesn't apply at Knight Code's dozens-not-hundreds scale, and the observed failure was stale prose, not tool-count overload. Freshness fix (skills-mode graphs currently never auto-reindex) folded into this build rather than deferred, since leaving it out would leave a silent-drift hole in a design whose whole point is stopping silent drift.

## Alternatives Considered

Approach A (Parts 1+2 only, no duplicate detection): rejected, defers what's core not adjacent. Approach C (full SkillX-tiered vision with active refinement agent): deferred as the long-term destination, XL effort, premature before B ships. A decoupled periodic dedup-audit skill with no graph schema change: rejected, not graph-native, relies on remembering to run it.
