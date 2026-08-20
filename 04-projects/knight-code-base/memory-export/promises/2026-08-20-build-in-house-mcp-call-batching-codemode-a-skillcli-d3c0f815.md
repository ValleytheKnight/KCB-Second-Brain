---
id: "d3c0f815-5de3-4bdf-82a2-34009db484f5"
type: "promise"
date: "2026-08-20"
source: "user"
tags: ["knight-code", "promise", "open"]
---
# Promise: Build in-house MCP call batching ("codemode"): a skill/CLI that generates typed wrappers from Knight...

## Promise

Build in-house MCP call batching ("codemode"): a skill/CLI that generates typed wrappers from Knight Code's local stdio MCP servers (knightbrain_*, knight-code-memory, mnemosyne) and lets an agent run one script calling several tools at once instead of N sequential tool-call round-trips.

## Context

Came up 2026-08-20 evaluating github.com/janwilmake/agent-codemode, which does this but reads live OAuth tokens/credentials off disk to hit remote MCP servers. Knight Code's own MCP servers are local stdio with empty env, so the in-house version can skip that entire credential-reading surface for v1: codegen wrappers from list_tools, a bun script runner, measure token savings (rtk gain style) before expanding. Chris asked to log this to return to later, not to start now.
