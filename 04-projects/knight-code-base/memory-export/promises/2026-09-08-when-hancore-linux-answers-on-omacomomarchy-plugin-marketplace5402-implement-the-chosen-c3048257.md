---
id: "c3048257-63e5-4a66-9cc7-a0c73a3986a5"
type: "promise"
date: "2026-09-08"
scope: "repo"
source: "agent"
tags: ["knight-code", "promise", "open", "fulfilled"]
status: "fulfilled"
---

# Promise: When HANCORE-linux answers on omacom/omarchy-plugin-marketplace#5402, implement the chosen remedy (o...

## Promise

When HANCORE-linux answers on omacom/omarchy-plugin-marketplace#5402, implement the chosen remedy (option 1: hardened in-repo install that copies to root-owned staging, verifies there, atomic rename; or option 2: signed AUR package), then commit, push, and request re-validation at the new immutable commit.

## Context

Question posted 2026-09-08 as issuecomment-5587212067. Work for option 1 is already staged but uncommitted in ~/Documents/omarchy-powerplan (README.md, scripts/install-privileged-helper, .github/workflows/verify-helper-digest.yml), HEAD held at reviewed commit f3f61f1. The staged installer's verification internals are sound but its invocation model still has root interpreting checkout-resident code, so option 1 needs that reordering before it ships. Option 2 additionally needs a GPG key (none exists on this machine yet) and an AUR account. Marketplace re-validation is required after any push because validation pins to an exact commit. See decision 33ba160e-fa5c-4e38-9265-cdc41433ca13.

## Resolution

Resolved as pacman-package install (makepkg -si from in-repo PKGBUILD), not AUR (registration closed upstream) and not the original hardened-in-repo-install option. Committed 34dada1, tagged v0.1.0, pushed, re-review requested on #5402 at issuecomment-5625073369.
