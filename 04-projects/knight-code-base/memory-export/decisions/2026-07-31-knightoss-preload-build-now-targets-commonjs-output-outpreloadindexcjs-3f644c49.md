---
id: "3f644c49-a2d7-42db-90dd-ed16132fe804"
type: "decision"
date: "2026-07-31"
scope: "repo"
source: "agent"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: KnightOS's preload build now targets CommonJS output (`out/preload/index.cjs`, `rollupOptions.output...

## Decision

KnightOS's preload build now targets CommonJS output (`out/preload/index.cjs`, `rollupOptions.output.format: 'cjs'` in electron.vite.config.ts, `externalizeDepsPlugin` removed from the preload config), and `src/main/index.ts` loads `../preload/index.cjs` instead of `../preload/index.mjs`. This fixes a real, previously-undetected regression from the prior commit that enabled `sandbox: true`: Electron's sandboxed preload loader cannot execute ES modules, so the entire preload bridge (contextBridge exposure, `log`, `getLogPath`, versions, everything) silently failed to load on every launch, with the failure only visible in the main process's own console output, never surfaced to the renderer or to a build/typecheck/test run.

## Rationale

The prior commit (a7caec3) claimed to verify "the app launches, the exposed bridge surface is unchanged" after flipping sandbox to true, but that verification did not actually drive the live app and check whether the bridge was reachable from the renderer; it only confirmed the build succeeded and the window opened without crashing. This was only caught because Task 2's verification used CDP to actually load the live renderer and inspect `window.knightos`, which was `undefined`, and the DevTools console (captured via CDP's Runtime domain) showed "Unable to load preload script... SyntaxError: Cannot use import statement outside a module." Confirmed via electron-vite's own documented guidance (its troubleshooting page and GitHub discussion #423) that sandboxed preload scripts must be CommonJS and must not use externalizeDepsPlugin, since a sandboxed preload cannot require() separate node_modules files at runtime.

## Alternatives Considered

Setting `sandbox: false` to restore ESM preload support (rejected outright: this is exactly the capability loosening Task 2's own instructions said must never happen as a workaround, and the real, correct, documented fix exists without it).
