---
id: "f6cc43fa-60bb-4d15-898e-0427a53ee3a9"
type: "decision"
date: "2026-08-09"
scope: "repo"
source: "user"
confidence: 8
tags: ["knight-code", "decision"]
---
# Decision: KnightOS multi-workspace MCP connections stay live for all open workspaces simultaneously, not just ...

## Decision

KnightOS multi-workspace MCP connections stay live for all open workspaces simultaneously, not just the active one.

## Rationale

Resolves the open architecture question logged in promise_log 10e59913. Chris chose instant workspace switching over lower resource use; eng is responsible for sizing background resource use and handling silent connection drops. Alternative considered: only active workspace's MCP connections stay live (teardown/reconnect on switch), rejected because Chris prioritized switch speed over resource simplicity.
