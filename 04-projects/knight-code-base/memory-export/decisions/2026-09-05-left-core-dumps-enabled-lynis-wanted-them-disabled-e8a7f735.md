---
id: "e8a7f735-17fc-4ddb-89a1-41bdf25e5874"
type: "decision"
date: "2026-09-05"
tags: ["knight-code", "decision"]
---
# Decision: Left core dumps enabled (Lynis wanted them disabled via limits.conf) and left gcc/cc executable by t...

## Decision

Left core dumps enabled (Lynis wanted them disabled via limits.conf) and left gcc/cc executable by the normal user account (Lynis wanted compiler access restricted to root).

## Rationale

Both are generic server-hardening suggestions that would break real, already-relied-on behavior on this machine. Disabling core dumps would break the existing crash-diagnosis pipeline built around systemd-coredump. Restricting compiler access would break yay and makepkg, which run gcc as the normal user for every AUR package build, a routine and frequent action on this machine, not an edge case.
