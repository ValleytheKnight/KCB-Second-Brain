---
id: "f6db1626-bbac-496a-bbae-fa9c802bd88b"
type: "decision"
date: "2026-09-05"
source: "agent"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Left Steam and Discord unconfined under AppArmor on vtk despite apparmor.d being installed, rather t...

## Decision

Left Steam and Discord unconfined under AppArmor on vtk despite apparmor.d being installed, rather than forcing either into enforce or complain mode.

## Rationale

Steam's shipped AppArmor profile is a near-empty stub (only grants userns) masquerading as a real profile via an unconfined flag; forcing it into any real mode broke Steam's own bwrap sandbox during testing (confirmed live: Steam crashed with a user-namespace error). Discord has two conflicting profile files, neither of which actually matches Arch's real install path with a working ruleset, so enabling either does nothing safe. Both are genuine gaps in what apparmor.d covers for these two apps on Arch's specific packaging, not something worth hand-patching for two applications. Considered and rejected: hand-writing or hand-patching a working profile for either app, disproportionate effort for two specific applications when the rest of the AppArmor coverage (162 profiles, matching the pre-migration baseline) already provides real containment for everything else.
