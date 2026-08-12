---
id: "d98d6689-f893-4cb9-81ba-835caba0df29"
type: "decision"
date: "2026-08-09"
scope: "repo"
source: "user"
confidence: 9
tags: ["knight-code", "decision"]
---
# Decision: Reverted the previous session's MCP on-demand split. All 10 MCP servers (knight-code-memory, knight-...

## Decision

Reverted the previous session's MCP on-demand split. All 10 MCP servers (knight-code-memory, knight-code-agent-manager, knight-code-mnemosyne, lorebrain, knightbrain in committed .mcp.json; knight-code-base, lorebrain-vault, obsidian-workshop, obsidian-plugin-tester, knightbrain_source at local/uncommitted scope in ~/.claude.json for this project) are back to auto-connecting whenever a session opens Knight Code, no manual /mcp add-json reconnect step. Deleted .mcp-on-demand.json and hosts/claude/hooks/mcp-on-demand-reconnect-hook.ts, and removed that hook's wiring from .claude/settings.json's Task|Agent PreToolUse matcher.

## Rationale

Chris asked for full restoration to global/always-connected and an explicit undo of the on-demand split, after clarifying that the actual source of his context bloat was token-optimizer and headroom-ai (both since fully removed), not the MCP server tool listings the on-demand split had targeted. Split servers between committed project scope (.mcp.json, no secrets, no source-project-name references) and local scope (~/.claude.json, this-project-only, not committed) rather than true user/global scope, per Chris's own choice, to avoid leaking these servers' tool listings into every other Claude Code project on the machine. knight-code-base, lorebrain-vault, obsidian-workshop, and obsidian-plugin-tester carry bearer-token credentials, and knightbrain_source's --root path names the source project by its real folder name (JBrain) -- both are barred from the tracked .mcp.json by Knight Code's own standing rules (credentials never in the tracked repo; no file may reference the source project by name), so those five went to local scope instead of the committed file. Alternatives considered: true user/global scope (available in every Claude Code project on this machine) was rejected once Chris picked project scope specifically to avoid that cross-project reach; keeping the on-demand split was rejected since Chris explicitly asked for full restoration and the context-bloat problem it was solving turned out to have a different, already-fixed root cause.
