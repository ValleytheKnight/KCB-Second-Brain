---
id: "cb635cda-430b-4236-8250-1e0417ef3133"
type: "decision"
date: "2026-09-05"
source: "user"
confidence: 10
tags: ["knight-code", "decision"]
---
# Decision: SSH hardened to key-only auth (PasswordAuthentication no) on vtk, but deliberately left SSH reachabl...

## Decision

SSH hardened to key-only auth (PasswordAuthentication no) on vtk, but deliberately left SSH reachable on both the home firewalld zone and the new tailscale zone, not Tailscale-only.

## Rationale

Chris SSHes in from his phone both while on the same home WiFi and remotely away from home. Restricting SSH to Tailscale-only would have broken the home-LAN use case for no real security gain, since password auth (the actual brute-force risk) is already disabled regardless of which network the connection arrives on.
