---
id: "43d0b136-a66a-4cbf-a60e-4162cc18a3f4"
type: "decision"
date: "2026-08-14"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: The Discord Mapping tab generalizes into "Speaker Identity Mapping," one table covering both import ...

## Decision

The Discord Mapping tab generalizes into "Speaker Identity Mapping," one table covering both import sources: a Discord username (Craig imports) or a generic track/file label (other multi-track sources), each mapped to a campaign character name.

## Rationale

The original Discord-username-to-character-name GUI only made sense for Craig imports; a user bringing in multi-track audio from a different tool has no Discord username at all, just separate audio files with no identity attached. Rather than building a second, parallel GUI for that case, one generalized table with a "Source Identity" column (Discord handle OR track/file label, whichever applies) serves both, keeping names-master.json's real-world usage in one place instead of two.
