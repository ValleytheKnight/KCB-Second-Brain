---
id: "1b97c330-b83e-4c93-92c6-11e1f46d4f26"
type: "decision"
date: "2026-08-14"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Scryptable v1 does not build its own Discord recording bot; it keeps relying on Craig (or another ex...

## Decision

Scryptable v1 does not build its own Discord recording bot; it keeps relying on Craig (or another external bot) for the actual multi-track recording, since Craig already works well for this. A built-in bot is roadmapped as a future feature, not v1 scope. What v1 does get: a persistent, in-app GUI for mapping Discord usernames to campaign character names, set up before or independent of any recording, not derived after the fact from an imported archive.

## Rationale

Chris's direct call. Building a Discord voice bot (gateway connection, per-speaker audio capture, bot lifecycle, ongoing exposure to Discord API/ToS changes) is a large, separate subsystem that doesn't need to exist while Craig already solves the recording problem well. The real, valuable near-term feature is making the Discord-username-to-character-name mapping persistent and settable ahead of time in the app's own GUI, rather than something re-derived every episode after import.
