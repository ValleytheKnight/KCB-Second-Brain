---
id: "f19f448e-e51b-400a-9fdf-74f8404ef99f"
type: "learning"
date: "2026-08-16"
skill: "devknight"
learning-type: "pitfall"
key: "pencil-mcp-stale-app-target-needs-reconnect"
confidence: 8
source: "observed"
tags: ["knight-code", "learning", "devknight"]
---
# Learning: pencil-mcp-stale-app-target-needs-reconnect

## Insight

When the Pencil (pen.dev) MCP connection fails with "transport not connected to app: visual_studio_code", checking ~/.claude.json's mcpServers.pencil block first (not retrying the tool call) is the real diagnostic. That config's --app argument is the ground truth for which Pencil host (desktop vs. the VS Code extension) the server was told to target, and it can say "desktop" (correct, matching a real running desktop app) while the error still names "visual_studio_code": confirmed live 2026-08-16, Chris opened the pen.dev desktop app directly with the config already reading --app desktop, and get_app_state still failed identically on retry. Root cause: like other stdio MCP servers in this project, Pencil's subprocess is spawned once when the session's MCP connections are established and does not pick up a config change made afterward; a get_app_state retry re-invokes the same stale subprocess rather than respawning it. This is the same session-scoped-connection mechanism already documented for the Obsidian MCP server (see docs/OBSIDIAN_VAULT_OPERATIONS.md's reconnect gotcha), applied to a second server. Fix is a real reconnect (/mcp in the actual interactive session, not something a dispatched subagent can trigger), not more retries and not assuming the app still isn't open.
