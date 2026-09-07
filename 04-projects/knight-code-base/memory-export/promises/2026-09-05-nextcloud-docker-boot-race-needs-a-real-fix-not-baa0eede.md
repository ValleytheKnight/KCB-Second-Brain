---
id: "baa0eede-44a5-45bb-8f5e-ea6b7b0c189e"
type: "promise"
date: "2026-09-05"
tags: ["knight-code", "promise", "open"]
---
# Promise: Nextcloud Docker boot-race needs a real fix, not just the manual recovery. The compose file currentl...

## Promise

Nextcloud Docker boot-race needs a real fix, not just the manual recovery. The compose file currently binds ports to the literal Tailscale IP address rather than 0.0.0.0, and a reboot loses port publishing whenever the containers start before Tailscale finishes assigning that address. Two candidate fixes discussed: rebind to 0.0.0.0 with firewalld's tailscale zone gating actual access, or a systemd unit dependency making the stack wait on the real IP existing rather than just the tailscaled service reporting active.

## Context

Found and worked around, not fixed at the root, 2026-09-05. The manual recovery is a docker compose down then up -d once Tailscale is confirmed up, which works but repeats on every reboot until this is done.
