---
id: "7b7ab710-2205-4339-ae6b-151ac80d8c9c"
type: "decision"
date: "2026-09-09"
source: "agent"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: omarchy-image-theme's knowledge graph is registered as knightbrain_omarchy-theme-forge_* (not knight...

## Decision

omarchy-image-theme's knowledge graph is registered as knightbrain_omarchy-theme-forge_* (not knightbrain_omarchy-image-theme_* as decision 15f23e65 originally named it)

## Rationale

Chris created the project's GitHub repo under the official app name "omarchy-theme-forge" before Task 1 started, superseding the "omarchy-image-theme" working name the CEO/Design/Eng/Security reviews were all conducted under. The graph slug now matches the real repo directory (~/Documents/DevPrograms/omarchy-theme-forge/) and the Scryptable/KnightOS pattern in Knight Code's .mcp.json. The graph did not actually exist under either name before this session, checked .mcp.json directly, no prior entry existed, so this is the graph's real first registration, not a rename of a live server. Alternative considered: keeping the old omarchy-image-theme slug to match decision 15f23e65's literal wording verbatim, rejected per Chris's explicit instruction this session to rename the slug to match the app's real name since it hadn't been set up yet.
