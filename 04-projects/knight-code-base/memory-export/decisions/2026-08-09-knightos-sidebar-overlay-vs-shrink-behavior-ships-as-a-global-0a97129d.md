---
id: "0a97129d-9642-4079-b260-4f005bee83b1"
type: "decision"
date: "2026-08-09"
scope: "repo"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: KnightOS sidebar overlay-vs-shrink behavior ships as a global user preference (Settings > Appearance...

## Decision

KnightOS sidebar overlay-vs-shrink behavior ships as a global user preference (Settings > Appearance > Sidebar behavior), defaulting to shrink on first run.

## Rationale

The mockup's own authors left this undecided (both modes designed and ready). Chris wants both available to the end user rather than picking one, so this is real new scope (a settings feature with persisted state), not just a design pick. Global rather than per-workspace, per Chris, for simplicity. Alternatives considered: per-workspace setting, rejected for added state/bug surface with no clear benefit Chris asked for; overlay-only or shrink-only as a fixed design choice, rejected because Chris explicitly wants it user-configurable.
