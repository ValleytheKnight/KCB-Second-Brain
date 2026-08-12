---
id: "25c05d53-91b7-4132-81cb-88227ac88057"
type: "learning"
date: "2026-08-02"
skill: "knightcode-office-hours"
learning-type: "architecture"
key: "skillx-redundancy-refinement-relevant-to-kbv2"
confidence: 6
trusted: false
source: "cross-model"
tags: ["knight-code", "learning", "knightcode-office-hours"]
---
# Learning: skillx-redundancy-refinement-relevant-to-kbv2

## Insight

SkillX (zjunlp/SkillX) is a skill-knowledge-base-construction paper for agent trajectory learning, a different problem than KBV2's static SKILL.md/agent indexing. But its "refinement" phase (merge redundant skills, filter low-quality ones before they're queryable) transfers: Knight Code has 41 skills ported from 3 separate upstream repos (per TODOS.md), so overlap/near-duplicate skill descriptions are a real risk, not hypothetical. KBV2's Part 2 schema (skill/agent node types, invokes/references/owns edges) currently has no mechanism to detect overlapping skill scope. Worth flagging as an open question on any skills-graph design, not necessarily in scope for a first build.
