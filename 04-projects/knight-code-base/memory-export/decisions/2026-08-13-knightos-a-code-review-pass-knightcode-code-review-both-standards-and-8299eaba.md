---
id: "8299eaba-f634-4b6b-8fd5-4ff5110b42e6"
type: "decision"
date: "2026-08-13"
scope: "repo"
source: "user"
confidence: 10
tags: ["knight-code", "decision"]
---
# Decision: KnightOS: a code-review pass (knightcode-code-review, both Standards and Spec axes) plus a simplify ...

## Decision

KnightOS: a code-review pass (knightcode-code-review, both Standards and Spec axes) plus a simplify pass (knightcode-simplify) now run against every task's diff before it is committed, not after, and before the next task starts. This replaces the earlier pattern of committing a task first and landing quality-pass fixes as a separate follow-up commit.

## Rationale

Chris instructed this directly, twice: once when asking for the Phase 1 Tasks 1-4 review, and again explicitly confirming "this code-review-then-commit sequence is now standing practice for every task going forward, as already instructed." Folding the quality pass in before the commit means every task's commit is already clean the first time, so there is no separate "Simplify pass" or "review fixes" follow-up commit needed the way Milestone 1 and Project Tabs tasks required (e.g. commits 6d1f50f, c3a53b5, 0bc767d, 219df9e in this repo's own history). A post-commit-simplify-nudge-hook.ts already existed to remind an agent to run /simplify after a commit; this decision moves the gate earlier, before the commit, rather than removing it. Alternative considered: keep committing per task first and running review/simplify as a separate follow-up commit afterward, matching every prior task's pattern in this repo. Rejected because Chris explicitly asked for the opposite ordering this session, and review-before-commit is strictly safer, a broken or unreviewed state never lands in git history at all, even briefly.
