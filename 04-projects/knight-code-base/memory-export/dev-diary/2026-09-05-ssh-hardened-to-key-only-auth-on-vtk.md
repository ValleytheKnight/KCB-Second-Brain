---
type: "dev-diary"
date: "2026-09-05"
tags: ["knight-code", "dev-diary", "ssh-hardening", "omarchy-migration"]
---
# SSH hardened to key-only auth on vtk

Hardened SSH to key-only authentication, disabling password auth via a drop-in config, with Arch's own existing PAM-related default closing a fallback path that would otherwise have bypassed the change. Deliberately kept SSH reachable on both the home firewall zone and the new tailscale zone, not tailscale-only, since Chris connects in from his phone on the same home network too, not just remotely. Verified working with a fresh connection attempt before closing the session that made the change, avoiding a lockout.
