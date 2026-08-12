---
id: "2a02ecb0-cee5-4feb-9847-6a38c1ff265e"
type: "learning"
date: "2026-07-30"
skill: "devknight"
learning-type: "tool"
key: "obsidian-workshop-mcp-connected-but-no-tools"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "devknight"]
---
# Learning: obsidian-workshop-mcp-connected-but-no-tools

## Insight

Earlier in this same session, the obsidian-workshop MCP server showed Connected at the transport level but exposed zero callable tools, and the only reachable vault tools (under a different server name) resolved to the wrong vault entirely (the D&D campaign vault instead of DevKnight Workshop). After Chris reconnected the obsidian-workshop connection, re-verification confirmed it now genuinely works: ToolSearch surfaced real mcp__obsidian-workshop__* tools this time, vault_list against it returned DevKnight Workshop's actual root structure (Projects/, _scripts/, _templates/, workshop_management.md), and vault_read on Projects/_index.md returned content matching what the filesystem fallback had read earlier. Standing lesson, still true going forward: transport-connected status is never sufficient proof of usability for this vault connection specifically, it has now been observed to silently mispoint at the wrong vault at least once. Always confirm with a real vault_list plus a content read that matches expectations before trusting it, every time it reconnects after being unavailable, not just the first time this was found.
