---
id: "385941ae-3dfd-471a-a5b9-19993467c4b5"
type: "decision"
date: "2026-09-05"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: Migrated vtk's firewall from ufw to firewalld, with a zone layout matched to the laptop's actual tra...

## Decision

Migrated vtk's firewall from ufw to firewalld, with a zone layout matched to the laptop's actual travel pattern: home (WiFi profiles Nacho wifi, Nacho wifi_EXT, Vtk mobile hotspot), a new custom tailscale zone (bound to tailscale0, deny-by-default target, explicit port allowlist), and public (default) for every other network.

## Rationale

ufw was already correctly scoped except for one gap (LocalSend's port open to Anywhere with no restriction). The deciding factor was firewalld's zone model: since this laptop travels to work and other networks, a network-aware ruleset that tightens automatically away from home is worth more than ufw's flat, always-the-same rule list, which requires scoping every rule by hand and offers no notion of "this only applies on my trusted network." Considered and rejected: staying on ufw and just fixing the one LocalSend scoping gap by hand, since that would have to be redone manually for every future service with no protection against forgetting, exactly the kind of mistake that already happened once with LocalSend.
