---
id: "99131e01-324a-449c-aed6-eb0cd1bfd3ab"
type: "decision"
date: "2026-07-30"
scope: "repo"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Next session: migrate Knight Code's skill installation from global (~/.claude/skills/knightcode-*) t...

## Decision

Next session: migrate Knight Code's skill installation from global (~/.claude/skills/knightcode-*) to project-local (.claude/skills/) for all 30 ported skills, by deleting the global copies entirely so project-local wins by default (no competing global entry to lose a precedence fight to).

## Rationale

Verified: skill precedence (global overrides project) only applies "when skills share the same name across levels." If the global copy is deleted outright, there is no collision, so the project-local .claude/skills/ copy becomes the only one Claude Code finds and uses. This makes Knight Code's skills genuinely self-contained the same way the agent migration did, without needing project-local precedence to formally beat global (which it doesn't, for skills). Chris wants this pinned as a next-session task rather than executed now, applying to all 30 skills at once rather than piloting on the 8 new ones first.
