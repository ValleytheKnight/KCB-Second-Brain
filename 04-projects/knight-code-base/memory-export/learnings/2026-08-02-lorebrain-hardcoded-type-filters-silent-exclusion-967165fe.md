---
id: "967165fe-7558-42c0-abca-99b4181429b9"
type: "learning"
date: "2026-08-02"
skill: "knightcode-plan-eng-review"
learning-type: "pitfall"
key: "lorebrain-hardcoded-type-filters-silent-exclusion"
confidence: 8
trusted: false
source: "cross-model"
tags: ["knight-code", "learning", "knightcode-plan-eng-review"]
---
# Learning: lorebrain-hardcoded-type-filters-silent-exclusion

## Insight

lorebrain's query.ts and report.ts filter nodes/edges through hardcoded literal type lists (e.g. n.type === 'function' || n.type === 'class' || ...), not exhaustive switches. Adding a new NodeType/EdgeType to types.ts is TypeScript-safe and compiles clean at every such site, but the new type will silently never resolve through knightbrain_def/_refs/_query or appear in GRAPH_REPORT.md unless every literal list is manually found and updated in the same change. This is a real, repeat-verified failure shape (seen twice already per learnings_search history), not hypothetical. Any future schema addition to lorebrain/src/types.ts (new NodeType or EdgeType) must grep every '.type === ' site across query.ts/report.ts/any viz generator and update them as part of the same diff, then verify with a direct query against a real node/edge of the new type, not just confirm it exists in the raw graph.json.
