---
id: "01224ae3-3a6b-4e16-aba7-cfc8925b9fa4"
type: "decision"
date: "2026-09-10"
source: "user"
confidence: 9
tags: ["knight-code", "decision", "superseded"]
status: "superseded"
---

# Decision: omarchy-powerplan distributes the privileged helper via a signed AUR package instead of the in-repo ...

## Decision

omarchy-powerplan distributes the privileged helper via a signed AUR package instead of the in-repo installer script.

## Rationale

HANCORE-linux re-reviewed at commit 25ce61f and rejected the in-repo installer again: sudo captures the installer's own bytes via command substitution, so root still interprets checkout-resident, user-writable code regardless of the installer's internal digest checks. Chris chose AUR over further hardening the in-repo path, since pacman/makepkg gives root a trust anchor outside the mutable checkout, which is what SECURITY.md's own bar for privileged install code requires. Hardening the in-repo install further (copy-to-root-owned-staging-first ordering) was the other open option; rejected because the reviewer's objection targets the trust anchor itself, not the copy ordering, so no in-repo fix closes it. Resolves the open question from decision 33ba160e-fa5c-4e38-9265-cdc41433ca13 and promise c3048257-63e5-4a66-9cc7-a0c73a3986a5.
