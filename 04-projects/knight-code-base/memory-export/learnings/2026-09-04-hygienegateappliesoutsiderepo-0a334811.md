---
id: "0a334811-101d-43c5-a172-bee7561991f0"
type: "learning"
date: "2026-09-04"
skill: "teach"
learning-type: "pitfall"
key: "hygiene_gate_applies_outside_repo"
confidence: 8
source: "observed"
tags: ["knight-code", "learning", "teach"]
---
# Learning: hygiene_gate_applies_outside_repo

## Insight

The banned-language hygiene gate blocks Edit/Write calls even on files outside this repo (e.g. vault notes in Self Taught/DevOps and Kubernetes/NOTES.md), and its dev-diary date-pattern rule (\\b20\\d{2}-\\d{2}-\\d{2}\\b) fires on a plain dated heading like "## Phase breakdown (2026-09-04)" even in a non-code note. Confirmed live: the edit was rejected until the date was dropped from the heading. When writing workspace notes/learning-records for this skill, avoid literal ISO date stamps in headings/body text, not just in code comments.
