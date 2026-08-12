---
id: "d3056b62-1e13-4b3f-a721-d88987d7cbcd"
type: "decision"
date: "2026-07-30"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: KnightOS's Milestone 1 graph panel is not a straight embed of lorebrain's existing graph.html as-is....

## Decision

KnightOS's Milestone 1 graph panel is not a straight embed of lorebrain's existing graph.html as-is. It includes a real UI/UX overhaul pass, visual polish, smoother interaction, and user-friendliness, as part of the milestone's scope, not deferred to later.

## Rationale

Chris confirmed he wants the graph panel (decision 2eefa291 stands: embed via WebView2, not a new engine), but named the current graph.html output as not smooth, not visually appealing, and not user-friendly as it exists today. This is new scope beyond a plain embed.
