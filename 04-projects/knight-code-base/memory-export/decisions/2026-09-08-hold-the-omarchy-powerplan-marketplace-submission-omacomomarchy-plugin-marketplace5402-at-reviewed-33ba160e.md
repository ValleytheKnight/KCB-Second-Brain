---
id: "33ba160e-fa5c-4e38-9265-cdc41433ca13"
type: "decision"
date: "2026-09-08"
scope: "repo"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Hold the omarchy-powerplan marketplace submission (omacom/omarchy-plugin-marketplace#5402) at review...

## Decision

Hold the omarchy-powerplan marketplace submission (omacom/omarchy-plugin-marketplace#5402) at reviewed commit f3f61f1 with the TOCTOU fix staged but uncommitted, pending a direct answer from HANCORE-linux on whether to move the privileged helper to a signed AUR package or harden the in-repo install instead.

## Rationale

Two things surfaced on re-audit. First, the initial fix relocated the vulnerability rather than closing it: the README told users to run `sudo python3` against an installer living in the same user-writable checkout, so root interprets swappable bytes. That is worse than the original finding, giving immediate root code execution at install time instead of a payload that runs later under pkexec. Second, research across all six marketplace docs found no mention of AUR, pacman, PKGBUILD, GPG, or signed packages anywhere, so the reviewer's packaging suggestion is personal preference, not written policy. SECURITY.md line 59 states that an install path obtaining code only from the submitted repository is not automatically rejected, while external unpinned remote execution remains a finding, and the entire verification model is commit-pinned to the submitted repo. Moving the helper to AUR therefore risks trading the reviewer's objection for a policy-level one. Asking one clarifying question costs a round trip; building a GPG key, release pipeline, and AUR package before knowing the answer costs far more and creates a permanent key-management burden. No financial cost attaches to any option, so cost is not the deciding factor. Maintenance burden and policy fit are.
