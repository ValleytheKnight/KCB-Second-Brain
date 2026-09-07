---
id: "95bd87a3-71ca-401a-a95b-fef9016dab27"
type: "decision"
date: "2026-09-04"
source: "user"
tags: ["knight-code", "decision"]
---
# Decision: Added a new "teach" skill (installed as knightcode-teach), adapted from the community mattpocock/ski...

## Decision

Added a new "teach" skill (installed as knightcode-teach), adapted from the community mattpocock/skills "teach" skill, rebuilt self-contained with no runtime dependency on that source.

## Rationale

Chris wants a year-long, stateful DevOps/Kubernetes/Go curriculum. No existing Knight Code skill or agent covered long-running curriculum teaching (confirmed via skills-graph query and list_agents before building). Workspace state lives in his Self Taught Obsidian vault (MISSION.md, lessons/, learning-records/, glossary, resources), kept distinct from decision_log/promise_log/dev_diary_log/learnings_log per the boundary written into the skill itself. Alternative considered: a one-off lesson-plan document with no reusable skill, rejected since the workflow is recurring and Knight Code First calls for a real installed skill over an ad hoc approach.
