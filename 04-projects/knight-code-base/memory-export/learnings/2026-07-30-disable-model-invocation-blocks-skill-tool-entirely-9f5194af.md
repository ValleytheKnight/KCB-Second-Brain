---
id: "9f5194af-9094-4644-8f50-b7baf74d350e"
type: "learning"
date: "2026-07-30"
skill: "devknight"
learning-type: "tool"
key: "disable-model-invocation-blocks-skill-tool-entirely"
confidence: 10
trusted: false
source: "observed"
tags: ["knight-code", "learning", "devknight"]
---
# Learning: disable-model-invocation-blocks-skill-tool-entirely

## Insight

A skill's SKILL.md frontmatter setting `disable-model-invocation: true` blocks the Skill tool from invoking it entirely, even with the exact skill name explicitly passed, confirmed live against win-dev-skills' winui-setup and winui-session-report (both errored with "cannot be used with Skill tool due to disable-model-invocation"). This is not merely "hidden from ambient auto-routing", it is a hard block on any agent-initiated invocation. Correct handling: don't treat the skill's absence from an invocable list as a missing/renamed plugin problem, and don't attempt to route through it; tell the user plainly what's needed and have them invoke it directly themselves.
