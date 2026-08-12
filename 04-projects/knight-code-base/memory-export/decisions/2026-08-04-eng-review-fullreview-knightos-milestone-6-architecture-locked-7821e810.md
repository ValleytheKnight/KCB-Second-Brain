---
id: "7821e810-5b53-4b82-b308-c3bd67edba46"
type: "decision"
date: "2026-08-04"
scope: "repo"
source: "skill"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: Eng review (FULL_REVIEW): KnightOS Milestone 6 architecture locked, hook-based session-id passing vi...

## Decision

Eng review (FULL_REVIEW): KnightOS Milestone 6 architecture locked, hook-based session-id passing via env var, KnightOS-wide hook registration, push-based IPC, in-hook timeout-bounded redaction reusing existing detection patterns, explicit-error-state-with-auto-retry on tailer failure, virtualized (not truncating) chat-bubble history, nested subagent representation, retry-on-newline for partial JSONL lines.

## Rationale

Approach B (reuse the hook-capture pattern, build KnightOS-native) chosen over adopting an external monitor tool wholesale or building fully custom, since it avoids an external dependency in KnightOS's critical path while still reusing a proven mechanism. Two full review passes (spec review during office-hours, then plan-eng-review plus an internal outside-voice challenge) surfaced and resolved 9 additional architecture gaps the original design missed, most consequentially the subagent-nesting representation and the redaction-latency risk.

## Alternatives Considered

Approach A (adopt hoangsonww/Claude-Code-Agent-Monitor directly) and Approach C (full custom, no reuse) were both rejected in the office-hours pass; documented in the design doc itself.
