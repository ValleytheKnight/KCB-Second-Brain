---
id: "254f163e-481b-4181-b746-34fa681333bf"
type: "decision"
date: "2026-08-01"
scope: "repo"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Correcting KnightOS's prior Continuation Point claim: the working tree was not actually clean at ses...

## Decision

Correcting KnightOS's prior Continuation Point claim: the working tree was not actually clean at session start. An uncommitted, unlogged diff to src/renderer/src/App.tsx (closeTabNow's active-tab fallback switched to a functional setActiveTabId update, removing a stale-closure dependency on activeTabId) was sitting in the repo with no record anywhere in the vault. Verified safe (typecheck clean, 21/21 Vitest, all 4 Playwright e2e specs passing) and committed separately as its own atomic fix (b59ac3c) before Task 6 work started.

## Rationale

Full orientation's on-disk verification step (checking real repo state against the vault's claims, not trusting the Continuation Point blindly) caught this before Task 6 work began. Building Task 6 on top of an unverified, unexplained change would have risked folding an unreviewed edit into Task 6's own commit history, or silently carrying forward a change nobody had actually signed off on. Kept as its own commit rather than bundled into Task 6 so Task 6's history stays scoped to Task 6 only.</parameter>

## Alternatives Considered

Discarding the diff without investigating (rejected, it looked like a real, reasonable fix and discarding unverified work is its own risk). Folding it silently into Task 6's first commit (rejected, mixes an unrelated fix into Task 6's history and obscures that a real discrepancy was found).
