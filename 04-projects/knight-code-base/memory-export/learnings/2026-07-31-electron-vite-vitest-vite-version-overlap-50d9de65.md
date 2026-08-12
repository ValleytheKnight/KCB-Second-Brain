---
id: "50d9de65-abe6-44ce-9936-06e0d2dc7a63"
type: "learning"
date: "2026-07-31"
skill: "knightcode-incremental-implementation"
learning-type: "pitfall"
key: "electron-vite-vitest-vite-version-overlap"
confidence: 8
trusted: false
source: "observed"
tags: ["knight-code", "learning", "knightcode-incremental-implementation"]
---
# Learning: electron-vite-vitest-vite-version-overlap

## Insight

electron-vite 5.0.0 peer-requires vite ^5||^6||^7 while vitest 4.1.10 requires vite ^6||^7||^8 (both read directly from npm view peerDependencies). Vite 7 is the only overlapping major, so installing latest vite (8.x) alongside both breaks the peer graph. Pin vite ^7 explicitly when pairing electron-vite with Vitest. Also: electron-log is CommonJS with no module field, but a default import from an ESM main bundle works fine under Electron 43 via Node CJS interop, verified by a real launch, not assumed.
