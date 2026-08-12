---
id: "071c640d-8596-4763-9f4e-5e7be006e71c"
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

An MCP server's tools reach a session only if the server was reachable and registered at session start, so two things that look identical from inside a session are actually different: "the server is connected" and "its tools are callable here". `claude mcp list` answers only the first, because it dials the server fresh at the moment you run it rather than reflecting what this session registered, so it reports Connected for a server whose tools were never wired in.  Verified with real timestamps rather than inferred: session dec720eb started 2026-08-04T22:15:42Z (17:15:42 local, UTC-5); the Obsidian process listening on port 27123 (PID 25152) started 17:15:58 local, 16 seconds later. No obsidian-workshop tool existed anywhere in that session's tool list, confirmed by a semantic ToolSearch returning nothing from that server, while `claude mcp list` reported it healthy.  The key on this entry says http, but the variable is timing and not transport, so read it as the general rule. Two ways to hit it: an HTTP-transport server whose backing process starts after the session does (the case above), and any server of any transport registered mid-session, after the session started (confirmed the same day: knightos-brain, stdio, registered minutes into the session, absent for the rest of it). An earlier version of this diagnosis wrongly used that stdio server as evidence that transport was not the variable; the conclusion was right but the evidence was worthless, since its absence was fully explained by not having existed at session start.  Diagnostic rule: to decide whether a vault or REST-API-backed MCP server is usable right now, check whether its tools are in the current tool list, not whether the CLI says Connected. Recovery is `/mcp`, which re-establishes the connection and registers the tools for the rest of the session; an agent cannot run it, Chris runs it in his own session. This is also why a fallback report can name the wrong cause: "server not connected" and "server connected but its tools never registered" look the same from inside the session, and only the second is fixed by a reconnect.
