---
type: "dev-diary"
date: "2026-09-05"
tags: ["knight-code", "dev-diary"]
---
# Extended a mesh-network firewall zone to cover phone integration and file transfer

Wanted phone-to-laptop integration and file transfer to work over the mesh network regardless of which physical network the laptop's wifi happens to be on at the time. Both tools rely on local-network broadcast for automatic discovery, which doesn't cross a mesh tunnel, so the real fix was two parts: open the actual port range on the tunnel's own firewall zone, and connect once manually by address instead of waiting for auto-discovery. Researched the true required port range from the tool's own documentation before widening anything, rather than assuming the full range was legacy padding safe to narrow.
