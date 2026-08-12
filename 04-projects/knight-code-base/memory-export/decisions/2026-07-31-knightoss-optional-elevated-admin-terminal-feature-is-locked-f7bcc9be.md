---
id: "f7bcc9be-c531-4033-ad83-c3a9000b87b8"
type: "decision"
date: "2026-07-31"
scope: "repo"
source: "agent"
confidence: 10
tags: ["knight-code", "decision"]
---
# Decision: KnightOS's optional elevated (admin) terminal feature is locked to per-tab granularity (option B: a ...

## Decision

KnightOS's optional elevated (admin) terminal feature is locked to per-tab granularity (option B: a separate native helper hosts just the elevated tab, KnightOS's own main app always stays non-elevated), not per-session whole-app elevation. It ships with a mandatory warning dialog before an elevated tab opens, explaining the real security downside in plain language, with a "don't show again" checkbox. A hard research/design gate (how the elevated helper attaches to node-pty and bridges back to KnightOS, the real IPC boundary, a pass against knightcode-security-and-hardening's guidance) must produce a real design and get Chris's explicit go/no-go before any implementation code is written, matching the same checkpoint discipline as Task 2's node-pty go/no-go. This feature stays scheduled separately from Milestone 3's native companion program for now, not merged or pulled forward, even though both will likely need a similar kind of elevated native helper process.

## Rationale

Chris made three explicit, separate calls after being taught the real tradeoff (elevation vs. execution policy are unrelated axes; per-tab vs per-session are genuinely different technical shapes with different blast radius). Per-tab was chosen specifically because it lets normal and elevated tabs coexist, matching what he actually described wanting rather than the cheaper but blunter whole-app-relaunch option. The warning dialog was his own explicit UX requirement, not something to fold in silently. The hard gate before implementation was his own explicit process requirement: research and design first, real go/no-go, not proceed-then-figure-it-out, given this is the single highest-privilege IPC surface KnightOS will have built. Keeping it separate from Milestone 3 was also explicit: he considered the infrastructure-sharing case (already surfaced to him) and chose not to merge or pull forward, timing to be proposed later once the design gate itself is done.

## Alternatives Considered

Per-session whole-app elevation (option A, rejected, Chris wants tabs to coexist at different privilege levels in the same window). Proceeding straight to implementation once shape was picked (rejected, Chris wants a real research/design gate with its own go/no-go first). Pulling this forward as an early piece of Milestone 3's native helper to avoid building the infrastructure twice (rejected for now, Chris chose to keep the two efforts separate rather than merge them).
