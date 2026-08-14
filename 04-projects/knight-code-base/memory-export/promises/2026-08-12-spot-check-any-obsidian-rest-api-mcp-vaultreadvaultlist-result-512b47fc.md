---
id: "512b47fc-a1c3-40b7-a9a1-559c1a6726d2"
type: "promise"
date: "2026-08-12"
source: "agent"
tags: ["knight-code", "promise", "open"]
---
# Promise: Spot-check any Obsidian REST API (MCP) vault_read/vault_list result with a direct file read whenever...

## Promise

Spot-check any Obsidian REST API (MCP) vault_read/vault_list result with a direct file read whenever it comes back empty or suspicious, rather than trusting a "Connected" status at face value.

## Context

Live incident 2026-08-12: lorebrain-vault MCP reported an empty Session Recordings folder for the felled-god vault while the Episode 3 isolation note sat right there on disk, because the REST API plugin serves Obsidian's in-app cache, not disk directly, and hadn't reindexed. Wasted Chris's time and tokens disputing something he could see directly. This is exactly the gotcha already documented in docs/OBSIDIAN_VAULT_OPERATIONS.md line 13 ("a connection can report Connected while silently resolving to the wrong vault entirely") — this promise is the standing behavior fix for that documented risk.
