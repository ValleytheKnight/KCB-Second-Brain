---
type: "structure-overview"
date: "2026-08-26"
tags: ["knight-code", "structure", "mcp"]
---
# Knight Code MCP Servers

Knight Code registers 11 MCP servers in its own .mcp.json, each exposing tools the session calls directly (the mcp__<server>__<tool> naming Claude Code uses). Structural graph servers, like knightbrain and lorebrain, reindex on every query, so they never go stale between sessions.
## Registered servers

| Server | Launch command |
|---|---|
| `knight-code-memory` | `bun run mcp/memory-server/src/server.ts` |
| `knight-code-agent-manager` | `bun run mcp/agent-manager/src/server.ts` |
| `knight-code-mnemosyne` | `bun run mcp/mnemosyne-proxy/src/server.ts` |
| `lorebrain` | `bun ./lorebrain/src/cli.ts mcp --root /home/vtk/Documents/Obsidian Vaults/Revenge of the Felled God` |
| `obsidian_felled_god` | `uvx mcp-obsidian` |
| `obsidian_devknight` | `uvx mcp-obsidian` |
| `obsidian_plugin_tester` | `uvx mcp-obsidian` |
| `knightbrain` | `bun ./lorebrain/src/cli.ts mcp --root . --tool-prefix knightbrain` |
| `knightbrain_scryptable` | `bun ./lorebrain/src/cli.ts mcp --root /home/vtk/Documents/DevPrograms/Scryptable --tool-prefix knightbrain_scryptable` |
| `knightbrain_knightos` | `bun ./lorebrain/src/cli.ts mcp --root /home/vtk/Documents/DevPrograms/KnightOS --tool-prefix knightbrain_knightos` |
| `spec-workflow` | `npx -y @pimzino/spec-workflow-mcp@latest .` |

Beyond .mcp.json, Knight Code also has knight-code-mnemosyne (semantic recall and a knowledge-graph triple store) and knight-code-base (live Obsidian vault control over the REST API), both reached through the same MCP mechanism.
