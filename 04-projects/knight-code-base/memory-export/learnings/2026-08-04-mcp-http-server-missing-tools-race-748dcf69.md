---
id: "748dcf69-05bf-40c2-ad9d-9f60914d592f"
type: "learning"
date: "2026-08-04"
skill: "devknight"
learning-type: "operational"
key: "mcp-http-server-missing-tools-race"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "devknight"]
---
# Learning: mcp-http-server-missing-tools-race

## Insight

An HTTP-transport MCP server whose backing process starts after the Claude Code session does will never surface its tools into that session, and `claude mcp list` will still report it Connected, because that health check dials the port fresh rather than reflecting session state. So "the server is connected" and "its tools are callable in this session" are separate facts, and the CLI only answers the first.  Verified with real timestamps rather than inferred: session dec720eb started 2026-08-04T22:15:42Z (17:15:42 local, UTC-5); the Obsidian process listening on port 27123 (PID 25152) started 17:15:58 local, 16 seconds later. No obsidian-workshop tool existed anywhere in that session's tool list, confirmed by a semantic ToolSearch returning nothing from that server, while `claude mcp list` reported it healthy.  The diagnostic rule: to decide whether a vault or REST-API-backed MCP server is usable right now, check whether its tools are in the current tool list, not whether the CLI says Connected. The recovery is `/mcp`, which re-establishes the connection and registers the tools for the rest of the session. This is also why a fallback report can name the wrong cause: "server not connected" and "server connected but its tools never registered" look identical from inside the session, and only the second is fixed by a reconnect.</insight> </invoke>
