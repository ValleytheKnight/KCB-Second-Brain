---
id: "3d2df256-a056-4455-9860-d0788a8662e5"
type: "decision"
date: "2026-09-05"
tags: ["knight-code", "decision"]
---
# Decision: Enabled ClamAV's own daily signature-update timer, built a custom weekly scan script covering home, ...

## Decision

Enabled ClamAV's own daily signature-update timer, built a custom weekly scan script covering home, etc, and usr local, and wired it to a weekly systemd timer with the same catch-up-on-boot behavior as the rkhunter timer.

## Rationale

Chose scheduled scanning over the always-on scanning daemon to avoid its RAM cost, confirmed by research to run several hundred megabytes to over a gigabyte just idling. Scoped the scan to the three directories where user-writable and configuration content actually lives rather than the whole filesystem, keeping it fast and avoiding false positives inside package-owned system files. Chris later chose to also try the always-on real time mode as a separate, explicitly reversible experiment, tracked apart from this decision.
