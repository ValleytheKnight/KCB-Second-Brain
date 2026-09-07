---
id: "d196fbb0-b749-4649-8952-c1e604115187"
type: "decision"
date: "2026-09-05"
tags: ["knight-code", "decision"]
---
# Decision: Added 1714-1764/tcp and 1714-1764/udp to the tailscale zone (in addition to the existing home zone g...

## Decision

Added 1714-1764/tcp and 1714-1764/udp to the tailscale zone (in addition to the existing home zone grant). KDE Connect now reachable over Tailscale regardless of which zone the laptop's wifi interface is currently in.

## Rationale

Chris wants his phone to reach KDE Connect no matter what network the laptop's wifi is on, which requires the tailscale interface's own zone to carry the grant rather than relying on the wifi zone. Researched before widening the range rather than assuming: KDE's own wiki, GSConnect's wiki, and multiple distro packaging trackers all confirm the full range is the genuine upstream requirement, not legacy padding safe to narrow. Risk is mitigated by this only applying on the tailscale zone, gated behind Tailscale's own device authentication, not exposed on public or unauthenticated networks. Auto-discovery broadcasts still won't cross Tailscale, so devices need to be added manually by IP the first time.
