---
id: "865e457d-6d7b-42a1-92c9-fdd7dbc21291"
type: "promise"
date: "2026-07-30"
scope: "repo"
source: "user"
tags: ["knight-code", "promise", "open"]
---
# Promise: Expand lorebrain's language coverage from its current 4 real extractors (TypeScript, Python, bash, m...

## Promise

Expand lorebrain's language coverage from its current 4 real extractors (TypeScript, Python, bash, markdown, plus a coarse heuristic fallback) toward Graphify's ~40-language tree-sitter coverage, adding real per-language extractors (or a generic dispatcher where feasible), not just the fallback.

## Context

Chris requested this directly during the Graphify-vs-knightbrain comparison for KnightOS: "this will need to change i will want knight brain to expand to the full 40 languages." This is real engineering work on lorebrain itself (C:\Users\Chris Brown\Documents\Knight Code\lorebrain), separate from and not blocking KnightOS's Milestone 1 (which embeds lorebrain's existing graph.html as-is). Benefits knightbrain, knightbrain_source, and the campaign lorebrain instance simultaneously since they share the same engine.
