---
id: "95cb0169-33e5-4fb0-872b-b97a6de1373b"
type: "learning"
date: "2026-07-31"
skill: "devknight"
learning-type: "pitfall"
key: "bash_cwd_hook_matching_ignores_inline_cd"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "devknight"]
---
# Learning: bash_cwd_hook_matching_ignores_inline_cd

## Insight

A hook that matches on the Bash tool's own reported `cwd` field will miss commands run via a leading `cd "<path>" && ...` compound, because the Bash tool reports its own persistent session cwd (wherever the agent/session started), not the effective directory an inline `cd` switches to for that one call. Confirmed live: `hosts/claude/hooks/vault-sync-nudge-hook.ts` failed to fire when the devknight subagent ran `cd "...DevPrograms\KnightOS" && git push`, because its Bash tool's cwd stayed pinned at the Knight Code repo root (its launch directory) for every call in the run, verified by grepping 30 consecutive tool_input entries in its transcript, all identical. This is not subagent-specific (Claude Code docs confirm PostToolUse hooks do fire for subagent-internal tool calls), it's a general blind spot in any cwd-only matcher. Fixed by adding a fallback that parses a leading `cd "<path>" &&`/`;` prefix anchored to the start of the command text (never scanning the full command, to preserve protection against false matches from embedded text like commit messages).
