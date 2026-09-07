---
id: "3bc39d71-1a50-47d8-8fb1-5c13e85ba9a9"
type: "decision"
date: "2026-09-05"
tags: ["knight-code", "decision"]
---
# Decision: Confirmed LocalSend's port was already open on the tailscale firewalld zone from earlier setup. Veri...

## Decision

Confirmed LocalSend's port was already open on the tailscale firewalld zone from earlier setup. Verified through research that manual IP entry in LocalSend is not restricted to the same physical network and works over a mesh network like Tailscale by design. Connected both directions using each device's stable Tailscale address rather than a local network IP that would change.

## Rationale

Chris wants file transfer to his phone working regardless of which physical network either device is on. A locally assigned network address changes between networks, but a Tailscale address is stable per device, so it was the right thing to hand to LocalSend's manual connect and favorite features instead.
