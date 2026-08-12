---
id: "96f6db5f-ebff-4398-bd67-3656d734b22b"
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

Never report the obsidian-workshop MCP server as "down" or "absent" purely because its tools are missing from your own tool list. Those are two different conditions with two different fixes, and reporting the wrong one sends Chris to restart Obsidian or re-enable a plugin when nothing is wrong there. Verified live on August 4, 2026: the tools were entirely absent from a dispatched subagent's registry (missing from the SubagentStart deferred-tool list, and four separate ToolSearch calls returned "No matching deferred tools found", including exact `select:` lookups on real tool names both bare and `mcp__obsidian-workshop__`-prefixed), while the server itself was fully healthy. A curl to the root URL on port 27123 returned HTTP 200 identifying Local REST API 5.0.2 under Obsidian 1.13.4, and a raw JSON-RPC probe against the /mcp/ path completed `initialize` and enumerated all 16 tools (vault_list, vault_read, vault_write, vault_append, vault_patch, vault_delete, vault_move, vault_copy, vault_get_document_map, active_file_get_path, search_query, search_simple, tag_list, command_list, command_execute, open_file). The server is also correctly registered at user scope as an http-type entry pointing at that same local URL, and nothing in the permission or server-enablement settings excludes it. So the actual, distinguishable conditions are: (a) server genuinely down, which a curl to the root URL proves by refusing the connection, versus (b) server healthy but its tools never reached this agent's registry, which the same curl disproves. Before writing either cause into a report, run that curl and say which one it actually was. This is not obsidian-specific: of seven user-scope MCP servers configured, four surfaced (all stdio: lorebrain, knightbrain, knightbrain-source-readonly, pencil) and three did not (obsidian-workshop and lorebrain-vault, both http, plus knightos-brain, which is stdio with a config shape identical to two that did surface). lorebrain-vault's absence is legitimately explained, its port refuses connections so it is genuinely dead. obsidian-workshop and knightos-brain have no such explanation, and because the unexplained set spans both transports, "http servers do not reach subagents" is ruled out as the mechanism rather than merely unproven. Do not assert a mechanism for the non-surfacing itself, it is not establishable without host internals. In either case direct Read/Write/Edit against the vault folder on disk is the correct workaround and produces correct results, only the stated cause changes.
