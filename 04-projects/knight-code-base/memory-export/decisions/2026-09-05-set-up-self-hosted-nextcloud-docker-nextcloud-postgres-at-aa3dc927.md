---
id: "aa3dc927-e3aa-4f22-aeb6-4bf5d999041d"
type: "decision"
date: "2026-09-05"
source: "user"
tags: ["knight-code", "decision"]
---
# Decision: Set up self-hosted Nextcloud (Docker: nextcloud + postgres, at ~/docker/nextcloud) to sync the Self ...

## Decision

Set up self-hosted Nextcloud (Docker: nextcloud + postgres, at ~/docker/nextcloud) to sync the Self Taught Obsidian vault to Chris's iPad for offline lesson review, reachable only over Tailscale (bound to 127.0.0.1 and the vtk tailnet IP, not the public LAN interface), with a ufw-docker allow rule for the published port.

## Rationale

Chris rejected paid Obsidian Sync. Tailscale was already running on vtk and one other device, so it was the free, already-available path to reach a self-hosted service from outside the home network without exposing it publicly or maintaining TLS/port-forwarding. Nextcloud chosen over Syncthing because Chris has used this exact Docker+Nextcloud+autosync pattern before and wanted to repeat it, even though the prior instance didn't survive the CachyOS-to-Omarchy migration and needed a full rebuild.
