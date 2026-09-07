---
type: "dev-diary"
date: "2026-09-05"
tags: ["knight-code", "dev-diary"]
---
# Closed the Nextcloud boot-race with a firewall-first fix instead of ordering

Nextcloud kept failing to come up after a reboot because its container ports were bound to a specific mesh-network address that isn't assigned to the interface yet at the moment the container starts. The obvious fix is to make the container wait its turn, but that just trades one race for a slower one. Rebinding to the universal address instead removes the ordering dependency entirely, since the existing firewall zone rules were already the real gatekeeper, the address-specific bind was redundant defense that turned out to be the actual point of failure. Verified with a real reboot rather than trusting the fix on paper.
