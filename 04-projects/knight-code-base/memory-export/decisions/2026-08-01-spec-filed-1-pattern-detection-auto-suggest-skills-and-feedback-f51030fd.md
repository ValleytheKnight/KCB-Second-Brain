---
id: "f51030fd-f7e0-4273-9643-cef8a19bbf17"
type: "decision"
date: "2026-08-01"
scope: "issue"
source: "skill"
confidence: 7
tags: ["knight-code", "decision"]
---
# Decision: Spec filed #1: Pattern-detection: auto-suggest skills and feedback memories from repeated behavior

## Decision

Spec filed #1: Pattern-detection: auto-suggest skills and feedback memories from repeated behavior

## Rationale

Built as a Knight Code-native feature instead of adopting agentmemory (the external tool that prompted this): reuses the existing PostToolUse hook telemetry pattern (grep-nudge-hook.ts) and the existing knightcode-writing-skills authoring path rather than importing a separate runtime. Two lanes: repeated action sequences (tool-usage telemetry, 3+ occurrence threshold) and repeated corrections/preferences (mining hook-invocations.log denial repeats plus transcript re-read). MVP is on-demand only via a new pattern-review skill; live nudging is an explicit Phase 2. Every candidate requires per-item approval before anything is written, no auto-write.
