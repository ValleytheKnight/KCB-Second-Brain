---
id: "405f6ebd-c57c-420a-afb0-b6bb15c3f67f"
type: "decision"
date: "2026-07-30"
scope: "repo"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: KnightOS writes real error/diagnostic logs to a file on disk (standard Electron pattern, e.g. electr...

## Decision

KnightOS writes real error/diagnostic logs to a file on disk (standard Electron pattern, e.g. electron-log, under %APPDATA%) from Milestone 1 onward, so a packaged-build failure (bad git shell-out, corrupted session file, failed update check) is diagnosable without a dev console.

## Rationale

Surfaced during the plan-ceo-review's observability section and approved by Chris. Without this, the first real bug in a packaged (non-dev) build would be invisible and undiagnosable.
