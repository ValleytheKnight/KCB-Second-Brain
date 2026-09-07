---
id: "e660e634-7300-49f8-bc51-00ec62f79251"
type: "decision"
date: "2026-09-05"
tags: ["knight-code", "decision"]
---
# Decision: Changed docker-compose.yml port bindings for the app and proxy services from the hardcoded Tailscale...

## Decision

Changed docker-compose.yml port bindings for the app and proxy services from the hardcoded Tailscale IP (100.74.104.97) to 0.0.0.0, removing the now-redundant explicit 127.0.0.1 lines (0.0.0.0 already covers loopback, keeping both caused a bind conflict on the retry). Access control stays with firewalld's existing zone rules rather than the IP bind.

## Rationale

The IP-bound ports required the Tailscale interface to already have that IP assigned before Docker started; if docker.service won the race against tailscaled at boot, the bind silently failed and Nextcloud was unreachable until a manual compose down/up. Binding to 0.0.0.0 removes the ordering dependency entirely instead of adding systemd After= ordering (the alternative considered), since firewalld's tailscale zone (8443/tcp only) and public zone (no Nextcloud ports) were already doing the real access gating, making the IP bind redundant defense that turned out to be the actual failure point. Verified after a real reboot: firewalld zones unchanged as expected, Nextcloud reachable on phone with no manual intervention.
