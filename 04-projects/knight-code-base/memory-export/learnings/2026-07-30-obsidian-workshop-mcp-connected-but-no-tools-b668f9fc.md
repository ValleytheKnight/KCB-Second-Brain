---
id: "b668f9fc-a282-4e05-8c1d-7cd862081c25"
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

The obsidian-workshop MCP server (the DevKnight Workshop vault's Local REST API connection) shows as Connected at the transport level in the CLI's MCP status listing, but exposes zero callable tools to a devknight subagent session, confirmed via a ToolSearch that found no match for any tool name prefixed with that server. The only vault read/write/patch style tools actually available in this session are prefixed with a different server name entirely, and that server turned out to resolve to a completely different vault (confirmed by listing its root directory, which returned campaign-content folders belonging to the D&D vault, not the DevKnight Workshop folder set). Lesson: transport-connected is not proof of usable. Always verify with a real directory-listing call or a ToolSearch for the specific server-prefixed tool name before trusting a connection status line. When the real server's tools are missing, invoke the documented direct-filesystem read and write fallback against the vault's real folder path rather than assuming the connection works or silently borrowing the wrong vault's tools.
