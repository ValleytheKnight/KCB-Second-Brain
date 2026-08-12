---
id: "c7da4a36-812a-4b74-959c-d4aa1883b5e6"
type: "learning"
date: "2026-08-07"
skill: "incremental-implementation"
learning-type: "operational"
key: "npx-tsc-not-found-use-bunx"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "incremental-implementation"]
---
# Learning: npx-tsc-not-found-use-bunx

## Insight

In this repo, `npx tsc --noEmit` fails ("This is not the tsc command you are looking for", npx's own placeholder error, since TypeScript is not installed as a dependency npx can find). `bunx tsc --noEmit` works correctly against the root tsconfig.json and is the right typecheck command project-wide, including for lorebrain/src (not excluded from the root tsconfig). Confirmed across 7 verification passes during the AMBIGUOUS-tier/affected-tool/mermaid-view work on lorebrain.
