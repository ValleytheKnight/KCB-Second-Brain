---
id: "2cfbfa06-bf2a-43d2-83fd-5678f2085702"
type: "decision"
date: "2026-08-22"
scope: "repo"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: CEO review (SELECTIVE EXPANSION): held migration plan scope, accepted migration-status.sh + Google D...

## Decision

CEO review (SELECTIVE EXPANSION): held migration plan scope, accepted migration-status.sh + Google Drive backup redundancy + Step 3 restore-integrity check, skipped dotfiles repo and perf baseline

## Rationale

Full-wipe migration approach confirmed by Chris despite market-research flag on that being the top migration failure pattern; three real gaps found (single backup point of failure, unverified restore, undocumented scheduling gap) and closed; secrets-on-unencrypted-drive risk accepted explicitly since drive stays in Chris's possession
