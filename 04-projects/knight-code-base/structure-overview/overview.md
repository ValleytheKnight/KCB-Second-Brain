---
type: "structure-overview"
date: "2026-08-12"
tags: ["knight-code", "structure", "overview"]
---
# Knight Code Structure Overview

Knight Code is Chris's personal, single-user AI-agent tooling system, built as a set of skills, real custom agents, MCP servers, and enforcement hooks that all run inside Claude Code. This overview is a generated, structural view into what the system actually contains, not a narrative description.

This overview is split across five notes in this same folder:

- `skills.md`, every installed skill, its declared tools, invoke method, and associated agent.
- `agents.md`, every registered custom agent and every skill-embedded persona.
- `mcp-servers.md`, every registered MCP server and its launch command.
- `hooks.md`, every lifecycle hook and what each one enforces or automates.
- `repo-layout.md`, the top-level directory layout of the Knight Code repo.

Generated from Knight Code's own live skills knowledge graph, SKILL-CATALOG.md, AGENTS.md, .mcp.json, and the hook source files themselves, by `scripts/generate-structure-overview.ts` in the knight-code-base-companion repo.
