---
id: "5bbd15bc-c674-4f34-a4a1-362bf4291e0d"
type: "decision"
date: "2026-07-31"
scope: "repo"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Added a real PostToolUse hook (hosts/claude/hooks/vault-sync-nudge-hook.ts, registered on the Bash m...

## Decision

Added a real PostToolUse hook (hosts/claude/hooks/vault-sync-nudge-hook.ts, registered on the Bash matcher in .claude/settings.json) that fires a non-blocking vault-sync reminder whenever a git commit, git push, or gh repo create runs against a project under Documents/DevPrograms/ (the DevKnight Workshop vault's tracked dev-project convention, established this session for KnightOS). This closes a real gap: DevKnight's own "keep the vault current" self-check only fires when DevKnight itself reasons through a turn, so primary Claude running the same git commands directly via Bash bypassed it entirely and the vault went stale twice in one session before Chris caught it by hand.

## Rationale

Per this project's own standing rule that automated "whenever X happens" behavior requires a real harness-level hook, not agent memory or instructions. Verified working via pipe-test with real stdin payloads (matching git commit + DevPrograms cwd correctly injects the nudge; a non-matching command allows through with no nudge) before registration, then validated settings.json's syntax and the new entry's resolution.

## Alternatives Considered

Relying solely on DevKnight's own agent-definition rule (already proven insufficient, since it doesn't fire when primary Claude bypasses DevKnight); a PreToolUse blocking gate (rejected, this is a sync reminder not a safety boundary, blocking would be the wrong posture for a non-destructive git action).
