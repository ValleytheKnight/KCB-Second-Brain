---
id: "18d9815f-1fd9-46d9-9128-29c1fd5e372e"
type: "learning"
date: "2026-08-06"
skill: "devknight"
learning-type: "tool"
key: "disable-model-invocation-blocks-skill-tool-entirely"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "devknight"]
---
# Learning: disable-model-invocation-blocks-skill-tool-entirely

## Insight

CORRECTION: the original version of this entry overclaimed "a hard block on any agent-initiated invocation" for every skill carrying disable-model-invocation: true. That is only confirmed true for plugin-namespaced skills. Verified live 2026-08-06: Skill(winui:winui-setup), a win-dev-skills plugin skill with disable-model-invocation: true, was refused with the expected "cannot be used with Skill tool" error. Skill(knightcode-grill-me), a locally-installed Knight Code skill (~/.claude/skills/knightcode-grill-me) with the identical disable-model-invocation: true frontmatter field, was NOT refused, it launched and injected its full content, exactly the agent-initiated bypass the field exists to prevent. Root cause not found in this repo's own code (install-skills.ts only writes the frontmatter; enforcement is entirely inside the Claude Code CLI host, outside Knight Code), so the split is either a genuine plugin-vs-local-skill enforcement gap in the host or a version change since the original 2026-07-30 finding. Practical effect: grill-me's explicit-invoke-only design (CLAUDE.md's "the one piece only he can trigger") is not actually enforced by the Skill tool for this skill right now, an agent working unsupervised could reach it directly. Correct handling going forward: do not assume disable-model-invocation alone is sufficient protection for a locally-installed skill; verify live per skill rather than trusting the frontmatter field's presence, and flag this gap to Chris rather than treating grill-me as agent-unreachable.
