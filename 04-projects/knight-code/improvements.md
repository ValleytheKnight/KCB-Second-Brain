---
title: Improvement Ideas
project: knight-code
type: improvements-log
created: 2026-08-12
---

# Improvement Ideas

> [!tip] Status: Active

Running log of improvement ideas for this project as they come up. Add a dated entry when an idea strikes; triage periodically (promote to a task, discard, or leave open).

```button
name Promote Project
type command
action QuickAdd: Promote Project
```

## Open

- 2026-08-12:
- [x] 2026-08-12 17:40: bring formal and professional tactical implementation planning to knight code. possibly with spec driven development skills and agents #task
- [x] create a metaskill that has internal enforcement of already installed skills that creates the spec workflow #task
- [x] bring in a external UI for tracking progress #task
- [x] 2026-08-20 10:54: In-house MCP batching — high-level build plan  Core idea, adapted, not copied: (https://github.com/janwilmake/agent-codemode) agent-codemode's win is real — one script calling N MCP tools beats N sequential round-trips through the model. But its credential-reading design doesn't apply here: Knight Code's own MCP servers (knightbrain_*, knight-code-memory, mnemosyne) are local stdio processes spawned by Claude Code with empty env blocks, not remote OAuth-authenticated servers. So the in-house version doesn't need to touch ~/.claude.json or any credential file at all — that whole attack surface just isn't there for v1. Scope it to Knight Code's own trusted local servers only; leave remote/authenticated MCP servers out until there's an actual need.  Where it lives: as a skill + CLI, following the existing pattern (compare rtk's proxy-and-analytics shape, or browse's CLI). Not a new registry, not a parallel agent mechanism — a tool invoked the same way rtk or browse already are. Source edits go through docs/SKILL_SOURCES_AND_INSTALLS.md's edit-source-then-skills: install flow if it ships as a skill.  Phases:  1. Codegen — introspect each configured MCP server's list_tools response and generate a typed TS wrapper module per server (e.g. mcp.knightbrain.def(...), mcp.memory.decisionSearch(...)), the same shape agent-codemode's examples/standup.ts shows. Source: .mcp.json config Knight Code already has, no new discovery mechanism. 2. Script runner — a small bun-based executor that takes a script referencing the generated wrappers, runs it with the already-open stdio connections (or spawns fresh ones per server, matching current MCP proxy behavior), and returns one aggregated result to the agent instead of N tool-call round-trips. 3. Invocation surface — a skill (e.g. knightcode-codemode) that recognizes "this needs 5+ related tool calls" and offers the batched-script path instead of sequential calls. Mirrors how rtk is transparently substituted via hook rewriting, so this could plausibly also be hook-triggered rather than requiring the agent to remember to invoke it. 4. Measurement before expansion — instrument it the way rtk gain does: log token cost of batched vs. sequential on a handful of real workflows (knightbrain_* multi-query lookups, decision_search + promise_search + dev_diary_search combos are the obvious first targets) before deciding whether to extend it further.  Explicit non-goals for v1: no remote/OAuth MCP servers, no credential-file reading, no new agent-creation path — this is a tool, not an agent, so it doesn't touch create_agent/.claude/agents/.  Want this logged as a promise, or turned into a real spec via /knightcode-spec before anything gets built? Logged as promise d3c0f815
- [ ] 2026-08-25 21:08: v2 scope decision (spec-workflow, remote/OAuth servers) - scope this out

## Triaged / Actioned

- 
