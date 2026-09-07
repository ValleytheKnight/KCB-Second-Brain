---
id: "2b812e6a-8be2-4deb-af04-a476865d7fc6"
type: "promise"
date: "2026-09-06"
source: "user"
tags: ["knight-code", "promise", "open"]
---
# Promise: Fix Snip.app properly with a fresh install (not just the desktop-entry path fix already applied). Th...

## Promise

Fix Snip.app properly with a fresh install (not just the desktop-entry path fix already applied). The CachyOS-to-Omarchy migration only copied the Snip.AppImage file over rather than doing a clean install, and its render pipeline hangs indefinitely (mermaid and HTML both, even a trivial 2-node diagram) even after the launch path was corrected and the app relaunched.

## Context

Found 2026-09-06 while trying to render a home-network device map for Chris during router tuning work. Fixed the immediate stale /home/vtk/ path bug in snip-app.desktop so the app launches, but snip render --format mermaid still times out after 30s with the app open and idle. Chris's own diagnosis: probably needs a fresh install since migration just copied the AppImage rather than reinstalling properly.
