---
id: "4c298040-32a5-4d1d-a200-9d0d79da752d"
type: "decision"
date: "2026-08-03"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: KnightOS auto-update hosting will use GitHub, via a new, separate public repo dedicated only to rele...

## Decision

KnightOS auto-update hosting will use GitHub, via a new, separate public repo dedicated only to releases (installer files + latest.yml), not the GitHub provider pointed at the private KnightOS source repo. Supersedes decision 84f70bad (generic static-host provider).

## Rationale

Chris confirmed he wants GitHub specifically. Two ways to do that were presented: (A) electron-updater's github provider pointed straight at the private KnightOS repo, which requires an access token embedded inside every shipped build so the running app can authenticate to GitHub's API, a token extractable from any built copy and, worst case, exposing read access to the whole private source repo, not just release files, the exact risk 84f70bad was written to avoid; or (B) a second, empty, public repo holding only release artifacts, with KnightOS's real source staying private in its current repo. Chris picked (B). This needs no embedded token in the shipped app; the only token involved is a GH_TOKEN on the build/release machine used to publish a new release, which never ships to end users. Config-level change from 84f70bad's plan: electron-builder.yml's publish provider becomes github (owner/repo pointed at the new public releases repo) instead of generic, once that repo exists; the current RFC 2606 placeholder URL stays a placeholder until then.

## Alternatives Considered

Option A (private repo + embedded token) was presented and rejected for the token-extraction/private-repo-exposure risk. Staying on the prior generic-provider plan was also implicitly available (no change) but Chris explicitly asked to move to GitHub.
