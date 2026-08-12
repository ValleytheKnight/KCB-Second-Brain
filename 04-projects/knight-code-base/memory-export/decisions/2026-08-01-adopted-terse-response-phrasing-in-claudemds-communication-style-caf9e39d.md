---
id: "caf9e39d-6dd2-4769-9285-8a93403b347a"
type: "decision"
date: "2026-08-01"
scope: "repo"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Adopted terse response phrasing in CLAUDE.md's Communication style section (kept the teaching/mechan...

## Decision

Adopted terse response phrasing in CLAUDE.md's Communication style section (kept the teaching/mechanism-explaining content, cut filler/padding), plus added a PostToolUse hook (bash-output-budget-hook.ts) that strips ANSI codes and truncates oversized Bash stdout/stderr to first-200/last-100 lines before it reaches context.

## Rationale

Chris wants lower Claude Code token cost, modeled on caveman-code's compression techniques. Terseness explicitly overrides the prior "teach fully, don't cut corners" style on his direct instruction, aware of the tradeoff. Read-deduplication (also a caveman-code technique) was ruled out: Claude Code's PreToolUse hooks can only allow/deny/modify tool input, not substitute a cached result and skip execution, so it's not implementable via the hook system.

## Alternatives Considered

Shelling out to caveman-code itself as a delegate subagent for bulk work (rejected: goal was lowering Claude's own token cost, not adding a second agent's spend); leaving terseness untouched to preserve the teaching mandate (rejected per Chris's explicit override); Read/Grep output rewriting via the same hook (skipped: no confirmed PostToolUse tool_response schema for those tools, Read/Grep already have their own built-in output caps unlike Bash).
