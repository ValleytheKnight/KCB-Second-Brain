---
id: "49c13edc-7342-459b-adef-9529a00f4eb8"
type: "learning"
date: "2026-08-24"
skill: "knightcode-codemode"
learning-type: "pitfall"
key: "bun-spawn-env-inheritance"
confidence: 8
tags: ["knight-code", "learning", "knightcode-codemode"]
---
# Learning: bun-spawn-env-inheritance

## Insight

Bun.spawn's default env inheritance uses the process's env snapshot from interpreter startup, not values set at runtime via process.env.X = ... before the spawn call. A caller mutating process.env then relying on default inheritance for a spawned child (e.g. a test setting KNIGHTCODE_STATE_ROOT before calling code that spawns a daemon) silently loses that override. Fix: always pass env explicitly (env: process.env) when the spawn needs runtime-set env vars to reach the child.
