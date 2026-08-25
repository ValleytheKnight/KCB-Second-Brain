---
id: "4aec8c92-5370-4c81-9220-7b0013a4e2d7"
type: "decision"
date: "2026-08-24"
scope: "issue"
source: "skill"
confidence: 7
tags: ["knight-code", "decision"]
---
# Decision: Spec filed #2: codemode: in-house MCP call-batching tool

## Decision

Spec filed #2: codemode: in-house MCP call-batching tool

## Rationale

Adapt agent-codemode's core mechanism (script batching N MCP calls into 1 round-trip) without its credential-reading layer, since Knight Code's own MCP servers are locally spawned with no comparable remote-auth problem. v1 scope: session-lived daemon pool, mnemosyne routed through its existing proxy (not a raw store), manual invocation only, no standalone/cron execution.
