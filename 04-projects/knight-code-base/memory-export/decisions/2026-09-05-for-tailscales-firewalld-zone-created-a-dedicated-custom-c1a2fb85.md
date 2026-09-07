---
id: "c1a2fb85-3832-4fb3-a9f1-e5f20396f9d0"
type: "decision"
date: "2026-09-05"
source: "agent"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: For Tailscale's firewalld zone, created a dedicated custom zone (deny-by-default target, explicit po...

## Decision

For Tailscale's firewalld zone, created a dedicated custom zone (deny-by-default target, explicit port allowlist) rather than using the built-in trusted zone.

## Rationale

firewalld's built-in trusted zone accepts all traffic by default, unconditionally. Adding explicit port rules to it would be pointless since the zone already allows everything regardless. The goal was an actual allowlist for Tailscale traffic (SSH, Nextcloud, LocalSend only), not blanket trust of every device on the tailnet, so a custom zone with a real default-deny target was the only way to get that.
