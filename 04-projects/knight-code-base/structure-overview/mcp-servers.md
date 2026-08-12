---
type: "structure-overview"
date: "2026-08-12"
tags: ["knight-code", "structure", "mcp"]
---
# Knight Code MCP Servers

Knight Code registers 5 MCP servers in its own .mcp.json, each exposing tools the session calls directly (the mcp__<server>__<tool> naming Claude Code uses). Structural graph servers, like knightbrain and lorebrain, reindex on every query, so they never go stale between sessions.
## Registered servers

| Server | Launch command |
|---|---|
| `knight-code-memory` | `bun run mcp/memory-server/src/server.ts` |
| `knight-code-agent-manager` | `bun run mcp/agent-manager/src/server.ts` |
| `knight-code-mnemosyne` | `bun run mcp/mnemosyne-proxy/src/server.ts` |
| `lorebrain` | `bun C:\Users\Chris Brown\Documents\Knight Code\lorebrain\src\cli.ts mcp --root C:\Users\Chris Brown\Documents\Obsidian Vaults\Revenge of the Felled God` |
| `knightbrain` | `bun C:\Users\Chris Brown\Documents\Knight Code\lorebrain\src\cli.ts mcp --root C:\Users\Chris Brown\Documents\Knight Code --tool-prefix knightbrain` |

Beyond .mcp.json, Knight Code also has knight-code-mnemosyne (semantic recall and a knowledge-graph triple store) and knight-code-base (live Obsidian vault control over the REST API), both reached through the same MCP mechanism.
