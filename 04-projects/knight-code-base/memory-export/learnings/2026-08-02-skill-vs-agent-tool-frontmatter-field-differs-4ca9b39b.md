---
id: "4ca9b39b-56e9-4c9a-a263-ac81c9b37743"
type: "learning"
date: "2026-08-02"
skill: "knightcode-plan-eng-review"
learning-type: "operational"
key: "skill-vs-agent-tool-frontmatter-field-differs"
confidence: 8
trusted: false
source: "cross-model"
tags: ["knight-code", "learning", "knightcode-plan-eng-review"]
---
# Learning: skill-vs-agent-tool-frontmatter-field-differs

## Insight

Knight Code's SKILL.md files declare tool restrictions as allowed-tools: (a YAML block list), never tools:. Custom agent files (.claude/agents/*.md) declare tools: as a flat comma-separated string, with inconsistent spacing across real files today (e.g. "Read, Write, Bash" vs "Read,Glob,Grep"). Any future tooling that needs a skill's or agent's declared tool set (lorebrain extractor work, a linter, a graph node) must parse these as two separate fields with two separate shapes, not one shared tools: key. Verified directly against real SKILL.md and agent files, not assumed.
