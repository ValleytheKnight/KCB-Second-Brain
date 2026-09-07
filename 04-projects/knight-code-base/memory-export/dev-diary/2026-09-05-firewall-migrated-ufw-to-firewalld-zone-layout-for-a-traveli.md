---
type: "dev-diary"
date: "2026-09-05"
tags: ["knight-code", "dev-diary", "firewalld", "omarchy-migration"]
---
# Firewall migrated ufw to firewalld, zone layout for a traveling laptop

Migrated vtk's firewall from ufw to firewalld, motivated by a real gap in ufw's otherwise well-scoped ruleset: a LAN file-sharing tool's port was open to any network with no restriction, unlike a comparable service that was correctly scoped to the home subnet. Since this laptop travels, firewalld's zone model (automatically tightening on an unfamiliar network without scoping every rule by hand) was worth the migration.  Built three zones: home (three WiFi profiles including the phone hotspot, pinned so the zone assignment survives reconnects), a new custom tailscale-only zone (deny-by-default target, since the built-in trusted zone accepts everything unconditionally and would defeat an explicit allowlist), and the default zone left restrictive for every other network. Docker's port publishing for the self-hosted Nextcloud service worked under firewalld with no extra compatibility patch needed, unlike ufw which needed a separate helper package for the same thing.
