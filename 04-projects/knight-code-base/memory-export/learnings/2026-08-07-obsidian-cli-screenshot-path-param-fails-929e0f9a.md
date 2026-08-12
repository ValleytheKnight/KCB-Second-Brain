---
id: "929e0f9a-8c37-483b-ba1e-c08943598868"
type: "learning"
date: "2026-08-07"
skill: "obsidian"
learning-type: "tool"
key: "obsidian-cli-screenshot-path-param-fails"
confidence: 9
trusted: false
source: "observed"
tags: ["knight-code", "learning", "obsidian"]
---
# Learning: obsidian-cli-screenshot-path-param-fails

## Insight

The `obsidian` CLI's `dev:screenshot path=<file>` exits 127 with no output whenever a path value is supplied, tested with both relative and absolute paths, quoted, across multiple retries. Calling `dev:screenshot` with no path argument works reliably (exit 0) and writes to the OS temp directory with an auto-generated filename containing literal spaces inside its numeric timestamp portion, which breaks naive bash globbing and find on it; use PowerShell Get-ChildItem sorted by LastWriteTime descending, take the first result, to reliably grab the just-created screenshot instead of constructing the filename. Also: obsidian CLI commands with no explicit vault parameter target whichever vault was most recently focused in the OS, not a fixed default and not necessarily the vault a task actually needs, always pass the exact vault name explicitly. The separate obsidian-workshop MCP REST connection can likewise be bound to a different vault than the one a task needs, verify with a vault listing call before trusting it.
