---
id: "2eefa291-c4b2-4a11-b10d-8fa17a18ef4a"
type: "decision"
date: "2026-07-30"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: KnightOS commits to a visual knowledge-graph panel for browsing Knight Code's codebase and Chris's O...

## Decision

KnightOS commits to a visual knowledge-graph panel for browsing Knight Code's codebase and Chris's Obsidian vaults, but implemented by embedding lorebrain's own existing graph.html output (via WebView2) as a small addition to Milestone 1, not by adopting Graphify as a new engine.

## Rationale

Verified directly against source rather than assumed: lorebrain's own src/types.ts and package.json state its architecture is inspired by Graphify-Labs/graphify (MIT), and it already produces a real, working, self-contained graph.html (pan/zoom, search, node-type filters, Louvain community coloring, click-to-inspect), confirmed already generated on disk for both Knight Code's codebase and the campaign vault, plus purpose-built Obsidian wikilink/folder-typing semantics Graphify's generic pass lacks. This closes the demand-evidence gap that led to the prior reversal: the want is real, and it is already solved by the existing system, not a reason to build or adopt a new one. Graphify retains two narrow, real advantages (broader tree-sitter language coverage, real PDF/image/video content analysis) that are not reasons to replace lorebrain now, only a narrow reason to revisit Graphify specifically if one of those gaps becomes a genuine, evidenced need later.

## Alternatives Considered

Leaving it as an open question pending its own demand-evidence pass (the immediately prior decision); superseded because the actual blocking question was resolved by verification, not by gathering more demand evidence. Adopting Graphify wholesale as a new engine; rejected because lorebrain already does the deterministic-extraction-to-graph pipeline Graphify pioneered, and duplicating it would mean maintaining two overlapping systems for no capability gain outside the two narrow advantages named above.
