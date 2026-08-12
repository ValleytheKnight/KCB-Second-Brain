---
id: "6df236ef-44de-439b-ac22-023909b4fd63"
type: "learning"
date: "2026-08-04"
skill: "devknight"
learning-type: "operational"
key: "obsidian-mcp-tools-missing-is-not-server-down"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "devknight"]
---
# Learning: obsidian-mcp-tools-missing-is-not-server-down

## Insight

Never report the obsidian-workshop MCP server as "down" or "absent" purely because its tools are missing from your own tool list. Those are two different conditions with two different fixes, and reporting the wrong one sends Chris to restart Obsidian or re-enable a plugin when nothing is wrong there. Verified live 2026-08-04: the tools were entirely absent from a dispatched subagent's registry (missing from the SubagentStart deferred-tool list, and four separate ToolSearch calls returned "No matching deferred tools found", including exact `select:` lookups on real tool names both bare and `mcp__obsidian-workshop__`-prefixed), while the server itself was fully healthy. A curl to the root URL on port 27123 returned HTTP 200 identifying Local REST API 5.0.2 under Obsidian 1.13.4, and a raw JSON-RPC probe against the /mcp/ path completed `initialize` and enumerated all 16 tools. The server is also correctly registered at user scope, and nothing in the permission or server-enablement settings excludes it. So the two distinguishable conditions are: (a) server genuinely down, which a curl to the root URL proves by refusing the connection, versus (b) server healthy but its tools never reached this session's registry, which the same curl disproves. Run that curl before writing either cause into a report.  CORRECTION, this entry previously drew the wrong conclusion and the wrong conclusion is the more dangerous half: it said the mechanism for (b) was not establishable, and it ruled out transport as the variable because knightos-brain, a stdio server, also failed to surface. That premise was false. knightos-brain did not exist when the session started; Chris registered it mid-session, minutes before the diagnosis ran, so its absence was fully expected and carried no evidence about transport either way. The mechanism IS establishable and it is timing, not transport, see the sibling learning `mcp-server-missing-tools-timing-race` for the timestamp evidence. One explanation covers every non-surfacing server observed that session: obsidian-workshop's backing process came up 16 seconds after session start, knightos-brain was registered after session start, and lorebrain-vault was genuinely dead because its port refused connections. The recovery for (b) is `/mcp`, which re-establishes the connection and registers the tools for the rest of the session, not restarting Obsidian and not re-enabling the plugin.  Second-order lesson worth keeping separately from the MCP specifics: a piece of evidence doing load-bearing work in an argument needs verifying itself, not just the inference drawn from it. "This other server also failed, so transport is ruled out" was structurally sound reasoning resting on an unchecked fact about when that server came into existence, and it produced a confident wrong answer that read exactly like a right one. In either condition, direct Read/Write/Edit against the vault folder on disk is the correct workaround and produces correct results; only the stated cause changes.
