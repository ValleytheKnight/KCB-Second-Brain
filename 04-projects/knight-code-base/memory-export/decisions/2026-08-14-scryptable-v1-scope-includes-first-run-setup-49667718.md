---
id: "49667718-ddd7-4a16-a8b2-6c5713922a52"
type: "decision"
date: "2026-08-14"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: Scryptable v1 scope includes: first-run setup wizard (workspace folder + naming convention...

## Decision

Scryptable v1 scope includes: first-run setup wizard (workspace folder + naming convention onboarding), a pluggable handoff-step interface (not a hardcoded Claude Code call), and an auto-update check on launch.

## Rationale

All three were surfaced as optional cherry-picks during the CEO review's selective-expansion pass, given the app now ships to outside users rather than staying a personal tool. Chris accepted all three into v1 rather than deferring. The setup wizard is required for anyone but Chris to use the app at all (no hardcoded folder layout). The pluggable handoff interface is what actually makes "runs with zero AI subscription required" true end to end, without it the app would quietly still assume Claude Code for the final step. The auto-update check is small effort and expected of a shipped product.
