---
type: "dev-diary"
date: "2026-09-05"
tags: ["knight-code", "dev-diary", "apparmor", "omarchy-migration"]
---
# AppArmor: Steam and Discord profile gaps found while re-hardening on Omarchy

Redid the AppArmor hardening step post-migration: kernel boot params added, apparmor.d installed for broader app coverage, 162 profiles confirmed loaded matching the pre-migration baseline. Found a packaging conflict where the base package's placeholder stubs and apparmor.d's real profiles both declare the same profile name for four apps, fixed by moving the stubs out of the profile directory.  Real lesson: read a profile's actual ruleset before enforcing it. Steam's shipped profile looked real but was actually a near-empty stub. Enforcing it broke Steam's own sandbox (confirmed live crash, a user-namespace requirement error), because the kernel's unprivileged-userns restriction requires every process in a confinement chain to explicitly grant that permission, and Steam re-execs itself through several unlisted scripts before reaching its own sandbox helper. Reverted to unconfined. Discord had two conflicting profiles, one similarly near-empty, one well-built but pointed at a binary path Arch's package doesn't use, so neither applies. Both left unconfined as genuine coverage gaps, not something worth hand-patching.
